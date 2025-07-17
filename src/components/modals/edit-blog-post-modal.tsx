'use client';

import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiArrowUp, FiArrowDown, FiArrowRight, FiPlus, FiTrash } from 'react-icons/fi';
import LoadingSpinner from '../admin/admin-spinner';

type Paragraph = {
    id: number; // local ID for managing sections
    mongoId: string | null; // MongoDB ID
    content: string;
    image: File | null;
    imagePosition: string;
  };
  
  type Section = {
    id: number; // local ID for managing sections
    mongoId: string | null; // MongoDB ID
    subheader: string;
    paragraphs: Paragraph[];
  };
  

const EditBlogModal: React.FC<{
  blogId: string;
  fetchBlogPosts: () => void;
  closeModal: () => void;
}> = ({ blogId, fetchBlogPosts, closeModal }) => {
  const [title, setTitle] = useState<string>('');
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Fetch blog data
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`/api/admin/blog/${blogId}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          
          // Map the MongoDB IDs (if available) into state
          setTitle(data.title || '');
          setSections(
            data.sections?.map((section: any) => ({
              id: section.id, // local id for managing sections
              mongoId: section.id, // MongoDB ID for the section
              subheader: section.subheader,
              paragraphs: section.paragraphs.map((paragraph: any) => ({
                id: paragraph.id, // local id for managing paragraphs
                mongoId: paragraph.id, // MongoDB ID for the paragraph
                content: paragraph.content,
                image: paragraph.image, // or map the image if needed
                imagePosition: paragraph.imagePosition,
              })),
            })) || []
          );
        } else {
          setError('Failed to load blog data.');
        }
      } catch {
        setError('An error occurred while fetching blog data.');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchBlogData();
  }, [blogId]);
  

  let counter = 1; // Starting point for the increment

  const generateIncrementingId = (): string => {
    counter = counter + 1
    let stringId = counter.toString()
    return stringId;
  };

  function generateNumericObjectId(): number {
    // 1. Generate the 4-byte timestamp (Unix time in seconds)
    const timestamp = Math.floor(Date.now() / 1000);
  
    // 2. Generate a 5-byte random number (10 digits)
    const randomValue = Math.floor(Math.random() * 10 ** 10);
  
    // 3. Generate a 3-byte counter (cycling from 0 to 999999)
    if (!generateNumericObjectId.counter) {
      generateNumericObjectId.counter = 0;
    }
    const counter = generateNumericObjectId.counter++ % 1_000_000;
  
    // Combine all parts into a large number
    // Example: timestamp (10 digits) + randomValue (10 digits) + counter (6 digits)
    const numericObjectId = parseInt(
      `${timestamp}${randomValue.toString().padStart(10, '0')}${counter.toString().padStart(6, '0')}`
    );
  
    return numericObjectId;
  }
  
  // Counter initialization
  generateNumericObjectId.counter = 0;
  

  


  const generateHexId = (): string => {
    // Create a random 24-character hexadecimal string
    return Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0') + 
           Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0') + 
           Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0') + 
           Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  };
  
  
  console.log(generateHexId());  // Example output: 675362d6d515769ac0331c0c
  
  

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        id: generateNumericObjectId(),  // Local ID for managing sections
        mongoId: generateHexId(),  // MongoDB ID is initially null for a new section
        subheader: '',
        paragraphs: [
          {
            id: generateNumericObjectId(),  // Local ID for managing paragraphs
            mongoId: generateHexId(),  // MongoDB ID is initially null for a new paragraph
            content: '',
            image: null,
            imagePosition: 'null',
          },
        ],
      },
    ]);
  };
  

  const handleRemoveSection = (sectionId: number) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const handleAddParagraph = (sectionId: number) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              paragraphs: [
                ...section.paragraphs,
                {
                  id: generateNumericObjectId(),  // Local ID for paragraphs
                  mongoId: generateHexId(),  // MongoDB ID is initially null for a new paragraph
                  content: '',
                  image: null,
                  imagePosition: 'null',
                },
              ],
            }
          : section
      )
    );
  };
  

  const handleRemoveParagraph = (sectionId: number, paragraphId: number) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              paragraphs: section.paragraphs.filter((paragraph) => paragraph.id !== paragraphId),
            }
          : section
      )
    );
  };

  const handleParagraphContentChange = (
    sectionId: number,
    paragraphId: number,
    value: string
  ) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              paragraphs: section.paragraphs.map((paragraph) =>
                paragraph.id === paragraphId ? { ...paragraph, content: value } : paragraph
              ),
            }
          : section
      )
    );
  };

  const handleImagePositionUpdate = (sectionId: number, paragraphId: number, position: string) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const updatedParagraphs = section.paragraphs.map((paragraph) => {
          if (paragraph.id === paragraphId) {
            return { ...paragraph, imagePosition: position };
          }
          return paragraph;
        });
        return { ...section, paragraphs: updatedParagraphs };
      }
      return section;
    });
    setSections(updatedSections);
  };


  const handleAddImage = (sectionId: number, paragraphId: number, image: File) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const updatedParagraphs = section.paragraphs.map((paragraph) => {
          if (paragraph.id === paragraphId) {
            // Only update the image if it's the right paragraph
            return { ...paragraph, image };
          }
          return paragraph;
        });
        return { ...section, paragraphs: updatedParagraphs };
      }
      return section;
    });
    setSections(updatedSections);
  };
  


  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
  
    try {
      const formData = new FormData();
      formData.append('title', title);  // Title of the blog post
  
      // Sections and paragraphs data
      formData.append(
        'sections',
        JSON.stringify(
          sections.map((section) => ({
            mongoId: section.mongoId, // MongoDB ID
            subheader: section.subheader,
            paragraphs: section.paragraphs.map((paragraph) => ({
              mongoId: paragraph.mongoId, // MongoDB ID
              content: paragraph.content,
              imagePosition: paragraph.imagePosition,
              // For old image, just send the image path (if it's a string)
              image: paragraph.image && typeof paragraph.image === 'string' 
                ? paragraph.image 
                : null,  // New image will be handled separately
            })),
          }))
        )
      );
  
      // Add new images to FormData (if present)
      sections.forEach((section) =>
        section.paragraphs.forEach((paragraph) => {
          if (paragraph.image && paragraph.image instanceof File) {
            // Append the new image file
            formData.append(
              `images[${section.id}-${paragraph.id}]`, 
              paragraph.image
            );
          }
        })
      );
  
      // Make the PUT request to the server with the blog ID
      const response = await fetch(`/api/admin/blog/${blogId}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (response.ok) {
        fetchBlogPosts();  // Re-fetch the blog posts after successful update
        closeModal();  // Close the modal (or handle UI state)
      } else {
        setError('Failed to update blog post.');
      }
    } catch {
      setError('An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  
  

  if (isLoading) {
    return (
      <div className="p-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto z-[100]">
      <h2 className="text-2xl font-semibold mb-4">Edit Blog Post</h2>
      <div className="mb-4">
        <label className="block font-medium mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
  
      {sections.map((section) => (
        <div key={section.id} className="mb-6 p-4 border rounded">
          <label className="block font-medium mb-2">Subheader</label>
          <input
            type="text"
            value={section.subheader}
            onChange={(e) =>
              setSections(
                sections.map((s) =>
                  s.id === section.id ? { ...s, subheader: e.target.value } : s
                )
              )
            }
            className="w-full p-2 border rounded"
          />
  
            {section.paragraphs.map((paragraph) => (
            <div key={paragraph.id} className="mt-4">
              <textarea
                value={paragraph.content}
                onChange={(e) => handleParagraphContentChange(section.id, paragraph.id, e.target.value)}
                className="w-full p-2 border rounded"
                rows={3}
                placeholder="Write your paragraph..."
              />

              {/* Image Upload Input */}
              <div className="mb-3 items-center">
                <input
                  type="file"
                  onChange={(e) =>
                    e.target.files && handleAddImage(section.id, paragraph.id, e.target.files[0])
                  }
                  className="block w-full text-sm text-gray-600"
                />
                {paragraph.image && (
                  <div className="mt-3 w-full flex items-center space-x-4">
                    <img
                      src={typeof paragraph.image === 'string' ? paragraph.image : URL.createObjectURL(paragraph.image)}  // Handle both old and new images
                      alt="Uploaded preview"
                      className="block w-10 h-10 rounded shadow-sm"
                    />
                    <div className="text-center">
                      <h4>Image Position</h4>
                      <div className="flex space-x-4 text-gray-600">
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() =>
                              handleImagePositionUpdate(section.id, paragraph.id, 'left')
                            }
                            className={`p-1 ${
                              paragraph.imagePosition === 'left'
                                ? 'text-blue-500'
                                : 'text-gray-600'
                            }`}
                          >
                            <FiArrowLeft />
                          </button>
                        </div>
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() =>
                              handleImagePositionUpdate(section.id, paragraph.id, 'above')
                            }
                            className={`p-1 ${
                              paragraph.imagePosition === 'above'
                                ? 'text-blue-500'
                                : 'text-gray-600'
                            }`}
                          >
                            <FiArrowUp />
                          </button>
                        </div>
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() =>
                              handleImagePositionUpdate(section.id, paragraph.id, 'below')
                            }
                            className={`p-1 ${
                              paragraph.imagePosition === 'below'
                                ? 'text-blue-500'
                                : 'text-gray-600'
                            }`}
                          >
                            <FiArrowDown />
                          </button>
                        </div>
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() =>
                              handleImagePositionUpdate(section.id, paragraph.id, 'right')
                            }
                            className={`p-1 ${
                              paragraph.imagePosition === 'right'
                                ? 'text-blue-500'
                                : 'text-gray-600'
                            }`}
                          >
                            <FiArrowRight />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
  
              <button
                onClick={() => handleRemoveParagraph(section.id, paragraph.id)}
                className="inline-block py-1 px-3 bg-red-500 text-white text-xs rounded-full shadow-sm mb-4"
              >
                Remove Paragraph
              </button>
            </div>
          ))}
  
          <button
            type="button"
            onClick={() => handleAddParagraph(section.id)}
            className="inline-flex items-center py-2 px-3 text-white bg-blue-500 rounded-md shadow-md mb-6 mt-4"
          >
            <FiPlus className="mr-2" />
            Add Paragraph
          </button>
          <button
            type="button"
            onClick={() => handleRemoveSection(section.id)}
            className="block items-center py-2 px-3 text-white bg-red-500 rounded-md shadow-md mb-6"
          >
            Remove Section
          </button>
        </div>
      ))}
  
      <button onClick={handleAddSection} className="text-blue-500 mb-4">
        Add Section
      </button>
  
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          onClick={closeModal}
          className="bg-gray-500 text-white py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
  
};

export default EditBlogModal;
