import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { Heart as HeartFilled } from 'lucide-react';
import { useCart } from './contexts/CartContext';
import { useWishlist } from './contexts/WishlistContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storageBoxProducts } from '../data/products/storageBox';

const StorageBox = () => {
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
    <div className="min-h-screen bg-[#f9f9f9] pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Storage Box Collection</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {storageBoxProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="relative aspect-square">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 z-10">
                  <button
                    onClick={(e) => handleWishlist(e, product)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    {wishlistItems.some(item => item.name === product.name) ? (
                      <HeartFilled className="text-red-500" />
                    ) : (
                      <Heart className="text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="absolute bottom-2 right-2">
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <ShoppingCart className="text-gray-600" />
                  </button>
                </div>
                <div className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                  {calculateDiscount(product.actualPrice, product.sellingPrice)}% OFF
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">₹{product.sellingPrice}</span>
                  <span className="text-sm text-gray-500 line-through">₹{product.actualPrice}</span>
                </div>
                <div className="mt-2 flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${
                          star <= product.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorageBox; 