import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch recent users
    const recentUsers = await prisma.profiles.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    // Fetch recent messages
    const recentMessages = await prisma.messages.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    // Fetch recent potential volunteers
    const recentPotentialVolunteers = await prisma.potential_volunteers.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    // Fetch recent applications
    const recentApplications = await prisma.applications.findMany({ // Ensure your table is named 'applications'
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    // Combine all activities
    const combinedActivities = [
      ...recentUsers.map(user => ({
        type: 'User',
        name: user.firstName ? `${user.firstName} ${user.lastName}` : user.email,
        createdAt: user.createdAt,
      })),
      ...recentMessages.map(message => ({
        type: 'Message',
        name: message.name,
        createdAt: message.createdAt,
      })),
      ...recentPotentialVolunteers.map(volunteer => ({
        type: 'Potential Volunteer',
        name: volunteer.name,
        createdAt: volunteer.createdAt,
      })),
      ...recentApplications.map(application => ({
        type: 'Application',
        name: application.firstName ? `${application.firstName} ${application.lastName}` : application.email, // Assuming 'applicantName' is a field in your applications table
        createdAt: application.createdAt,
      })),
    ];

    // Sort activities by createdAt date
    combinedActivities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return new Response(JSON.stringify(combinedActivities.slice(0, 5)), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return new Response('Failed to fetch data', { status: 500 });
  } finally {
    await prisma.$disconnect(); // Close the connection
  }
}
