import React, { useState } from 'react';
import Zoom from 'react-reveal/Zoom';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Environmental Activist',
    quote: "One plastic toothbrush may not seem like much — but if you use 4 a year, that's 300 in a lifetime. That's 6 kilos of plastic, just from brushing your teeth. Now imagine that from every person on Earth."
  },
  {
    name: 'Michael Chen',
    role: 'Sustainability Expert',
    quote: "Saying no to plastic while using plastic bins let's align our actions with our intentions"
  },
  {
    name: 'Emma Wilson',
    role: 'Green Living Advocate',
    quote: "Every small step towards sustainability counts. It's not about being perfect, it's about making conscious choices."
  },
  {
    name: 'David Miller',
    role: 'Eco-friendly Designer',
    quote: 'The beauty of sustainable living lies in its simplicity and the positive impact it has on our planet.'
  },
  {
    name: 'Lisa Thompson',
    role: 'Environmental Educator',
    quote: "When we choose eco-friendly products, we're not just buying items - we're investing in our planet's future."
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % Math.ceil(testimonials.length / 3)
    );
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3)
    );
  };

  const currentTestimonials = testimonials.slice(currentIndex * 3, currentIndex * 3 + 3);

  return (
    <div className="py-16 px-8 bg-gradient-to-b from-[#f8f5f1] to-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-lg uppercase text-[#72442c] tracking-wider font-medium">What People Say</h2>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Customer Stories</h1>
          <div className="mt-3 w-24 h-1 bg-[#72442c] mx-auto rounded-full"></div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button
            onClick={handlePrevious}
            className="bg-[#72442c] hover:bg-[#8d724a] text-white p-3 rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#72442c] focus:ring-opacity-50"
            aria-label="Previous testimonials"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-6 max-w-6xl">
            {currentTestimonials.map((testimonial, index) => (
              <Zoom key={index}>
                <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-[#72442c] mb-4">
                    <FaQuoteLeft size={32} />
                  </div>
                  <blockquote className="text-gray-700 text-lg mb-6 min-h-[120px]">
                    {testimonial.quote}
                  </blockquote>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-[#72442c] text-lg">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </Zoom>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="bg-[#72442c] hover:bg-[#8d724a] text-white p-3 rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#72442c] focus:ring-opacity-50"
            aria-label="Next testimonials"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
