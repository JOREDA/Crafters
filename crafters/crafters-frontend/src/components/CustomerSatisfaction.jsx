import React from 'react';
import { Truck, RefreshCcw, ShieldCheck, HandHeart } from 'lucide-react';  // Using lucide-react icons
import { motion } from 'framer-motion';
const CustomerSatisfaction = () => {
  const items = [
    {
      icon: <HandHeart className="h-10 w-10 text-yellow-500 mb-2" />,
      title: 'Support Independent Brands',
      description: 'We connect you with local artisans and independent makers to ensure every purchase supports a dream.',
    },
    {
      icon: <RefreshCcw className="h-10 w-10 text-yellow-500 mb-2" />,
      title: 'Free Returns',
      description: 'Not happy with your order? Enjoy hassle-free returns within 30 days of purchase.',
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-yellow-500 mb-2" />,
      title: 'Secure Shopping',
      description: 'Shop with confidence with our end-to-end encrypted checkout process.',
    },
    {
      icon: <Truck className="h-10 w-10 text-yellow-500 mb-2" />,
      title: 'Fast Shipping',
      description: 'Get your orders quickly with our reliable and fast delivery service worldwide.',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 border-t border-b divide-y md:divide-y-0 md:divide-x">
          
        {items.map((item, index) => (
          <motion.div key={index} className="flex flex-col items-center text-center py-6 px-4" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {item.icon}
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </motion.div>
           
        ))}
      </div>
    </section>
  );
};

export default CustomerSatisfaction;
