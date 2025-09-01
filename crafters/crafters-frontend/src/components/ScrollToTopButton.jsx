import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 p-3 sm:p-4 bg-gradient-to-r from-[#72442c] to-[#e5d0b1] text-white rounded-full shadow-xl hover:scale-110 transition-transform duration-300 animate-[float_2s_ease-in-out_infinite]"
        aria-label="Scroll to top"
        style={{
          touchAction: "manipulation", // better on mobile
        }}
      >
        <ArrowUp size={24} strokeWidth={2.5} className="sm:size-7" />
      </button>
    )
  );
};

export default ScrollToTopButton;
