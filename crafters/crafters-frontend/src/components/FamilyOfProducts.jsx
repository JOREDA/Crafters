import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from "react-router-dom";
import storageBox from "../assets/storage_box.jpeg.jpg";
import lampshade from "../assets/lampshade.jpeg.jpg";
import laundryBin from "../assets/product_no_11.jpg";
import homeDecor from "../assets/homedecor.jpeg.jpg";
import flowerVase from "../assets/flowervase.jpeg.jpg";
import essentials from "../assets/essentials.jpeg.jpg";

const products = [
  { name: 'Storage Box', imageUrl: storageBox, link: '/product/storage/box' },
  { name: 'Laundry Bin', imageUrl: laundryBin, link: '/product/laundry/bin' },
  { name: 'Lamps Shade', imageUrl: lampshade, link: '/product/lamps/shade' },
  { name: 'Home Decor', imageUrl: homeDecor, link: '/product/home/decor' },
  { name: 'Flower Vase', imageUrl: flowerVase, link: '/product/flower/vase' },
  { name: 'Essentials', imageUrl: essentials, link: '/product/essential' },
];

const FamilyOfProducts = () => {
  const maxSlidesPerView = 5;
  const loopEnabled = products.length > maxSlidesPerView;

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // State to hold navigation elements after refs are assigned
  const [navPrev, setNavPrev] = useState(null);
  const [navNext, setNavNext] = useState(null);

  // After first render, set the navigation refs to state
  useEffect(() => {
    setNavPrev(prevRef.current);
    setNavNext(nextRef.current);
  }, []);

  return (
    <div className="py-10 bg-[#e5d0b1] mt-5 relative">
      <div className="container mx-auto px-5">
        {/* Titles */}
        <div className="text-center mb-8">
          <h2 className="text-gray-800 text-lg uppercase tracking-wider">Our Collection</h2>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Family of Products</h1>
          <div className="mt-3 w-20 h-1 bg-gray-800 mx-auto rounded-full"></div>
        </div>

        {/* Manual Arrows */}
        <div
          className="absolute top-1/2 -left-2 md:left-5 z-20 -translate-y-1/2 cursor-pointer"
          ref={prevRef}
        >
          <button className="text-[#72442c] bg-white p-2 md:p-3 rounded-full shadow-lg hover:bg-[#72442c] hover:text-white transition-all duration-300">
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <div
          className="absolute top-1/2 -right-2 md:right-5 z-20 -translate-y-1/2 cursor-pointer"
          ref={nextRef}
        >
          <button className="text-[#72442c] bg-white p-2 md:p-3 rounded-full shadow-lg hover:bg-[#72442c] hover:text-white transition-all duration-300">
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          loop={loopEnabled}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: navPrev,
            nextEl: navNext,
          }}
          onBeforeInit={(swiper) => {
            // Fix to assign navigation elements dynamically
            swiper.params.navigation.prevEl = navPrev;
            swiper.params.navigation.nextEl = navNext;
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {products.map((category, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: false }}
                className="flex flex-col items-center justify-center transition-all duration-300 hover:scale-105">
                  <div className="relative w-28 h-28 md:w-40 md:h-40 xl:w-44 xl:h-44 rounded-full overflow-hidden bg-white text-[#72442c]">
                    <Link to={category.link}>
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="object-cover w-full h-full"
                      />
                    </Link>
                  </div>
                  <p className="mt-4 text-sm text-[#72442c] font-extrabold">{category.name}</p>
                </motion.div>
              </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FamilyOfProducts;
