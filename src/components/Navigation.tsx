"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface NavigationProps {
  onNavigate?: (slide: number) => void;
  currentSlide?: number;
}

const links = [
  { label: "Investments", slide: 1 },
  { label: "Team", slide: 2 },
];

export default function Navigation({ onNavigate, currentSlide = 0 }: NavigationProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative z-50"
    >
      <nav className="max-w-[1400px] mr-auto px-4 sm:px-6 md:px-10 lg:pl-16 lg:pr-12 h-14 sm:h-16 md:h-20 flex items-center gap-4 sm:gap-6 md:gap-8 min-h-[3.5rem]">
        <button
          type="button"
          onClick={() => onNavigate?.(0)}
          className="group flex items-center gap-2 shrink-0 text-left hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation cursor-pointer"
          aria-label="zBuffer Capital – go to home"
        >
          <Image src="/logo_small.jpeg" alt="" width={24} height={24} className="sm:w-7 sm:h-7" />
          <span className="text-lg sm:text-xl font-bold tracking-tight text-white">zBuffer Capital</span>
          <svg
            className="w-4 h-4 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity sm:w-4 sm:h-4"
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
        </button>

        <button
          onClick={() => onNavigate?.(0)}
          className={`text-sm font-medium transition-colors duration-200 py-2 -my-2 touch-manipulation ${
            currentSlide === 0
              ? "text-white"
              : "text-white/40 hover:text-white/70 active:text-white/70"
          }`}
        >
          Home
        </button>
        {links.map(({ label, slide }) => (
          <button
            key={label}
            onClick={() => onNavigate?.(slide)}
            className={`text-sm font-medium transition-colors duration-200 py-2 -my-2 touch-manipulation ${
              currentSlide === slide
                ? "text-white"
                : "text-white/40 hover:text-white/70 active:text-white/70"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
    </motion.header>
  );
}
