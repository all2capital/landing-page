"use client";

import { motion } from "framer-motion";
import JoinLPForm from "./JoinLPForm";
import GlassCard from "./ui/glass-card";

export default function CTASection() {
  return (
    <section className="py-16 sm:py-20 md:py-28 lg:py-40 px-4 sm:px-6 md:px-12">
      <div className="max-w-[800px] mx-auto text-center min-w-0">
        <GlassCard className="py-10 sm:py-14 md:py-20 px-5 sm:px-8 md:px-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 sm:mb-6"
          >
            Building something?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-[rgb(var(--at-paper-rgb)_/_0.6)] max-w-lg mx-auto mb-8 sm:mb-10"
          >
            We back founders at the earliest stages. If you&apos;re working on infrastructure
            that will power the next generation of technology, we want to hear from you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex justify-center"
          >
            <JoinLPForm className="inline-block" />
          </motion.div>
        </GlassCard>
      </div>
    </section>
  );
}
