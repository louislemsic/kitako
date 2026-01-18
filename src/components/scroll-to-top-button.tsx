"use client";

import { useState, useRef } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [isPressed, setIsPressed] = useState(false);
  const scrollHandlerRef = useRef<(() => void) | null>(null);
  const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToTop = () => {
    // Set pressed state to trigger animation
    setIsPressed(true);

    // Remove any existing scroll listener
    if (scrollHandlerRef.current) {
      window.removeEventListener("scroll", scrollHandlerRef.current);
    }

    // Clear any existing fallback timeout
    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
    }

    // Create scroll handler
    const handleScroll = () => {
      // Check if we're at or very close to the top (within 5px to account for rounding)
      if (window.scrollY <= 5) {
        setIsPressed(false);
        window.removeEventListener("scroll", handleScroll);
        scrollHandlerRef.current = null;

        // Clear fallback timeout if we reached the top
        if (fallbackTimeoutRef.current) {
          clearTimeout(fallbackTimeoutRef.current);
          fallbackTimeoutRef.current = null;
        }
      }
    };

    // Store handler reference for cleanup
    scrollHandlerRef.current = handleScroll;

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Fallback: reset after 2 seconds in case something goes wrong
    fallbackTimeoutRef.current = setTimeout(() => {
      setIsPressed(false);
      if (scrollHandlerRef.current) {
        window.removeEventListener("scroll", scrollHandlerRef.current);
        scrollHandlerRef.current = null;
      }
      fallbackTimeoutRef.current = null;
    }, 2000);
  };

  return (
    <button
      onClick={scrollToTop}
      className={`flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-300 ${
        isPressed ? "bg-white text-bc-1" : "bg-white/10 text-white"
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6 transition-colors duration-300" />
    </button>
  );
}
