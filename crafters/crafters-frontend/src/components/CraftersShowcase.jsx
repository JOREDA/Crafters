import React from "react";
import trending from "../assets/card1.jpg";
import arrival from "../assets/card2.jpg";
import best from "../assets/card3.jpg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const showcaseData = [
  {
    title: "Trending",
    description: "Explore what's hot and loved by all this season.",
    image: trending,
    link: "/trending"
  },
  {
    title: "New Arrivals",
    description: "Freshly crafted styles just dropped for you.",
    image: arrival,
    link: "/new-arrivals"
  },
  {
    title: "BestSellers",
    description: "Tried, tested, and loved—our best picks for you.",
    image: best,
    link: "/bestsellers"
  },
];

const CraftersShowcase = () => {
  const navigate = useNavigate();

  const handleShopNow = (link) => {
    navigate(link);
  };

  return (
    <section className="py-8 sm:py-10 md:py-14 px-3 sm:px-4 max-w-7xl mx-auto">
      <div className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x md:flex-nowrap flex-nowrap scroll-smooth scrollbar-hide pb-4 md:pb-0">
        {showcaseData.map((item, index) => (
          <motion.div
            key={index}
            className="relative group min-w-[85%] sm:min-w-[70%] md:min-w-[400px] md:flex-1 h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden snap-start cursor-pointer rounded-lg md:rounded-xl"
            onClick={() => handleShopNow(item.link)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2.0, delay: index * 0.2, ease: "easeOut" }}
          >
            {/* Image with overlay gradient */}
            <div className="absolute inset-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/60 opacity-90 md:opacity-80 md:group-hover:opacity-90 transition-opacity duration-300"></div>
            </div>

            {/* Content Container */}
            <div className="absolute inset-x-0 top-0 p-4 sm:p-6 md:p-8 text-white">
              <div className="overflow-hidden">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 relative
                  md:transform md:group-hover:translate-y-0 md:transition-transform md:duration-500">
                  {item.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base md:text-lg 
                md:opacity-0 md:group-hover:opacity-100 
                md:transform md:translate-y-2 md:group-hover:translate-y-0 
                md:transition-all md:duration-500 md:delay-100 
                line-clamp-2 sm:line-clamp-none">
                {item.description}
              </p>

              <button 
                className="mt-3 sm:mt-4 md:mt-6 px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 
                  bg-[#72442c] text-white text-sm sm:text-base rounded-full
                  md:transform md:opacity-0 md:group-hover:opacity-100 
                  md:translate-y-4 md:group-hover:translate-y-0 
                  md:transition-all md:duration-500 md:delay-200 
                  hover:bg-[#8d724a] hover:scale-105 active:scale-95"
              >
                Shop Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CraftersShowcase;
