import React from 'react';
import product1 from '../assets/product_01.jpg';
import product2 from '../assets/product_02.jpg';
import product3 from '../assets/product_03.jpg';
import product4 from '../assets/product_04.jpg';
import product5 from '../assets/product_05.jpg';
import product6 from '../assets/product_06.jpg';
import product7 from '../assets/product_07.jpg';
import product8 from '../assets/product_08.jpg';
import product9 from '../assets/product_09.jpg';
import product10 from '../assets/product_10.jpg';
import product11 from '../assets/product_11.jpg';
import product12 from '../assets/product_12.jpg';
import product13 from '../assets/product_13.jpg';
import product14 from '../assets/product_14.jpg';
import product15 from '../assets/product_15.jpg';

const generateRandomNumber = () => {
  return Math.floor(Math.random() * (2000 - 200 + 1)) + 200;
};

const products = [
  { name: "Product 1", description: "Short description of product 1", price: ["₹ " + generateRandomNumber() + ".00"], image: [product1] },
  { name: "Product 2", description: "Short description of product 2", price: ["₹ " + generateRandomNumber() + ".00"], image: [product2] },
  { name: "Product 3", description: "Short description of product 3", price: ["₹ " + generateRandomNumber() + ".00"], image: [product3] },
  { name: "Product 4", description: "Short description of product 4", price: ["₹ " + generateRandomNumber() + ".00"], image: [product4] },
  { name: "Product 5", description: "Short description of product 5", price: ["₹ " + generateRandomNumber() + ".00"], image: [product5] },
  { name: "Product 6", description: "Short description of product 6", price: ["₹ " + generateRandomNumber() + ".00"], image: [product6] },
  { name: "Product 7", description: "Short description of product 7", price: ["₹ " + generateRandomNumber() + ".00"], image: [product7] },
  { name: "Product 8", description: "Short description of product 8", price: ["₹ " + generateRandomNumber() + ".00"], image: [product8] },
  { name: "Product 9", description: "Short description of product 9", price: ["₹ " + generateRandomNumber() + ".00"], image: [product9] },
  { name: "Product 10", description: "Short description of product 10", price: ["₹ " + generateRandomNumber() + ".00"], image: [product10] },
  { name: "Product 11", description: "Short description of product 11", price: ["₹ " + generateRandomNumber() + ".00"], image: [product11] },
  { name: "Product 12", description: "Short description of product 12", price: ["₹ " + generateRandomNumber() + ".00"], image: [product12] },
  { name: "Product 13", description: "Short description of product 13", price: ["₹ " + generateRandomNumber() + ".00"], image: [product13] },
  { name: "Product 14", description: "Short description of product 14", price: ["₹ " + generateRandomNumber() + ".00"], image: [product14] },
  { name: "Product 15", description: "Short description of product 15", price: ["₹ " + generateRandomNumber() + ".00"], image: [product15] },
];

export const ProductGrid = () => {
  return (
    <div className="p-6">
      {/* Heading */}
      <h2 className="text-4xl  font-bold text-center mb-8 text-gray-800 underline">Our Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="relative bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-500 transform hover:scale-105"
          >
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg transition-transform duration-500 hover:scale-110"
              />
              {/* Product Name */}
              <div className="absolute top-2 right-2 bg-black text-white text-sm px-2 py-1 rounded-full opacity-80 transition-opacity duration-500 hover:opacity-100">
                {product.name}
              </div>
            </div>

            {/* Product Details */}
            <div className="mt-4">
              <p className="text-gray-600 text-sm">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-semibold">{product.price}</span>
                <button className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300 transform hover:scale-105">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
