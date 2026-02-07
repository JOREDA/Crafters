import React from "react";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingCart as ShoppingCartIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../components/contexts";
import { NavLink } from "react-router-dom";

const ShoppingCart = ({ cartOpen, setCartOpen }) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-96 z-50 transform transition-transform duration-300 ${
        cartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {cartOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow-lg h-full flex flex-col"
        >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold text-[#72442c]">Your Cart</h2>
              <button onClick={() => setCartOpen(false)}>
                <X className="w-6 h-6 text-gray-700 cursor-pointer" />
              </button>
            </div>

            {/* Cart Items */}
            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-4">
                <ShoppingCartIcon className="w-24 h-24 text-gray-300 mb-4" />
                <p className="text-center text-gray-500 mt-2 text-lg">
                  Your cart is empty.
                </p>
                <NavLink
                  to="/shop"
                  className="mt-6 bg-[#72442c] text-white px-6 py-2 rounded hover:bg-[#5a361f] transition"
                  onClick={() => setCartOpen(false)}
                >
                  Return to Shop
                </NavLink>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col items-start">
                {cartItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-center border-b pb-2 space-x-4 w-full"
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/100"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>

                      <div className="flex items-center mt-2 space-x-2">
                        <button
                          onClick={() =>
                            item.quantity > 1 &&
                            updateQuantity(item.name, item.quantity - 1)
                          }
                          className="p-1 border rounded hover:bg-gray-200"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.name, item.quantity + 1)
                          }
                          className="p-1 border rounded hover:bg-gray-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <p className="font-semibold text-gray-800">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        (@ ₹{Number(item.price).toFixed(2)} each)
                      </p>
                      <button
                        onClick={() => removeFromCart(item.name)}
                        className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                      >
                        <Trash2 className="w-5 h-5" />
                        <span className="text-sm">Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex justify-between font-bold text-lg text-gray-800 mb-4">
                  <span>Total:</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>

                <NavLink to="/cart">
                  <button
                    className="w-full bg-[#72442c] text-white py-2 rounded mb-2 hover:bg-[#5a361f] transition cursor-pointer"
                    onClick={() => setCartOpen(false)}
                  >
                    View Cart
                  </button>
                </NavLink>

                <NavLink to="/checkout">
                  <button
                    className="w-full bg-[#72442c] text-white py-2 rounded hover:bg-[#5a361f] transition cursor-pointer"
                    onClick={() => setCartOpen(false)}
                  >
                    Checkout
                  </button>
                </NavLink>
              </div>
            )}
          </motion.div>
      )}
    </div>
  );
};

export default ShoppingCart;
