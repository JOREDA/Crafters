import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useWishlist } from '../contexts';
import { Heart, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { getAllProducts } from '../../api/products';
import { ToastContainer } from 'react-toastify';

function CategoryProducts({ currentProduct }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const loadRelatedProducts = async () => {
      try {
        const products = await getAllProducts();
        const prodCategory = currentProduct.categoryName || currentProduct.category || currentProduct.category_name || null;
        const filtered = products.filter(p => {
          const name = p.categoryName || p.category;
          return name && prodCategory && name.toLowerCase().includes(String(prodCategory).toLowerCase()) && p.id !== currentProduct.id;
        }).slice(0, 8);
        setRelatedProducts(filtered);
      } catch (error) {
        console.error('Error loading related products:', error);
        setRelatedProducts([]);
      }
    };

    loadRelatedProducts();
  }, [currentProduct.id, currentProduct.category]);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      quantity: 1
    });
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      icon: <ShoppingCart size={20} className="text-[#72442c]" />,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: `cart-${product.id}-${Date.now()}`
    });
  };

  const handleWishlist = (product) => {
    const isInWishlist = wishlistItems.some(item => item.name === product.name);
    if (isInWishlist) {
      removeFromWishlist(product.name);
      toast.info(`${product.name} removed from wishlist!`, {
        position: "top-right",
        icon: <Heart size={20} />,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: `wishlist-remove-${product.id}-${Date.now()}`
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
      });
      toast.success(`${product.name} added to wishlist!`, {
        position: "top-right",
        icon: <Heart size={20} className="text-red-500" />,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: `wishlist-add-${product.id}-${Date.now()}`
      });
    }
  };

  const handleProductClick = (product) => {
    // Convert product name to URL-friendly slug
    const productSlug = product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    navigate(`/product/${productSlug}`, {
      state: {
        product: {
          ...product,
          mainImage: product.imageUrl,
          sellingPrice: product.price,
          actualPrice: (product.price * 1.25).toFixed(2),
          category: currentProduct.category
        }
      }
    });
  };

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-16 space-y-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[#72442c]">More {currentProduct.category} Products</h2>
        <button 
          onClick={() => navigate('/products')}
          className="text-[#72442c] hover:text-[#8d724a] text-sm font-medium"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden group"
          >
            {/* Product Image */}
            <div 
              className="relative h-64 cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Action Buttons */}
              <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
                  title="Add to Cart"
                >
                  <ShoppingCart size={20} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlist(product);
                  }}
                  className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
                  title="Add to Wishlist"
                >
                  <Heart
                    size={20}
                    className={wishlistItems.some(item => item.name === product.name) ? "fill-red-500 text-red-500" : ""}
                  />
                </motion.button>
              </div>
            </div>

            {/* Product Info */}
            <div 
              className="p-4 cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <h3 className="text-lg font-semibold text-[#72442c] mb-2">{product.name}</h3>
              <p className="text-gray-600">₹{product.price}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        limit={3}
      />
    </div>
  );
}

export default CategoryProducts; 