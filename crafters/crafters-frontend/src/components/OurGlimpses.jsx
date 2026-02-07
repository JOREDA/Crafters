import React from 'react';
import { motion } from 'framer-motion';
import product6 from '../assets/product_no_6.jpg';
import product7 from '../assets/product_no_7.jpg';
import product8 from '../assets/product_no_8.jpg';
import product9 from '../assets/product_no_9.jpg';
import product10 from '../assets/product_no_10.jpg';
import product11 from '../assets/product_no_11.jpg';
import product12 from '../assets/product_no_12.jpg';
import product13 from '../assets/product_no_13.jpg';
import product14 from '../assets/product_no_14.jpg';

const images = [
  {
    url: product6,
    alt: 'Handcrafted Product 6',
  },
  {
    url: product7,
    alt: 'Handcrafted Product 7',
  },
  {
    url: product8,
    alt: 'Handcrafted Product 8',
  },
  {
    url: product9,
    alt: 'Handcrafted Product 9',
  },
  {
    url: product10,
    alt: 'Handcrafted Product 10',
  },
  {
    url: product11,
    alt: 'Handcrafted Product 11',
  },
  {
    url: product12,
    alt: 'Handcrafted Product 12',
  },
  {
    url: product13,
    alt: 'Handcrafted Product 13',
  },
  {
    url: product14,
    alt: 'Handcrafted Product 14',
  },
];

const OurGlimpses = () => {
  return (
    <div className="py-12 px-8 bg-[#f5f5f5]">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-lg uppercase text-gray-500 tracking-wider">Gallery</h2>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Glimpses</h1>
          <div className="mt-3 w-20 h-1 bg-[#788c7c] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-6 gap-4">
          {/* Left side - 4 images in 2 rows */}
          <div className="grid grid-rows-2 gap-4 col-span-2">
            <div className="grid grid-cols-2 gap-4 h-full">
              <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <img
                src={images[0].url}
                alt={images[0].alt}
                className="object-cover w-full h-full rounded-lg shadow"
              />
              <img
                src={images[1].url}
                alt={images[1].alt}
                className="object-cover w-full h-full rounded-lg shadow"
              />
               </motion.div>
            </div>
            <div className="grid grid-cols-2 gap-4 h-full">
               <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <img
                src={images[2].url}
                alt={images[2].alt}
                className="object-cover w-full h-full rounded-lg shadow"
              />
              </motion.div>
               <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <img
                src={images[3].url}
                alt={images[3].alt}
                className="object-cover w-full h-full rounded-lg shadow"
              />
              </motion.div>
            </div>
          </div>

          {/* Center image - reduced size */}
          <div className="col-span-2 flex items-center justify-center">
             <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <img
              src={images[4].url}
              alt={images[4].alt}
              className="object-cover w-full h-full rounded-lg shadow"
            />
           </motion.div>
          </div>

          {/* Right side - 4 images in 2 rows */}
          <div className="grid grid-rows-2 gap-4 col-span-2">
            <div className="grid grid-cols-2 gap-4 h-full">
                <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <img
                src={images[5].url}
                alt={images[5].alt}
                className="object-cover w-full h-full rounded-lg shadow"
              />
              </motion.div>
                  <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <img
                src={images[6].url}
                alt={images[6].alt}
                className="object-cover w-full h-full rounded-lg shadow"
              />
              </motion.div>
            </div>
            <div className="grid grid-cols-2 gap-4 h-full">
                <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <img
                src={images[7].url}
                alt={images[7].alt}
                className="object-cover w-full h-full rounded-lg shadow"
              />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <img
                src={images[8].url}
                alt={images[8].alt}
                className="object-cover w-full h-full rounded-lg shadow"
              />
              </motion.div>
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-block bg-[#72442c] hover:text-black hover:bg-[#8d724a] text-white font-semibold py-2 px-6 rounded-full shadow transition-all duration-300"
          >
            View All
          </a>
        </div>
      </div>
    </div>
  );
};

export default OurGlimpses;
