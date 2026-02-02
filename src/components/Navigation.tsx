"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  onNavigate?: (slide: number) => void;
  currentSlide?: number;
}

const links = [
  { label: "Investments", slide: 1 },
  { label: "Team", slide: 2 },
];

const navItems = [
  { label: "Home", slide: 0 },
  ...links,
];

function NavLinks({
  currentSlide,
  onNavigate,
  onItemClick,
  className = "",
  baseItemClass,
  activeClass = "text-white",
  inactiveClass = "text-white/40 hover:text-white/70 active:text-white/70",
}: {
  currentSlide: number;
  onNavigate?: (slide: number) => void;
  onItemClick?: () => void;
  className?: string;
  baseItemClass?: string;
  activeClass?: string;
  inactiveClass?: string;
}) {
  return (
    <div className={className}>
      {navItems.map(({ label, slide }) => (
        <Button
          key={label}
          variant="ghost"
          size="default"
          onClick={() => {
            onNavigate?.(slide);
            onItemClick?.();
          }}
          className={`${baseItemClass ?? ""} ${currentSlide === slide ? activeClass : inactiveClass}`}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

export default function Navigation({ onNavigate, currentSlide = 0 }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const linkBaseClass =
    "h-auto min-h-[44px] sm:min-h-0 p-2 -m-2 sm:p-0 sm:py-2 sm:-my-2 text-xs sm:text-sm font-medium transition-colors duration-200 touch-manipulation rounded-none shadow-none hover:bg-transparent flex items-center w-full sm:w-auto justify-center sm:justify-start";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`relative z-50 pt-safe ${currentSlide === 0 ? "bg-gradient-to-b from-black/30 to-transparent" : ""}`}
    >
      <nav
        className="max-w-[1400px] mx-auto px-3 sm:px-6 md:px-10 lg:px-16 py-3 sm:py-4 min-h-[3.25rem] sm:min-h-[3.5rem] md:min-h-[5rem] flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        <Button
          type="button"
          variant="ghost"
          size="default"
          onClick={() => onNavigate?.(0)}
          className="group h-auto p-2 -m-2 min-h-[44px] min-w-[44px] sm:min-w-0 sm:min-h-0 sm:p-0 hover:bg-transparent hover:opacity-90 active:opacity-80 flex items-center gap-1.5 sm:gap-2 shrink-0 text-left touch-manipulation rounded-none shadow-none"
          aria-label="zBuffer Capital – go to home"
        >
          <Image src="/logo_small.jpeg" alt="" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 shrink-0" />
          <span className="inline-flex items-baseline gap-0.5 text-[11px] min-[380px]:text-xs sm:text-lg md:text-xl shrink-0">
            <span className="text-[0.7em] text-white leading-none shrink-0" style={{ fontFamily: '"Press Start 2P", monospace' }}>z</span>
            <span className="font-medium uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>BUFFER CAPITAL</span>
          </span>
          <svg
            className="w-4 h-4 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hidden sm:block"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </Button>

        {/* Desktop nav: visible from md up */}
        <div className="hidden md:flex items-center gap-1 sm:gap-4 lg:gap-8 flex-shrink-0">
          <NavLinks
            currentSlide={currentSlide}
            onNavigate={onNavigate}
            className="flex items-center gap-1 sm:gap-4 lg:gap-8"
            baseItemClass={linkBaseClass}
          />
        </div>

        {/* Mobile: hamburger button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setMenuOpen(true)}
          className="md:hidden min-h-[44px] min-w-[44px] rounded-none shadow-none hover:bg-white/10 text-white"
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <Menu className="w-6 h-6" strokeWidth={2} aria-hidden />
        </Button>
      </nav>

      {/* Mobile menu overlay + panel */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-[280px] bg-[#0c0c0f] border-l border-white/10 shadow-2xl md:hidden flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <span className="text-sm font-medium text-white/60">Menu</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setMenuOpen(false)}
                  className="min-h-[44px] min-w-[44px] rounded-none shadow-none hover:bg-white/10 text-white"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" strokeWidth={2} aria-hidden />
                </Button>
              </div>
              <div className="flex flex-col p-4 gap-1">
                <NavLinks
                  currentSlide={currentSlide}
                  onNavigate={onNavigate}
                  onItemClick={() => setMenuOpen(false)}
                  className="flex flex-col gap-1"
                  baseItemClass={`${linkBaseClass} justify-start py-4 text-base rounded-lg hover:bg-white/5`}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
