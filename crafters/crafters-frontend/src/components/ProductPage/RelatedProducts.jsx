import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { Heart, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const RelatedProducts = ({ currentProduct, category }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Import the appropriate category file based on the product category
    const loadRelatedProducts = async () => {
      let products = [];
      try {
        switch (category?.toLowerCase()) {
          case 'home decor':
            const homeDecor = await import('../Products/HomeDecor.jsx');
            products = homeDecor.products;
            break;
          case 'storage':
            const storage = await import('../Products/StorageBox.jsx');
            products = storage.products;
            break;
          case 'laundry':
            const laundry = await import('../Products/laundryBin.jsx');
            products = laundry.products;
            break;
          case 'lamp':
            const lamp = await import('../Products/LampShade.jsx');
            products = lamp.products;
            break;
          case 'flower vase':
            const vase = await import('../Products/FlowerVase.jsx');
            products = vase.products;
            break;
          case 'essential':
            const essential = await import('../Products/Essential.jsx');
            products = essential.products;
            break;
          default:
            products = [];
        }

        // Filter out the current product and get only 4 related products
        const filtered = products
          .filter(p => p.id !== currentProduct.id)
          .slice(0, 4);
        setRelatedProducts(filtered);
      } catch (error) {
        console.error('Error loading related products:', error);
        setRelatedProducts([]);
      }
    };

    loadRelatedProducts();
  }, [category, currentProduct.id]);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      quantity: 1
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (product) => {
    const isInWishlist = wishlistItems.some(item => item.name === product.name);
    if (isInWishlist) {
      removeFromWishlist(product.name);
      toast.info(`${product.name} removed from wishlist!`);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
      });
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, {
      state: {
        product: {
          ...product,
          mainImage: product.imageUrl,
          sellingPrice: product.price,
          actualPrice: (product.price * 1.25).toFixed(2),
          category: category
        }
      }
    });
  };

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-[#72442c] mb-8">Related Products</h2>
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
    </div>
  );
};

export default RelatedProducts;
