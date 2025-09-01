import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Search, RefreshCcw, CheckCircle } from 'lucide-react';
import { Heart as HeartFilled } from 'lucide-react';
import Zoom from 'react-reveal/Zoom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { essentialProducts } from '../../data/products/essential';

const categoryName = "Essential";

const calculateDiscount = (actualPrice, sellingPrice) => {
  // Check if the prices are already numbers
  const actual = typeof actualPrice === 'number' ? actualPrice : parseInt(actualPrice.replace(/[^0-9]/g, ""));
  const selling = typeof sellingPrice === 'number' ? sellingPrice : parseInt(sellingPrice.replace(/[^0-9]/g, ""));
  const discount = ((actual - selling) / actual) * 100;
  return Math.round(discount);
};

const Essential = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { 
      state: { 
        product: {
          ...product,
          category: categoryName,
          mainImage: product.imageUrl
        } 
      } 
    });
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Prevent triggering the product click
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
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

  const handleWishlist = (e, product) => {
    e.stopPropagation(); // Prevent triggering the product click
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
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
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

  return (
    <div className="py-12 bg-[#f9f9f9] px-6 md:px-12 ">
      <div className="container mx-auto">
        {/* Category Name */}
        <div className="text-center mb-10">
          <h2 className="text-sm uppercase text-gray-500 tracking-wider">Category</h2>
          <h1 className="text-4xl font-bold text-[#333]">{categoryName}</h1>
          <div className="mt-3 w-24 h-1 bg-[#788c7c] mx-auto rounded-full"></div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {essentialProducts.map((product) => {
            const discount = calculateDiscount(product.actualPrice, product.sellingPrice);
            const isInWishlist = wishlistItems.some(item => item.name === product.name);
            
            return (
              <Zoom key={product.id}>
                <div 
                  className="group bg-white min-w-[250px] rounded-lg overflow-hidden shadow-md relative transition-transform hover:scale-105 cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="relative w-full h-64 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-[#72442c] to-[#8d724a] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg transform -rotate-12 backdrop-blur-sm">
                      {discount}% OFF
                    </div>
                    <div className="absolute bottom-[-50px] left-0 w-full flex justify-around opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-500 ease-in-out">
                      {product.inStock && (
                        <div 
                          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer"
                          onClick={(e) => handleAddToCart(e, product)}
                        >
                          <ShoppingCart />
                        </div>
                      )}
                      <div className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer">
                        <Search />
                      </div>
                      <div className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer">
                        <RefreshCcw />
                      </div>
                      <div 
                        className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer"
                        onClick={(e) => handleWishlist(e, product)}
                      >
                        {isInWishlist ? (
                          <HeartFilled className="text-red-500 fill-current" />
                        ) : (
                          <Heart className="text-gray-600" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-medium text-gray-800 text-sm">{product.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{product.description}</p>
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <span className="font-semibold text-gray-900 text-xl">{product.sellingPrice}</span>
                      <span className="line-through text-gray-500">{product.actualPrice}</span>
                    </div>
                  </div>
                </div>
              </Zoom>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Essential; 