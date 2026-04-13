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

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-5 sm:py-6 flex items-start">
          {/* Hamburger — top left */}
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

          {/* Brand name — centered, top-aligned with hamburger/email */}
          <button
            type="button"
            onClick={() => {
              onNavigate?.(0);
              setMenuOpen(false);
            }}
            className="absolute left-1/2 -translate-x-1/2 top-5 sm:top-6 flex flex-col items-center hover:opacity-70 transition-opacity touch-manipulation pt-[10px]"
            aria-label="Go to home"
          >
            <span
              className="font-medium tracking-[0.18em] sm:tracking-[0.22em] text-xs min-[380px]:text-sm sm:text-base text-white whitespace-nowrap leading-tight"
              style={{ fontFamily: '"Metropolis", sans-serif' }}
            >
              ALL TOGETHER
            </span>
            <span
              className="font-medium tracking-[0.22em] sm:tracking-[0.28em] text-[9px] min-[380px]:text-[10px] sm:text-xs text-white/70 whitespace-nowrap leading-tight"
              style={{ fontFamily: '"Metropolis", sans-serif' }}
            >
              CAPITAL
            </span>
          </button>

          {/* Email icon — top right */}
          <a
            href="mailto:robertneir@alltogethercapital.com,hisham@alltogethercapital.com"
            className="ml-auto w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity touch-manipulation"
            aria-label="Contact us via email"
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
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
