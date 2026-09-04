import { auth } from "@/auth";
import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const prisma = new PrismaClient();

  const session = await auth();
  if (session?.user == null) {
    return NextResponse.json(
      { message: "Você não está logado." },
      { status: 401 },
    );
  } else {
    try {
      const newEvent = await prisma.event.create({
        data: {
          userId: Number(session.user.id),
          title: body.title,
          description: body.description,
          date: body.date,
        },
      });
      return NextResponse.json({ message: "sucesso" }, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { message: "Ocorreu um erro na criação do evento." },
        { status: 400 },
      );
    }
  }
}

export async function GET() {
  const prisma = new PrismaClient();
  const session = await auth();
  if (session?.user == null) {
    return NextResponse.json(
      { message: "Você não está logado." },
      { status: 401 },
    );
  } else {
    const events = await prisma.event.findMany({
      where: {
        userId: Number(session.user.id),
      },
    });

    return NextResponse.json({ events }, { status: 200 });
  }
}
