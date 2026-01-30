"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

function StatCounter({ value, suffix = "", label, delay = 0 }: StatCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const controls = animate(count, value, {
              duration: 2,
              delay: delay,
              ease: [0.16, 1, 0.3, 1],
            });
            return () => controls.stop();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [count, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay }}
      className="text-center"
    >
      <div className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </div>
      <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
        {label}
      </p>
    </motion.div>
  );
}

const stats = [
  { value: 200, suffix: "M+", label: "Assets Under Management" },
  { value: 45, suffix: "+", label: "Portfolio Companies" },
  { value: 12, suffix: "", label: "Unicorns" },
  { value: 8, suffix: "", label: "IPOs & Acquisitions" },
];

export default function StatsSection() {
  return (
    <section className="py-24 md:py-40 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white dark:from-black dark:via-neutral-950 dark:to-black" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">
            Track Record
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Partnering with exceptional founders
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
