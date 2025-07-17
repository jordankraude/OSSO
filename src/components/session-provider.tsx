"use client"; // This component is a client component
import { SessionProvider } from "next-auth/react";

const SessionProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
