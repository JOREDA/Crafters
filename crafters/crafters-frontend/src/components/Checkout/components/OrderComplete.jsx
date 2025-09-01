import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const OrderComplete = ({ navigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6 py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[#72442c] flex justify-center"
      >
        <CheckCircle size={80} />
      </motion.div>
      <div>
        <h2 className="text-3xl font-semibold text-[#72442c]">Order Placed Successfully!</h2>
        <p className="text-gray-600 mt-2">Thank you for shopping with us.</p>
        <p className="text-gray-600">Your order will be delivered soon.</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')}
        className="bg-[#72442c] text-white px-8 py-3 rounded-md hover:bg-[#5a361f] transition duration-200"
      >
        Continue Shopping
      </motion.button>
    </motion.div>
  );
};

export default OrderComplete; 