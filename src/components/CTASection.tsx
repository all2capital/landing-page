"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function CTASection() {
  return (
    <section className="py-24 md:py-40 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-neutral-800/40 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-neutral-800/40 to-transparent rounded-full blur-3xl"
      />

      {/* Dither pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="cta-dots" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <Image
            src="/logo.png"
            alt="zBuffer"
            width={60}
            height={60}
            className="mx-auto invert opacity-80"
          />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-6 max-w-3xl mx-auto leading-tight"
        >
          Building something?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12"
        >
          We back founders at the earliest stages. If you&apos;re working on infrastructure
          that will power the next generation of technology, we want to hear from you.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="btn-elegant-primary px-8 py-4 bg-white/90 dark:bg-white/90 text-black font-medium rounded-lg backdrop-blur-sm"
          >
            Get Investment
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
