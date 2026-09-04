import { auth } from "@/auth";
import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const prisma = new PrismaClient();
  const body = await request.json();
  const session = await auth();
  if (session?.user == null) {
    return NextResponse.json(
      { message: "Você não está logado" },
      { status: 401 },
    );
  } else {
    try {
      const foundEvent = await prisma.event.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (foundEvent?.userId === Number(session.user.id)) {
        const updateInfo = await prisma.event.update({
          where: {
            id: Number(id),
          },
          data: {
            title: body.title,
            description: body.description,
            date: body.date,
          },
        });
      } else {
        return NextResponse.json(
          { message: "As informações não foram alteradas." },
          { status: 404 },
        );
      }

      return NextResponse.json(
        { message: "sucesso, informações alteradas." },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Evento não encontrado." },
        { status: 404 },
      );
    }
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const prisma = new PrismaClient();
  const session = await auth();
  if (session?.user == null) {
    return NextResponse.json(
      { message: "Você não está logado>" },
      { status: 401 },
    );
  } else {
    try {
      const foundEvent = await prisma.event.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (foundEvent?.userId === Number(session.user.id)) {
        const deleteEvent = await prisma.event.delete({
          where: {
            id: Number(id),
          },
        });
      } else {
        return NextResponse.json(
          { message: "Ocorreu um erro e o evento não foi deletado." },
          { status: 404 },
        );
      }

      return NextResponse.json(
        { message: "sucesso, evento deletado." },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Evento não encontrado." },
        { status: 400 },
      );
    }
  }
}
