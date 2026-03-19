"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


interface NavigationProps {
  onNavigate?: (slide: number) => void;
  currentSlide?: number;
}

const menuItems = [
  { label: "Manifesto", slide: 1 },
  { label: "Investments", slide: 2 },
  { label: "Team", slide: 3 },
];

export default function Navigation({ onNavigate, currentSlide = 0 }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  const handleMenuNavigate = (slide: number) => {
    // Navigate first — page swaps under the menu overlay
    onNavigate?.(slide);
    // Then close the menu to reveal the new page
    setTimeout(() => setMenuOpen(false), 50);
  };

  return (
    <>
      {/* Header spacer — only on home slide to reserve space */}
      {currentSlide === 0 && (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
          className="relative z-40 pt-safe bg-gradient-to-b from-black/30 to-transparent"
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-4 sm:py-5 md:py-6 flex items-center justify-between">
            <div className="h-7 sm:h-8 md:h-8" />
            <div className="w-10 h-10 sm:w-11 sm:h-11" />
          </div>
        </motion.header>
      )}

      {/* Fixed top bar — logo + hamburger, aligned to content grid */}
      <div
        className={`fixed top-0 left-0 right-0 z-[210] pointer-events-none transition-colors duration-300 ${
          menuOpen || currentSlide !== 0 ? "bg-white dark:bg-[#181818]" : ""
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-4 sm:py-5 md:py-6 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => {
              if (menuOpen) {
                onNavigate?.(0);
                setTimeout(() => setMenuOpen(false), 50);
              } else {
                onNavigate?.(0);
              }
            }}
            className="flex items-center gap-2 sm:gap-2.5 hover:opacity-80 transition-opacity touch-manipulation pointer-events-auto"
            aria-label="All2 Capital — go to home"
          >
            <span
              className={`font-medium tracking-[0.12em] sm:tracking-[0.2em] text-sm min-[380px]:text-base sm:text-lg md:text-xl transition-colors duration-300 ${
                menuOpen || currentSlide !== 0 ? "text-black dark:text-white" : "text-white"
              }`}
              style={{ fontFamily: '"Metropolis", sans-serif' }}
            >
              ALL2 CAPITAL
            </span>
          </button>

          {/* Hamburger / X */}
          <div className={`flex items-center pointer-events-auto ${
            menuOpen || currentSlide !== 0 ? "text-neutral-800 dark:text-white" : "text-white"
          }`}>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center hover:opacity-70 transition-opacity touch-manipulation"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className="relative w-6 sm:w-7 h-5 flex flex-col justify-center items-center">
                <span
                  className="absolute block w-6 sm:w-7 h-[2px] bg-current transition-all duration-300 origin-center"
                  style={{ transform: menuOpen ? "rotate(45deg)" : "translateY(-6px)" }}
                />
                <span
                  className="absolute block w-6 sm:w-7 h-[2px] bg-current transition-all duration-300"
                  style={{ opacity: menuOpen ? 0 : 1 }}
                />
                <span
                  className="absolute block w-6 sm:w-7 h-[2px] bg-current transition-all duration-300 origin-center"
                  style={{ transform: menuOpen ? "rotate(-45deg)" : "translateY(6px)" }}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Full-page menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[200] bg-white dark:bg-[#181818] flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
              {menuItems.map(({ label, slide }, i) => (
                <motion.button
                  key={label}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 + i * 0.06 }}
                  onClick={() => handleMenuNavigate(slide)}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-700 dark:text-white hover:text-black dark:hover:text-white transition-colors touch-manipulation"
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
