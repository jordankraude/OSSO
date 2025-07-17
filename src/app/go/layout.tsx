import React from "react";
import GoHeaderWithSession from "@/components/go/go-header-w-session";
import Footer from '@/components/footer';

const GoLayout = ({ children }: { children: React.ReactNode }) => {


  
  return (
    <>
      {/* Alternate Header */}
      <GoHeaderWithSession />

      {/* Main Content */}
      <main>
        {children}
      </main>
      <Footer/>
    </>
  );
};

export default GoLayout;
