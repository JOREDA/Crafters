import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Initialize state from localStorage
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.name === item.name);
      if (existingItem) {
        return prevItems.map(i =>
          i.name === item.name
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      }
      return [...prevItems, { ...item, quantity: item.quantity || 1, price: Number(item.price) }];
    });
  };

  const removeFromCart = (itemName) => {
    setCartItems(prevItems => prevItems.filter(item => item.name !== itemName));
  };

  const updateQuantity = (itemName, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemName);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.name === itemName
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = Number(item.price);
      const itemQuantity = Number(item.quantity);
      return total + (itemPrice * itemQuantity);
    }, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
