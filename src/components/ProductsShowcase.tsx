"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const focusAreas = [
  {
    name: "AI Infrastructure",
    description: "Training, inference, and MLOps",
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    name: "Developer Tools",
    description: "IDEs, compilers, and workflows",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    name: "Graphics & Rendering",
    description: "Real-time 3D and visualization",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    name: "Data Infrastructure",
    description: "Storage, pipelines, and analytics",
    color: "from-orange-500/20 to-amber-500/20",
  },
  {
    name: "Security",
    description: "Identity, compliance, and defense",
    color: "from-rose-500/20 to-pink-500/20",
  },
  {
    name: "Open Source",
    description: "Commercial open source software",
    color: "from-slate-500/20 to-zinc-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ProductsShowcase() {
  return (
    <section id="products" className="py-24 md:py-40 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-950" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Image
              src="/logo.png"
              alt="zBuffer"
              width={32}
              height={32}
              className="opacity-80"
            />
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
            Focus Areas
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            We invest in technical founders building core infrastructure for the next era of computing.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
        >
          {focusAreas.map((area) => (
            <motion.div
              key={area.name}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="aspect-square rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-white/5 hover:border-neutral-300 dark:hover:border-neutral-700 relative overflow-hidden">
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Logo placeholder */}
                <div className="relative z-10 w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                  <div className="w-5 h-5 bg-neutral-300 dark:bg-neutral-600 rounded" />
                </div>

                {/* Area Info */}
                <div className="relative z-10">
                  <h3 className="font-semibold text-sm md:text-base mb-1">
                    {area.name}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 leading-snug">
                    {area.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
