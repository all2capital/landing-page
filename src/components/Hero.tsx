"use client";

import { motion } from "framer-motion";
import { OrbitsBackground } from "@/components/ui/orbits";
import { Particles } from "@/components/ui/particles";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

export default function Hero() {
  return (
    <section className="relative h-[calc(100vh-100px)] flex items-center justify-center overflow-hidden pt-16">
      {/* Interactive grid — extremely subtle hover/proximity glow */}
      <InteractiveGridPattern
        className="absolute inset-0 z-0 bg-transparent pointer-events-auto"
        cellSize={28}
        glowColor="rgba(148, 163, 184, 0.14)"
        borderColor="rgba(71, 85, 105, 0.14)"
        proximity={80}
        effectIntensity={0.22}
        centerGlowOpacity={0}
        hideVignette
      />

      {/* Shooting stars - streak from edges with gradient trails (neir.me style) */}
      <ShootingStars
        className="absolute inset-0 z-0 bg-transparent pointer-events-none"
        minSpeed={3}
        maxSpeed={10}
        minDelay={4000}
        maxDelay={12000}
        starColor="#ffffff"
        trailColor="#94a3b8"
        starWidth={10}
        starHeight={2}
        starOpacity={0.28}
        topBias={0.7}
        topAngleRange={[35, 145]}
      />

      {/* Orbits - centered on h1, large radius so they don't overlap text, no center star */}
      <OrbitsBackground
        className="absolute inset-0 z-0"
        transparentBackground
        minRadiusFraction={0.6}
        count={8}
        color="#06b6d4"
        speed={1}
        inclinationDegrees={75}
      />

      {/* Particles - floating dots with mouse magnetism, transparent so grid/orbits show through */}
      <Particles
        className="absolute inset-0 z-0 bg-transparent pointer-events-none"
        quantity={80}
        staticity={200}
        ease={50}
        color="#ffffff"
      />

      {/* Gradient Orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-neutral-200 to-transparent dark:from-neutral-800 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-bl from-neutral-200 to-transparent dark:from-neutral-800 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.3,
            }}
            className="overflow-hidden"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.1]">
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="inline-block"
              >
                Backing builders
              </motion.span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.8,
            }}
            className="mt-8 text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed"
          >
            AI, new age software, no bullshit blockchain projects, hardware, space, biotech, & longevity.
          </motion.p>

          {/* Email Signup & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 1,
            }}
            className="mt-12 flex flex-col gap-6 w-full max-w-md"
          >
            {/* Email Input */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-elegant flex-1 px-5 py-4 rounded-lg text-sm placeholder:text-neutral-500 focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="btn-elegant-primary px-6 py-4 bg-black/90 dark:bg-white/90 text-white dark:text-black font-medium rounded-lg text-sm whitespace-nowrap backdrop-blur-sm"
              >
                Get Research
              </motion.button>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-500 text-center sm:text-left">
              Free weekly insights on markets, AI, and emerging opportunities.
            </p>

            {/* Invest CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="btn-elegant-secondary mt-2 px-8 py-4 font-medium rounded-lg"
            >
              Invest With Us
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
