import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderCompletePage = () => {
  // Fake order details for testing
  const orderDetails = {
    orderId: '#TC' + Math.floor(Math.random() * 10000),
    date: new Date().toLocaleDateString(),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    status: 'Processing',
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-40 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <CheckCircle className="w-20 h-20 text-green-500" />
              </motion.div>
            </div>
            <h1 className="text-3xl font-bold text-[#72442c] mb-4">
              Thank You For Your Order!
            </h1>
            <p className="text-gray-600 text-lg">
              Your order has been placed successfully.
            </p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-8 mb-8"
          >
            <div className="border-b pb-6 mb-6">
              <h2 className="text-2xl font-semibold text-[#72442c] mb-4">
                Order Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Order Number</p>
                  <p className="font-semibold">{orderDetails.orderId}</p>
                </div>
                <div>
                  <p className="text-gray-600">Date</p>
                  <p className="font-semibold">{orderDetails.date}</p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <p className="font-semibold text-[#72442c]">{orderDetails.status}</p>
                </div>
                <div>
                  <p className="text-gray-600">Estimated Delivery</p>
                  <p className="font-semibold">{orderDetails.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Order Timeline</h3>
              <div className="flex items-center text-green-500">
                <CheckCircle className="w-6 h-6" />
                <div className="h-1 w-full bg-green-500 mx-2" />
                <Package className="w-6 h-6" />
                <div className="h-1 w-full bg-gray-300 mx-2" />
                <Truck className="w-6 h-6 text-gray-400" />
                <div className="h-1 w-full bg-gray-300 mx-2" />
                <Calendar className="w-6 h-6 text-gray-400" />
              </div>
              <div className="grid grid-cols-4 text-sm">
                <div className="text-center text-green-500">
                  <p className="font-semibold">Order Placed</p>
                  <p>{orderDetails.date}</p>
                </div>
                <div className="text-center text-green-500">
                  <p className="font-semibold">Processing</p>
                  <p>In Progress</p>
                </div>
                <div className="text-center text-gray-400">
                  <p className="font-semibold">Shipped</p>
                  <p>Pending</p>
                </div>
                <div className="text-center text-gray-400">
                  <p className="font-semibold">Delivered</p>
                  <p>{orderDetails.estimatedDelivery}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/products"
              className="bg-[#72442c] text-white px-8 py-3 rounded-md hover:bg-[#5a361f] transition duration-200 text-center"
            >
              Continue Shopping
            </Link>
            <Link
              to="/account/orders"
              className="border border-[#72442c] text-[#72442c] px-8 py-3 rounded-md hover:bg-[#72442c] hover:text-white transition duration-200 text-center"
            >
              View All Orders
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderCompletePage; 