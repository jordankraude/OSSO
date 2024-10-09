'use client';
import React from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Define the type for each card data
interface CardData {
  title: string;
  description: string;
  date: string;
  image?: string; // Optional image property
}

// Define the props for the custom arrow component
interface CustomArrowProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const EmbedVideo: React.FC<{ src: string; className?: string; style?: React.CSSProperties }> = ({ src, className, style }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
          <video
            loop
            muted
            autoplay
            playsinline
            src="${src}"
            class="${className || ''}"
            style="${style ? Object.entries(style).map(([key, value]) => `${key}: ${value};`).join(' ') : ''}"
          />
        `,
      }}
    />
  );
};

const CarouselWithVideo: React.FC = () => {
  // Sample data for the cards
  const cardData: CardData[] = [
    {
      title: "Fundraiser Event 1",
      description: "Join us for our first fundraiser event to support the community.",
      date: "March 10, 2024",
    },
    {
      title: "Blog Post 1",
      description: "Read about our latest achievements in the community.",
      date: "January 15, 2024",
    },
    {
      title: "Fundraiser Event 2",
      description: "Be part of our exciting second fundraiser event!",
      date: "April 20, 2024",
    },
    {
      title: "Blog Post 2",
      description: "Exploring the impact of our recent community initiatives.",
      date: "February 5, 2024",
    },
  ];

  // Custom arrow component
  const CustomArrow: React.FC<CustomArrowProps> = ({ direction, onClick }) => (
    <div
      className={`absolute top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 cursor-pointer text-black ease-in-out ${direction === 'left' ? 'left-2' : 'right-2'} hover:scale-125`}
      onClick={onClick}
    >
      {direction === 'left' ? '<' : '>'}
    </div>
  );

  // Slider settings
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: "linear",
    nextArrow: <CustomArrow direction="right" onClick={() => {}} />,
    prevArrow: <CustomArrow direction="left" onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Placeholder image
  const placeholderImage = "/images/placeholder.webp"; // Update with your placeholder image path

  return (
    <div className="relative w-full">
      {/* Video Background */}
      <EmbedVideo
        src="/videos/banner.mp4" // Update with your video path
        className="absolute top-0 left-0 w-full h-full object-cover -z-10" // Fill the container
        style={{ top: '-50px', height: 'calc(100% + 100px)' }} // Adjust height and position
      />

      {/* Carousel Container */}
      <div className="carousel-container my-8 px-4 relative w-5/6 mx-auto h-96 overflow-hidden">
        <Slider {...settings}>
          {cardData.map((card, index) => (
            <div className="card" key={index}>
              <div className="p-4 bg-white bg-opacity-30 shadow-lg rounded-lg transition-transform duration-300 hover:scale-105 h-[300px] flex flex-col justify-between">
                <img
                  src={card.image || placeholderImage}
                  alt={card.title}
                  className="card-image h-32 w-full object-cover rounded-t-lg"
                />
                <h3 className="card-title text-xl font-semibold mt-2 text-black">{card.title}</h3>
                <p className="card-description text-black mt-1">{card.description}</p>
                <p className="card-date text-sm text-black mt-2">{card.date}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export { CarouselWithVideo };
