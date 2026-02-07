import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useCart, useAuth } from '../components/contexts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const { currentUser } = useAuth();

  const handleRemoveFromCart = (itemName) => {
    removeFromCart(itemName);
    toast.info(`${itemName} removed from cart!`);
  };

  const handleQuantityChange = (itemName, newQuantity) => {
    updateQuantity(itemName, newQuantity);
  };

  const handleProceedToCheckout = () => {
    if (!currentUser) {
      toast.warning('Please sign in to proceed with checkout');
      // Store the cart state or intended destination
      sessionStorage.setItem('redirectAfterLogin', '/checkout');
      navigate('/signup');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] pt-24">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
            <button
              onClick={() => navigate('/')}
              className="bg-[#788c7c] text-white px-6 py-2 rounded-md hover:bg-[#5c6c5c] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-lg shadow-md p-4 mb-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden">
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.name, item.quantity - 1)}
                            className="p-1 rounded-md hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.name, item.quantity + 1)}
                            className="p-1 rounded-md hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item.name)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-lg font-bold">₹{getTotalPrice()}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full bg-[#788c7c] text-white px-6 py-3 rounded-md hover:bg-[#5c6c5c] transition-colors mt-6"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CartPage; 