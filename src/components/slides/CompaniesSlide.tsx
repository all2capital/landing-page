"use client";

import { motion } from "framer-motion";
import { driftUp, investments } from "@/lib/site-content";
import { PageHeader } from "@/components/site/PageHeader";
import { InvestmentLogo } from "@/components/site/InvestmentLogo";

export function CompaniesSlide() {
  return (
    <div className="at-investments-slide min-h-full overflow-y-auto text-[var(--at-paper)]">
      <div className="at-investments-scene" aria-hidden />

      <main className="relative z-[1] mx-auto max-w-[1160px] px-5 pb-24 pt-34 sm:px-6 sm:pt-40 md:px-10 lg:px-14 lg:pb-36 lg:pt-[192px]">
        <PageHeader title="Partners" className="mb-8 sm:mb-10" />

        <div className="mb-12 max-w-[640px] sm:mb-16 lg:mb-20">
          <motion.h2
            {...driftUp(0.02)}
            className="font-display text-[34px] font-normal leading-[1.06] tracking-normal text-[var(--at-paper)] min-[420px]:text-[40px] sm:text-[52px] lg:text-[60px]"
          >
            The companies we
            <br />
            <em className="font-normal text-[rgb(var(--at-paper-rgb)_/_0.6)]">build with and support.</em>
          </motion.h2>
          <motion.p
            {...driftUp(0.08)}
            className="mt-5 max-w-[52ch] text-[15px] leading-[1.65] text-[rgb(var(--at-paper-rgb)_/_0.7)]"
          >
            Once we partner, we&apos;re in the work, for the long arcs, the hard quarters, and
            the moments that don&apos;t make the deck. These are the founders we build with
            and support.
          </motion.p>
        </div>

        <section
          className="grid grid-cols-1 border-l border-t border-[rgb(var(--at-paper-rgb)_/_0.14)] sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Companies"
        >
          {investments.map((company, index) => (
            <motion.a
              key={company.name}
              href={company.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1] as const,
                delay: 0.1 + index * 0.06,
              }}
              className="at-investment-cell group relative isolate flex min-h-[150px] flex-col items-center justify-center overflow-hidden border-b border-r border-[rgb(var(--at-paper-rgb)_/_0.14)] px-4 py-6 text-center sm:min-h-[220px] sm:px-5 sm:py-8"
            >
              <InvestmentLogo
                name={company.name}
                fallback={company.fallback}
                sources={company.logoSources}
              />
              <div className="font-display text-lg italic tracking-normal text-[rgb(var(--at-paper-rgb)_/_0.94)] transition duration-500 group-hover:text-[#ffffff]">
                {company.name}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[rgb(var(--at-paper-rgb)_/_0.45)] transition duration-500 group-hover:text-[#ffffff]">
                {company.meta}
              </div>
              <span className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--at-paper)] opacity-0 transition delay-0 duration-300 group-hover:opacity-100 group-hover:delay-200">
                Visit →
              </span>
            </motion.a>
          ))}
        </section>
      </main>
    </div>
  );
}
