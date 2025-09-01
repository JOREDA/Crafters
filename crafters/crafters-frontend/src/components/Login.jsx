import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Zoom from "react-reveal/Zoom";
import { useAuth } from "../components/contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setMessage("❌ " + error.message);
        setMessageType("error");
        return;
      }

      // Call the login function from AuthContext
      login(data);

      setMessage("✅ Login successful! Redirecting...");
      setMessageType("success");

      // Get the redirect path from session storage or default to home
      const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/';
      sessionStorage.removeItem('redirectAfterLogin'); // Clear the stored path

      setTimeout(() => {
        setMessage("");
        navigate(redirectPath); // redirect to the stored path
      }, 2000);
    } catch (err) {
      setMessage("❌ Something went wrong: " + err.message);
      setMessageType("error");
    }
  };

  return (
    <Zoom top>
      <div className="min-h-screen flex items-center justify-center bg-[#fef9f4] px-4 py-12 mt-10">
        <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#72442c] text-center mb-6">
            Welcome Back
          </h2>

          {/* Message popup */}
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

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">Email</label>
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
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#72442c]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#72442c] text-white py-2 rounded-md hover:bg-[#5c3623] transition mb-6"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-700">
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              className="text-[#72442c] font-medium hover:underline"
            >
              Sign up here
            </NavLink>
          </p>
        </div>
      </div>
    </Zoom>
  );
};

export { Login };
