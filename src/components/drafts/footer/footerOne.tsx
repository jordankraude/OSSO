import React from 'react';
import Link from 'next/link'; // Ensure you have the Link component imported for navigation

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#00AFB9] text-white py-8 w-full">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between px-4">
        {/* Left Side */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-lg font-bold">Orphanage Support Services Organization</h2>
          <p>237 North 2nd East Suite 202, Rexburg, ID, 83440, United States</p>
          <p>
            Phone: 
            <a href="tel:8012148849" className="text-blue-300 hover:underline"> 801-214-8849</a>
          </p>
          <p>
            Email: 
            <a href="mailto:info@orphanagesupport.org" className="text-blue-300 hover:underline"> info@orphanagesupport.org</a>
          </p>
        </div>

        {/* Right Side */}
        <div>
          <p className="mb-2">Tax ID: <strong>82-0507523</strong></p>
          <Link href="/501c3-paperwork">
            <button className="bg-[#00AFB9] hover:bg-white hover:text-[#00AFB9] text-white font-semibold py-2 px-4 rounded shadow transition duration-300">
              501(c)(3) Paperwork
            </button>
          </Link>
        </div>
      </div>

      {/* Legal Information */}
      <div className="mt-6 text-sm text-gray-200 text-center">
        <p>
          OSSO is an independent 501(c)(3) nonprofit organization aligned with the principles, teachings, and values of The Church of Jesus Christ of Latter-day Saints; however, OSSO is not affiliated with or endorsed by the Church. While primarily a member-created organization, volunteer opportunities are open to people of all faiths who are willing to follow OSSO&apos;s code of conduct.
        </p>
        <p>
          Photos on this website are used with permission and follow Ecuador&apos;s privacy policies for children in orphanages.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
