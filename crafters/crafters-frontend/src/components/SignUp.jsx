import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // 'success' or 'error'

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // No backend call here – just fake a successful registration
    setMessage("✅ Registration successful! Redirecting to login...");
    setMessageType("success");

    setFormData({
      fullName: "",
      email: "",
      password: "",
    });

    setTimeout(() => {
      setMessage("");
      navigate("/login");
    }, 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-[#fef9f4] px-4 py-12 mt-40"
    >
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#72442c] text-center mb-6">
            Create Your Account
          </h2>

          {message && (
            <div
              className={`mb-4 text-center py-2 px-4 rounded-md text-sm font-medium ${
                messageType === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Choose a username"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#72442c]"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#72442c]"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#72442c]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#72442c] text-white py-2 rounded-md hover:bg-[#5c3623] transition mb-6"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-700">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-[#72442c] font-medium hover:underline"
            >
              Login here
            </NavLink>
          </p>
        </div>
      </motion.div>
  );
};

export default SignUp;
