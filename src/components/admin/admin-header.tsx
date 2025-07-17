import React from "react";
import { Session } from "next-auth";
import { FiBell, FiUser } from "react-icons/fi"; // Import icons for notifications and messages

interface AdminHeaderProps {
  session: Session | null;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ session }) => {
  return (
    <header className="shadow-md w-full bg-[#3454D1]">
      <nav className="container mx-auto flex items-center justify-between p-4">        
        {/* Navigation Links */}
        <div className="flex space-x-8">
          <a href="/" className="text-white flex items-center">
            Return To Site
          </a>
        </div>

        {/* User Info Dropdown */}

        
        {/* Notifications Icon */}
        <div className="text-white relative flex">
        <div className="relative text-white px-4">
          <button className="flex items-center">
            {session?.user?.image ? (
              <img src={session.user.image} alt="Profile" className="rounded-full w-8 h-8 mr-2" />
            ) : (
              <FiUser className="w-8 h-8 mr-2" />
            )}
            <span>Welcome, {session?.user?.firstname || 'Guest'}</span>
          </button>

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg hidden group-hover:block">
            <a href="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</a>
            <a href="/logout" className="block px-4 py-2 hover:bg-gray-200">Logout</a>
          </div>
        </div>
          <FiBell className="w-8 h-8 cursor-pointer" />
          {/* You can add a badge here if needed */}
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
