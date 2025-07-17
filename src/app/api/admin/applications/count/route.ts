import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const count = await prisma.applications.count();
    return NextResponse.json({ count });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to retrieve application count' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
