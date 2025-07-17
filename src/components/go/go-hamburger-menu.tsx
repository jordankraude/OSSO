// components/AlternateHamburgerMenu.tsx
"use client";

import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Session } from "next-auth"; // Import the Session type

interface GoHamburgerMenuProps {
  session: Session | null; // Define session type based on your session structure
}

const GoHamburgerMenu: React.FC<GoHamburgerMenuProps> = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden flex flex-col items-center">
      {/* Hamburger Button with morphing icon */}
      <button
        onClick={toggleMenu}
        className="text-white p-2 focus:outline-none"
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={30} /> : <FiMenu size={30} />}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="flex flex-col items-center space-y-4 mt-4 text-white w-full">
          <a href="/" className="text-white">Home</a>
          <a href="/go/pricing" className="text-white">Pricing</a>
          <a href="/go/faq" className="text-white">FAQ</a>
          <a href="/go/checklist" className="text-white">Volunteer Checklist</a>

          {/* Admin link for admin users in the hamburger menu */}
          {session && session.user?.isAdmin && (
            <a href="/admin" className="text-white">Admin</a>
          )}
        </div>
      )}
    </div>
  );
};

export default GoHamburgerMenu;
