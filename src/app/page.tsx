import { CarouselWithVideo } from '@/components/carousel-w-video';
import HeaderWithSession from '@/components/header-w-session';
import GetInvolvedModals from '@/components/get-involved-modals'; // Import the client-side modals
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Adjust the import based on your file structure
import Footer from '@/components/footer';

const Home = async () => {
  const session = await getServerSession(authOptions); // Fetch the session data
  console.log(session)

  return (
    <div className='w-full'>
      <HeaderWithSession session={session} /> {/* Pass the session to the header */}
      <CarouselWithVideo />

      {/* Navigation Section for Donor and Volunteer Platforms */}
      <div className="flex flex-col items-center p-6 bg-white h-96 shadow-md w-full">
        <h2 className="text-3xl font-bold mb-4 text-black my-auto">Get Involved</h2>
        <p className="text-center mb-6 text-gray-700">
          Choose how you want to contribute and make a difference.
        </p>
        <div className="flex space-x-4 my-auto">
          <GetInvolvedModals />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;
