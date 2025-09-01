import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, NavLink, useParams } from 'react-router-dom';
import {
  FaExchangeAlt,
  FaHeart,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaStar,
  FaShippingFast,
  FaAward,
  FaShieldAlt,
  FaUndo,
} from 'react-icons/fa';
import ReactImageMagnify from 'react-image-magnify';
import CategoryProducts from './CategoryProducts';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import { Heart, ShoppingCart, CheckCircle } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductDetails() {
  const { id: productSlug } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(state?.product);
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loadProduct = async () => {
      if (!product) {
        try {
          // Try to load all product files
          const productFiles = {
            'home-decor': await import('../Products/HomeDecor.jsx'),
            'storage': await import('../Products/StorageBox.jsx'),
            'laundry': await import('../Products/laundryBin.jsx'),
            'lamp': await import('../Products/LampShade.jsx'),
            'flower-vase': await import('../Products/FlowerVase.jsx'),
            'essential': await import('../Products/Essential.jsx')
          };

          // Search for the product in all files
          let foundProduct = null;
          for (const [category, module] of Object.entries(productFiles)) {
            const found = module.products.find(p => {
              const slug = p.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
              return slug === productSlug;
            });

            if (found) {
              foundProduct = {
                ...found,
                mainImage: found.imageUrl,
                sellingPrice: found.price,
                actualPrice: (found.price * 1.25).toFixed(2),
                category: category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
              };
              break;
            }
          }

          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            navigate('/');
          }
        } catch (error) {
          console.error('Error loading product:', error);
          navigate('/');
        }
      }
    };

    loadProduct();
  }, [productSlug, navigate, product]);

  // Get the product image, handling both image and imageUrl properties
  const getProductImage = () => {
    if (!product) return null;
    return product.image || product.imageUrl || product.mainImage;
  };

  // Create an array of images for the product
  const productImages = [
    getProductImage(),
    getProductImage(), // You can add more image variations here
    getProductImage()
  ].filter(Boolean); // Filter out any undefined values

  const [selectedImage, setSelectedImage] = useState(getProductImage());
  const [activeTab, setActiveTab] = useState('description');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isInWishlist = wishlistItems.some(item => item.name === product.name);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: getProductImage(),
      quantity: quantity
    });

    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      icon: <CheckCircle color="green" size={20} />,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleWishlist = () => {
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
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: getProductImage(),
      });
      toast.success(`${product.name} added to wishlist!`, {
        position: "top-right",
        icon: <Heart size={20} />,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.warning('Please sign in to continue with purchase', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Add item to cart before redirecting
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: getProductImage(),
        quantity: quantity
      });

      // Store both the current page and the checkout as redirect destinations
      sessionStorage.setItem('redirectAfterLogin', '/checkout');
      sessionStorage.setItem('previousPage', location.pathname);
      
      navigate('/signup');
      return;
    }

    // If authenticated, add to cart and go to checkout
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: getProductImage(),
      quantity: quantity
    });
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-4 mt-20 sm:mt-40">
     
      <div className="flex items-center gap-2 mb-6 text-xs sm:text-sm">
        <NavLink to="/" className="text-[#72442c] hover:text-[#8d724a]">
          Home
        </NavLink>
        <span>/</span>
        <NavLink to="/products" className="text-[#72442c] hover:text-[#8d724a]">
          Products
        </NavLink>
        <span>/</span>
        <span className="text-gray-600">{product.name}</span>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Left: Images */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full lg:w-auto">
          {/* Images Section */}
          <div className="flex flex-row sm:flex-col gap-4 order-2 sm:order-1">
            <div className="flex flex-row sm:flex-col gap-4 overflow-x-auto sm:overflow-x-visible">
              {productImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`min-w-[80px] w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-lg overflow-hidden cursor-pointer border-2 ${
                    selectedImage === img ? 'border-[#72442c]' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full sm:w-[400px] md:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] relative order-1 sm:order-2">
            <div className="absolute inset-0">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: product.name,
                    isFluidWidth: false,
                    src: selectedImage || getProductImage(),
                    width: 600,
                    height: 600,
                  },
                  largeImage: {
                    src: selectedImage || getProductImage(),
                    width: 1200,
                    height: 1200,
                  },
                  enlargedImagePosition: "over",
                  isHintEnabled: true,
                  shouldHideHintAfterFirstActivation: false,
                  enlargedImageContainerDimensions: {
                    width: '200%',
                    height: '200%'
                  },
                  imageClassName: "w-full h-full object-cover rounded-lg",
                  enlargedImageClassName: "rounded-lg",
                  lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' }
                }}
              />
            </div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{product.name}</h1>
              <span className="text-base sm:text-lg text-gray-500">({product.category})</span>
            </div>
          </div>

          {/* Highlights Banner */}
          <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between bg-[#f8f5f1] p-4 rounded-lg mb-6 gap-4">
            <div className="flex items-center gap-2 text-[#72442c]">
              <FaShippingFast size={20} sm:size={24} />
              <span className="text-xs sm:text-sm font-medium">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-[#72442c]">
              <FaAward size={20} sm:size={24} />
              <span className="text-xs sm:text-sm font-medium">100% Authentic</span>
            </div>
            <div className="flex items-center gap-2 text-[#72442c]">
              <FaShieldAlt size={20} sm:size={24} />
              <span className="text-xs sm:text-sm font-medium">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-[#72442c]">
              <FaUndo size={20} sm:size={24} />
              <span className="text-xs sm:text-sm font-medium">10 Days Return</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-400 line-through text-lg sm:text-xl">
                {product.actualPrice}
              </span>
              <span className="text-[#72442c] text-3xl sm:text-4xl font-bold">
                {product.sellingPrice}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="qty" className="text-lg sm:text-xl font-medium">
                Quantity:
              </label>
              <div className="flex items-center border-2 rounded-md">
                <button
                  className="px-3 sm:px-4 py-2 border-r hover:bg-gray-100 text-base sm:text-lg"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-4 sm:px-6 py-2 text-base sm:text-lg font-medium">{quantity}</span>
                <button
                  className="px-3 sm:px-4 py-2 border-l hover:bg-gray-100 text-base sm:text-lg"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-base sm:text-lg mb-6">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-4 text-[#72442c]">
              <button className="hover:text-[#8d724a] transition-colors">
                <FaFacebook size={24} sm:size={28} />
              </button>
              <button className="hover:text-[#8d724a] transition-colors">
                <FaTwitter size={24} sm:size={28} />
              </button>
              <button className="hover:text-[#8d724a] transition-colors">
                <FaWhatsapp size={24} sm:size={28} />
              </button>
              <button className="flex items-center gap-2 hover:text-[#8d724a] transition-colors">
                <FaExchangeAlt size={24} sm:size={28} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t">
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-[#8d724a] text-white px-4 sm:px-6 py-3 sm:py-4 rounded text-lg sm:text-xl font-semibold flex items-center justify-center gap-3 hover:bg-[#72442c] transition-colors"
            >
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#72442c] text-white px-4 sm:px-6 py-3 sm:py-4 rounded text-lg sm:text-xl font-semibold flex items-center justify-center gap-3 hover:bg-[#8d724a] transition-colors"
            >
              <ShoppingCart size={20} sm:size={24} />
              Add to Cart
            </button>
            <button
              onClick={handleWishlist}
              className={`px-4 sm:px-6 py-3 sm:py-4 rounded flex items-center justify-center transition-colors ${
                isInWishlist 
                ? 'text-red-500 hover:bg-red-50' 
                : 'text-[#72442c] hover:bg-[#72442c] hover:text-white'
              }`}
            >
              <Heart
                size={28} sm:size={32}
                className={isInWishlist ? 'fill-current' : ''}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Description and Reviews Tabs */}
      <div className="mt-8 sm:mt-12">
        <div className="border-b">
          <div className="flex space-x-4 sm:space-x-8">
            <button
              className={`pb-3 sm:pb-4 text-base sm:text-lg font-medium ${
                activeTab === 'description'
                  ? 'border-b-2 border-[#72442c] text-[#72442c]'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`pb-3 sm:pb-4 text-base sm:text-lg font-medium ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-[#72442c] text-[#72442c]'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>
        </div>

        <div className="py-4 sm:py-6">
          {activeTab === 'description' ? (
            <div className="prose max-w-none">
              <p className="text-base sm:text-lg">{product.description}</p>
              {product.features && (
                <div className="mt-4 sm:mt-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Features</h3>
                  <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-base sm:text-lg">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                Be the first to review "{product.name}"
              </h2>
              <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-base sm:text-lg font-medium mb-1">
                    Your Rating
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={24} sm:size={28}
                        className="cursor-pointer"
                        color={
                          (hoverRating || rating) >= star ? '#fbbf24' : '#d1d5db'
                        }
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="reviewText" className="block text-base sm:text-lg font-medium mb-1">
                    Your Review
                  </label>
                  <textarea
                    id="reviewText"
                    className="w-full border rounded px-3 py-2 text-sm sm:text-base h-24 sm:h-32"
                    placeholder="Write your review here"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="reviewName" className="block text-base sm:text-lg font-medium mb-1">
                      Name
                    </label>
                    <input
                      id="reviewName"
                      type="text"
                      className="w-full border rounded px-3 py-2 text-sm sm:text-base"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="reviewEmail" className="block text-base sm:text-lg font-medium mb-1">
                      Email
                    </label>
                    <input
                      id="reviewEmail"
                      type="email"
                      className="w-full border rounded px-3 py-2 text-sm sm:text-base"
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input id="saveInfo" type="checkbox" className="mr-2" />
                  <label htmlFor="saveInfo" className="text-sm sm:text-base">
                    Save my name, email, and website in this browser for the next time I comment.
                  </label>
                </div>

                <button type="submit" className="bg-[#72442c] text-white px-4 sm:px-6 py-2 sm:py-3 rounded text-base sm:text-lg">
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Category Products Section */}
      <div className="mt-8 sm:mt-16 border-t pt-6 sm:pt-10">
        <CategoryProducts currentProduct={product} />
      </div>

      {/* Continue Shopping button */}
      <NavLink
        to="/products"
        className="inline-block bg-[#72442c] text-white px-4 sm:px-6 py-2 rounded text-sm sm:text-base hover:bg-[#8d724a] mt-4 sm:mt-6"
      >
        Continue Shopping
      </NavLink>

      <ToastContainer />
    </div>
  );
}

export default ProductDetails;
