'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StickyCarousel = () => {
  // Sample data for the cards
  const cardData = [
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
    // Add more cards as needed
  ];

  // Custom arrow component
  const CustomArrow = ({ direction, onClick }) => (
    <div
      className={`absolute top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 cursor-pointer text-black ${direction === 'left' ? 'left-4' : 'right-4'}`}
      onClick={onClick}
    >
      {direction === 'left' ? '<' : '>'} {/* You can replace this with an actual icon */}
    </div>
  );

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: "linear",
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
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
    <div className="carousel-container my-8 px-4 relative w-5/6 mx-auto overflow-hidden"> {/* Added overflow-hidden */}
      <Slider {...settings}>
        {cardData.map((card, index) => (
          <div className="card" key={index}>
            <div className="p-4 bg-white shadow-lg rounded-lg transition-transform duration-300 hover:scale-105 h-[300px] flex flex-col justify-between">
              <img 
                src={card.image || placeholderImage} 
                alt={card.title} 
                className="card-image h-32 w-full object-cover rounded-t-lg" 
              />
              <h3 className="card-title text-xl font-semibold mt-2">{card.title}</h3>
              <p className="card-description text-gray-700 mt-1">{card.description}</p>
              <p className="card-date text-sm text-gray-500 mt-2">{card.date}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export { StickyCarousel };
