"use client";

import { motion } from "framer-motion";
import Logo from "./Logo";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 2 }}
        className="mb-6"
      >
        <Logo width={120} height={120} className="border-3 border-white rounded-sm" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 2.3 }}
        className="text-lg md:text-xl text-white/60 text-center max-w-md font-light tracking-wide"
      >
        Early-stage infrastructure for what comes next.
      </motion.p>
    </section>
  );
}
