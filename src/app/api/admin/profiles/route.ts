import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid"; // Make sure to install uuid

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  
  // Get page number and provide a default value of 1 if null
  const page = parseInt(url.searchParams.get("page") || "1", 10); // Default to 1
  // Get limit and provide a default value of 10 if null
  const limit = parseInt(url.searchParams.get("limit") || "10", 10); // Default to 10
  const skip = (page - 1) * limit; // Calculate the number of users to skip for pagination

  try {
    const totalUsers = await prisma.profiles.count(); // Get total number of users for pagination
    const users = await prisma.profiles.findMany({
      skip, // Skip the calculated number of users
      take: limit, // Limit the number of users returned
    });

    return NextResponse.json({ users, totalUsers }, { status: 200 }); // Return users and total count
  } catch (error) {
    console.error("Get Users Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { email, firstName, lastName, isAdmin } = await request.json();

    // Check if any required fields are missing
    if (!email || !firstName || !lastName) {
      return NextResponse.json({ error: "Email, first name, and last name are required." }, { status: 400 });
    }

    const existingUser = await prisma.profiles.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Account already exists with this email" }, { status: 400 });
    }

    const randomPassword = uuidv4(); // Generate a random password
    const hashedPassword = await bcrypt.hash(randomPassword, 10); // Hash the password

    const newUser = await prisma.profiles.create({
      data: {
        email,
        passwordHash: hashedPassword,
        firstName,
        lastName,
        isAdmin
      },
    });

    // Fetch all users after creation
    const users = await prisma.profiles.findMany();

    // Return the new user's details along with the random password and all users
    return NextResponse.json({ 
      message: "User created successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        password: randomPassword // Include the random password in the response
      },
      users // Include all users in the response
    }, { status: 201 });
  } catch (error) {
    console.error("User Creation Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
