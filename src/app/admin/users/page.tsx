'use client';
import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import UserForm from '@/components/forms/add-user-form';
import Spinner from '@/components/admin/admin-spinner'; // Import the Spinner component
import { profiles } from '@prisma/client';

interface ProfileFormData {
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  subscribedToNewsletter?: boolean;
  isAdmin?: boolean;
  isVolunteer?: boolean;
}


const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<profiles[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<profiles | null>(null);

  const [userToDelete, setUserToDelete] = useState<profiles | null>(null); // Track user to delete

  const usersPerPage = 10;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/profiles?page=${currentPage}&limit=${usersPerPage}`
      );
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, usersPerPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user: profiles) => {
    setCurrentUser(user);
    setIsFormOpen(true);
  };

  const confirmDeleteUser = (user: profiles) => {
    console.log('User to delete:', user); // Debug
    setUserToDelete(user);
  };
  
  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
  
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/profiles/${userToDelete.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete user');
      else {
        const result = await res.json();
        setUsers(result.users); 
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred while deleting');
    } finally {
      setLoading(false);
      setUserToDelete(null); // Clear the user to delete
    }
  };
  
  const handleCancelDelete = () => {
    setUserToDelete(null); // Cancel delete and close confirmation dialog
  };
  

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleFormSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    try {
      const response = currentUser
        ? await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/profiles/${currentUser.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
        : await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/profiles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });

      const result = await response.json();

      if (response.ok) {
        setUsers(result.users);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsFormOpen(false);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
  };

  const filteredUsers = searchTerm
    ? users.filter(user => user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    : users;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-4 text-black">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search users by email..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded-md p-2 mr-2 flex-grow"
        />
        <button
          onClick={handleAddUser}
          className="flex items-center bg-blue-600 text-white rounded-md px-4 py-2"
        >
          <FiPlus className="mr-2" />
          Add User
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && <Spinner />}

      {/* Error Message */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Users Table */}
      {!loading && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">First Name</th>
                <th className="border border-gray-300 p-2">Last Name</th>
                <th className="border border-gray-300 p-2">Volunteer</th>
                <th className="border border-gray-300 p-2">Admin</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map(user => (
                  <tr key={user.id}>
                    <td className="border border-gray-300 p-2">{user.email}</td>
                    <td className="border border-gray-300 p-2">{user.firstName || 'N/A'}</td>
                    <td className="border border-gray-300 p-2">{user.lastName || 'N/A'}</td>
                    <td className="border border-gray-300 p-2">{user.isVolunteer ? 'Yes' : 'No'}</td>
                    <td className="border border-gray-300 p-2">{user.isAdmin ? 'Yes' : 'No'}</td>
                    <td className="border border-gray-300 p-2 flex space-x-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-600 hover:underline"
                      >
                        <FiEdit />
                      </button>
                      <button onClick={() => confirmDeleteUser(user)} className="text-red-600 hover:underline">
                        <FiTrash2 />
                      </button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="border border-gray-300 p-2 text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {userToDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                <p>Are you sure you want to delete user {userToDelete.email}?</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button onClick={handleCancelDelete} className="bg-gray-300 rounded-md px-4 py-2">
                    Cancel
                  </button>
                  <button onClick={handleConfirmDelete} className="bg-red-600 text-white rounded-md px-4 py-2">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 rounded-md px-4 py-2"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-300 rounded-md px-4 py-2"
        >
          Next
        </button>
      </div>
        </div>
        
      )}



      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">{currentUser ? 'Edit User' : 'Add User'}</h2>
            <UserForm 
              initialData={{
                email: currentUser?.email || '',
                firstName: currentUser?.firstName || '',
                lastName: currentUser?.lastName || '',
                isVolunteer: currentUser?.isVolunteer || false,
                isAdmin: currentUser?.isAdmin || false,
                
              }} 
              onSubmit={handleFormSubmit} 
              onCancel={handleCancel} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
