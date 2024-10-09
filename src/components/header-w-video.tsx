'use client';

import React from "react";

export default function HeaderWithVideo() {
  return (
    <header className="relative w-full h-screen overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          src="/videos/banner.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      {/* Overlay and navbar content */}
      <div className="relative z-10">
        <nav className="container mx-auto flex items-center justify-between p-4 bg-transparent">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold">
              <img src="/images/OSSO-Logo.png" alt="Logo" className="h-10 w-auto" />
            </a>
          </div>

          {/* Email and Blog Links */}
          <div className="flex items-center space-x-8">
            <a href="/email" className="text-white hover:text-gray-400">
              Email
            </a>
            <a href="/blog" className="text-white hover:text-gray-400">
              Blog
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
