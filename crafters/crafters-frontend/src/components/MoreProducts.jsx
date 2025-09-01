import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Zoom } from "react-reveal";
import { useCart } from "../components/contexts/CartContext";
import { useWishlist } from "../components/contexts/WishlistContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ShoppingCart,
  Search,
  RefreshCcw,
  Heart,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import image1 from "../assets/product_no_6.jpg";
import image2 from "../assets/product_no_7.jpg";
import image4 from "../assets/product_no_8.jpg";
import image5 from "../assets/product_no_9.jpg";
import image6 from "../assets/product_no_10.jpg";
import image7 from "../assets/product_no_11.jpg";
import image8 from "../assets/product_no_12.jpg";
import image9 from "../assets/product_no_13.jpg";
import image10 from "../assets/product_no_14.jpg";



const products = [
  {
    id: 6,
    name: "Classic Cotton Shirt",
    actualPrice: "₹2,499",
    sellingPrice: "₹1,999",
    description: "Comfortable, breathable cotton for daily wear.",
    imageUrl:
     image1,
    rating: 4.5,
    inStock: true,
  },
  {
    id: 7,
    name: "Elegant Floral Dress",
    actualPrice: "₹3,199",
    sellingPrice: "₹2,499",
    description: "Graceful and light, ideal for summer outings.",
    imageUrl:
     image2,
    rating: 4.7,
    inStock: true,
  },
  {
    id: 8,
    name: "Men's Casual Blazer",
    actualPrice: "₹4,999",
    sellingPrice: "₹3,799",
    description: "Perfect blend of comfort and elegance for casual events.",
    imageUrl: image4,
    rating: 4.6,
    inStock: false,
  },
  {
    id: 9,
    name: "Stylish Summer Hat",
    actualPrice: "₹999",
    sellingPrice: "₹699",
    description: "Protects you from the sun while keeping you stylish.",
    imageUrl: image4,
    
    rating: 4.2,
    inStock: true,
  },
  {
    id: 10,
    name: "Trendy Sneakers",
    actualPrice: "₹3,599",
    sellingPrice: "₹2,799",
    description: "Durable and sleek sneakers for everyday style.",
    imageUrl: image5,
      
    rating: 4.8,
    inStock: true,
  },
   {
    id: 11,
    name: "Trendy Sneakers",
    actualPrice: "₹3,599",
    sellingPrice: "₹2,799",
    description: "Durable and sleek sneakers for everyday style.",
    imageUrl: image6,
   
    rating: 4.8,
    inStock: true,
  },
   {
    id: 12,
    name: "Trendy Sneakers",
    actualPrice: "₹3,599",
    sellingPrice: "₹2,799",
    description: "Durable and sleek sneakers for everyday style.",
    imageUrl: image7,
   
    rating: 4.8,
    inStock: true,
  },
   {
    id: 13,
    name: "Trendy Sneakers",
    actualPrice: "₹3,599",
    sellingPrice: "₹2,799",
    description: "Durable and sleek sneakers for everyday style.",
    imageUrl: image8,
     
    rating: 4.8,
    inStock: true,
  },
   {
    id: 14,
    name: "Trendy Sneakers",
    actualPrice: "₹3,599",
    sellingPrice: "₹2,799",
    description: "Durable and sleek sneakers for everyday style.",
    imageUrl: image9,
    
    rating: 4.8,
    inStock: true,
  },
   {
    id: 15,
    name: "Trendy Sneakers",
    actualPrice: "₹3,599",
    sellingPrice: "₹2,799",
    description: "Durable and sleek sneakers for everyday style.",
    imageUrl: image10,
    rating: 4.8,
    inStock: true,
  },
];

const calculateDiscount = (actualPrice, sellingPrice) => {
  const actual = parseInt(actualPrice.replace(/[^0-9]/g, ""));
  const selling = parseInt(sellingPrice.replace(/[^0-9]/g, ""));
  const discount = ((actual - selling) / actual) * 100;
  return Math.round(discount);
};

const MoreProducts = () => {
  const { wishlistItems, addToWishlist } = useWishlist();
  const { addToCart } = useCart();
  const scrollRef = useRef();
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  const handleAddToWishlist = (product) => {
    if (!wishlistItems.some((item) => item.name === product.name)) {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`, {
        position: "top-right",
        icon: <Heart size={20} className="text-red-500" />,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: `wishlist-${product.id}-${Date.now()}`
      });
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { 
      state: { 
        product: {
          ...product,
          price: parseInt(product.sellingPrice.replace(/[^0-9]/g, "")),
          images: [product.imageUrl],
          mainImage: product.imageUrl,
          category: "More Products",
          description: product.description,
          features: [
            "High-quality material",
            "Durable construction",
            "Modern design",
            "Versatile usage"
          ],
          specifications: {
            "Material": "Premium Quality",
            "Style": "Contemporary",
            "Finish": "Smooth",
            "Care Instructions": "Easy to clean"
          }
        }
      }
    });
  };

  return (
    <div className="py-10 bg-[#f5f5f5] mt-5 px-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8 px-4">
          <div className="text-lg font-semibold">More Products</div>
          <NavLink to="/product">
            <button className="bg-[#72442c] hover:bg-[#8d724a] text-white px-6 py-2 rounded-full shadow-md transition-all">
              See More
            </button>
          </NavLink>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-200"
          >
            <ChevronLeft />
          </button>

          <div
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            ref={scrollRef}
          >
            {products.map((product) => {
              const discount = calculateDiscount(
                product.actualPrice,
                product.sellingPrice
              );
              const isInWishlist = wishlistItems.some(
                (item) => item.name === product.name
              );

              return (
                <Zoom key={product.id}>
                  <div className="group bg-white min-w-[250px] rounded-lg overflow-hidden shadow-md relative transition-transform hover:scale-105">
                    <div className="relative w-full h-64 overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="object-cover w-full h-full cursor-pointer"
                        onClick={() => handleProductClick(product)}
                      />
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg transform -rotate-12 backdrop-blur-sm">
                        {discount}% OFF
                      </div>
                      <div className="absolute bottom-[-50px] left-0 w-full flex justify-around opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-500 ease-in-out">
                        {product.inStock && (
                          <div
                            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                              addToCart({
                                id: product.id,
                                name: product.name,
                                price: parseInt(
                                  product.sellingPrice.replace(/[^0-9]/g, "")
                                ),
                                image: product.imageUrl,
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
                            }}
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
                          onClick={() => handleAddToWishlist(product)}
                        >
                          <Heart
                            className={
                              isInWishlist
                                ? "text-red-500 fill-red-500"
                                : "text-gray-600"
                            }
                          />
                        </div>
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
                        <span className="font-semibold text-gray-900 text-xl">
                          {product.sellingPrice}
                        </span>
                        <span className="line-through text-gray-500">
                          {product.actualPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </Zoom>
              );
            })}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-200"
          >
            <ChevronRight />
          </button>
        </div>
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
};

export default MoreProducts;
