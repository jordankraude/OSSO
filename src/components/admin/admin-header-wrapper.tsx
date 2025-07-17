// components/AdminHeaderWithSession.tsx
import React from "react";
import AdminHeader from "@/components/admin/admin-header"; // Update path as needed
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Ensure path is correct for authOptions

const AdminHeaderWithSession = async () => {
  const session = await getServerSession(authOptions); // Fetch session server-side
  return <AdminHeader session={session} />; // Pass session as prop to AdminHeader
};

export default AdminHeaderWithSession;
