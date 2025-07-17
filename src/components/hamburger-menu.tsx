"use client";

import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

interface User {
  firstname: string | null;
  lastname: string | null;
  image: string | null;
  isAdmin: boolean; // Add isAdmin property
}

interface Session {
  user: User;
}

interface HamburgerMenuProps {
  session: Session | null; // Accept session as a prop
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col items-center lg:hidden">
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
          <a href="/about" className="text-white">About Us</a>
          <a href="/go" className="text-white">Volunteer</a>
          <a href="/give" className="text-white">Donate</a>
          <a href="/blog" className="text-white">Blog</a>
          <a href="/contact" className="text-white">Contact</a>
          {session?.user?.isAdmin && ( // Conditionally render Admin link if isAdmin is true
            <a href="/admin" className="text-white">Admin</a>
          )}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
