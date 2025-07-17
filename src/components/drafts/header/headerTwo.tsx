import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="shadow-md w-full">
      <nav className="z-100 bg-white text-[#FF4747] container mx-auto flex items-center justify-between p-4 relative overflow-hidden w-full">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold">
          <Image 
                  src="/images/icon.png" 
                  alt="logo" 
                  width={60} 
                  height={60} 
                />

          </a>
        </div>

        {/* Email and Blog Links */}
        <div className="flex items-center space-x-8">
          {/* Email */}
          <a
            href="/email"
            className="relative  group transition duration-300 ease-in-out"
          >
            Email
            <span className="absolute left-0 -bottom-0 h-px w-full bg-[#FF4747] transition-all duration-300 scale-x-0 group-hover:scale-x-100" />
          </a>

          {/* Blog */}
          <a
            href="/blog"
            className="relative group transition duration-300 ease-in-out"
          >
            Blog
            <span className="absolute left-0 -bottom-0 h-px w-full bg-[#FF4747] transition-all duration-300 scale-x-0 group-hover:scale-x-100" />
          </a>
        </div>
      </nav>
    </header>
  );
}
