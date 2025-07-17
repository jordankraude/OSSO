import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

  

  export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
  
    try {
      await prisma.potential_volunteers.delete({
        where: { id },
      });
      const users = await prisma.potential_volunteers.findMany();
  
      return NextResponse.json({ message: "User deleted successfully", users }, { status: 200 });
    } catch (error) {
      console.error('Delete User Error:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }