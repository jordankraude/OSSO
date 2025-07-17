import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Adjust the import based on your file structure
import HeaderWithSession from "@/components/header-w-session";
import Footer from '@/components/footer';

const SuccessPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
        <HeaderWithSession session={session} />
        <div className="min-h-screen bg-white flex flex-col justify-center items-center">
            <div className="text-center text-black -m-10">
                <h1 className="text-3xl font-bold mb-4 -mt-24">Message Sent Successfully!</h1>
                <p className="mb-4 text-lg mt-6">
                Thank you for reaching out. We will get back to you shortly.
                </p>
                <a
                href="/"
                className="bg-blue-500 text-white p-2 rounded transition duration-300 ease-in-out hover:bg-white hover:text-blue-500 border border-blue-500"
                >
                Return To Home
                </a>
            </div>
        </div>
        <Footer/>
    </div>
  );
};

export default SuccessPage;

