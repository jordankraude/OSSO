// src/pages/donate.tsx
import React from "react";
import HeaderWithSession from "@/components/header-w-session";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Define the DonatePage component as an async function
const Give = async () => {
  // Retrieve the session asynchronously
  const session = await getServerSession(authOptions);

  // Impact data
  const impactData = [
    { title: "Orphanages Supported", detail: "9 orphanages and 1 day care center supported" },
    { title: "Children Supported", detail: "310+ orphaned and at-risk children loved and supported" },
    { title: "Specialized Care", detail: "18+ disabled youth, teens, and adults received 24/7 specialized care" },
    { title: "Therapy Services", detail: "10,430+ hours of psychosocial and emotional therapy services provided" },
    { title: "Direct Care", detail: "257,300+ hours of direct care provided through OSSO-supported caregivers, cooks, tias, and orphanage staff" },
    { title: "Physical Therapy", detail: "4,300+ hours of physical therapy services provided" },
    { title: "Meals Provided", detail: "44,300+ nutritious meals, snacks, formula, and supplements provided" },
    { title: "Volunteer Hours", detail: "84,552+ direct hours of volunteer programs and service by OSSO volunteers" },
  ];

  return (
    <div>
      {/* Pass session to the header component */}
      <HeaderWithSession session={session} />
      <div className="bg-blue-50 min-h-screen p-8 text-black">
        <h1 className="text-4xl font-bold text-center mb-8">Our Impact</h1>
        <div className="max-w-6xl mx-auto text-gray-800">
          <p className="text-lg mb-4 text-center">
            Wondering how your donation helps support orphaned and at-risk children in Ecuador? Here’s a quick snapshot of OSSO’s impact during 2023-2024:
          </p>

          {/* Cards for Impact Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactData.map((item, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold mb-2 text-blue-600">{item.title}</h3>
                <p className="text-lg">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-center">How Donations Help</h2>
            <p className="text-lg">Donations to OSSO also covered other necessary costs like:</p>
            <ul className="list-disc list-inside text-lg space-y-4 mt-4">
              <li>Doctor visits and medications</li>
              <li>Education and life skills training</li>
              <li>Music therapy, art therapy, and field trips</li>
              <li>Legal assistance and operational costs</li>
              <li>Other care-centered costs for the 300+ children in our care</li>
            </ul>
          </div>

          <p className="text-center text-sm text-gray-600 mt-8">
            *Fiscal Year 2023-2024 covers July 1, 2023 - June 30, 2024
          </p>

          <div className="flex justify-center mt-8">
            <a href="/donate" className="bg-blue-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
              Donate Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Give;
