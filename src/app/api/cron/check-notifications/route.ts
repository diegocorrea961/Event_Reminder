import { prisma } from "@/lib/prisma";
import { sendEventReminderEmail } from "@/lib/email";
import { daysUntil } from "@/lib/dates";
import { resolveNotifications } from "@/lib/notifications";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret || secret.length < 32) return false;

  const provided = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);

  return (
    provided.length === expected.length && timingSafeEqual(provided, expected)
  );
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
  }

  const now = new Date();

  const events = await prisma.event.findMany({
    include: { user: true, notifications: true },
  });

  let sentCount = 0;

  for (const event of events) {
    const daysRemaining = daysUntil(event.date, now);
    const { toSend, toSupersede } = resolveNotifications(
      daysRemaining,
      event.notifications,
    );

    if (toSend) {
      const existing = event.notifications.find((n) => n.type === toSend);

      const result = await sendEventReminderEmail({
        to: event.user.email,
        eventTitle: event.title,
        eventDate: event.date,
        type: toSend,
      });

      if (result.success) {
        if (existing) {
          await prisma.notification.update({
            where: { id: existing.id },
            data: { sent: true },
          });
        } else {
          await prisma.notification.create({
            data: { eventId: event.id, type: toSend, sent: true },
          });
        }
        sentCount++;
      }
    }

    for (const type of toSupersede) {
      const existing = event.notifications.find((n) => n.type === type);

      if (existing) {
        await prisma.notification.update({
          where: { id: existing.id },
          data: { sent: true },
        });
      } else {
        await prisma.notification.create({
          data: { eventId: event.id, type, sent: true },
        });
      }
    }
  }

  return NextResponse.json({ message: "Verificação concluída.", sentCount });
}
