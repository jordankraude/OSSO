import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { email, firstName, lastName, isVolunteer, isAdmin } = await request.json();

    // Update the specific user
    await prisma.profiles.update({
      where: { id: params.id },
      data: {
        email,
        firstName,
        lastName,
        isAdmin,
        isVolunteer,
      },
    });

    // Fetch all users after the update
    const users = await prisma.profiles.findMany();

    return NextResponse.json({ message: "User updated successfully", users }, { status: 200 });
  } catch (error) {
    console.error("Update User Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    await prisma.profiles.delete({
      where: { id },
    });
    const users = await prisma.profiles.findMany();

    return NextResponse.json({ message: "User deleted successfully", users }, { status: 200 });
  } catch (error) {
    console.error('Delete User Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}