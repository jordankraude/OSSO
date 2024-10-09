// import Image from "next/image";
// import { StickyCarousel } from "@/components/carousel";
import { CarouselWithVideo } from "@/components/carousel-w-video";
import Header from "@/components/header";
// import HeaderWithVideo from "@/components/header-w-video";

export default function Home() {
  return (
    <div className="">
      <Header></Header>
      {/* <StickyCarousel></StickyCarousel> */}
      <CarouselWithVideo></CarouselWithVideo>
      
      {/* Navigation Section for Donor and Volunteer Platforms */}
      <div className="flex flex-col items-center p-6 bg-white h-96 shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-black my-auto">Get Involved</h2>
        <p className="text-center mb-6 text-gray-700">
          Choose how you want to contribute and make a difference in our community.
        </p>
        <div className="flex space-x-4 my-auto">
          <a 
            href="/donor-platform" // Adjust the link to your donor platform route
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 hover:bg-white hover:text-blue-500 hover:scale-105 transform-gpu"
          >
            Donor Platform
          </a>
          <a 
            href="/volunteer-platform" // Adjust the link to your volunteer platform route
            className="bg-blue-800 text-white px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 hover:bg-white hover:text-blue-800 hover:scale-105 transform-gpu"
          >
            Volunteer Platform
          </a>
        </div>
      </div>
    </div>
  );
}

