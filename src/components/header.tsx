import React from "react";
import { FaUserCircle } from "react-icons/fa";
import LogoutButton from "@/components/buttons/logout-button";
import HamburgerMenu from "@/components/hamburger-menu";

interface User {
  firstname: string | null;
  lastname: string | null;
  image: string | null;
  isAdmin: boolean; // Add isAdmin property
}

interface Session {
  user: User;
}

interface AlternateHeaderProps {
  session: Session | null;
}

const Header: React.FC<AlternateHeaderProps> = ({ session }) => {
  return (
    <header className="shadow-md w-full bg-[#3454D1]">
      <nav className="flex items-start md:items-center justify-between p-4 w-full">
        
        {/* Left: Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold">
            <img src="/images/icon.png" alt="logo" width={60} height={60} />
          </a>
        </div>

        {/* Center: Hamburger Button on small screens */}
        <div className="w-1/3 ml-12 md:hidden md:w-auto mt-2 flex justify-center items-center flex-grow">
          <HamburgerMenu session={session} /> {/* Pass session prop here */}
        </div>

        {/* Center: Navigation Menu or Hamburger */}

        {/* Right: Profile Section */}
        <div className="flex justify-between items-center space-x-8">
          <div className="hidden md:flex space-x-8 flex-grow justify-center">
            <a href="/about" className="text-white">About Us</a>
            <a href="/go" className="text-white">Volunteer</a>
            <a href="/give" className="text-white">Donate</a>
            <a href="/blog" className="text-white">Blog</a>
            <a href="/contact" className="text-white">Contact</a>
            {session?.user?.isAdmin && ( // Conditionally render Admin link if isAdmin is true
              <a href="/admin" className="text-white">Admin</a>
            )}
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-white">
              {session && session.user ? (
                session.user.image ? (
                  <img src={session.user.image} alt="Profile" className="rounded-full" />
                ) : (
                  <span>
                    {session.user.firstname ? session.user.firstname[0] : ''} 
                    {session.user.lastname ? session.user.lastname[0] : ''} 
                  </span>
                )
              ) : (
                <FaUserCircle size={30} />
              )}
            </div>
            {/* Login/Signup/Logout - Always below Profile Icon */}
            <div className="text-white text-xs sm:text-sm">
              {session && session.user ? (
                <LogoutButton />
              ) : (
                <div className="flex items-center space-x-1">
                  <a href="/login" className="block">Login</a>
                  <span>/</span>
                  <a href="/signup" className="text-white">Sign Up</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
