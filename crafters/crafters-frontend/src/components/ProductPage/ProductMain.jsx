import React from 'react';
import Navbar from "../Navbar";
import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';
import SimilarProducts from './SimilarProducts';

function ProductMain() {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10 mt-20">
        {/* Main Product Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <ProductGallery />
          </div>
          <div className="w-full lg:w-1/2">
            <ProductDetails />
          </div>
        </div>

       
      </div>
    </>
  );
}

export default ProductMain;
