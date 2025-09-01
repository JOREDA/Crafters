import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import productImg from '../assets/product_06.jpg';  // Update path if needed

const BestProduct = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const flipIn = {
    initial: { opacity: 0, rotateY: -180 },
    whileInView: { opacity: 1, rotateY: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <motion.div 
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      className="container mx-auto px-4 py-16"
    >
      <motion.div variants={fadeInUp} className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#72442c] mb-4">Best Sellers</h2>
        <p className="text-lg text-gray-600">Discover our most popular handcrafted items</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div variants={flipIn} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img src="/src/assets/bamboo_lamp.jpg" alt="Bamboo Lamp" className="w-full h-64 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#72442c] mb-2">Bamboo Lamp</h3>
            <p className="text-gray-600 mb-4">Handcrafted bamboo lamp with natural finish</p>
            <Link to="/product/lamps/shade" className="inline-block bg-[#72442c] text-white px-6 py-2 rounded-full hover:bg-[#8B4513] transition-colors">
              Shop Now
            </Link>
          </div>
        </motion.div>

        <motion.div variants={flipIn} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img src="/src/assets/bamboo_storage_box.jpg" alt="Storage Box" className="w-full h-64 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#72442c] mb-2">Storage Box</h3>
            <p className="text-gray-600 mb-4">Elegant bamboo storage solution</p>
            <Link to="/product/storage/box" className="inline-block bg-[#72442c] text-white px-6 py-2 rounded-full hover:bg-[#8B4513] transition-colors">
              Shop Now
            </Link>
          </div>
        </motion.div>

        <motion.div variants={flipIn} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img src="/src/assets/flowervase.jpeg.jpg" alt="Flower Vase" className="w-full h-64 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#72442c] mb-2">Flower Vase</h3>
            <p className="text-gray-600 mb-4">Beautiful handcrafted flower vase</p>
            <Link to="/product/flower/vase" className="inline-block bg-[#72442c] text-white px-6 py-2 rounded-full hover:bg-[#8B4513] transition-colors">
              Shop Now
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BestProduct;
