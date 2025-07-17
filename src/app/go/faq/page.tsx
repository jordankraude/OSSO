// src/app/faq/page.tsx (Next.js 13+ structure)
import FAQSections from '@/components/go/faq-sections';
import FloatingVolunteerButton from '@/components/buttons/floating-volunteer-button';

const questions = [
  {
    question: "What is the cost of the volunteer program?",
    answer: "Include details about registration fees, living expenses, and any other financial considerations.", // Add your answer here
  },
  {
    question: "How long can I volunteer?",
    answer: "Clarify the duration of different programs (short-term, semester abroad, etc.).", // Add your answer here
  },
  {
    question: "What does a typical day look like for a volunteer?",
    answer: "Describe daily responsibilities and routines.", // Add your answer here
  },
  {
    question: "Where will I be volunteering in Ecuador?",
    answer: "Provide specifics on locations and the types of projects available.", // Add your answer here
  },
  {
    question: "What is the living situation like?",
    answer: "Explain housing arrangements, amenities, and conditions.", // Add your answer here
  },
  {
    question: "Do I need to speak Spanish to volunteer?",
    answer: "Address language requirements and support for non-Spanish speakers.", // Add your answer here
  },
  {
    question: "What safety measures are in place for volunteers?",
    answer: "Outline the safety protocols and support available.", // Add your answer here
  },
  {
    question: "What kind of training will I receive before volunteering?",
    answer: "Detail pre-departure and in-country training.", // Add your answer here
  },
  {
    question: "What if I have an emergency while volunteering?",
    answer: "Explain the procedures for handling emergencies.", // Add your answer here
  },
  {
    question: "How can I help if I can’t travel?",
    answer: "Suggest remote opportunities or other ways to support the organization.", // Add your answer here
  },
  {
    question: "Are there opportunities for families or groups to volunteer together?",
    answer: "Clarify policies regarding family and group participation.", // Add your answer here
  },
  {
    question: "What is the application process like?",
    answer: "Provide an overview of how to apply, including timelines.", // Add your answer here
  },
  {
    question: "What are the expected outcomes of the program?",
    answer: "Discuss the impact on both volunteers and the communities served.", // Add your answer here
  },
  {
    question: "Is there potential for future careers with the organization?",
    answer: "Share information on career opportunities and paths after volunteering.", // Add your answer here
  },
];

const FAQPage = () => {
  return (
    <div className='bg-white pb-10'>
      <h1 className="text-center text-3xl mb-6 pt-10 text-black" >Frequently Asked Questions</h1>
      <FAQSections questions={questions} />
      <div className='w-2/3 mx-auto text-black'>
        <h1 className='text-center text-2xl p-4'>Not Seeing Your Question?</h1>
        <h3 className='text-center'>Feel free to reach out to us at our contact page!</h3>
        <a href="/contact">
          <div className="bg-blue-500 w-1/3 text-white text-center rounded-2xl px-6 mx-auto my-2 py-3 cursor-pointer shadow-lg hover:bg-blue-600 transition-colors">
            
          Contact Us
          </div>
        </a>
      </div>
      <FloatingVolunteerButton/>
    </div>
  );
};

export default FAQPage;
