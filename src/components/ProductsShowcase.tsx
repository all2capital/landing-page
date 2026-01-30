"use client";

import { motion } from "framer-motion";
import GlassCard from "./ui/glass-card";

const focusAreas = [
  { name: "AI Infrastructure", description: "Training, inference, and MLOps" },
  { name: "Developer Tools", description: "IDEs, compilers, and workflows" },
  { name: "Graphics & Rendering", description: "Real-time 3D and visualization" },
  { name: "Data Infrastructure", description: "Storage, pipelines, and analytics" },
  { name: "Security", description: "Identity, compliance, and defense" },
  { name: "Open Source", description: "Commercial open source software" },
];

export default function ProductsShowcase() {
  return (
    <section id="focus" className="py-28 md:py-40 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-12 md:mb-16 text-center"
        >
          Focus Areas
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {focusAreas.map((area, index) => (
            <GlassCard key={area.name} delay={index * 0.08}>
              <h3 className="text-lg md:text-xl font-semibold mb-2">{area.name}</h3>
              <p className="text-sm md:text-base text-white/50">{area.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
