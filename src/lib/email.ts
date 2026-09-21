import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFICATION_LABELS: Record<string, string> = {
  "7_dias": "em 7 dias",
  "1_dia": "amanhã",
  no_dia: "hoje",
};

export async function sendEventReminderEmail({
  to,
  eventTitle,
  eventDate,
  type,
}: {
  to: string;
  eventTitle: string;
  eventDate: Date;
  type: string;
}): Promise<{ success: boolean; error?: string }> {
  const formattedDate = eventDate.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
  const when = NOTIFICATION_LABELS[type] ?? type;

  const { error } = await resend.emails.send({
    from: "Chronos <onboarding@resend.dev>",
    to,
    subject: `Lembrete: "${eventTitle}" é ${when}`,
    html: `<p>Seu evento <strong>${eventTitle}</strong> está marcado para <strong>${formattedDate}</strong> (${when}).</p>`,
  });

  if (error) {
    console.error("Resend error:", error);
  }

  return { success: !error, error: error?.message };
}
