"use client";

import { motion } from "framer-motion";
import GlassCard from "./ui/glass-card";

const team = [
  {
    name: "Hisham",
    role: "General Partner",
    bio: "Technical founder turned investor. Focused on infrastructure and developer tools.",
  },
  {
    name: "Rob",
    role: "General Partner",
    bio: "Engineering leader with deep experience in systems and platform architecture.",
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-28 md:py-40 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-12 md:mb-16 text-center"
        >
          Team
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-[800px] mx-auto">
          {team.map((member, index) => (
            <GlassCard key={member.name} delay={index * 0.1}>
              <h3 className="text-xl md:text-2xl font-semibold mb-1">{member.name}</h3>
              <p className="text-sm font-medium text-[rgb(var(--at-paper-rgb)_/_0.4)] font-mono mb-4">{member.role}</p>
              <p className="text-base text-[rgb(var(--at-paper-rgb)_/_0.6)]">{member.bio}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
