'use client'

import React, { useState } from 'react';
import { FiArrowLeft, FiArrowUp, FiArrowDown, FiArrowRight, FiPlus } from 'react-icons/fi';
import LoadingSpinner from '../admin/admin-spinner';


type Paragraph = {
  id: number;
  content: string;
  image: File | null;
  imagePosition: string;
};

type Section = {
  id: number;
  subheader: string;
  paragraphs: Paragraph[];
};

const BlogPostForm: React.FC<{ fetchBlogPosts: () => void }> = ({ fetchBlogPosts }) => {
  const [title, setTitle] = useState<string>('');
  const [sections, setSections] = useState<Section[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Success state
  const [error, setError] = useState('');

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

  // Function to add a new section
  const handleAddSection = () => {
    const newSection: Section = {
      id: sections.length + 1,
      subheader: '',
      paragraphs: [{ id: 1, content: '', image: null, imagePosition: 'NULL' }],
    };
    setSections([...sections, newSection]);
  };


  // Function to add a new paragraph
  const handleAddParagraph = (sectionId: number) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const newParagraph: Paragraph = { id: section.paragraphs.length + 1, content: '', image: null, imagePosition: 'NULL' };
        return { ...section, paragraphs: [...section.paragraphs, newParagraph] };
      }
      return section;
    });
    setSections(updatedSections);
  };

  // Function to remove a paragraph
  const handleRemoveParagraph = (sectionId: number, paragraphId: number) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const filteredParagraphs = section.paragraphs.filter((paragraph) => paragraph.id !== paragraphId);
        return { ...section, paragraphs: filteredParagraphs };
      }
      return section;
    });
    setSections(updatedSections);
  };

  // Function to remove a section
  const handleRemoveSection = (sectionId: number) => {
    const updatedSections = sections.filter((section) => section.id !== sectionId);
    setSections(updatedSections);
  };

  // Function to update the image position of a paragraph
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

  // Function to handle the change in the subheader of a section
  const handleSubheaderChange = (sectionId: number, value: string) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        return { ...section, subheader: value };
      }
      return section;
    });
    setSections(updatedSections);
  };

  // Function to handle paragraph content change
  const handleParagraphContentChange = (sectionId: number, paragraphId: number, value: string) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const updatedParagraphs = section.paragraphs.map((paragraph) => {
          if (paragraph.id === paragraphId) {
            return { ...paragraph, content: value };
          }
          return paragraph;
        });
        return { ...section, paragraphs: updatedParagraphs };
      }
      return section;
    });
    setSections(updatedSections);
  };

  // Function to handle adding an image to a paragraph
  const handleAddImage = (sectionId: number, paragraphId: number, image: File) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const updatedParagraphs = section.paragraphs.map((paragraph) => {
          if (paragraph.id === paragraphId) {
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

  // Function to submit the form and send the data to the server
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    const formData = new FormData();
    formData.append('title', title);

    // Append sections and paragraphs
    formData.append('sections', JSON.stringify(sections.map(section => ({
      ...section,
      paragraphs: section.paragraphs.map(paragraph => ({
        content: paragraph.content,
        imagePosition: paragraph.imagePosition,
      })),
    }))));

    // Append images to the form data
    sections.forEach((section) => {
      section.paragraphs.forEach((paragraph) => {
        if (paragraph.image) {
          formData.append(`images[${section.id}-${paragraph.id}]`, paragraph.image);
        }
      });
    });

    // Send the form data to the API
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/blog`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      fetchBlogPosts();
      setTitle('');
      setSections([]);
      setTimeout(() => {
        setTitle('');
        setSections([]);
        setIsSuccess(true); // Set success to true
        setIsSubmitting(false);
        setTimeout(() => {
            setIsSuccess(false);
          }, 4000);
      }, 500);

      closeModal()
    } else {
      alert('Failed to create blog post');
    }
    setIsSubmitting(false);
  };
  const renderSuccessMessage = isSuccess && !isSubmitting && !error && (
    <div className="text-green-500 mb-4 -mt-10">Blog post submitted successfully!</div>
  );

  return (
    <div className="p-8 text-black">
        {renderSuccessMessage}
        <button
            onClick={toggleModal}
            className="py-2 px-6 bg-blue-500 text-white rounded-md shadow-lg"
        >
            Add Blog Post
        </button>

        {isModalOpen && (
            <>
                {/* Backdrop */}
                <div
                    id="backdrop"
                    className="fixed inset-0 bg-gray-500 bg-opacity-50 z-10"
                    onClick={closeModal}
                ></div>

                {/* Modal */}
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl fixed text-black z-50 top-20 left-1/2 transform -translate-x-1/2 overflow-auto max-h-[90vh]">
                    {isSubmitting ? (
                        <LoadingSpinner/>
                    ) : (
                        <>
                            <div className="mb-6">
                                <label className="block text-lg font-semibold text-gray-700 mb-2">Blog Post Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter blog post title"
                                />
                            </div>

                            {sections.map((section) => (
                                <div key={section.id} className="mb-10 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
                                    <label className="block text-md font-medium text-gray-700 mb-2">Subheader (optional)</label>
                                    <input
                                        type="text"
                                        value={section.subheader}
                                        onChange={(e) => handleSubheaderChange(section.id, e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    {section.paragraphs.map((paragraph) => (
                                        <div key={paragraph.id} className="mb-4 mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                            <label className="block text-md font-medium text-gray-700 mb-2">Paragraph Content (optional)</label>
                                            <textarea
                                                value={paragraph.content}
                                                onChange={(e) => handleParagraphContentChange(section.id, paragraph.id, e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                                                placeholder="Enter paragraph content"
                                            />

                                            <div className="mb-3 items-center">
                                                <input
                                                    type="file"
                                                    onChange={(e) => e.target.files && handleAddImage(section.id, paragraph.id, e.target.files[0])}
                                                    className="block w-full text-sm text-gray-600"
                                                />
                                                {paragraph.image && (
                                                    <div className="mt-3 w-full flex items-center space-x-4">
                                                        <img src={URL.createObjectURL(paragraph.image)} alt="Uploaded preview" className="block w-10 h-10 rounded shadow-sm" />
                                                        <div className="text-center">
                                                            <h4>Image Position</h4>
                                                            <div className="flex space-x-4 text-gray-600">
                                                                <div className="flex items-center">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleImagePositionUpdate(section.id, paragraph.id, 'left')}
                                                                        className={`p-1 ${paragraph.imagePosition === 'left' ? 'text-blue-500' : 'text-gray-600'}`}
                                                                    >
                                                                        <FiArrowLeft />
                                                                    </button>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleImagePositionUpdate(section.id, paragraph.id, 'above')}
                                                                        className={`p-1 ${paragraph.imagePosition === 'above' ? 'text-blue-500' : 'text-gray-600'}`}
                                                                    >
                                                                        <FiArrowUp />
                                                                    </button>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleImagePositionUpdate(section.id, paragraph.id, 'below')}
                                                                        className={`p-1 ${paragraph.imagePosition === 'below' ? 'text-blue-500' : 'text-gray-600'}`}
                                                                    >
                                                                        <FiArrowDown />
                                                                    </button>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleImagePositionUpdate(section.id, paragraph.id, 'right')}
                                                                        className={`p-1 ${paragraph.imagePosition === 'right' ? 'text-blue-500' : 'text-gray-600'}`}
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
                                                type="button"
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

                            <button
                                type="button"
                                onClick={handleAddSection}
                                className="inline-flex items-center py-2 px-3 text-white bg-blue-500 rounded-md shadow-md"
                            >
                                <FiPlus className="mr-2" />
                                Add Section
                            </button>

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={handleSubmit}
                                    className="py-2 px-6 bg-green-500 text-white rounded-md shadow-lg"
                                >
                                    Publish
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </>
        )}
    </div>
);
};

export default BlogPostForm;