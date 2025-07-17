// app/api/volunteers/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a POST route to handle potential volunteer submissions
export async function POST(request: Request) {
  try {

    const { name, email, duration, travelingWithFamily, familyMembers } = await request.json();

    // Validate input data
    if (!name || !email || !duration || familyMembers === undefined) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create a new potential volunteer entry in the database
    const newVolunteer = await prisma.potential_volunteers.create({
      data: {
        name,
        email,
        duration,
        travelingWithFamily,
        familyMembers: familyMembers.toString(), // Convert to string if required
      },
    });

    return NextResponse.json(newVolunteer, { status: 201 });
  } catch (error) {
    console.error('Error creating volunteer entry:', error);
    return NextResponse.json(
      { error: 'Failed to create volunteer entry' },
      { status: 500 }
    );
  }
}
