import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Search, RefreshCcw, CheckCircle, XCircle, Package, Clock, AlertTriangle, Truck, Calendar, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart, useWishlist } from '../components/contexts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';

// Import product images
import bambooLamp1 from "../assets/bamboo_lamp_2.jpg";
import bambooLamp2 from "../assets/bamboo_lamp.jpg";
import bambooTableLamp from "../assets/bamboo_table_lamp.jpg";
import product6 from "../assets/product_no_6.jpg";
import product7 from "../assets/product_no_7.jpg";

const OrdersPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Simulated orders data with actual images
    const fetchOrders = () => {
      const mockOrders = [
        {
          id: 'LAMP001',
          name: 'Modern Pendant Light',
          description: 'Contemporary pendant light with handcrafted bamboo shade.',
          actualPrice: 4999,
          sellingPrice: 3999,
          imageUrl: bambooLamp1,
          inStock: true,
          rating: 4.6,
          reviews: 145,
          status: 'Processing',
          orderDate: '2024-03-15',
          estimatedDelivery: '2024-03-20',
          trackingNumber: 'TN789012345'
        },
        {
          id: 'LAMP002',
          name: 'Artisan Table Lamp',
          description: 'Handwoven table lamp with natural fiber shade.',
          actualPrice: 2999,
          sellingPrice: 2499,
          imageUrl: bambooLamp2,
          inStock: true,
          rating: 4.4,
          reviews: 98,
          status: 'Delivered',
          orderDate: '2024-03-14',
          estimatedDelivery: '2024-03-19',
          trackingNumber: 'TN789012346'
        },
        {
          id: 'LAMP003',
          name: 'Bamboo Floor Lamp',
          description: 'Tall floor lamp with eco-friendly bamboo construction.',
          actualPrice: 5999,
          sellingPrice: 4799,
          imageUrl: bambooTableLamp,
          inStock: true,
          rating: 4.8,
          reviews: 167,
          status: 'Shipped',
          orderDate: '2024-03-13',
          estimatedDelivery: '2024-03-18',
          trackingNumber: 'TN789012347'
        }
      ];
      setOrders(mockOrders);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const calculateDiscount = (actualPrice, sellingPrice) => {
    const actual = typeof actualPrice === 'number' ? actualPrice : parseInt(actualPrice.replace(/[^0-9]/g, ""));
    const selling = typeof sellingPrice === 'number' ? sellingPrice : parseInt(sellingPrice.replace(/[^0-9]/g, ""));
    const discount = ((actual - selling) / actual) * 100;
    return Math.round(discount);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { 
      state: { 
        product: {
          ...product,
          category: "Lamp Shade",
          mainImage: product.imageUrl
        } 
      } 
    });
  };

  const handleCancelOrder = (order) => {
    setSelectedOrder(order);
    setShowCancelModal(true);
  };

  const confirmCancelOrder = () => {
    setOrders(orders.map(order => 
      order.id === selectedOrder.id 
        ? { ...order, status: 'Cancelled' }
        : order
    ));
    setShowCancelModal(false);
    toast.success('Order cancelled successfully', {
      icon: '🚫',
      position: 'bottom-right',
      style: { background: '#FEE2E2', color: '#991B1B' }
    });
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return <Package className="w-5 h-5" />;
      case 'shipped':
        return <Truck className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
      case 'cancelled':
        return <X className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'text-blue-500';
      case 'shipped':
        return 'text-green-500';
      case 'delivered':
        return 'text-green-700';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (selectedFilter === 'all') return true;
    return order.status.toLowerCase() === selectedFilter.toLowerCase();
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#788c7c]"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="py-12 bg-[#f9f9f9] px-6 md:px-12 pt-24 min-h-screen">
        <div className="container mx-auto">
          {/* Category Name with Animation */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-sm uppercase text-gray-500 tracking-wider">My Orders</h2>
            <h1 className="text-4xl font-bold text-[#333]">Ordered Products</h1>
            <div className="mt-3 w-24 h-1 bg-[#788c7c] mx-auto rounded-full"></div>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center gap-4 mb-8 flex-wrap"
          >
            {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105
                  ${selectedFilter === filter 
                    ? 'bg-[#788c7c] text-white shadow-lg' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredOrders.map((product, index) => {
                const discount = calculateDiscount(product.actualPrice, product.sellingPrice);
                
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="group bg-white rounded-lg overflow-hidden shadow-md relative transition-all duration-300 hover:shadow-xl">
                      {/* Image Container */}
                      <div className="relative w-full h-64 overflow-hidden cursor-pointer"
                           onClick={() => handleProductClick(product)}>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-2 left-2 w-12 h-12 bg-green-100 text-green-700 text-xs font-bold rounded-full shadow flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                          {discount}% OFF
                        </div>
                        <div className={`absolute top-2 right-2 px-4 py-1 rounded-full text-xs font-bold shadow border ${getStatusColor(product.status)} flex items-center gap-2`}>
                          {getStatusIcon(product.status)}
                          {product.status}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-medium text-gray-800 text-sm mb-2">{product.name}</h3>
                        <p className="text-xs text-gray-600 mb-3">{product.description}</p>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 text-xl">₹{product.sellingPrice}</span>
                            <span className="line-through text-gray-500 text-sm">₹{product.actualPrice}</span>
                          </div>
                        </div>

                        {/* Order Details */}
                        <div className="space-y-2 text-xs text-gray-600">
                          <div className="flex justify-between">
                            <span>Order Date:</span>
                            <span>{new Date(product.orderDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Expected Delivery:</span>
                            <span>{new Date(product.estimatedDelivery).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tracking Number:</span>
                            <span className="font-medium">{product.trackingNumber}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={() => handleProductClick(product)}
                            className="flex-1 bg-[#788c7c] text-white text-xs py-2 rounded-md hover:bg-[#5a6b5a] transition-colors duration-300"
                          >
                            View Details
                          </button>
                          {product.status === 'Processing' && (
                            <button
                              onClick={() => handleCancelOrder(product)}
                              className="flex-1 bg-red-50 text-red-600 text-xs py-2 rounded-md hover:bg-red-100 transition-colors duration-300"
                            >
                              Cancel Order
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Cancel Order Modal */}
          <AnimatePresence>
            {showCancelModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-lg p-6 max-w-md w-full"
                >
                  <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                      <X className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Cancel Order</h3>
                    <p className="text-sm text-gray-500 mb-6">
                      Are you sure you want to cancel this order? This action cannot be undone.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => setShowCancelModal(false)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-300"
                      >
                        Keep Order
                      </button>
                      <button
                        onClick={confirmCancelOrder}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
                      >
                        Yes, Cancel Order
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default OrdersPage; 