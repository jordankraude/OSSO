import React from "react";
import Header from "@/components/header"; // Adjust the import based on your file structure

interface HeaderWithSessionProps {
  session: any; // Define session type based on your session structure
}


const HeaderWithSession: React.FC<HeaderWithSessionProps> = ({ session }) => {
  return <Header session={session} />; // Pass the session to the Header
};

export default HeaderWithSession;
