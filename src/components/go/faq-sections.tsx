"use client"; // This remains a client component
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface Question {
  question: string;
  answer: string;
  link?: string;
}

interface FAQSectionsProps {
  questions: Question[];
}

const FAQSections: React.FC<FAQSectionsProps> = ({ questions }) => {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    // Simulate data fetching delay
    const loadData = async () => {
      // Simulate a delay for fetching data or preparing content
      await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay
      setIsLoading(false); // Set loading to false when data is ready
    };

    loadData();
  }, []); // Empty dependency array to run once on mount

  const handleQuestionClick = (index: number) => {
    setExpandedQuestion(index === expandedQuestion ? null : index);
  };

  return (
    <div className="text-black mt-10 mb-10 w-4/5 mx-auto flex flex-col justify-center">
      {questions.map((q: Question, index: number) => (
        <div
          key={index}
          className={`faqCard bg-gray-100 rounded-lg w-full p-6 mb-4 mx-auto ${expandedQuestion === index ? 'active' : ''}`}
          onClick={() => handleQuestionClick(index)}
          role="button"
          aria-expanded={expandedQuestion === index}
          aria-controls={`faq-answer-${index}`}
        >
          <div className="card-content mx-auto w-full">
            <div className="flex items-center justify-between cursor-pointer">
              <h3 className="card-title text-lg md:text-xl mb-2">{q.question}</h3>
              {!isLoading && (
                <FontAwesomeIcon
                  icon={expandedQuestion === index ? faChevronUp : faChevronDown}
                  className="fa-lg text-black"
                />
              )}
            </div>
            {expandedQuestion === index && (
              <div className="mt-2">
                <p id={`faq-answer-${index}`} className="card-text text-md md:text-lg">
                  {q.answer}
                </p>
                {q.link && (
                  <a
                    href={q.link}
                    className="text-blue-500 underline mt-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    More Information
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQSections;
