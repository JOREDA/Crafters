// AppRouterPage.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages
import Home from '../../pages/HomePage';
// import  AboutPage  from '../../pages/AboutPage';

export default function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
         {/* <Route path="/about" element={<AboutPage />} /> */}
        {/* Optional: 404 Page */}
        {/* <Route path="*" element={<h1 className="text-center mt-10">404 - Page Not Found</h1>} /> */}
      </Routes>
    </Router>
  );
}
