import React from 'react';
import FloatingVolunteerButton from '@/components/buttons/floating-volunteer-button';

export default function PricingPage() {
  return (
    <div className="bg-gray-50 min-h-screen p-8 text-black">

      <h1 className="text-3xl font-bold mb-8 text-center">Volunteer Program Costs</h1>
      <p className="mb-4 text-center">
        Looking for an affordable volunteer abroad program? You’ve found it! OSSO is a top-rated nonprofit that has been providing volunteer abroad opportunities in Ecuador for over 25 years!
      </p>
      <p className="mb-8 text-center">
        OSSO offers a range of volunteer abroad opportunities at unbeatable prices. Explore our different program options below to discover which is the best fit for you!
      </p>

      {/* Semester Abroad Program */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Semester Abroad Program</h2>
        <h3 className="font-semibold mt-6">Volunteer Donation Fees</h3>
        <p>The semester abroad donation fee is <strong>$3,120 USD</strong>.</p>
        <div className="flex justify-between mt-4">
        <div className="flex flex-wrap -mx-4">
        <div className="w-full sm:w-1/2 px-4 mb-4">
            <div className="bg-white shadow-md rounded-lg p-6 h-72">
            <h4 className="underline font-semibold">Includes</h4>
            <ul className="list-disc pl-6">
              <li>✅ Airport pick-up</li>
              <li>✅ Housing</li>
              <li>✅ WiFi</li>
              <li>✅ Clean water</li>
              <li>✅ Fully stocked kitchen and weekly groceries</li>
              <li>✅ Weekly travel activities (planned by OSSO)</li>
              <li>✅ 24/7 in-country support by Volunteer Directors</li>
              <li>✅ Pre-departure and in-country training</li>
            </ul>
            </div>
          </div>
          <div className="w-full sm:w-1/2 px-4 mb-4">
          <div className="bg-white shadow-md rounded-lg p-6 h-72">
            <h4 className="underline font-semibold">Excludes</h4>
            <ul className="list-disc pl-6">
              <li>
                <span className="text-red-600 mr-2">❌</span> Registration fee of $95 USD (covers background check and holds volunteer spot)
              </li>
              <li>
                <span className="text-red-600 mr-2">❌</span> Flights
              </li>
              <li>
                <span className="text-red-600 mr-2">❌</span> Passport
              </li>
              <li>
                <span className="text-red-600 mr-2">❌</span> Travel insurance
              </li>
              <li>
                <span className="text-red-600 mr-2">❌</span> Personal spending (souvenirs, restaurants, shopping, etc.)
              </li>
              <li>
                <span className="text-red-600 mr-2">❌</span> Visa (Stays beyond 90 days will require a visa)
              </li>
            </ul>
          </div>
          </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
            <a 
                href="/go/semester-abroad" 
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow-md hover:bg-white hover:text-blue-500 transition duration-300"
            >
                Click Here For More Details
            </a>
        </div>
    </section>

      {/* Short Term Program */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Short Term Program</h2>
        <h3 className="font-semibold mt-6">Volunteer Donation Fees</h3>
        <p>The short-term volunteer donation fee is <strong>$1,250 USD</strong> for 2 weeks.</p>

        {/* Includes and Excludes Section */}
        <div className="flex justify-between mt-4">
        <div className="flex flex-wrap -mx-4">
        <div className="w-full sm:w-1/2 px-4 mb-4">
            <div className="bg-white shadow-md rounded-lg p-6 h-72">
            <h4 className="underline font-semibold">Includes</h4>
            <ul className="list-disc pl-6">
              <li>✅ Airport pick-up</li>
              <li>✅ Housing</li>
              <li>✅ WiFi</li>
              <li>✅ Clean water</li>
              <li>✅ Fully stocked kitchen and weekly groceries</li>
              <li>✅ Weekly travel activities (planned by OSSO)</li>
              <li>✅ 24/7 in-country support by Volunteer Directors</li>
            </ul>
            </div>
          </div>
          
          <div className="w-full sm:w-1/2 px-4 mb-4">
            <div className="bg-white shadow-md rounded-lg p-6 h-72">
            <h4 className="underline font-semibold">Excludes</h4>
            <ul className="list-disc pl-6">
              <li>
                <span className="text-red-600 mr-2">❌</span> Registration fee of $95 USD (covers background check and holds volunteer spot)
              </li>
              <li>
                <span className="text-red-600 mr-2">❌</span> Flights
              </li>
              <li>
                <span className="text-red-600 mr-2">❌</span> Passport
              </li>
              <li>
                <span className="text-red-600 mr-2">❌</span> Travel insurance
              </li>
              <li>
                <span className="text-red-600 mr-2">❌</span> Personal spending (souvenirs, restaurants, shopping, etc.)
              </li>
              <li>
                <span className="text-red-600 mr-2">❌</span> Visa (Stays beyond 90 days will require a visa)
              </li>
            </ul>
            </div>
          </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
            <a 
                href="/go/st-individual" 
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow-md hover:bg-white hover:text-blue-500 transition duration-300"
            >
                Click Here For More Details
            </a>
        </div>
      </section>
            {/* Family Program */}
            <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Family Program</h2>
        <h3 className="font-semibold mt-6">Volunteer Donation Fees</h3>
        <p>The family volunteer donation fee is <strong>$2,500 USD</strong> for two weeks.</p>
        <div className="flex justify-between mt-4">
        <div className="flex flex-wrap -mx-4">
        <div className="w-full sm:w-1/2 px-4 mb-4">
            <div className="bg-white shadow-md rounded-lg p-6 h-72">
            <h4 className="underline font-semibold">Includes</h4>
            <ul className="list-disc pl-6">
              <li>✅ Airport pick-up</li>
              <li>✅ Family-friendly housing</li>
              <li>✅ WiFi</li>
              <li>✅ Clean water</li>
              <li>✅ Fully stocked kitchen and weekly groceries</li>
              <li>✅ Weekly travel activities (planned by OSSO)</li>
              <li>✅ 24/7 in-country support by Volunteer Directors</li>
              <li>✅ Pre-departure and in-country training</li>
            </ul>
          </div>
          </div>
          <div className="w-full sm:w-1/2 px-4 mb-4">
            <div className="bg-white shadow-md rounded-lg p-6 h-72">
            <h4 className="underline font-semibold">Excludes</h4>
            <ul className="list-disc pl-6">
              <li>
                <span className="text-red-600 mr-2">❌</span> Registration fee of $95 USD (covers background check and holds volunteer spot)
              </li>
              <li>
                <span className="text-red-600 mr-2">❌</span> Flights
              </li>
              <li>
                <span className="text-red-600 mr-2">❌</span> Passport
              </li>
              <li>
                <span className="text-red-600 mr-2">❌</span> Travel insurance
              </li>
              <li>
                <span className="text-red-600 mr-2">❌</span> Personal spending (souvenirs, restaurants, shopping, etc.)
              </li>
              <li>
                <span className="text-red-600 mr-2">❌</span> Visa (Stays beyond 90 days will require a visa)
              </li>
            </ul>
          </div>
          </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
            <a 
                href="/go/family" 
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow-md hover:bg-white hover:text-blue-500 transition duration-300"
            >
                Click Here For More Details
            </a>
        </div>
      </section>

      {/* Corporate Program */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Corporate Program</h2>
        <h3 className="font-semibold mt-6">Volunteer Donation Fees</h3>
        <p>The corporate volunteer donation fee is <strong>$1,000 USD per participant</strong> for one week.</p>
        <div className="flex justify-between mt-4">
        <div className="flex flex-wrap -mx-4">
        {/* Includes Card */}
        <div className="w-full sm:w-1/2 px-4 mb-4">
            <div className="bg-white shadow-md rounded-lg p-6 h-72">
            <h4 className="underline font-semibold">Includes</h4>
            <ul className="list-disc pl-6">
                <li>✅ Airport pick-up</li>
                <li>✅ Housing</li>
                <li>✅ WiFi</li>
                <li>✅ Clean water</li>
                <li>✅ Fully stocked kitchen and weekly groceries</li>
                <li>✅ Team-building activities (planned by OSSO)</li>
                <li>✅ 24/7 in-country support by Volunteer Directors</li>
                <li>✅ Pre-departure and in-country training</li>
            </ul>
            </div>
        </div>

        {/* Excludes Card */}
        <div className="w-full sm:w-1/2 px-4 mb-4">
            <div className="bg-white shadow-md rounded-lg p-6 h-72">
            <h4 className="underline font-semibold">Excludes</h4>
            <ul className="list-disc pl-6">
                <li>
                <span className="text-red-600 mr-2">❌</span> Registration fee of $95 USD (covers background check and holds volunteer spot)
                </li>
                <li>
                <span className="text-red-600 mr-2">❌</span> Flights
                </li>
                <li>
                <span className="text-red-600 mr-2">❌</span> Passport
                </li>
                <li>
                <span className="text-red-600 mr-2">❌</span> Travel insurance
                </li>
                <li>
                <span className="text-red-600 mr-2">❌</span> Personal spending (souvenirs, restaurants, shopping, etc.)
                </li>
                <li>
                <span className="text-red-600 mr-2">❌</span> Visa (Stays beyond 90 days will require a visa)
                </li>
            </ul>
            </div>
        </div>
        </div>

        </div>
        <div className="flex justify-center mt-4">
            <a 
                href="/go/corporate" 
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow-md hover:bg-white hover:text-blue-500 transition duration-300"
            >
                Click Here For More Details
            </a>
        </div>

      </section>
      <FloatingVolunteerButton/>

    </div>
  );
}
