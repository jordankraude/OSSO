// src/app/about/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Adjust the import based on your file structure
import HeaderWithSession from "@/components/header-w-session";
import Footer from '@/components/footer';

export default async function AboutPage() {
  // Fetch the session on the server side
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <HeaderWithSession session={session} />

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Section 1: Title and Call to Action */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">A Legacy of Love</h1>
          <a 
            href="/annual-report" 
            className="text-blue-600 font-semibold underline hover:text-blue-800"
          >
            Read Annual Report
          </a>
        </div>

        {/* Section 2: About OSSO */}
        <div className="max-w-4xl mx-auto space-y-8 text-gray-700 leading-relaxed">
          <p className="text-lg">
            Orphanage Support Services Organization (OSSO) is a Utah-based nonprofit organization founded by Rex Head, MD in 1999. We currently support eight orphanages in Ecuador year-round with volunteers and monetary donations.
          </p>

          <p className="text-lg">
            After adopting two healthy little girls and a young boy with cerebral palsy, Rex and his wife, Melodie, wanted to do more to help children without parents. They visited and gave assistance to orphanages in several countries, but when visiting a girls’ orphanage in Cuenca, Ecuador, Rex had the feeling that somehow these girls were different. “It was like they were my own children,” Rex describes. The Heads returned to Ecuador several times as a family and later, with a group of volunteers from Ricks College (now known as Brigham Young University - Idaho).
          </p>

          <p className="text-lg">
            In 1999, Rex formed a nonprofit organization that began sending groups of volunteers to serve continually in the orphanages, an organization now known as Orphanage Support Services Organization (OSSO).
          </p>

          {/* Section 3: Impact Statistics */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Impact</h2>
            <p className="text-lg">
              Since our founding in 1999, we have helped support 30 different orphanages. We have sent over 5,000 volunteers internationally to give nearly 1.5 million hours of face-to-face service in orphanages and millions of dollars in financial support. Most of our support has been to orphanages in Ecuador, but we have also supported orphanages in Thailand, China, Uganda, Vietnam, Peru, and Mexico.
            </p>
            <p className="text-lg">
              When you volunteer with OSSO or become a donor, you change a life—often a child's but always your own.
            </p>
          </div>

          {/* Section 4: Mission Statement */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
            <p className="text-lg">
              OSSO's mission is to provide love and care to children deprived of parental care and to change the lives of the volunteers who love and care for them.
            </p>
          </div>

          {/* Section 5: Core Beliefs */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Our Core Beliefs</h2>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li>OSSO believes children are the world's most valuable assets and their future should be our top priority.</li>
              <li>The greatest treasure is to love and be loved.</li>
              <li>
                Caring for children is a sacred right, privilege, and responsibility that rests first with families, then communities, and governments. When these institutions cannot or will not care for them, it becomes the responsibility of good people and organizations everywhere to do so.
              </li>
              <li>
                OSSO’s volunteers, donors, and the children we serve are family. You never graduate from the OSSO family. Your role may change, but you still belong.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
