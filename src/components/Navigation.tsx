"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface NavigationProps {
  onNavigate?: (slide: number) => void;
  currentSlide?: number;
}

const links = [
  { label: "Thesis", slide: 1 },
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
      <nav className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Image src="/logo_small.jpeg" alt="" width={28} height={28} />
          <span className="text-xl font-bold tracking-tight text-white">zBuffer</span>
        </div>

        <button
          onClick={() => onNavigate?.(0)}
          className={`text-sm font-medium transition-colors duration-200 ${
            currentSlide === 0
              ? "text-white"
              : "text-white/40 hover:text-white/70"
          }`}
        >
          Home
        </button>
        {links.map(({ label, slide }) => (
          <button
            key={label}
            onClick={() => onNavigate?.(slide)}
            className={`text-sm font-medium transition-colors duration-200 ${
              currentSlide === slide
                ? "text-white"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
    </motion.header>
  );
}
