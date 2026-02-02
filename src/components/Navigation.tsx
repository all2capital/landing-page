"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  onNavigate?: (slide: number) => void;
  currentSlide?: number;
}

const navItems = [
  { label: "Home", slide: 0 },
  { label: "Investments", slide: 1 },
  { label: "Team", slide: 2 },
];

export default function Navigation({ onNavigate, currentSlide = 0 }: NavigationProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`relative z-50 pt-safe ${currentSlide === 0 ? "bg-gradient-to-b from-black/30 to-transparent" : ""}`}
    >
      <nav
        className="max-w-[1400px] mx-auto px-3 sm:px-6 md:px-10 lg:px-16 py-3 sm:py-4 min-h-[3.25rem] sm:min-h-[3.5rem] md:min-h-[5rem] flex items-center justify-between gap-2 sm:gap-4"
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
          <span className="font-medium tracking-[0.1em] sm:tracking-[0.2em] text-white text-sm min-[380px]:text-base sm:text-lg md:text-xl shrink-0" style={{ fontFamily: '"Jura", sans-serif' }}>
            zBUFFER CAPITAL
          </span>
        </Button>

        {/* Nav links — always visible inline */}
        <div className="flex items-center gap-1 min-[380px]:gap-2 sm:gap-4 lg:gap-8 flex-shrink-0">
          {navItems.map(({ label, slide }) => (
            <Button
              key={label}
              variant="ghost"
              size="default"
              onClick={() => onNavigate?.(slide)}
              className={`h-auto min-h-[44px] sm:min-h-0 px-1.5 min-[380px]:px-2 sm:px-0 py-2 text-xs min-[380px]:text-sm sm:text-sm font-medium transition-colors duration-200 touch-manipulation rounded-none shadow-none hover:bg-transparent ${
                currentSlide === slide
                  ? "text-white"
                  : "text-white/40 hover:text-white/70 active:text-white/70"
              }`}
            >
              {label}
            </Button>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
