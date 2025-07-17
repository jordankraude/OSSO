import React from "react";
import AlternateHeader from "@/components/go/go-header"; // Adjust the import based on your file structure
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Ensure this path is correct

const GoHeaderWithSession = async () => {
  const session = await getServerSession(authOptions); // Fetch the session data

  return <AlternateHeader session={session} />; // Pass the session to the Header
};

export default GoHeaderWithSession;
