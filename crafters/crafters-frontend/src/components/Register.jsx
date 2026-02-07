import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const Register = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-[#fef9f4] px-4 py-12 mt-10"
      >
        <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#72442c] text-center mb-6">Create Your Account</h2>

            {/* Registration Form */}
            <form>
              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  placeholder="Choose a username"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#72442c]"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#72442c]"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#72442c]"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#72442c]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#72442c] text-white py-2 rounded-md hover:bg-[#5c3623] transition mb-6"
              >
                Register
              </button>
            </form>

            {/* Social Sign-up Buttons Below Register */}
            <div className="flex flex-col gap-4 mb-4">
              <button className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-800 py-2 px-4 rounded-md shadow hover:bg-gray-100 transition">
                <FcGoogle size={20} />
                Sign up with Google
              </button>
              <button className="flex items-center justify-center gap-3 bg-[#3b5998] text-white py-2 px-4 rounded-md shadow hover:bg-[#334d84] transition">
                <FaFacebookF size={18} />
                Sign up with Facebook
              </button>
            </div>

            {/* Login Prompt */}
            <p className="mt-6 text-sm text-center text-gray-700">
              Already have an account? <NavLink to="/login" className="text-[#72442c] font-medium hover:underline">Login here</NavLink>
            </p>
          </div>
        </motion.div>
    </>
  );
};

export default Register;
