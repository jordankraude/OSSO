// src/components/ContactForm.tsx
"use client"; // Make this a client component
import React, { useState } from "react";
import LoadingSpinner from "@/components/loading-spinner"; // Import the LoadingSpinner component

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setLoading(false); // Set loading to false

    if (res.ok) {
      window.location.href = "/contact/success";

    } else {
      alert("Error sending message.");
    }
  };

  return (
    <div>
      {loading && <LoadingSpinner />} {/* Show loading spinner if loading */}
      <form
        onSubmit={handleSubmit}
        className={`space-y-6 relative max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg ${loading ? 'opacity-0' : 'opacity-100'}`} // Hide form if loading
      >
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactForm;


