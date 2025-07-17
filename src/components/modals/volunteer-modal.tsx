'use client';

import React, { useState } from 'react';

// Define props interface
interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VolunteerModal: React.FC<VolunteerModalProps> = ({ isOpen, onClose }) => {
  const [volunteerName, setVolunteerName] = useState<string>('');
  const [volunteerEmail, setVolunteerEmail] = useState<string>('');
  const [volunteerDuration, setVolunteerDuration] = useState<string>(''); // State for duration
  const [travelingWithFamily, setTravelingWithFamily] = useState<boolean>(false); // State for family question
  const [familyMembers, setFamilyMembers] = useState<number | ''>(''); // State for number of family members
  const [isStudent, setIsStudent] = useState<boolean>(false); // State for student question

  const handleVolunteerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create potential volunteer object
    const volunteerData = {
      name: volunteerName,
      email: volunteerEmail,
      duration: volunteerDuration,
      travelingWithFamily: travelingWithFamily,
      familyMembers: travelingWithFamily ? familyMembers : 1, // Set to 1 if not traveling with family
      isStudent: isStudent,
    };

    // Save volunteer data to the database
    try {
      const response = await fetch('/api/volunteers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(volunteerData),
      });

      if (!response.ok) {
        throw new Error('Failed to create volunteer entry');
      }
    } catch (error) {
      console.error('Error creating volunteer entry:', error);
      return; // Exit if there's an error
    }

    // Determine the category based on the input
    let redirectUrl = '';

    if (!travelingWithFamily) {
      if (volunteerDuration === '1-4 weeks') {
        redirectUrl = '/st-individual';
      } else if (volunteerDuration === '1-3 months' && isStudent || volunteerDuration === '3-6 months' && isStudent) {
        redirectUrl = '/semester-abroad';
      } else if (volunteerDuration === '3-6 months' || volunteerDuration === '6+ months') {
        redirectUrl = '/lt-individual';
      }
    } else {
      redirectUrl = '/family'; // Redirect to family page for any duration
    }

    // Close the modal after submission
    onClose();

    // Redirect to the determined URL
    window.location.href = redirectUrl;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed -inset-4 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg text-black">
        <h2 className="text-2xl font-bold mb-4">Join Us as a Volunteer</h2>
        <form onSubmit={handleVolunteerSubmit}>
          <label className="block mb-2 text-left">Your Name</label>
          <input 
            type="text" 
            value={volunteerName}
            onChange={(e) => setVolunteerName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4" 
            placeholder="John Doe" 
            required 
          />
          
          <label className="block mb-2 text-left">Your Email</label>
          <input 
            type="email" 
            value={volunteerEmail}
            onChange={(e) => setVolunteerEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4" 
            placeholder="you@example.com" 
            required 
          />
          
          <label className="block mb-2 text-left">How long are you looking to volunteer?</label>
          <select 
            value={volunteerDuration} 
            onChange={(e) => setVolunteerDuration(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4" 
            required
          >
            <option value="" disabled>Select duration</option>
            <option value="1-4 weeks">1-4 weeks</option>
            <option value="1-3 months">1-3 months</option>
            <option value="3-6 months">3-6 months</option>
            <option value="6+ months">6+ months</option>
          </select>

          <label className="block mb-2 text-left">Are you a student?</label>
          <select 
            value={isStudent ? 'yes' : 'no'} 
            onChange={(e) => setIsStudent(e.target.value === 'yes')}
            className="w-full p-2 border border-gray-300 rounded mb-4" 
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
          
          <label className="block mb-2 text-left">Will you be traveling with a spouse/family?</label>
          <select 
            value={travelingWithFamily ? 'yes' : 'no'} 
            onChange={(e) => setTravelingWithFamily(e.target.value === 'yes')}
            className="w-full p-2 border border-gray-300 rounded mb-4" 
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>

          {travelingWithFamily && (
            <>
              <label className="block mb-2 text-left">How many (including yourself) will be traveling?</label>
              <select 
                value={familyMembers} 
                onChange={(e) => setFamilyMembers(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded mb-4" 
                required
              >
                <option value="" disabled>Select number</option>
                <option value="1">2</option>
                <option value="2">3-6</option>
                <option value="3">6+</option>
              </select>
            </>
          )}

          <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded">Submit</button>
          <button type="button" onClick={onClose} className="ml-4 text-gray-500">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerModal;

