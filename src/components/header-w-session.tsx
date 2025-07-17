import React from "react";
import { Session } from "next-auth"; // <-- Import correct type
import Header from "@/components/header";

interface HeaderWithSessionProps {
  session: Session | null;
}

const HeaderWithSession: React.FC<HeaderWithSessionProps> = ({ session }) => {
  return <Header session={session} />;
};

export default HeaderWithSession;

