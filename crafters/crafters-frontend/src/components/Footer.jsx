import React from 'react';
import logo from '../assets/logo.png';
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#e5d0b1] text-white py-10 ">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div>
          <img src={logo} alt="Company Logo" className="mb-4 h-20 w-auto" />
          <p className="text-[#72442c] text-sm">
            Discover authentic handicraft products and handmade crafts created by skilled Indian artists. Shop eco-friendly bamboo products, traditional handmade items, and unique home decor online. Experience the charm of sustainable living with premium handmade products available exclusively at <b>The Crafters</b>.
          </p>
        </div>

        {/* Quick Links */}
        <div className='text-[#72442c]'>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><NavLink to="/" className="hover:text-[#c2642a] transition-colors">Home</NavLink></li>
            <li><NavLink to="/about" className="hover:text-[#c2642a] transition-colors">About</NavLink></li>
            <li><NavLink to="/products" className="hover:text-[#c2642a] transition-colors">Products</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-[#c2642a] transition-colors">Contact Us</NavLink></li>
          </ul>
        </div>

        {/* Support Links + Newsletter */}
        <div className='text-[#72442c]'>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 mb-4">
            <li><a href="#" className="hover:text-[#c2642a] transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-[#c2642a] transition-colors">Shipping & Returns</a></li>
            <li><NavLink to="/privacy-policy" className="hover:text-[#c2642a] transition-colors">Privacy Policy</NavLink></li>
            <li><NavLink to="/terms-and-conditions" className="hover:text-[#c2642a] transition-colors">Terms & Conditions</NavLink></li>
          </ul>

          {/* Newsletter */}
          <div>
            <h4 className="text-md font-semibold mb-2">Subscribe to our Newsletter</h4>
            <form className="flex flex-col sm:flex-row items-center sm:items-stretch">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-auto flex-1 px-3 py-2 rounded border border-black text-[#72442c] mb-3 sm:mb-0 sm:mr-2 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 rounded font-semibold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media */}
        <div className='text-[#72442c]'>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/profile.php?id=61576771466651" className="hover:text-[#c2642a] text-2xl"><FaFacebookF /></a>
            <a href="https://www.instagram.com/thecrafters.co.in" className="hover:text-[#c2642a] text-2xl"><FaInstagram /></a>
            <a href="https://www.linkedin.com/company/the-crafterss/" className="hover:text-[#c2642a] text-2xl"><FaLinkedin /></a>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-[#72442c] mt-10 pt-4 text-center text-sm text-[#72442c]">
        &copy; {new Date().getFullYear()} The Crafted Co. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
