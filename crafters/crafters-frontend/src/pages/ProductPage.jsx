import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Search, RefreshCcw, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Heart as HeartFilled } from 'lucide-react';
import { useCart, useWishlist } from '../components/contexts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';

// Import product images
import product1 from "../assets/bamboo_lamp_2.jpg";
import product2 from "../assets/bamboo_lamp.jpg";
import product3 from "../assets/bamboo_storage_box_2.jpg";
import product4 from "../assets/bamboo_storage_box.jpg";
import product5 from "../assets/bamboo_table_lamp.jpg";
import product6 from "../assets/product_no_6.jpg";
import product7 from "../assets/product_no_7.jpg";
import product8 from "../assets/product_no_8.jpg";
import product9 from "../assets/product_no_9.jpg";
import product10 from "../assets/product_no_10.jpg";
import product11 from "../assets/product_no_11.jpg";
import product12 from "../assets/product_no_12.jpg";
import product13 from "../assets/product_no_13.jpg";
import product14 from "../assets/product_no_14.jpg";

const products = [
  {
    id: 1,
    name: "Handcrafted Bamboo Table Lamp",
    actualPrice: "₹900",
    sellingPrice: "₹600",
    imageUrl: product1,
    description: "Eco-friendly handcrafted bamboo lamp.",
    category: "Home Decor",
    inStock: true,
    rating: 4.5
  },
  {
    id: 2,
    name: "Handcrafted Circular Bamboo Storage Box",
    actualPrice: "₹470",
    sellingPrice: "₹210",
    imageUrl: product2,
    description: "Stylish storage box for organizing.",
    category: "Storage",
    inStock: true,
    rating: 4.7
  },
  {
    id: 3,
    name: "Handcrafted Bamboo Flower Port",
    actualPrice: "₹899",
    sellingPrice: "₹499",
    imageUrl: product3,
    description: "Lightweight flower pot for plants.",
    category: "Garden",
    inStock: true,
    rating: 4.6
  },
  {
    id: 4,
    name: "Eco-Friendly Handbag for Women",
    actualPrice: "₹3,500",
    sellingPrice: "₹2,499",
    imageUrl: product4,
    description: "Sustainable handbag for daily use.",
    category: "Accessories",
    inStock: true,
    rating: 4.4
  },
  {
    id: 5,
    name: "Eco-Friendly Bamboo Laundry Bin",
    actualPrice: "₹2,199",
    sellingPrice: "₹1,699",
    imageUrl: product5,
    description: "Sustainable laundry bin for your home.",
    category: "Storage",
    inStock: true,
    rating: 4.8
  },
  {
    id: 6,
    name: "Handmade Ceramic Vase",
    actualPrice: "₹2,799",
    sellingPrice: "₹2,199",
    imageUrl: product6,
    description: "Beautifully crafted ceramic vase with intricate patterns.",
    category: "Home Decor",
    inStock: true,
    rating: 4.5
  },
  {
    id: 7,
    name: "Traditional Jute Bag",
    actualPrice: "₹1,199",
    sellingPrice: "₹899",
    imageUrl: product7,
    description: "Eco-friendly jute bag with handwoven designs.",
    category: "Accessories",
    inStock: true,
    rating: 4.2
  },
  {
    id: 8,
    name: "Wooden Wall Hanging",
    actualPrice: "₹1,999",
    sellingPrice: "₹1,499",
    imageUrl: product8,
    description: "Hand-carved wooden decor for your walls.",
    category: "Wall Art",
    inStock: false,
    rating: 4.7
  },
  {
    id: 9,
    name: "Terracotta Tea Set",
    actualPrice: "₹2,299",
    sellingPrice: "₹1,799",
    imageUrl: product9,
    description: "Rustic terracotta tea set for a traditional tea time.",
    category: "Kitchen",
    inStock: true,
    rating: 4.4
  },
  {
    id: 10,
    name: "Bamboo Table Lamp",
    actualPrice: "₹3,199",
    sellingPrice: "₹2,599",
    imageUrl: product10,
    description: "Eco-friendly lamp made with sustainable bamboo.",
    category: "Lighting",
    inStock: true,
    rating: 4.6
  },
  {
    id: 11,
    name: "Handwoven Tapestry",
    actualPrice: "₹4,299",
    sellingPrice: "₹3,599",
    imageUrl: product11,
    description: "Beautiful handwoven wall tapestry with traditional motifs.",
    category: "Wall Art",
    inStock: true,
    rating: 4.8
  },
  {
    id: 12,
    name: "Carved Wooden Box",
    actualPrice: "₹1,899",
    sellingPrice: "₹1,499",
    imageUrl: product12,
    description: "Intricately carved wooden storage box.",
    category: "Storage",
    inStock: true,
    rating: 4.3
  },
  {
    id: 13,
    name: "Macrame Plant Hanger",
    actualPrice: "₹999",
    sellingPrice: "₹799",
    imageUrl: product13,
    description: "Handcrafted macrame plant hanger with natural cotton rope.",
    category: "Home Decor",
    inStock: true,
    rating: 4.5
  },
  {
    id: 14,
    name: "Ceramic Wind Chimes",
    actualPrice: "₹1,499",
    sellingPrice: "₹1,199",
    imageUrl: product14,
    description: "Handmade ceramic wind chimes with soothing sounds.",
    category: "Garden",
    inStock: true,
    rating: 4.4
  }
];

const calculateDiscount = (actualPrice, sellingPrice) => {
  const actual = parseInt(actualPrice.replace(/[₹,]/g, ""));
  const selling = parseInt(sellingPrice.replace(/[₹,]/g, ""));
  return Math.round(((actual - selling) / actual) * 100);
};

const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    inStock: 'all',
    rating: 0,
    sortBy: 'featured'
  });
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    availability: true,
    rating: true,
    sort: true
  });

  const categories = ['All', ...new Set(products.map(product => product.category))];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: type === 'min' 
        ? [parseInt(value), prev.priceRange[1]]
        : [prev.priceRange[0], parseInt(value)]
    }));
  };

  const filteredProducts = products
    .filter(product => {
      const price = parseInt(product.sellingPrice.replace(/[₹,]/g, ""));
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = price >= filters.priceRange[0] && price <= filters.priceRange[1];
      const matchesStock = filters.inStock === 'all' || 
        (filters.inStock === 'inStock' && product.inStock) || 
        (filters.inStock === 'outOfStock' && !product.inStock);
      const matchesRating = product.rating >= filters.rating;
      
      return matchesCategory && matchesPrice && matchesStock && matchesRating;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'priceLowToHigh':
          return parseInt(a.sellingPrice.replace(/[₹,]/g, "")) - parseInt(b.sellingPrice.replace(/[₹,]/g, ""));
        case 'priceHighToLow':
          return parseInt(b.sellingPrice.replace(/[₹,]/g, "")) - parseInt(a.sellingPrice.replace(/[₹,]/g, ""));
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    const price = parseInt(product.sellingPrice.replace(/[₹,]/g, ""));
    addToCart({
      id: product.id,
      name: product.name,
      price: price,
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
      toast.info(`${product.name} removed from wishlist!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      const price = parseInt(product.sellingPrice.replace(/[₹,]/g, ""));
      addToWishlist({
        id: product.id,
        name: product.name,
        price: price,
        image: product.imageUrl,
      });
      toast.success(`${product.name} added to wishlist!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
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

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <Navbar />
      <div className="pt-20 container mx-auto px-4 py-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <Filter size={20} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className={`md:w-64 md:flex-shrink-0 transition-all duration-300 ${
            showFilters 
              ? 'max-h-[2000px] opacity-100' 
              : 'max-h-0 opacity-0 md:max-h-[2000px] md:opacity-100'
          } overflow-hidden`}>
            <div className="bg-white rounded-lg shadow-md p-4 md:sticky md:top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Filter size={20} />
                  Filters
                </h2>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700 md:hidden"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <div 
                  className="flex justify-between items-center mb-2 cursor-pointer"
                  onClick={() => toggleSection('category')}
                >
                  <h3 className="font-medium text-gray-700">Categories</h3>
                  {expandedSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {expandedSections.category && (
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedCategory === category
                            ? 'bg-[#72442c] text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <div 
                  className="flex justify-between items-center mb-2 cursor-pointer"
                  onClick={() => toggleSection('price')}
                >
                  <h3 className="font-medium text-gray-700">Price Range</h3>
                  {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {expandedSections.price && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="text-sm text-gray-600">Min</label>
                        <input
                          type="number"
                          value={filters.priceRange[0]}
                          onChange={(e) => handlePriceChange('min', e.target.value)}
                          className="w-full px-3 py-2 border rounded-md text-sm"
                          min="0"
                          max={filters.priceRange[1]}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-sm text-gray-600">Max</label>
                        <input
                          type="number"
                          value={filters.priceRange[1]}
                          onChange={(e) => handlePriceChange('max', e.target.value)}
                          className="w-full px-3 py-2 border rounded-md text-sm"
                          min={filters.priceRange[0]}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Availability */}
              <div className="mb-6">
                <div 
                  className="flex justify-between items-center mb-2 cursor-pointer"
                  onClick={() => toggleSection('availability')}
                >
                  <h3 className="font-medium text-gray-700">Availability</h3>
                  {expandedSections.availability ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {expandedSections.availability && (
                  <div className="space-y-2">
                    {['all', 'inStock', 'outOfStock'].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFilters(prev => ({ ...prev, inStock: option }))}
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          filters.inStock === option
                            ? 'bg-[#72442c] text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {option === 'all' ? 'All' : 
                         option === 'inStock' ? 'In Stock' : 
                         'Out of Stock'}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <div 
                  className="flex justify-between items-center mb-2 cursor-pointer"
                  onClick={() => toggleSection('rating')}
                >
                  <h3 className="font-medium text-gray-700">Rating</h3>
                  {expandedSections.rating ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {expandedSections.rating && (
                  <div className="space-y-2">
                    {[0, 3, 3.5, 4, 4.5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFilters(prev => ({ ...prev, rating }))}
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          filters.rating === rating
                            ? 'bg-[#72442c] text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {rating === 0 ? 'All' : `${rating}+ Stars`}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <div 
                  className="flex justify-between items-center mb-2 cursor-pointer"
                  onClick={() => toggleSection('sort')}
                >
                  <h3 className="font-medium text-gray-700">Sort By</h3>
                  {expandedSections.sort ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {expandedSections.sort && (
                  <div className="space-y-2">
                    {[
                      { value: 'featured', label: 'Featured' },
                      { value: 'priceLowToHigh', label: 'Price: Low to High' },
                      { value: 'priceHighToLow', label: 'Price: High to Low' },
                      { value: 'rating', label: 'Highest Rated' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFilters(prev => ({ ...prev, sortBy: option.value }))}
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          filters.sortBy === option.value
                            ? 'bg-[#72442c] text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Summary */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedCategory === 'All' ? 'All Products' : selectedCategory}
              </h2>
              <p className="text-gray-600">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {filteredProducts.map((product) => {
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
                          {product.sellingPrice}
                        </span>
                        <span className="line-through text-gray-500">
                          {product.actualPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* No Results Message */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products match your filters.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setFilters({
                      priceRange: [0, 5000],
                      inStock: 'all',
                      rating: 0,
                      sortBy: 'featured'
                    });
                  }}
                  className="mt-4 text-[#72442c] hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductPage;
