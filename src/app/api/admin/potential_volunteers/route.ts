import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET route to fetch potential volunteers with pagination
export async function GET(request: Request) {
    try {
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get('page') || '1');
      const limit = parseInt(url.searchParams.get('limit') || '5');
      const skip = (page - 1) * limit;
  
      // Fetch the potential volunteers with pagination
      const volunteers = await prisma.potential_volunteers.findMany({
        skip,
        take: limit,
      });
  
      console.log('Fetched Volunteers:', volunteers); // Log the fetched volunteers
  
      return NextResponse.json({ volunteers });
    } catch (error) {
      console.error('Error fetching potential volunteers:', error);
      return NextResponse.json({ error: 'Failed to retrieve potential volunteers' }, { status: 500 });
    }
  }
  
// DELETE route to delete a specific potential volunteer by id
