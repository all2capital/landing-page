"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavigationProps {
  onNavigate?: (slide: number) => void;
  currentSlide?: number;
}

const menuItems = [
  { label: "MANIFESTO", slide: 1 },
  { label: "INVESTMENTS", slide: 2 },
  { label: "TEAM", slide: 3 },
];

export default function Navigation({ onNavigate, currentSlide = 0 }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavigate = (slide: number) => {
    onNavigate?.(slide);
    setTimeout(() => setMenuOpen(false), 50);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[210]">
        {/* Gradient fade */}
        <div
          className={`absolute inset-0 h-28 pointer-events-none bg-gradient-to-b ${
            currentSlide === 0 && !menuOpen
              ? "from-black/50 via-black/20 to-transparent"
              : "from-black/30 to-transparent"
          }`}
        />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-5 sm:py-6 flex items-center justify-between">
          {/* Logo — left */}
          <button
            type="button"
            onClick={() => {
              onNavigate?.(0);
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 sm:gap-2.5 hover:opacity-70 transition-opacity touch-manipulation"
            aria-label="Go to home"
          >
            <img
              src="/logo-icon.png"
              alt=""
              className="h-5 sm:h-6 md:h-7 w-auto"
              style={{ filter: 'none', mixBlendMode: 'normal' }}
            />
            <span
              className="font-medium tracking-[0.12em] sm:tracking-[0.18em] text-xs min-[380px]:text-sm sm:text-lg md:text-xl text-white"
              style={{ fontFamily: '"Metropolis", sans-serif' }}
            >
              ALL TOGETHER CAPITAL
            </span>
          </button>

          {/* Hamburger — two equal lines */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex flex-col justify-center items-center gap-[6px] hover:opacity-70 transition-opacity touch-manipulation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className="block w-5 h-[2px] transition-transform duration-300 origin-center"
              style={{ transform: menuOpen ? "translateY(4px) rotate(45deg)" : "none", backgroundColor: '#ffffff' }}
            />
            <span
              className="block w-5 h-[2px] transition-transform duration-300 origin-center"
              style={{ transform: menuOpen ? "translateY(-4px) rotate(-45deg)" : "none", backgroundColor: '#ffffff' }}
            />
          </button>
        </div>
      </div>

      {/* Full-page menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6 sm:gap-8">
              {menuItems.map(({ label, slide }, i) => (
                <motion.button
                  key={label}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.06 }}
                  onClick={() => handleNavigate(slide)}
                  className={`text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.15em] transition-colors touch-manipulation ${
                    currentSlide === slide
                      ? "text-white"
                      : "text-white/50 hover:text-white/90"
                  }`}
                  style={{ fontFamily: '"Metropolis", sans-serif' }}
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
