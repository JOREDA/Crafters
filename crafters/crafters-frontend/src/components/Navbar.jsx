import React, { useState, useEffect } from "react";
import callIcon from "../assets/technology.svg";
import { ChevronDown, Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import Cart from "./ShoppingCart";
import { useWishlist } from "../components/contexts/WishlistContext"; 
import { useCart } from "../components/contexts/CartContext";
import { useAuth } from "../components/contexts/AuthContext";
import { toast } from 'react-toastify';
import SignUp from './SignUp';
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist(); 
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);

  const productCategories = [
    { name: "Storage Box", path: "/product/storage/box" },
    { name: "Laundry Bin", path: "/product/laundry/bin" },
    { name: "Lamps Shade", path: "/product/lamps/shade" },
    { name: "Home Decor", path: "/product/home/decor" },
    { name: "Flower Vase", path: "/product/flower/vase" },
    { name: "Essentials", path: "/product/essential" },
  ];

  const [dummyProducts, setDummyProducts] = useState([
    {
      id: 1,
      name: "Handcrafted Wooden Bowl",
      price: 499,
      quantity: 1,
    },
    {
      id: 2,
      name: "Colorful Fabric Tote Bag",
      price: 299,
      quantity: 2,
    },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate('/');
  };

  return (
    <>
      <div
        className={`w-full font-sans fixed top-0 left-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white shadow-md" 
            : "bg-[#e5d0b1] h-35 md:h-72 "
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-700">
            <div className="flex items-center space-x-3">
              <img src={callIcon} alt="Call Icon" className="w-12 h-12" />
              <div>
                <p
                  className={`font-semibold text-2xl ${
                    isScrolled ? "text-gray-800" : "text-[#72442c]"
                  }`}
                >
                  Call toll-free
                </p>
                <p
                  className={`text-2xl ${
                    isScrolled ? "text-gray-800" : "text-[#72442c]"
                  }`}
                >
                  +91 8084593583
                </p>
              </div>
            </div>

            <div>
              <p
                className={`font-semibold text-2xl ${
                  isScrolled ? "text-gray-800" : "text-[#72442c]"
                }`}
              >
                Any questions
              </p>
              <p
                className={`text-2xl ${
                  isScrolled ? "text-gray-800" : "text-[#72442c]"
                }`}
              >
                thecrafters.co.in@gmail.com
              </p>
            </div>
          </div>

          <div>
            <NavLink to="/">
              <img
                src={logo}
                alt="logo"
                className={`transition-all duration-300 ${
                  isScrolled
                    ? "h-12 w-12 md:h-20 md:w-20"
                    : "h-20 w-20 md:h-40 md:w-40"
                }`}
              />
            </NavLink>
          </div>

          <div className="flex items-center gap-4 text-[#72442c] text-lg">
            {/* Conditional rendering of LOGIN/REGISTER or LOGOUT */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="hidden md:inline-block font-bold mr-5 hover:text-black"
              >
                LOGOUT
              </button>
            ) : (
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `${isActive ? "font-bold underline" : "hover:text-black"} hidden md:inline-block font-bold mr-5`
                }
              >
              LOGIN / REGISTER 
              </NavLink>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden focus:outline-none mr-5"
              aria-label="Toggle menu"
            >
              <motion.div
                initial={false}
                animate={{ rotate: menuOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {menuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </motion.div>
            </button>

            <NavLink to="/search" className="mr-5">
              <Search
                className={`w-8 h-8 cursor-pointer text-lg ${
                  isScrolled ? "text-gray-800" : "text-[#72442c]"
                }`}
              />
            </NavLink>

        <div className="relative cursor-pointer mr-5">
  <NavLink to="/wishlist">
    <Heart
      className={`w-8 h-8 ${
        isScrolled ? "text-gray-800" : "text-[#72442c]"
      }`}
    />
    {wishlistItems?.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        {wishlistItems.length}
      </span>
    )}
  </NavLink>
</div>


          <div className="relative cursor-pointer mr-5" onClick={() => setCartOpen(true)}>
  <ShoppingBag className={`w-8 h-8 ${isScrolled ? "text-gray-800" : "text-[#72442c]"}`} />
  {cartItems?.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
      {cartItems.length }
    </span>
  )}
</div>

          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-[#e5d0b1] border-b border-[#72442c] overflow-hidden"
            >
              <motion.nav 
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex flex-col text-[#72442c] py-4 px-6 space-y-4 font-bold text-lg"
              >
                {["/", "/product", "/blog", "/about", "/contact"].map((path, idx) => {
                  const labels = ["HOME", "PRODUCTS", "BLOG", "ABOUT", "CONTACT US"];
                  return (
                    <motion.div
                      key={idx}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                    >
                      {path === "/product" ? (
                        <div>
                          <button
                            onClick={() => setProductMenuOpen(!productMenuOpen)}
                            className="flex items-center justify-between w-full hover:text-black"
                          >
                            <span>PRODUCTS</span>
                            <motion.div
                              animate={{ rotate: productMenuOpen ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="w-5 h-5" />
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {productMenuOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="mt-2 ml-4 space-y-2"
                              >
                                {productCategories.map((category, categoryIdx) => (
                                  <motion.div
                                    key={categoryIdx}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    transition={{ duration: 0.3, delay: categoryIdx * 0.1 }}
                                  >
                                    <NavLink
                                      to={category.path}
                                      onClick={() => {
                                        setProductMenuOpen(false);
                                        setMenuOpen(false);
                                      }}
                                      className={({ isActive }) =>
                                        isActive
                                          ? "border-l-4 border-[#72442c] pl-2 block"
                                          : "hover:text-black block"
                                      }
                                    >
                                      {category.name}
                                    </NavLink>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <NavLink
                          to={path}
                          onClick={() => setMenuOpen(false)}
                          className={({ isActive }) =>
                            isActive
                              ? "border-l-4 border-[#72442c] pl-2"
                              : "hover:text-black"
                          }
                        >
                          {labels[idx]}
                        </NavLink>
                      )}
                    </motion.div>
                  );
                })}
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center gap-10 py-3 border-b text-lg font-bold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isScrolled ? "text-gray-800 hover:text-black" : "text-[#72442c] hover:text-black"} ${
                isActive ? "border-b-2 border-[#72442c]" : ""
              }`
            }
          >
            HOME
          </NavLink>
          
          <div className="relative group">
            <NavLink
              to="/product"
              className={({ isActive }) =>
                `${isScrolled ? "text-gray-800 hover:text-black" : "text-[#72442c] hover:text-black"} ${
                  isActive ? "border-b-2 border-[#72442c]" : ""
                } flex items-center gap-1`
              }
            >
              PRODUCTS <ChevronDown className="w-4 h-4" />
            </NavLink>
            
            {/* Dropdown Menu */}
            <div className="absolute left-0 top-full mt-1 w-64 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="py-2">
                {productCategories.map((category) => (
                  <NavLink
                    key={category.path}
                    to={category.path}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-[#72442c] hover:bg-[#e5d0b1] transition-colors duration-200 ${
                        isActive ? "bg-[#e5d0b1]" : ""
                      }`
                    }
                  >
                    {category.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {[
            { to: "/blog", label: "BLOG" },
            { to: "/about", label: "ABOUT" },
            { to: "/contact", label: "CONTACT US" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${isScrolled ? "text-gray-800 hover:text-black" : "text-[#72442c] hover:text-black"} ${
                  isActive ? "border-b-2 border-[#72442c]" : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>

      <div style={{ height: isScrolled ? "120px" : "140px" }}></div>

      {cartOpen && (
        <Cart
          dummyProducts={dummyProducts}
          setDummyProducts={setDummyProducts}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
        />
      )}
    </>
  );
};

export default Navbar;
