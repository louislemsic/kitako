"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [isPressed, setIsPressed] = useState(false);
  const scrollCheckInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup interval on unmount
      if (scrollCheckInterval.current) {
        clearInterval(scrollCheckInterval.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    // Set pressed state to trigger animation
    setIsPressed(true);
    
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Clear any existing interval
    if (scrollCheckInterval.current) {
      clearInterval(scrollCheckInterval.current);
    }

    // Check scroll position periodically until we reach the top
    scrollCheckInterval.current = setInterval(() => {
      // Check if we're at or very close to the top (within 5px to account for rounding)
      if (window.scrollY <= 5) {
        setIsPressed(false);
        if (scrollCheckInterval.current) {
          clearInterval(scrollCheckInterval.current);
          scrollCheckInterval.current = null;
        }
      }
    }, 16); // Check every ~16ms (roughly 60fps)

    // Fallback: reset after 2 seconds in case something goes wrong
    setTimeout(() => {
      setIsPressed(false);
      if (scrollCheckInterval.current) {
        clearInterval(scrollCheckInterval.current);
        scrollCheckInterval.current = null;
      }
    }, 2000);
  };

  return (
    <button
      onClick={scrollToTop}
      className={`flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-300 ${
        isPressed
          ? "bg-white text-bc-1"
          : "bg-white/10 text-white"
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6 transition-colors duration-300" />
    </button>
  );
}
