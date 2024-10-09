import React from "react";

export default function Header() {
  return (
    <header className="shadow-md">
      <nav className="bg-blue-900  z-100 container mx-auto flex items-center justify-between p-4 relative overflow-hidden">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold">
            <img src="/images/OSSO-Logo.png" alt="Logo" className="h-10 w-auto" />
          </a>
        </div>

        {/* Email and Blog Links */}
        <div className="flex items-center space-x-8">
          {/* Email */}
          <a
            href="/email"
            className="relative text-white group transition duration-300 ease-in-out"
          >
            Email
            <span className="absolute left-0 -bottom-0 h-px w-full bg-white transition-all duration-300 scale-x-0 group-hover:scale-x-100" />
          </a>

          {/* Blog */}
          <a
            href="/blog"
            className="relative text-white group transition duration-300 ease-in-out"
          >
            Blog
            <span className="absolute left-0 -bottom-0 h-px w-full bg-white transition-all duration-300 scale-x-0 group-hover:scale-x-100" />
          </a>
        </div>
      </nav>
    </header>
  );
}
