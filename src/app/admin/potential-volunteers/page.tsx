'use client'
import React, { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/admin/admin-spinner'; // Import the spinner component

const AdminPage: React.FC = () => {
  const [potentialVolunteers, setPotentialVolunteers] = useState<any[]>([]);  // Initializing as an empty array
  const [filter, setFilter] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10); // You can adjust this number
  const [sortOption, setSortOption] = useState<string>('createdAt'); // New state for sorting option
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to control modal visibility
  const [volunteerToDelete, setVolunteerToDelete] = useState<string | null>(null); // Volunteer ID for deletion

  // Fetch potential volunteers from the database with pagination

    const fetchVolunteers = async () => {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (!baseUrl) {
          console.error('Base URL is not defined in the environment variables!');
          return;
        }
    
        try {
          const response = await fetch(
            `${baseUrl}/api/admin/potential_volunteers?page=${currentPage}&limit=${itemsPerPage}`
          );
          const data = await response.json();
          setPotentialVolunteers(data.volunteers || []);
        } catch (error) {
          console.error('Error fetching volunteers:', error);
        } finally {
          setLoading(false);
        }
      };
    
      // Fetch volunteers on mount and when currentPage or itemsPerPage changes
      useEffect(() => {
        fetchVolunteers();
      }, [currentPage, itemsPerPage]);
    
      // Function to delete a volunteer with confirmation modal
      const handleDelete = async () => {
        if (volunteerToDelete) {
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
          if (!baseUrl) {
            console.error('Base URL is not defined!');
            return;
          }
      
          try {
            const response = await fetch(`${baseUrl}/api/admin/potential_volunteers/${volunteerToDelete}`, { method: 'DELETE' });
            const data = await response.json();
            if (response.ok) {
              setPotentialVolunteers(data.volunteers || []); // Re-fetch to update the list
            } else {
              console.error('Failed to delete volunteer');
            }
          } catch (error) {
            console.error('Error deleting volunteer:', error);
          } finally {
            setIsModalOpen(false);
          }
        }
      };
      

  // Function to cancel deletion
  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setVolunteerToDelete(null);
  };

  // Function to handle search/filtering
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  // Function to handle sorting
  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  // Filter the list of potential volunteers based on the filter state
  const filteredVolunteers = potentialVolunteers
    .filter((volunteer) =>
      volunteer.name.toLowerCase().includes(filter.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(filter.toLowerCase()) ||
      volunteer.familyMembers.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'lastName') {
        // Sorting by last name
        const lastNameA = a.name.split(' ').pop()?.toLowerCase() || '';
        const lastNameB = b.name.split(' ').pop()?.toLowerCase() || '';
        return lastNameA.localeCompare(lastNameB);
      } else if (sortOption === 'createdAt') {
        // Sorting by createdAt date
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return 0; // No sorting if no option is selected
    });

  // Pagination Controls
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Convert date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // You can customize the format as needed
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter volunteers by name, email, or family members"
          value={filter}
          onChange={handleFilterChange}
          className="border p-2 w-full"
        />
      </div>

      {/* Sorting Options */}
      <div className="mb-4">
        <button
          onClick={() => handleSortChange('lastName')}
          className={`px-4 py-2 rounded ${sortOption === 'lastName' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
        >
          Sort by Last Name
        </button>
        <button
          onClick={() => handleSortChange('createdAt')}
          className={`px-4 py-2 rounded ${sortOption === 'createdAt' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
        >
          Sort by Inquiry Date
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-4 text-black">
          {filteredVolunteers.length > 0 ? (
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Email</th>
                  <th className="border border-gray-300 p-2">Family Members</th>
                  <th className="border border-gray-300 p-2">Duration</th>
                  <th className="border border-gray-300 p-2">Traveling with Family</th>
                  <th className="border border-gray-300 p-2">Date of Inquiry</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVolunteers.map((volunteer) => (
                  <tr key={volunteer.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{volunteer.name}</td>
                    <td className="border border-gray-300 p-2">{volunteer.email}</td>
                    <td className="border border-gray-300 p-2">{volunteer.familyMembers}</td>
                    <td className="border border-gray-300 p-2">{volunteer.duration}</td>
                    <td className="border border-gray-300 p-2">
                      {volunteer.travelingWithFamily ? 'Yes' : 'No'}
                    </td>
                    <td className="border border-gray-300 p-2">{formatDate(volunteer.createdAt)}</td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => {
                          setVolunteerToDelete(volunteer.id);
                          setIsModalOpen(true); // Open the modal when delete is clicked
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No volunteers found.</p>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Previous
            </button>

            <span className="font-medium">Page {currentPage}</span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={filteredVolunteers.length < itemsPerPage}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl mb-4">Are you sure you want to delete this record?</h3>
            <div className="flex space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
