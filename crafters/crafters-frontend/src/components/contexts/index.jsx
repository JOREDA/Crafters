import React, { createContext, useContext, useState, useEffect } from 'react';
import Loader from '../Loader';

// ----- Cart Context -----
const CartContext = createContext();
export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cartItems)); }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.name === item.name);
      if (existingItem) {
        return prevItems.map(i => i.name === item.name ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i);
      }
      return [...prevItems, { ...item, quantity: item.quantity || 1, price: Number(item.price) }];
    });
  };

  const removeFromCart = (itemName) => setCartItems(prev => prev.filter(i => i.name !== itemName));
  const updateQuantity = (itemName, newQuantity) => {
    if (newQuantity < 1) { removeFromCart(itemName); return; }
    setCartItems(prev => prev.map(i => i.name === itemName ? { ...i, quantity: newQuantity } : i));
  };
  const clearCart = () => setCartItems([]);
  const getTotalPrice = () => cartItems.reduce((t,i)=>t + (Number(i.price)||0)*(Number(i.quantity)||0), 0);

  const value = { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// ----- Wishlist Context -----
const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);
export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlistItems)); }, [wishlistItems]);
  const addToWishlist = (item) => setWishlistItems(prev => prev.find(i=>i.name===item.name)?prev:[...prev,item]);
  const removeFromWishlist = (name) => setWishlistItems(prev => prev.filter(i=>i.name!==name));
  const clearWishlist = () => setWishlistItems([]);
  return <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, clearWishlist }}>{children}</WishlistContext.Provider>;
};

// ----- Loader Context -----
const LoaderContext = createContext();
export const useLoader = () => useContext(LoaderContext);
export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);
  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {isLoading && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
};

// ----- Auth Context -----
const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) { setIsAuthenticated(true); setUser(JSON.parse(userData)); }
  }, []);
  const login = (userData) => { localStorage.setItem('token', userData.token); localStorage.setItem('user', JSON.stringify(userData)); setIsAuthenticated(true); setUser(userData); };
  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); setIsAuthenticated(false); setUser(null); };
  return <AuthContext.Provider value={{ isAuthenticated, user, currentUser: user, login, logout }}>{children}</AuthContext.Provider>;
};

export default { CartProvider, WishlistProvider, LoaderProvider, AuthProvider };
