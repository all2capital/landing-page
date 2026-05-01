"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  { label: "Philosophy", href: "/philosophy" },
  { label: "Companies", href: "/companies" },
  { label: "Team", href: "/team" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  const handleMenuNavigate = (href: string) => {
    router.push(href);
    setTimeout(() => setMenuOpen(false), 50);
  };

  const handleHomeClick = () => {
    if (menuOpen) {
      router.push("/");
      setTimeout(() => setMenuOpen(false), 50);
    } else {
      router.push("/");
    }
  };

  const logoColor = "var(--at-ink)";
  const menuLineColor = "var(--at-ink)";

  return (
    <>
      {isHome && (
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

      <div
        className="fixed top-0 left-0 right-0 z-[210] bg-[var(--at-paper)] pointer-events-none"
      >
        <div
          className="relative flex w-full items-center justify-between px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6"
        >
          <button
            type="button"
            onClick={handleHomeClick}
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

          <button
            type="button"
            onClick={handleHomeClick}
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[200] overflow-hidden bg-[var(--at-paper)]"
          >
            <div className="flex h-full min-h-[100svh] items-center justify-center px-5 sm:px-6">
              <nav className="flex flex-col items-center gap-6 text-center sm:gap-8">
                {menuItems.map(({ label, href }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1] as const,
                      delay: 0.08 + i * 0.06,
                    }}
                  >
                    <Link
                      href={href}
                      onClick={() => handleMenuNavigate(href)}
                      className="font-sans text-[clamp(2.5rem,10vw,4.5rem)] font-medium uppercase leading-none tracking-normal text-[var(--at-ink)] transition-colors duration-300 hover:text-[var(--at-accent-primary)]"
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
