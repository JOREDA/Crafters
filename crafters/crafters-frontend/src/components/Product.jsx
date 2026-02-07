import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Search, 
  ShoppingCart, 
  RefreshCcw, 
  Sliders,
  X,
  ChevronDown,
  Filter,
  Check
} from "lucide-react";
import { useWishlist, useCart } from "./contexts";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

// Color options with visual values
const colorOptions = [
  { name: 'Red', value: '#FF4D4D', textColor: 'white' },
  { name: 'Blue', value: '#4D7FFF', textColor: 'white' },
  { name: 'Green', value: '#4CAF50', textColor: 'white' },
  { name: 'Brown', value: '#795548', textColor: 'white' },
  { name: 'Black', value: '#212121', textColor: 'white' },
  { name: 'Gold', value: '#FFD700', textColor: 'black' },
  { name: 'Silver', value: '#C0C0C0', textColor: 'black' },
  { name: 'Bronze', value: '#CD7F32', textColor: 'white' }
];

// Enhanced product data with all products from the project
const products = [
  // Products from OurProduct.jsx
  {
    id: 1,
    name: "Handcrafted Bamboo Table Lamp",
    actualPrice: "₹900",
    sellingPrice: "₹600",
    imageUrl: product1,
    description: "Eco-friendly handcrafted bamboo lamp.",
    inStock: true,
    rating: 4.5,
    color: colorOptions[3], // Brown
    size: "Medium",
    material: "Wood",
    category: "Home Decor"
  },
  {
    id: 2,
    name: "Handcrafted Circular Bamboo Storage Box",
    actualPrice: "₹470",
    sellingPrice: "₹210",
    imageUrl: product2,
    description: "Stylish storage box for organizing.",
    inStock: true,
    rating: 4.7,
    color: colorOptions[3], // Brown
    size: "Small",
    material: "Wood",
    category: "Storage"
  },
  {
    id: 3,
    name: "Handcrafted Bamboo Flower Port",
    actualPrice: "₹899",
    sellingPrice: "₹499",
    imageUrl: product3,
    description: "Lightweight flower pot for plants.",
    inStock: true,
    rating: 4.6,
    color: colorOptions[3], // Brown
    size: "Medium",
    material: "Wood",
    category: "Garden"
  },
  {
    id: 4,
    name: "Eco-Friendly Handbag for Women",
    actualPrice: "₹3,500",
    sellingPrice: "₹2,499",
    imageUrl: product4,
    description: "Sustainable handbag for daily use.",
    inStock: true,
    rating: 4.4,
    color: colorOptions[3], // Brown
    size: "Medium",
    material: "Cotton",
    category: "Accessories"
  },
  {
    id: 5,
    name: "Eco-Friendly Bamboo Laundry Bin",
    actualPrice: "₹2,199",
    sellingPrice: "₹1,699",
    imageUrl: product5,
    description: "Sustainable laundry bin for your home.",
    inStock: true,
    rating: 4.8,
    color: colorOptions[3], // Brown
    size: "Large",
    material: "Wood",
    category: "Storage"
  },
  // Products from SearchPage.jsx
  {
    id: 6,
    name: "Handmade Ceramic Vase",
    actualPrice: "₹2,799",
    sellingPrice: "₹2,199",
    imageUrl: product6,
    description: "Beautifully crafted ceramic vase with intricate patterns.",
    inStock: true,
    rating: 4.5,
    color: colorOptions[2], // Green
    size: "Medium",
    material: "Ceramic",
    category: "Home Decor"
  },
  {
    id: 7,
    name: "Traditional Jute Bag",
    actualPrice: "₹1,199",
    sellingPrice: "₹899",
    imageUrl: product7,
    description: "Eco-friendly jute bag with handwoven designs.",
    inStock: true,
    rating: 4.2,
    color: colorOptions[3], // Brown
    size: "Medium",
    material: "Cotton",
    category: "Accessories"
  },
  {
    id: 8,
    name: "Wooden Wall Hanging",
    actualPrice: "₹1,999",
    sellingPrice: "₹1,499",
    imageUrl: product8,
    description: "Hand-carved wooden decor for your walls.",
    inStock: false,
    rating: 4.7,
    color: colorOptions[3], // Brown
    size: "Large",
    material: "Wood",
    category: "Wall Art"
  },
  {
    id: 9,
    name: "Terracotta Tea Set",
    actualPrice: "₹2,299",
    sellingPrice: "₹1,799",
    imageUrl: product9,
    description: "Rustic terracotta tea set for a traditional tea time.",
    inStock: true,
    rating: 4.4,
    color: colorOptions[3], // Brown
    size: "Small",
    material: "Ceramic",
    category: "Kitchen"
  },
  {
    id: 10,
    name: "Bamboo Table Lamp",
    actualPrice: "₹3,199",
    sellingPrice: "₹2,599",
    imageUrl: product10,
    description: "Eco-friendly lamp made with sustainable bamboo.",
    inStock: true,
    rating: 4.6,
    color: colorOptions[3], // Brown
    size: "Medium",
    material: "Wood",
    category: "Lighting"
  },
  {
    id: 11,
    name: "Handwoven Tapestry",
    actualPrice: "₹4,299",
    sellingPrice: "₹3,599",
    imageUrl: product11,
    description: "Beautiful handwoven wall tapestry with traditional motifs.",
    inStock: true,
    rating: 4.8,
    color: colorOptions[6], // Silver
    size: "Large",
    material: "Cotton",
    category: "Wall Art"
  },
  {
    id: 12,
    name: "Carved Wooden Box",
    actualPrice: "₹1,899",
    sellingPrice: "₹1,499",
    imageUrl: product12,
    description: "Intricately carved wooden storage box.",
    inStock: true,
    rating: 4.3,
    color: colorOptions[3], // Brown
    size: "Small",
    material: "Wood",
    category: "Storage"
  },
  {
    id: 13,
    name: "Macrame Plant Hanger",
    actualPrice: "₹999",
    sellingPrice: "₹799",
    imageUrl: product13,
    description: "Handcrafted macrame plant hanger with natural cotton rope.",
    inStock: true,
    rating: 4.5,
    color: colorOptions[7], // Bronze
    size: "Medium",
    material: "Cotton",
    category: "Home Decor"
  },
  {
    id: 14,
    name: "Ceramic Wind Chimes",
    actualPrice: "₹1,499",
    sellingPrice: "₹1,199",
    imageUrl: product14,
    description: "Handmade ceramic wind chimes with soothing sounds.",
    inStock: true,
    rating: 4.4,
    color: colorOptions[6], // Silver
    size: "Medium",
    material: "Ceramic",
    category: "Garden"
  },
  // Products from SimilarProducts.jsx
  
 
 
 
 
];

const calculateDiscount = (actual, selling) => {
  const actualNum = parseInt(actual.replace(/[₹,]/g, ""));
  const sellingNum = parseInt(selling.replace(/[₹,]/g, ""));
  return Math.round(((actualNum - sellingNum) / actualNum) * 100);
};

const FilterSection = ({ title, children, isOpen, onToggle }) => (
  <motion.div className="mb-6">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center mb-2 text-gray-800 font-semibold"
    >
      <span>{title}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown size={20} />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const ProductPage = () => {
  const { wishlistItems, addToWishlist } = useWishlist();
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();
  const [maxPrice, setMaxPrice] = useState(10000);
  const [showInStock, setShowInStock] = useState(false);
  const [showOutStock, setShowOutStock] = useState(false);
  const [showTopRated, setShowTopRated] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [openSections, setOpenSections] = useState({
    price: true,
    size: true,
    material: true,
    category: true,
    stock: true,
    rating: true,
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sizes = ["Small", "Medium", "Large"];
  const materials = ["Cotton", "Wood", "Ceramic", "Metal", "Bamboo", "Jute"];
  const categories = [
    "Home Decor & Accents",
    "Storage & Organization",
    "Garden & Outdoor",
    "Kitchen & Dining",
    "Lighting & Lamps",
    "Traditional Art & Crafts"
  ];

  const filteredProducts = products.filter((p) => {
    const selling = parseInt(p.sellingPrice.replace(/[₹,]/g, ""));

    if (showInStock && !p.inStock) return false;
    if (showOutStock && p.inStock) return false;
    if (showTopRated && parseFloat(p.rating) < 4.0) return false;
    if (selling > maxPrice && selectedPriceRange === "") return false;
    if (selectedSizes.length && !selectedSizes.includes(p.size)) return false;
    if (selectedMaterials.length && !selectedMaterials.includes(p.material)) return false;
    if (selectedCategories.length && !selectedCategories.includes(p.category)) return false;

    if (selectedPriceRange) {
      const priceChunks = {
        "₹1000 – ₹3000": [1000, 3000],
        "₹3001 – ₹5000": [3001, 5000],
        "₹5001 – ₹7000": [5001, 7000],
        "₹7001 – ₹10000": [7001, 10000],
      };
      const [min, max] = priceChunks[selectedPriceRange];
      if (selling < min || selling > max) return false;
    }

    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseInt(a.sellingPrice.replace(/[₹,]/g, "")) - parseInt(b.sellingPrice.replace(/[₹,]/g, ""));
      case "price-high":
        return parseInt(b.sellingPrice.replace(/[₹,]/g, "")) - parseInt(a.sellingPrice.replace(/[₹,]/g, ""));
      case "rating":
        return parseFloat(b.rating) - parseFloat(a.rating);
      case "popularity":
        return b.wishlistCount - a.wishlistCount;
      default:
        return 0;
    }
  });

  const clearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedMaterials([]);
    setSelectedCategories([]);
    setSelectedPriceRange("");
    setMaxPrice(10000);
    setShowInStock(false);
    setShowOutStock(false);
    setShowTopRated(false);
  };

  const isInWishlist = (productName) =>
    wishlistItems.some((item) => item.name === productName);

  const handleAddToWishlist = (product) => {
    if (isInWishlist(product.name)) {
      toast.info(`${product.name} is already in wishlist`, { autoClose: 2000 });
      return;
    }
    const wishlistProduct = { ...product, imageUrl: product.imageUrl };
    addToWishlist(wishlistProduct);
    toast.success(`${product.name} added to wishlist`, { autoClose: 2000 });
  };

  const handleAddToCart = (product) => {
    const isInCart = cartItems.some((item) => item.id === product.id);
    if (isInCart) {
      toast.info(`${product.name} is already in the cart`, { autoClose: 2000 });
    } else {
      const cartProduct = {
        id: product.id,
        name: product.name,
        price: parseInt(product.sellingPrice.replace(/[₹,]/g, "")),
        image: product.imageUrl,
      };
      addToCart(cartProduct);
      toast.success(`${product.name} added to cart`, { autoClose: 2000 });
    }
  };

  const handleProductClick = (product) => {
    const productWithImage = {
      ...product,
      image: product.imageUrl,
      mainImage: product.imageUrl
    };
    navigate(`/product/${product.id}`, { 
      state: { 
        product: productWithImage
      } 
    });
  };

  return (
    <>
      <div className="bg-[#f5f5f5] min-h-screen pt-20">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8 bg-white shadow-sm"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            The Crafters Shop
          </h1>
          <div className="w-20 h-1 bg-[#72442c] mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600">Discover unique handcrafted treasures</p>
        </motion.div>

        {/* Mobile Filter Button - Fixed position */}
        <div className="md:hidden sticky top-20 z-30 bg-white p-4 shadow-md">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="w-full flex items-center justify-center gap-2 bg-[#72442c] text-white py-2 px-4 rounded-lg"
          >
            <Filter size={20} />
            <span>Show Filters</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-5 p-4 md:p-8">
          {/* Filter Sidebar */}
          <AnimatePresence>
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className={`fixed md:sticky md:top-24 left-0 h-[calc(100vh-5rem)] w-80 md:w-1/3 bg-white p-6 rounded-lg shadow-lg overflow-y-auto z-40 transition-transform ${
                showMobileFilters ? "translate-x-0" : "-translate-x-full md:translate-x-0"
              }`}
              style={{
                maxHeight: 'calc(100vh - 6rem)',
                scrollbarWidth: 'thin',
                scrollbarColor: '#72442c #f5f5f5'
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <div className="flex gap-2">
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-[#72442c] hover:underline"
                  >
                    Clear All
                  </button>
                  <button
                    className="md:hidden"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#72442c] focus:border-transparent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popularity">Most Popular</option>
                </select>
              </div>

              {/* Price Filter */}
              <FilterSection
                title="Price Range"
                isOpen={openSections.price}
                onToggle={() => toggleSection("price")}
              >
                <div className="space-y-4">
                  <div>
                    <input
                      type="range"
                      min="1000"
                      max="10000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      disabled={selectedPriceRange !== ""}
                      className="w-full accent-[#72442c]"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹1000</span>
                      <span>₹{maxPrice}</span>
                    </div>
                  </div>

                  {/* Price Range Radio Buttons */}
                  <div className="space-y-2">
                    {[
                      "₹1000 – ₹3000",
                      "₹3001 – ₹5000",
                      "₹5001 – ₹7000",
                      "₹7001 – ₹10000",
                    ].map((range) => (
                      <label key={range} className="flex items-center">
                        <input
                          type="radio"
                          name="priceRange"
                          value={range}
                          checked={selectedPriceRange === range}
                          onChange={() => setSelectedPriceRange(range)}
                          className="mr-2 accent-[#72442c]"
                        />
                        <span className="text-sm text-gray-700">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </FilterSection>

              {/* Size Filter */}
              <FilterSection
                title="Sizes"
                isOpen={openSections.size}
                onToggle={() => toggleSection("size")}
              >
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedSizes((prev) =>
                          prev.includes(size)
                            ? prev.filter((s) => s !== size)
                            : [...prev, size]
                        );
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedSizes.includes(size)
                          ? "bg-[#72442c] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </FilterSection>

              {/* Material Filter */}
              <FilterSection
                title="Materials"
                isOpen={openSections.material}
                onToggle={() => toggleSection("material")}
              >
                <div className="space-y-2">
                  {materials.map((material) => (
                    <label key={material} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(material)}
                        onChange={() => {
                          setSelectedMaterials((prev) =>
                            prev.includes(material)
                              ? prev.filter((m) => m !== material)
                              : [...prev, material]
                          );
                        }}
                        className="mr-2 accent-[#72442c]"
                      />
                      <span className="text-sm text-gray-700">{material}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Category Filter */}
              <FilterSection
                title="Categories"
                isOpen={openSections.category}
                onToggle={() => toggleSection("category")}
              >
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => {
                          setSelectedCategories((prev) =>
                            prev.includes(category)
                              ? prev.filter((c) => c !== category)
                              : [...prev, category]
                          );
                        }}
                        className="mr-2 accent-[#72442c]"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Stock Status */}
              <FilterSection
                title="Stock Status"
                isOpen={openSections.stock}
                onToggle={() => toggleSection("stock")}
              >
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showInStock}
                      onChange={(e) => setShowInStock(e.target.checked)}
                      className="mr-2 accent-[#72442c]"
                    />
                    <span className="text-sm text-gray-700">In Stock</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showOutStock}
                      onChange={(e) => setShowOutStock(e.target.checked)}
                      className="mr-2 accent-[#72442c]"
                    />
                    <span className="text-sm text-gray-700">Out of Stock</span>
                  </label>
                </div>
              </FilterSection>

              {/* Rating Filter */}
              <FilterSection
                title="Rating"
                isOpen={openSections.rating}
                onToggle={() => toggleSection("rating")}
              >
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showTopRated}
                    onChange={(e) => setShowTopRated(e.target.checked)}
                    className="mr-2 accent-[#72442c]"
                  />
                  <span className="text-sm text-gray-700">4★ & above</span>
                </label>
              </FilterSection>
            </motion.aside>
          </AnimatePresence>

          {/* Product Grid Section */}
          <motion.section 
            className="w-full md:w-2/3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Results Summary - Sticky */}
            <div className="sticky top-32 md:top-24 z-20 bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  Showing {filteredProducts.length} results
                </p>
                <div className="flex items-center gap-2">
                  <Sliders size={16} className="text-gray-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border-0 focus:ring-0"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="popularity">Most Popular</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters - Sticky */}
            {(selectedSizes.length > 0 ||
              selectedMaterials.length > 0 ||
              selectedCategories.length > 0 ||
              selectedPriceRange) && (
              <div className="sticky top-48 md:top-40 z-20 bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex flex-wrap gap-2">
                  {selectedSizes.map((size) => {
                    return (
                      <motion.span
                        key={size}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        <span
                          className="w-4 h-4 rounded-full"
                        />
                        {size}
                        <button
                          onClick={() =>
                            setSelectedSizes((prev) =>
                              prev.filter((s) => s !== size)
                            )
                          }
                          className="ml-1 text-gray-500 hover:text-gray-700"
                        >
                          <X size={14} />
                        </button>
                      </motion.span>
                    );
                  })}
                  {selectedMaterials.map((material) => {
                    return (
                      <motion.span
                        key={material}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        <span
                          className="w-4 h-4 rounded-full"
                        />
                        {material}
                        <button
                          onClick={() =>
                            setSelectedMaterials((prev) =>
                              prev.filter((m) => m !== material)
                            )
                          }
                          className="ml-1 text-gray-500 hover:text-gray-700"
                        >
                          <X size={14} />
                        </button>
                      </motion.span>
                    );
                  })}
                  {selectedCategories.map((category) => {
                    return (
                      <motion.span
                        key={category}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        <span
                          className="w-4 h-4 rounded-full"
                        />
                        {category}
                        <button
                          onClick={() =>
                            setSelectedCategories((prev) =>
                              prev.filter((c) => c !== category)
                            )
                          }
                          className="ml-1 text-gray-500 hover:text-gray-700"
                        >
                          <X size={14} />
                        </button>
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              <AnimatePresence>
                {filteredProducts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-full text-center py-12"
                  >
                    <div className="text-gray-400 mb-4">
                      <Search size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-500">
                      Try adjusting your filters or search criteria
                    </p>
                    <button
                      onClick={clearAllFilters}
                      className="mt-4 text-[#72442c] hover:underline"
                    >
                      Clear all filters
                    </button>
                  </motion.div>
                ) : (
                  filteredProducts.map((product) => {
                    const discount = calculateDiscount(
                      product.actualPrice,
                      product.sellingPrice
                    );
                    const inWishlist = isInWishlist(product.name);

                    return (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
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
                                handleAddToCart(product);
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
                                handleAddToWishlist(product);
                              }}
                              className={`p-2 rounded-full shadow-lg cursor-pointer ${
                                inWishlist
                                  ? "text-red-500 bg-red-100"
                                  : "bg-white hover:bg-red-100"
                              }`}
                              aria-label={`Add ${product.name} to wishlist`}
                            >
                              <Heart fill={inWishlist ? "red" : "none"} />
                            </button>
                          </div>

                          {/* Mobile Icons */}
                          <div className="absolute bottom-4 left-4 sm:hidden">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToWishlist(product);
                              }}
                              className={`p-2 rounded-full shadow-lg cursor-pointer ${
                                inWishlist
                                  ? "text-red-500 bg-red-100"
                                  : "bg-white hover:bg-red-100"
                              }`}
                              aria-label={`Add ${product.name} to wishlist`}
                            >
                              <Heart fill={inWishlist ? "red" : "none"} />
                            </button>
                          </div>

                          <div className="absolute bottom-4 right-4 sm:hidden">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
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
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setShowMobileFilters(false)}
        />
      )}

      {/* Custom Scrollbar Styles */}
      <style>
        {`
          /* Webkit scrollbar styles */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: #f5f5f5;
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #72442c;
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #8d724a;
          }
        `}
      </style>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default ProductPage;
