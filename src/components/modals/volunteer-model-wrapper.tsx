'use client';

import React, { useState } from 'react';
import VolunteerModal from '@/components/modals/volunteer-modal'; // Adjust the import path as necessary

const VolunteerModalWrapper: React.FC = () => {
  const [isVolunteerModalOpen, setVolunteerModalOpen] = useState(false);

  return (
    <>
      {/* Button to open the volunteer modal */}
      <button
        onClick={() => setVolunteerModalOpen(true)}
        className="bg-blue-800 text-white mx-auto px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 hover:bg-white hover:text-blue-800 hover:scale-105 transform-gpu"
      >
        Ready To Volunteer
      </button>

      {/* Volunteer Modal */}
      {isVolunteerModalOpen && (
        <VolunteerModal
          isOpen={isVolunteerModalOpen}
          onClose={() => setVolunteerModalOpen(false)}
        />
      )}
    </>
  );
};

export default VolunteerModalWrapper;
