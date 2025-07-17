import React from "react";
import Footer from '@/components/footer';

const GoLayout = ({ children }: { children: React.ReactNode }) => {


  
  return (
    <>
      {/* Main Content */}
      <main>
        {children}
        <Footer/>
      </main>
    </>
  );
};

export default GoLayout;
