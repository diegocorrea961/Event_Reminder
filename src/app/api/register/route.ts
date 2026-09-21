import { Prisma, PrismaClient } from "@/generated/prisma/client";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const prisma = new PrismaClient();

  if (
    !body.nickname?.trim() ||
    !body.email?.trim() ||
    !body.password?.trim()
  ) {
    return NextResponse.json(
      { message: "Preencha nome, e-mail e senha." },
      { status: 400 },
    );
  }

  try {
    await prisma.user.create({
      data: {
        nickname: body.nickname,
        email: body.email,
        password: await hash(body.password, 10),
      },
    });
    return NextResponse.json({ message: "sucesso" }, { status: 201 });
  } catch (error) {
    const isDuplicateEmail =
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002" &&
      (error.meta?.target as string[] | undefined)?.includes("email");

    if (isDuplicateEmail) {
      return NextResponse.json(
        { message: "E-mail já existente." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { message: "Ocorreu um erro ao registrar." },
      { status: 400 },
    );
  }
}
