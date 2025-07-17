// src/app/success/page.tsx
import HeaderWithSession from '@/components/header-w-session';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Footer from '@/components/footer';

const Success = async () => {
  const Session = await getServerSession(authOptions); // Fetch the session data
  return (
    <div className='min-h-screen h-full'>
      <HeaderWithSession session={Session}/>
      <main className="flex-grow flex flex-col items-center justify-center p-6 min-h-[75vh] bg-white">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700 mb-8">
          Your donation was successful! We truly appreciate your support.
        </p>
        <p className="text-md text-gray-600">
          Together, we're making a difference in the community.
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default Success
