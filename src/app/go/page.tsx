import VolunteerModalWrapper from "@/components/modals/volunteer-model-wrapper";
import FloatingVolunteerButton from "@/components/buttons/floating-volunteer-button";

export default function Go() {
  return (
    <div className="bg-gray-50 min-h-screen text-black">
      {/* Hero Section */}
      <section className="text-blue-800 text-center py-20">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4">What you can expect</h1>
          <p className="text-lg">Make a difference in the lives of orphans and experience the beauty of Ecuador.</p>
        </div>
      </section>

      {/* Image/Photo Placeholder */}
      <section className="container mx-auto py-12">
        <div className="bg-gray-200 h-80 flex justify-center items-center">
          <p className="text-gray-500 text-xl">[Photo Placeholder: Volunteers Working with Children]</p>
        </div>
      </section>

      {/* Volunteer Selection Section */}
      <section className="container mx-auto py-12 px-10">
        <h2 className="text-3xl font-bold text-center mb-8">Choose Your Volunteering Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Semester Abroad Card */}
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-4">Semester Abroad</h3>
            <p className="text-gray-700 mb-4">
              Spend your semester volunteering and making a meaningful impact while exploring Ecuador.
            </p>
            <a href="/go/semester-abroad" className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition">
              Learn More
            </a>
          </div>

          {/* Short Term Volunteer Card */}
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-4">Short Term Volunteer</h3>
            <p className="text-gray-700 mb-4">
              Volunteer for a shorter period while still making a significant impact in the lives of children.
            </p>
            <a href="/go/st-volunteer" className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition">
              Learn More
            </a>
          </div>

          {/* Family Volunteer Card */}
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-4">Family Volunteer</h3>
            <p className="text-gray-700 mb-4">
              Bring your family together for an unforgettable volunteering experience in Ecuador.
            </p>
            <a href="/go/family" className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="container mx-auto py-12 px-10">
        <h2 className="text-3xl font-bold text-center mb-6">Your Experience as a Volunteer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Experience Cards */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Support Orphanages</h3>
            <p className="text-gray-700">
              Work hands-on with children, assisting with day-to-day tasks and providing care, guidance, and love.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Explore Ecuador</h3>
            <p className="text-gray-700">
              Immerse yourself in the culture of Ecuador, from the Amazon rainforest to the Andean mountains.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Build Lifelong Connections</h3>
            <p className="text-gray-700">
              Connect with fellow volunteers and the local community, building relationships that will last a lifetime.
            </p>
          </div>
        </div>
      </section>
      <FloatingVolunteerButton/>

      {/* Call-to-Action Section */}
      <section className="bg-blue-500 text-white py-16 z-0 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Ready to Make an Impact?</h2>
          <p className="text-lg mb-8 text-center">Join us in Ecuador and make a real difference in the lives of children.</p>
          <VolunteerModalWrapper/>
        </div>
      </section>
    </div>
  );
}
