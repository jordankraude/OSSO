'use client'

import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import BlogPostForm from '@/components/forms/blog-post-form';
import EditBlogModal from '@/components/modals/edit-blog-post-modal';
import LoadingSpinner from '@/components/admin/admin-spinner';

type BlogPost = {
  id: string;
  title: string;
  description: string;
  createdAt: string; // Ensure `createdAt` is included in the data
};

const BlogPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredBlogPosts, setFilteredBlogPosts] = useState<BlogPost[]>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [sortType, setSortType] = useState<string>(''); // New state for sorting
  const [isLoading, setIsLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  // Fetch blog posts from the database
  const fetchBlogPosts = async () => {
    setIsLoading(true);
    const response = await fetch('/api/admin/blog'); // API route to get all blog posts
    const data = await response.json();
    setBlogPosts(data);
    setFilteredBlogPosts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Handle filtering blog posts by title
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
    const filtered = blogPosts.filter((post) =>
      post.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredBlogPosts(filtered);
  };

  // Handle sorting blog posts
  const handleSortChange = (sortOption: string) => {
    setSortType(sortOption);

    const sortedPosts = [...filteredBlogPosts];
    if (sortOption === 'title') {
      sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'date') {
      sortedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    setFilteredBlogPosts(sortedPosts);
  };

  // Handle delete action for a blog post
  const handleDelete = async (id: string) => {
    setIsLoading(true);
    const response = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });

    if (response.ok) {
      fetchBlogPosts();
    } else {
      console.error('Failed to delete blog post');
      setIsLoading(false);
    }
  };

  // Open the edit modal for a specific blog post
  const openEditModal = (id: string) => {
    setSelectedBlogId(id);
    setEditModalOpen(true);
  };

  return (
    <div className="p-8 text-black">
      <div className="flex justify-between mb-6 items-center">
        <div className="flex items-center">
          <BlogPostForm fetchBlogPosts={fetchBlogPosts} />
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="filter"
            type="text"
            value={filterText}
            onChange={handleFilterChange}
            placeholder="Search by title"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none"
          />
          <select
            value={sortType}
            onChange={(e) => handleSortChange(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="">Sort by</option>
            <option value="title">Title</option>
            <option value="date">Date Created</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogPosts.map((blog) => (
            <div key={blog.id} className="p-4 rounded-lg shadow-lg bg-white">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-gray-600 mt-2">{blog.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex space-x-4">
                  <button
                    onClick={() => openEditModal(blog.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editModalOpen && selectedBlogId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dark overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setEditModalOpen(false)} // Close modal when clicking on the backdrop
          ></div>

          {/* Modal content */}
          <div className="relative z-10 bg-white max-w-2xl w-full h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg">
            <EditBlogModal
              blogId={selectedBlogId}
              fetchBlogPosts={fetchBlogPosts}
              closeModal={() => setEditModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
