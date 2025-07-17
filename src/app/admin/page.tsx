// File: src/app/admin/page.tsx

import React from 'react';
import { FiUsers, FiFile, FiMessageCircle, FiBarChart } from 'react-icons/fi';

// Define types for activities
interface UserActivity {
  type: 'User';
  name: string;
  createdAt: Date;
}

interface MessageActivity {
  type: 'Message';
  name: string;
  createdAt: Date;
}

interface PotentialVolunteerActivity {
  type: 'Potential Volunteer';  // Adjusted this type
  name: string;
  createdAt: Date;
}

interface ApplicationActivity {
  type: 'Application';
  name: string;
  createdAt: Date;
}

// Define a union type for all activities
type RecentActivity = UserActivity | MessageActivity | PotentialVolunteerActivity | ApplicationActivity;

const AdminPage: React.FC = async () => {
  // Fetch recent activities from the API route
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/recent_activity`, {
    cache: 'no-store', // Ensure the latest data is fetched
  });

  // Check if the response is OK (status code 200)
  if (!res.ok) {
    console.error('Failed to fetch data:', res.status, res.statusText);
    return (
      <div className="p-6 bg-gray-100 min-h-screen text-black">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <p className="text-red-500">Error fetching recent activities. Please try again later.</p>
      </div>
    );
  }

  const recentActivities: RecentActivity[] = await res.json();

  // Check the length of recentActivities for debugging
  console.log('Recent Activities:', recentActivities);

  // Filter activities by type
  const recentUsers = recentActivities.filter((activity): activity is UserActivity => activity.type === 'User');
  const recentMessages = recentActivities.filter((activity): activity is MessageActivity => activity.type === 'Message');
  const recentPotentialVolunteers = recentActivities.filter((activity): activity is PotentialVolunteerActivity => activity.type === 'Potential Volunteer');  // Adjusted this line
  const recentApplications = recentActivities.filter((activity): activity is ApplicationActivity => activity.type === 'Application');

  // Fetch counts from the API routes
  const fetchCounts = async () => {
    const userRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/profiles/count`);
    const potentialVolunteersRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/potential_volunteers/count`);
    const messagesRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/messages/count`);
    const applicationsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/applications/count`);

    const userCount = await userRes.json();
    const potentialVolunteersCount = await potentialVolunteersRes.json();
    const messagesCount = await messagesRes.json();
    const applicationsCount = await applicationsRes.json();

    return {
      users: userCount.count,
      potentialVolunteers: potentialVolunteersCount.count,
      messages: messagesCount.count,
      applications: applicationsCount.count,
    };
  };

  const { users, potentialVolunteers, messages, applications } = await fetchCounts();

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Summary Cards */}
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
          <FiUsers size={32} className="text-blue-500" />
          <div>
            <p className="text-lg font-semibold">Users</p>
            <p className="text-2xl">{users}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
          <FiFile size={32} className="text-green-500" />
          <div>
            <p className="text-lg font-semibold">Applications</p>
            <p className="text-2xl">{applications}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
          <FiMessageCircle size={32} className="text-yellow-500" />
          <div>
            <p className="text-lg font-semibold">Messages</p>
            <p className="text-2xl">{messages}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
          <FiBarChart size={32} className="text-purple-500" />
          <div>
            <p className="text-lg font-semibold">Potential Volunteers</p>
            <p className="text-2xl">{potentialVolunteers}</p>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Recent Activity */}
        <div className="col-span-1 lg:col-span-2 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            {/* Display recent activities */}
            {[...recentUsers, ...recentMessages, ...recentPotentialVolunteers, ...recentApplications]
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort by date descending
              .slice(0, 5) // Get the most recent 5 items
              .map((activity) => (
                <li key={activity.createdAt.toString()} className="flex items-center justify-between">
                  {activity.type === 'User' && (
                    <p>User <span className="font-semibold">{activity.name}</span> registered.</p>
                  )}
                  {activity.type === 'Message' && (
                    <p>Message received from <span className="font-semibold">{activity.name}</span>.</p>
                  )}
                  {activity.type === 'Potential Volunteer' && (  // Adjusted this line
                    <p><span className="font-semibold">{activity.name}</span> looked at volunteering.</p>
                  )}
                  {activity.type === 'Application' && (
                    <p>New application from <span className="font-semibold">{activity.name}</span>.</p>
                  )}
                  <span className="text-sm text-gray-500">{new Date(activity.createdAt).toLocaleString()}</span>
                </li>
              ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Add New User
            </button>
            <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
              Create Blog Post
            </button>
            <button className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600">
              View Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
