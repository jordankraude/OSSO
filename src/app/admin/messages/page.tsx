'use client';

import React, { useEffect, useState } from 'react';
import { FaTrash, FaArchive, FaStar, FaFilter } from 'react-icons/fa';

type Message = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  isArchived: boolean;
  isStarred: boolean;
  needsResponse: boolean;
};

const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [filterCriteria, setFilterCriteria] = useState<string>('dateNewest');
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    const response = await fetch('/api/messages'); // Replace with your actual API route
    const data = await response.json();
    setMessages(data);
    setFilteredMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Filter and sort messages
  useEffect(() => {
    let filtered = [...messages];

    // Filter by text
    if (filterText) {
      filtered = filtered.filter((msg) =>
        msg.name.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    // Sort by criteria
    if (filterCriteria === 'dateNewest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (filterCriteria === 'dateOldest') {
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    setFilteredMessages(filtered);
  }, [filterText, filterCriteria, messages]);

  // Mark message as read
  const markAsRead = async (id: string) => {
    await fetch(`/api/messages/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ isRead: true }),
      headers: { 'Content-Type': 'application/json' },
    });
    fetchMessages();
  };

  // Toggle archive
  const toggleArchive = async (id: string, isArchived: boolean) => {
    await fetch(`/api/messages/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ isArchived: !isArchived }),
      headers: { 'Content-Type': 'application/json' },
    });
    fetchMessages();
  };

  // Toggle star
  const toggleStar = async (id: string, isStarred: boolean) => {
    await fetch(`/api/messages/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ isStarred: !isStarred }),
      headers: { 'Content-Type': 'application/json' },
    });
    fetchMessages();
  };

  // Delete message
  const deleteMessage = async (id: string) => {
    await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    fetchMessages();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Filter by name"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none"
          />
          <select
            value={filterCriteria}
            onChange={(e) => setFilterCriteria(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none"
          >
            <option value="dateNewest">Date: Newest</option>
            <option value="dateOldest">Date: Oldest</option>
          </select>
          <FaFilter className="text-xl cursor-pointer" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className={`p-4 rounded-lg shadow-md ${
              msg.isRead ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{msg.name}</h3>
              <div className="flex space-x-2">
                <button onClick={() => toggleStar(msg.id, msg.isStarred)}>
                  <FaStar className={msg.isStarred ? 'text-yellow-500' : 'text-gray-400'} />
                </button>
                <button onClick={() => toggleArchive(msg.id, msg.isArchived)}>
                  <FaArchive className={msg.isArchived ? 'text-blue-500' : 'text-gray-400'} />
                </button>
                <button onClick={() => deleteMessage(msg.id)}>
                  <FaTrash className="text-red-500" />
                </button>
              </div>
            </div>
            <p className="text-gray-600">{msg.message}</p>
            <small className="text-gray-500">Sent: {new Date(msg.createdAt).toLocaleString()}</small>
            {!msg.isRead && (
              <button
                onClick={() => markAsRead(msg.id)}
                className="mt-2 text-sm text-blue-500 hover:underline"
              >
                Mark as Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;
