import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteRight } from 'react-icons/fa';

const quotes = [
  {
    id: 1,
    text: "One plastic toothbrush may not seem like much — but if you use 4 a year, that’s 300 in a lifetime. That’s 6 kilos of plastic, just from brushing your teeth. Now imagine that from every person on Earth.",
    author: "Nate Berkus",
    color: "bg-[#f8e5d8]"
  },
  {
    id: 2,
    text: "Saying no to plastic while using plastic bins let's align our actions with our intentions",
    author: "Charles Eames",
    color: "bg-[#e5f1e6]"
  },
  {
    id: 3,
    text: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
    color: "bg-[#e5e8f1]"
  }
];

const Quote = () => {
  const [activeQuote, setActiveQuote] = useState(0);

  const handleDotClick = (index) => {
    setActiveQuote(index);
  };

  return (
    <div className="w-full py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Quotes Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${activeQuote * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {quotes.map((quote) => (
                <div
                  key={quote.id}
                  className="min-w-full flex flex-col items-center justify-center px-4"
                >
                  <div className={`relative w-full max-w-3xl mx-auto ${quote.color} rounded-2xl p-8 sm:p-12`}>
                    {/* Large Quote Icon */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white rounded-full p-4 shadow-lg">
                        <FaQuoteRight className="text-4xl text-[#72442c]" />
                      </div>
                    </div>

                    {/* Quote Text */}
                    <div className="mt-8 text-center">
                      <p className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-800 mb-6">
                        {quote.text}
                      </p>
                      <p className="text-lg sm:text-xl text-gray-600 font-medium">
                        - {quote.author}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeQuote === index
                    ? 'bg-[#72442c] w-6'
                    : 'bg-gray-300 hover:bg-[#8d724a]'
                }`}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setActiveQuote((prev) => (prev > 0 ? prev - 1 : quotes.length - 1))}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg text-[#72442c] hover:bg-[#72442c] hover:text-white transition-all duration-300"
            aria-label="Previous quote"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => setActiveQuote((prev) => (prev < quotes.length - 1 ? prev + 1 : 0))}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg text-[#72442c] hover:bg-[#72442c] hover:text-white transition-all duration-300"
            aria-label="Next quote"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quote; 