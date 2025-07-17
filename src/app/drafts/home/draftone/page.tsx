// import Image from "next/image";
// import { StickyCarousel } from "@/components/carousel";
import {RectangleCarousel} from "@/components/drafts/carousel/RectangleCarousel"
import Header from "@/components/drafts/header/headerTwo";
import Footer from "@/components/drafts/footer/footerTwo"

// import HeaderWithVideo from "@/components/header-w-video";

export default function Home() {
  return (
    <div className="">
      <Header></Header>
      {/* <StickyCarousel></StickyCarousel> */}
      <RectangleCarousel></RectangleCarousel>
      
      {/* Navigation Section for Donor and Volunteer Platforms */}
      <div className="flex flex-col items-center p-6 bg-white h-96 shadow-md w-full">
        <h2 className="text-3xl font-bold mb-4 text-[#FF4747] my-auto">Get Involved</h2>
        <p className="text-center mb-6 text-gray-700">
          Choose how you want to contribute and make a difference.
        </p>
        <div className="flex space-x-4 my-auto">
          <a 
            href="/give" // Adjust the link to your donor platform route
            className="bg-[#FF4747] text-white px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 hover:bg-white hover:text-[#F6F051] hover:scale-105 transform-gpu"
          >
            Donor Platform
          </a>
          <a 
            href="/go" // Adjust the link to your volunteer platform route
            className="bg-[#F6F051] text-white hover:text-[#FF4747] px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 hover:bg-white hover:scale-105 transform-gpu"
          >
            Volunteer Platform
          </a>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

