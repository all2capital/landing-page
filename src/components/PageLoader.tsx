"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./Logo";

// Pre-calculated positions to avoid hydration mismatch
const dotPositions = Array.from({ length: 12 }, (_, i) => ({
  left: `${(50 + 45 * Math.cos((i * 30 * Math.PI) / 180)).toFixed(2)}%`,
  top: `${(50 + 45 * Math.sin((i * 30 * Math.PI) / 180)).toFixed(2)}%`,
}));

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[var(--at-paper)] dark:bg-[var(--at-deep)] flex items-center justify-center"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo with animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
            >
              <Logo width={80} height={80} priority />
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-8 w-32 h-0.5 bg-[var(--at-rule)] dark:bg-[rgb(var(--at-paper-rgb)_/_0.16)] rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="h-full w-1/2 bg-[var(--at-ink)] dark:bg-[var(--at-paper)] rounded-full"
              />
            </motion.div>

            {/* Dither dots animation around logo */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.5, 0], scale: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                  className="absolute w-1.5 h-1.5 bg-[var(--at-ink-4)] dark:bg-[var(--at-mist)] rounded-full"
                  style={{
                    left: dotPositions[i].left,
                    top: dotPositions[i].top,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
