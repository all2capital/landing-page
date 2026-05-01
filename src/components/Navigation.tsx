"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavigationProps {
  onNavigate?: (slide: number) => void;
  currentSlide?: number;
}

const menuItems = [
  { num: "01", label: "Philosophy", slide: 1 },
  { num: "02", label: "Companies", slide: 2 },
  { num: "03", label: "Team", slide: 3 },
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

  // Wordmark + hamburger adapt to the page background.
  // Logo square (orange + white "at") stays the same on all pages.
  const isDarkSlide = currentSlide === 2;
  const logoColor = isDarkSlide ? "var(--at-paper)" : "var(--at-ink)";
  const menuLineColor = isDarkSlide ? "var(--at-paper)" : "var(--at-ink)";

  return (
    <>
      {/* Header spacer — only on home slide to reserve space */}
      {currentSlide === 0 && (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
          className="relative z-40 pt-safe"
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-4 sm:py-5 md:py-6 flex items-center justify-between">
            <div className="h-7 sm:h-8 md:h-8" />
            <div className="w-10 h-10 sm:w-11 sm:h-11" />
          </div>
        </motion.header>
      )}

      {/* Fixed top bar — logo + hamburger, transparent always */}
      <div
        className="fixed top-0 left-0 right-0 z-[210] pointer-events-none"
      >
        <div
          className="relative flex w-full items-center justify-between px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6"
        >
          {/* Logo — square mark only */}
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
            className="flex h-11 w-11 items-center justify-center bg-[var(--at-accent-primary)] touch-manipulation pointer-events-auto sm:h-12 sm:w-12"
            aria-label="All Together Capital — go to home"
          >
            <span
              className="text-[20px] font-medium leading-none text-white sm:text-[22px]"
              style={{ fontFamily: "var(--at-font-code)" }}
            >
              at
            </span>
          </button>

          {/* Centered wordmark — clickable, hidden on mobile */}
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
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center touch-manipulation pointer-events-auto sm:flex"
            style={{
              fontFamily: "var(--at-font-body)",
              color: logoColor,
            }}
            aria-label="All Together Capital — go to home"
          >
            <span className="text-[14px] font-medium uppercase leading-[1.1] tracking-[0.2em] sm:text-[15px]">
              All Together
            </span>
            <span className="mt-0.5 text-[9px] font-medium uppercase leading-[1.1] tracking-[0.32em] sm:text-[10px]">
              Capital
            </span>
          </button>

          {/* Hamburger / X */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center border-0 bg-transparent outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 touch-manipulation pointer-events-auto sm:h-12 sm:w-12"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="relative w-6 sm:w-7 h-5 flex flex-col justify-center items-center">
              <span
                className="absolute block w-6 sm:w-7 h-[2px] transition-all duration-300 origin-center"
                style={{
                  transform: menuOpen ? "rotate(45deg)" : "translateY(-4px)",
                  backgroundColor: menuLineColor,
                }}
              />
              <span
                className="absolute block w-6 sm:w-7 h-[2px] transition-all duration-300 origin-center"
                style={{
                  transform: menuOpen ? "rotate(-45deg)" : "translateY(4px)",
                  backgroundColor: menuLineColor,
                }}
              />
            </span>
          </button>
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
            className="fixed inset-0 z-[200] overflow-hidden bg-[var(--at-paper)]"
          >
            <div className="flex h-full min-h-[100svh] flex-col overflow-hidden pt-20 sm:pt-24 md:pt-28">
              <nav className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-5 sm:px-6 md:px-10 lg:px-16">
                {menuItems.map(({ num, label, slide }, i) => {
                  const isCurrent = currentSlide === slide;
                  return (
                    <motion.button
                      key={label}
                      type="button"
                      aria-current={isCurrent ? "page" : undefined}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1] as const,
                        delay: 0.1 + i * 0.06,
                      }}
                      onClick={() => handleMenuNavigate(slide)}
                      className={`group flex min-w-0 items-center gap-3 border-t border-[var(--at-rule)] py-4 text-left transition-colors duration-300 last:border-b sm:gap-7 sm:py-5 ${
                        isCurrent
                          ? "text-[var(--at-accent-primary)]"
                          : "text-[var(--at-ink)] hover:text-[var(--at-accent-primary)]"
                      }`}
                    >
                      <span
                        className={`flex w-8 shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] sm:w-14 sm:gap-2 sm:text-xs ${
                          isCurrent ? "text-[var(--at-accent-primary)]" : "text-[var(--at-ink-3)]"
                        }`}
                      >
                        <span>{num}</span>
                        {isCurrent && (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-current"
                          />
                        )}
                      </span>
                      <span className="min-w-0 font-sans text-[clamp(1.875rem,9.4vw,3.1rem)] font-medium uppercase leading-none tracking-normal sm:text-6xl md:text-7xl lg:text-[76px]">
                        {label}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`ml-auto hidden shrink-0 self-center font-mono text-lg transition-opacity duration-300 sm:block ${
                          isCurrent ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        →
                      </span>
                    </motion.button>
                  );
                })}
              </nav>

              <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-baseline justify-between gap-4 border-t border-[var(--at-rule)] px-5 py-6 sm:px-6 md:px-10 lg:px-16">
                <span className="font-display text-base italic text-[var(--at-ink)] sm:text-lg">
                  Founders first. We build, not just{" "}
                  <span className="text-[var(--at-accent-primary)]">invest.</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.04em] text-[var(--at-ink-3)] sm:text-xs">
                  © 2026 All Together Capital
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
