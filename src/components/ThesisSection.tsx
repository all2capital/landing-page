"use client";

import GlassCard from "./ui/glass-card";

export default function ThesisSection() {
  return (
    <section id="thesis" className="py-28 md:py-40 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <GlassCard>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6">
            Our Thesis
          </h2>
          <div className="space-y-4 text-base md:text-lg text-white/70 max-w-3xl">
            <p>
              The next decade of technology will be defined by the infrastructure beneath it.
              We back technical founders building the systems, tools, and platforms that
              everything else runs on.
            </p>
            <p>
              From AI training pipelines to real-time rendering engines, from developer
              toolchains to security primitives — we invest at the earliest stages in the
              technology that becomes the foundation.
            </p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
