// src/app/contact/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Adjust the import based on your file structure
import HeaderWithSession from "@/components/header-w-session";
import ContactForm from "@/components/forms/contact-form"; // Import the ContactForm component
import Footer from '@/components/footer';

export default async function ContactPage() {
  // Fetch the session on the server side
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-white">
      <HeaderWithSession session={session} /> {/* Pass the session to the header */}
      <h1 className="text-3xl text-center font-bold m-4 text-black">Contact Us</h1>
      <div className="p-2 mx-4 text-black pb-10">
        <ContactForm /> {/* Render the client-side ContactForm */}
      </div>
      <Footer/>
    </div>
  );
}
