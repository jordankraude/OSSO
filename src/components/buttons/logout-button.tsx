"use client"; // Ensure this is a client component

import React from "react";
import { signOut } from "next-auth/react";

const LogoutButton: React.FC = () => {
  return (
    <button 
      onClick={() => signOut()} 
      className="bg-red-600 text-white py-1 px-2 mx-auto rounded scale-75"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
