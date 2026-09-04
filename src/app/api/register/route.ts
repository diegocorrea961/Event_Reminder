import { PrismaClient } from "@/generated/prisma/client";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const prisma = new PrismaClient();

  try {
    const hashedPassword = await hash(body.password, 10);
    const newRegister = await prisma.user.create({
      data: {
        nickname: body.nickname,
        email: body.email,
        password: hashedPassword,
      },
    });
    return NextResponse.json({ message: "sucesso" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "E-mail já existente." },
      { status: 409 },
    );
  }
}
