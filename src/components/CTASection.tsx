"use client";

import { motion } from "framer-motion";
import GlassCard from "./ui/glass-card";

export default function CTASection() {
  return (
    <section className="py-28 md:py-40 px-6 md:px-12">
      <div className="max-w-[800px] mx-auto text-center">
        <GlassCard className="py-14 md:py-20 px-8 md:px-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6"
          >
            Building something?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-base md:text-lg text-white/60 max-w-lg mx-auto mb-10"
          >
            We back founders at the earliest stages. If you&apos;re working on infrastructure
            that will power the next generation of technology, we want to hear from you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="btn-elegant-primary px-8 py-3.5 bg-white text-black font-medium rounded-lg text-base"
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </GlassCard>
      </div>
    </section>
  );
}
