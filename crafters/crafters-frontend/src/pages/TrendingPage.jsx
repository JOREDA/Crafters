import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Search, Filter, ChevronDown, Star } from 'lucide-react';
import { useCart, useWishlist } from '../components/contexts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

// Sample trending products data
const trendingProducts = [
  {
    id: 1,
    name: 'Macrame Wall Hanging',
    category: 'Wall Art',
    description: 'Handwoven macrame wall art with bohemian design',
    actualPrice: '₹3,999',
    sellingPrice: '₹2,999',
    imageUrl: 'https://img.freepik.com/free-photo/macrame-wall-hanging_23-2149725694.jpg',
    rating: 4.9,
    reviews: 178,
    inStock: true,
    tags: ['Handwoven', 'Wall Art', 'Boho'],
    colors: ['Natural', 'White', 'Beige']
  },
  {
    id: 2,
    name: 'Handmade Ceramic Planter',
    category: 'Home Decor',
    description: 'Modern ceramic planter with geometric patterns',
    actualPrice: '₹2,499',
    sellingPrice: '₹1,799',
    imageUrl: 'https://img.freepik.com/free-photo/ceramic-vase_1150-16914.jpg',
    rating: 4.7,
    reviews: 124,
    inStock: true,
    tags: ['Ceramic', 'Planter', 'Modern'],
    colors: ['White', 'Terra Cotta', 'Black']
  },
  {
    id: 3,
    name: 'Woven Rattan Light Fixture',
    category: 'Lighting',
    description: 'Natural rattan pendant light with modern design',
    actualPrice: '₹4,999',
    sellingPrice: '₹3,999',
    imageUrl: 'https://img.freepik.com/free-photo/rattan-lamp_1150-17925.jpg',
    rating: 4.8,
    reviews: 92,
    inStock: true,
    tags: ['Lighting', 'Rattan', 'Natural'],
    colors: ['Natural', 'Dark Brown']
  }
];

const categories = ['All', 'Wall Art', 'Home Decor', 'Lighting', 'Storage', 'Textiles'];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Trending Now'];

const TrendingPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  const calculateDiscount = (actualPrice, sellingPrice) => {
    const actual = parseInt(actualPrice.replace(/[^0-9]/g, ""));
    const selling = parseInt(sellingPrice.replace(/[^0-9]/g, ""));
    return Math.round(((actual - selling) / actual) * 100);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.sellingPrice,
      image: product.imageUrl,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const toggleWishlist = (e, product) => {
    e.stopPropagation();
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.info(`${product.name} removed from wishlist`);
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

  const handleProductClick = (product) => {
    navigate('/product-details', { 
      state: { 
        product: {
          ...product,
          price: product.sellingPrice,
          mainImage: product.imageUrl,
          features: [
            "Handcrafted with care",
            "Premium quality materials",
            "Unique artisan design",
            "Sustainable production"
          ]
        } 
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f5f1]">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 pb-12 px-4 text-center bg-white"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#72442c] mb-4">
          Trending Now
        </h1>
        <div className="w-20 h-1 bg-[#72442c] mx-auto rounded-full mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our latest trending handcrafted pieces that are making waves in the artisan community.
        </p>
      </motion.div>

      {/* Filters and Sort */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          {/* Categories */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-[#72442c] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Sort and Filter */}
          <div className="flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#72442c]"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-sm hover:bg-gray-100"
            >
              <Filter size={16} />
              Filters
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {trendingProducts.map((product) => {
              const discount = calculateDiscount(product.actualPrice, product.sellingPrice);
              const isInWishlist = wishlistItems.some(item => item.id === product.id);
              
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* Product Image - Now Clickable */}
                  <div 
                    className="relative aspect-square overflow-hidden cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Discount Badge */}
                    <div className="absolute top-3 left-3 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full shadow">
                      {discount}% OFF
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute bottom-[-50px] left-0 w-full flex justify-around opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-500 ease-in-out">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(e, product);
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
                          toggleWishlist(e, product);
                        }}
                        className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
                        title="Add to Wishlist"
                      >
                        <Heart
                          size={20}
                          className={isInWishlist ? "fill-red-500 text-red-500" : ""}
                        />
                      </motion.button>
                    </div>
                  </div>

                  {/* Product Info - Now Clickable */}
                  <div 
                    className="p-4 cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-500">{product.category}</span>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-medium text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[#72442c]">{product.sellingPrice}</span>
                        <span className="text-sm text-gray-500 line-through">{product.actualPrice}</span>
                      </div>
                      {product.inStock ? (
                        <span className="text-xs text-green-600 font-medium">In Stock</span>
                      ) : (
                        <span className="text-xs text-red-600 font-medium">Out of Stock</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
     
    </div>
  );
};

export default TrendingPage; 