import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Search, RefreshCcw } from 'lucide-react';
import { Heart as HeartFilled } from 'lucide-react';
import { useCart } from '../components/contexts/CartContext';
import { useWishlist } from '../components/contexts/WishlistContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { laundryBinProducts } from '../data/products/laundryBin';
import Navbar from '../components/Navbar';

const LaundryBinPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  const calculateDiscount = (actualPrice, sellingPrice) => {
    return Math.round(((actualPrice - sellingPrice) / actualPrice) * 100);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { 
      state: { 
        product: {
          ...product,
          mainImage: product.imageUrl
        } 
      } 
    });
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.sellingPrice,
      image: product.imageUrl,
    });
    
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleWishlist = (e, product) => {
    e.stopPropagation();
    const isInWishlist = wishlistItems.some(item => item.name === product.name);
    
    if (isInWishlist) {
      removeFromWishlist(product.name);
      toast.info(`${product.name} removed from wishlist!`);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.sellingPrice,
        image: product.imageUrl,
      });
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f9f9f9] pt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-lg uppercase text-gray-500 tracking-wider">
              Collection
            </h2>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              Laundry Bin Collection
            </h1>
            <div className="mt-3 w-20 h-1 bg-[#788c7c] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {laundryBinProducts.map((product) => {
              const discount = calculateDiscount(product.actualPrice, product.sellingPrice);
              const isInWishlist = wishlistItems.some(item => item.name === product.name);

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-lg overflow-hidden shadow-md relative transition-transform hover:scale-105"
                >
                  <div className="relative w-full h-64 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="object-cover w-full h-full cursor-pointer"
                      onClick={() => handleProductClick(product)}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/300x400.png?text=Image+Not+Available";
                      }}
                    />
                    <div className="absolute top-2 left-2 w-12 h-12 bg-green-100 text-green-700 text-xs font-bold rounded-full shadow flex items-center justify-center">
                      {discount}% OFF
                    </div>

                    {/* Desktop Icons */}
                    <div className="absolute bottom-[-50px] left-0 w-full justify-around opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-500 ease-in-out hidden sm:flex">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(e, product);
                        }}
                        className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <ShoppingCart />
                      </button>

                      <button
                        className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer"
                        aria-label="Search product"
                      >
                        <Search />
                      </button>

                      <button
                        className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer"
                        aria-label="Refresh"
                      >
                        <RefreshCcw />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWishlist(e, product);
                        }}
                        className={`p-2 rounded-full shadow-lg cursor-pointer ${
                          isInWishlist
                            ? "text-red-500 bg-red-100"
                            : "bg-white hover:bg-red-100"
                        }`}
                        aria-label={`Add ${product.name} to wishlist`}
                      >
                        <Heart fill={isInWishlist ? "red" : "none"} />
                      </button>
                    </div>

                    {/* Mobile Icons */}
                    <div className="absolute bottom-4 left-4 sm:hidden">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWishlist(e, product);
                        }}
                        className={`p-2 rounded-full shadow-lg cursor-pointer ${
                          isInWishlist
                            ? "text-red-500 bg-red-100"
                            : "bg-white hover:bg-red-100"
                        }`}
                        aria-label={`Add ${product.name} to wishlist`}
                      >
                        <Heart fill={isInWishlist ? "red" : "none"} />
                      </button>
                    </div>

                    <div className="absolute bottom-4 right-4 sm:hidden">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(e, product);
                        }}
                        className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <ShoppingCart />
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-medium text-gray-800 text-sm">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <span className="font-semibold text-gray-900 text-2xl">
                        ₹{Number(product.sellingPrice).toLocaleString()}
                      </span>
                      <span className="line-through text-gray-500">
                        ₹{Number(product.actualPrice).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default LaundryBinPage;
