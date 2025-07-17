// components/AlternateHeader.tsx
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import LogoutButton from "@/components/buttons/logout-button";
import { Session } from "next-auth";
import GoHamburgerMenu from "@/components/go/go-hamburger-menu"; // Import the GoHamburgerMenu component

interface AlternateHeaderProps {
  session: Session | null; // Define session type based on your session structure
}

const AlternateHeader: React.FC<AlternateHeaderProps> = ({ session }) => {
  return (
    <header className="shadow-md w-full bg-[#3454D1]">
      <nav className="container mx-auto flex items-start md:items-center justify-between p-4 relative">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold">
            <img src="/images/icon.png" alt="logo" width={60} height={60} />
          </a>
        </div>

        {/* Hamburger Menu for mobile */}
        <div className="ml-12 mt-2">
          <GoHamburgerMenu session={session} /> {/* Pass session to GoHamburgerMenu */}
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-8 scale-100">
          {/* Navigation Menu (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-white">Home</a>
            <a href="/go/pricing" className="text-white">Pricing</a>
            <a href="/go/faq" className="text-white">FAQ</a>
            <a href="/go/checklist" className="text-white">Volunteer Checklist</a>

            {/* Admin link for admin users */}
            {session && session.user?.isAdmin && (
              <a href="/admin" className="text-white">Admin</a>
            )}
          </div>

          <div className="relative flex flex-col items-center">
            {/* Profile Icon */}
            <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center">
              {session && session.user ? (
                session.user.image ? (
                  <img src={session.user.image} alt="Profile" className="rounded-full" />
                ) : (
                  <span>
                    {session.user.firstname ? session.user.firstname[0] : ""} 
                    {session.user.lastname ? session.user.lastname[0] : ""}
                  </span>
                )
              ) : (
                <FaUserCircle size={30} />
              )}
            </div>

            {/* Login and Signup Text */}
            <div className="flex items-center mt-1 text-white text-sm">
              {session && session.user ? (
                <LogoutButton />
              ) : (
                <>
                  <a href="/login" className="block">Login</a>
                  <span className="mx-1">/</span>
                  <a href="/signup" className="text-white">Sign Up</a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AlternateHeader;
