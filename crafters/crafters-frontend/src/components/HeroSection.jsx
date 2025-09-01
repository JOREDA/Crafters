import React, { useState, useEffect } from "react";
import bg3 from "../assets/slider1.jpg";
import bg2 from "../assets/slider2.jpg";
import bg1 from "../assets/slider3.jpg";

const slides = [
  {
    id: 1,
    image: bg1,
    title: "Authentic Handicrafts for Every Home",
    description: "Discover unique handmade treasures crafted with love.",
    buttonText: "Shop Now",
    link: "/shop",
  },
  {
    id: 2,
    image: bg2,
    title: "Beautiful Crafts from Local Artisans",
    description: "Support sustainable and ethical craftsmanship.",
    buttonText: "Explore Now",
    link: "/shop",
  },
  {
    id: 3,
    image: bg3,
    title: "Handmade Gifts for Every Occasion",
    description: "Make your loved ones feel special with handcrafted gifts.",
    buttonText: "Gift Now",
    link: "/shop",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-[75vh] md:h-screen overflow-hidden">
      {/* Slide */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-[75vh] md:h-full object-cover"
          />
          <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-3xl md:text-6xl font-bold mb-4">
              {slide.title}
            </h1>
            <p className="text-base md:text-xl mb-6">{slide.description}</p>
            <a
              href={slide.link}
              className="inline-block bg-[#72442c] hover:bg-[#cd8e6c] text-white font-semibold py-3 px-6 rounded transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {slide.buttonText}
            </a>
          </div>
        </div>
      ))}

      {/* Arrows */}
    {/* Arrows */}
<button
  onClick={handlePrev}
  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full z-20"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
</button>

<button
  onClick={handleNext}
  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full z-20"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
</button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-yellow-500" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
