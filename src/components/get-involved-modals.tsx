// src/components/get-involved-modals.tsx
'use client';

import React, { useState } from 'react';
import DonationModalWithStripe from '@/components/modals/donation-modal'; // Import the DonationModal component
import { useRouter } from 'next/navigation'; // Import useRouter to navigate

const GetInvolvedModals: React.FC = () => {
  const [isDonationModalOpen, setDonationModalOpen] = useState(false);
  const router = useRouter(); // Initialize router

  return (
    <>
      {/* Donation button to open the donation modal */}
      <button 
        onClick={() => setDonationModalOpen(true)} 
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 hover:bg-white hover:text-blue-500 hover:scale-105 transform-gpu"
      >
        Donor Platform
      </button>

      {/* Button to navigate to the /go route for volunteering */}
      <button 
        onClick={() => router.push('/go')} // Navigate to /go
        className="bg-blue-800 text-white px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 hover:bg-white hover:text-blue-800 hover:scale-105 transform-gpu"
      >
        Learn More About Volunteering
      </button>

      {/* Donation Modal */}
      <DonationModalWithStripe 
        isOpen={isDonationModalOpen} 
        onClose={() => setDonationModalOpen(false)} 
      />
    </>
  );
};

export default GetInvolvedModals;
