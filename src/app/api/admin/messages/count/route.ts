import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const count = await prisma.messages.count();
    return NextResponse.json({ count });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to retrieve message count' }, { status: 500 });
  }
}

