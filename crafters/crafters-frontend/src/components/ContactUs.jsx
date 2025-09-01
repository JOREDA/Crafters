import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { supabase } from "./../supabaseClient";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('contact_us')
      .insert([formData]);

    if (error) {
      console.error("Supabase insert error:", error);
      alert("Failed to send message. Please try again.");
    } else {
      alert("Message sent successfully!");
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="bg-gradient-to-b from-white to-[#f8f5f1]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#72442c] mb-4">
            Get in Touch
          </h1>
          <div className="w-20 h-1 bg-[#aee9ba] mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or services? We're here to help
            and answer any questions you might have.
          </p>
        </motion.div>

        {/* Contact Information Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={staggerContainer}
          initial="initial"
          animate="animate">
          {[
            {
              icon: <FaPhoneAlt className="text-white text-xl" />,
              title: "Call Us",
              info: "+91 8084593583",
              subInfo: "Mon-Fri, 9am-6pm IST",
            },
            {
              icon: <FaEnvelope className="text-white text-xl" />,
              title: "Email Us",
              info: "thecrafters.co.in@gmail.com",
              subInfo: "24/7 Support",
            },
            {
              icon: <FaMapMarkerAlt className="text-white text-xl" />,
              title: "Visit Us",
              info: "Sunita Sadan, 2nd Floor",
              subInfo: "Pradhan Lane, Ranchi",
            },
            {
              icon: <FaClock className="text-white text-xl" />,
              title: "Working Hours",
              info: "Mon - Fri: 9am - 6pm",
              subInfo: "Sat: 10am - 4pm",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={fadeIn}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#72442c] rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="ml-4 font-semibold text-lg">{item.title}</h3>
              </div>
              <p className="text-gray-600">{item.info}</p>
              <p className="text-sm text-gray-500 mt-2">{item.subInfo}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>
            <h2 className="text-2xl font-bold text-[#72442c] mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#72442c] focus:border-transparent transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#72442c] focus:border-transparent transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#72442c] focus:border-transparent transition-all duration-300"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#72442c] focus:border-transparent transition-all duration-300"
                  placeholder="Your message..."></textarea>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-[#72442c] text-white py-3 px-6 rounded-lg hover:bg-[#8d724a] transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Map and Social Links */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>
            {/* Map */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9022032588834!2d85.33472641429748!3d23.344101384760736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e11cf76438c3%3A0x7b6f1dc3d75015cc!2sRanchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1665498797923!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="w-full"></iframe>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-[#72442c] mb-6">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                  (Icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="w-10 h-10 bg-[#72442c] rounded-full flex items-center justify-center text-white hover:bg-[#8d724a] transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}>
                      <Icon />
                    </motion.a>
                  )
                )}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-[#72442c] mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {[
                  {
                    question: "How can I track my order?",
                    answer:
                      "You can track your order by logging into your account and visiting the 'My Orders' section. You'll find detailed tracking information there.",
                  },
                  {
                    question: "What is your return policy?",
                    answer:
                      "We offer a 7-day return policy on most products. Items must be unused and in their original packaging. Please check specific product pages for detailed return policies.",
                  },
                  {
                    question: "Do you offer international shipping?",
                    answer:
                      "Currently, we ship only within India. We're working on expanding our shipping services internationally and will announce when it's available.",
                  },
                ].map((faq, index) => (
                  <motion.details key={index} className="group" initial={false}>
                    <summary className="flex items-center justify-between cursor-pointer p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300">
                      <span className="font-medium">{faq.question}</span>
                      <span className="transform group-open:rotate-180 transition-transform duration-300">
                        ▼
                      </span>
                    </summary>
                    <p className="mt-4 px-4 text-gray-600">{faq.answer}</p>
                  </motion.details>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
