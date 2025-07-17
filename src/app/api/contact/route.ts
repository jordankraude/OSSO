import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
 // Assuming your Prisma client is in /lib/prisma.ts

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const contact = await prisma.messages.create({
      data: {
        name,
        email,
        phone,
        message,
      },
    });

    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (error) {
    console.error("Error creating contact message:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
