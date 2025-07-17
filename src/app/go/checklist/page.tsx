"use client"; 
import React, { useState } from 'react';

// Sample checklist items for a fun design
const checklistItems = [
  { id: 1, text: "Passport", completed: false },
  { id: 2, text: "Flight Tickets", completed: false },
  { id: 3, text: "Visa (if needed)", completed: false },
  { id: 4, text: "Vaccinations", completed: false },
  { id: 5, text: "Emergency Contacts", completed: false },
  { id: 6, text: "Travel Insurance", completed: false },
  { id: 7, text: "Packing Essentials", completed: false },
  { id: 8, text: "Spanish Phrasebook", completed: false },
  { id: 9, text: "OSSO Orientation Completed", completed: false },
  { id: 10, text: "Fees Paid", completed: false }
];

const VolunteerChecklist = () => {
  const [items, setItems] = useState(checklistItems);

  const toggleCompletion = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div className="bg-blue-50 min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-10 text-center text-black">Volunteer Checklist</h1>
      
      <div className="max-w-3xl mx-auto">
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => toggleCompletion(item.id)}
            className={`mb-4 p-6 rounded-lg cursor-pointer 
            ${item.completed ? 'bg-green-200 text-green-800' : 'bg-white text-gray-700'} 
            shadow-lg flex items-center justify-between transition-all duration-300 ease-in-out`}
          >
            <span className="text-xl font-semibold">
              {item.text}
            </span>

            <div className="w-6 h-6 flex items-center justify-center">
              {item.completed ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 text-green-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerChecklist;
