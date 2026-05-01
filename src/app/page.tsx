"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";

const TOTAL_SLIDES = 4;

const philosophyTenets = [
  {
    title: "Conviction over consensus",
    body: "The best companies look obvious in retrospect and contrarian at conception. We back founders whose thesis we don't fully understand on the first read — and whose answers, by the second, feel inevitable.",
  },
  {
    title: "From AI to atoms",
    body: "Software has stopped being a category. We invest across the full stack of intelligence and matter — language models, autonomous systems, robotics, energy, and the physical infrastructure that lets the digital world meet the real one.",
  },
  {
    title: "Evaluate from the command line",
    body: "We read the codebase before the deck. We talk to the customer before the cap table. Pitches are signal; product is truth — and we'd rather spend an afternoon inside the thing than an hour hearing about it.",
  },
  {
    title: "Operators, not observers",
    body: "Capital is the easy part. We've shipped products, recruited teams, and survived the quiet years. We show up when the work is hard and unglamorous — and we measure ourselves by what our founders can build because we were in the room.",
  },
  {
    title: "Long arcs, patient capital",
    body: "The companies worth building rarely fit a fund cycle. We hold for decades, not exits — and we structure our partnership so that founders can optimize for the next fifteen years, not the next fifteen months.",
  },
];

function logoSources(domain: string, simpleIcon?: string, localSrc?: string) {
  const sources: string[] = [];
  if (localSrc) sources.push(localSrc);
  if (simpleIcon) sources.push(`https://cdn.simpleicons.org/${simpleIcon}/F4F0E8`);
  sources.push(
    `https://icon.horse/icon/${domain}`,
    `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=128`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
  );
  return sources;
}

const investments = [
  {
    name: "Anthropic",
    fallback: "Anthropic",
    meta: "AI",
    href: "https://www.anthropic.com/",
    logoSources: logoSources("anthropic.com", "anthropic"),
  },
  {
    name: "Anduril",
    fallback: "Anduril",
    meta: "Defense · AI",
    href: "https://www.anduril.com/",
    logoSources: logoSources("anduril.com"),
  },
  {
    name: "Replit",
    fallback: "Replit",
    meta: "Software · AI",
    href: "https://replit.com/",
    logoSources: logoSources("replit.com", "replit"),
  },
  {
    name: "Applied Intuition",
    fallback: "Applied Intuition",
    meta: "AI · Robotics",
    href: "https://www.appliedintuition.com/",
    logoSources: logoSources("appliedintuition.com"),
  },
  {
    name: "Figure AI",
    fallback: "Figure",
    meta: "AI · Robotics",
    href: "https://www.figure.ai/",
    logoSources: [],
  },
  {
    name: "1X",
    fallback: "1X",
    meta: "AI · Robotics",
    href: "https://www.1x.tech/",
    logoSources: [],
  },
  {
    name: "Exowatt",
    fallback: "Exowatt",
    meta: "Energy",
    href: "https://www.exowatt.com/",
    logoSources: logoSources("exowatt.com", undefined, "/design-assets/logos/exowatt.png"),
  },
  {
    name: "Unspun",
    fallback: "Unspun",
    meta: "Robotics · Manufacturing",
    href: "https://www.unspun.io/",
    logoSources: logoSources("unspun.io", undefined, "/design-assets/logos/unspun.png"),
  },
  {
    name: "Lance",
    fallback: "Lance",
    meta: "Software",
    href: "https://www.lance.live/",
    logoSources: logoSources("lance.live"),
  },
  {
    name: "Bud Break Innovations",
    fallback: "Bud Break",
    meta: "Bio · Agriculture",
    href: "https://www.budbreakinnovations.com/",
    logoSources: logoSources("budbreakinnovations.com"),
  },
];

const founders = [
  {
    index: "01 / Founding Partner",
    name: "Hisham El-Husseini",
    role: "Founding Partner",
    bioBefore: "Hisham builds at the intersection of software, AI, and capital.",
    emphasis: "University of Washington",
    bioAfter:
      "grad, previously shipping product at Layer3 and across the web3 and AI tooling stack. He partners earliest with technical founders, the kind who answer questions in code, not slideware.",
    image: "/design-assets/founder-hisham.png",
    linkedin: "https://www.linkedin.com/in/hisham-el-husseini/",
    email: "hisham@all2capital.com",
  },
  {
    index: "02 / Founding Partner",
    name: "Robert Neir",
    role: "Founding Partner",
    bioBefore: "Robert is a multi-time founder and former",
    emphasis: "Microsoft",
    bioAfter:
      "game developer. He's built across DeFi, decentralized identity, and consumer products, most recently at Riot IQ. He invests in founders who would build their company whether or not capital ever showed up.",
    image: "/design-assets/founder-robert.png",
    linkedin: "https://www.linkedin.com/in/robertmneir/",
    email: "robert@all2capital.com",
  },
];

const warmupImageSources = [
  "/design-assets/bg-philosophy-space.png",
  "/design-assets/bg-investments-underwater.png",
  "/design-assets/bg-team-desert.png",
  "/design-assets/founder-hisham.png",
  "/design-assets/founder-robert.png",
  "/design-assets/logos/openai.svg",
  "/design-assets/logos/exowatt.png",
  "/design-assets/logos/unspun.png",
  ...investments.flatMap((company) => company.logoSources.slice(0, 1)),
];

/* Drift-up animation for content page elements */
const driftUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay },
});

function PageHeader({
  title,
  className = "",
  tone = "light",
}: {
  title: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const ruleClass =
    tone === "dark"
      ? "border-[rgb(var(--at-ink-rgb)_/_0.2)]"
      : "border-[rgb(var(--at-paper-rgb)_/_0.2)]";
  const lineClass =
    tone === "dark"
      ? "bg-[rgb(var(--at-ink-rgb)_/_0.42)]"
      : "bg-[rgb(var(--at-paper-rgb)_/_0.42)]";
  const textClass =
    tone === "dark"
      ? "text-[rgb(var(--at-ink-rgb)_/_0.68)]"
      : "text-[rgb(var(--at-paper-rgb)_/_0.68)]";
  return (
    <motion.div
      {...driftUp(0)}
      className={`flex items-center gap-5 border-b ${ruleClass} pb-[18px] ${className}`}
    >
      <div className="flex min-w-0 items-center gap-4">
        <span className={`h-px w-14 shrink-0 ${lineClass}`} />
        <p className={`m-0 font-mono text-[11px] font-medium uppercase tracking-[0.22em] ${textClass}`}>
          {title}
        </p>
      </div>
    </motion.div>
  );
}

function InvestmentLogo({
  name,
  fallback,
  sources,
}: {
  name: string;
  fallback: string;
  sources: string[];
}) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const src = sources[sourceIndex];
  const useFallback = !src;

  const tryNextSource = () => {
    setSourceIndex((index) => Math.min(index + 1, sources.length));
  };

  return (
    <div className="mb-[18px] flex h-14 w-full items-center justify-center">
      {!useFallback && (
        <img
          src={src}
          alt={name}
          className="at-investment-logo max-h-12 max-w-[78%] object-contain opacity-90 transition duration-500 group-hover:opacity-100"
          onError={tryNextSource}
          onLoad={(event) => {
            const image = event.currentTarget;
            if (image.naturalWidth < 16 || image.naturalHeight < 16) {
              tryNextSource();
            }
          }}
        />
      )}
      {useFallback && (
        <span className="font-display text-[26px] font-normal leading-none tracking-normal text-[var(--at-paper)] transition duration-500 group-hover:text-[#ffffff]">
          {fallback}
        </span>
      )}
    </div>
  );
}

const alignmentWrapper = "max-w-[1400px] mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16";

function AssetWarmup() {
  useEffect(() => {
    const uniqueSources = Array.from(new Set(warmupImageSources.filter(Boolean)));
    const handles = uniqueSources.map((src) => {
      const image = new window.Image();
      image.decoding = "async";
      image.src = src;
      return image;
    });

    return () => {
      handles.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, []);

  return null;
}

/* ─── Slide 0: Home ─── */
function HomeSlide({ onNavigate }: { onNavigate: (index: number) => void }) {
  return (
    <div className="at-home-slide relative isolate flex flex-1 flex-col overflow-hidden">
      {/* Bottom-up scrim — preserves the image, anchors the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[55%]"
        style={{
          background:
            "linear-gradient(to top, rgba(8,12,20,0.6) 0%, rgba(8,12,20,0.35) 35%, rgba(8,12,20,0.12) 65%, rgba(8,12,20,0) 100%)",
        }}
      />
      {/* Email link — bottom-right */}
      <a
        href="mailto:robertneir@alltogethercapital.com"
        aria-label="Email Robert Neir"
        className="absolute bottom-4 right-4 z-20 inline-flex h-11 w-11 items-center justify-center text-[#F4EFE6] [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.6))] transition-colors duration-200 hover:text-[var(--at-accent-primary)] sm:bottom-5 sm:right-5 md:bottom-6 md:right-6"
      >
        <svg
          className="h-5 w-5 sm:h-[22px] sm:w-[22px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="2.5" y="5" width="19" height="14" rx="0.5" />
          <path d="M3 6l9 7 9-7" />
        </svg>
      </a>

      <div className="relative z-10 flex flex-1 flex-col justify-end px-4 pb-6 pt-16 sm:px-5 sm:pb-8 sm:pt-20 md:px-6 md:pb-10 md:pt-24">
        <div className="w-full max-w-[520px] text-[#F4EFE6]">
          <div>
            <motion.div {...driftUp(0.08)}>
              <h1
                className="m-0 text-[clamp(1.75rem,5vw,3.75rem)] font-medium uppercase leading-[0.92] tracking-normal text-[#F4EFE6] [text-shadow:0_1px_2px_rgba(0,0,0,0.45),_0_2px_18px_rgba(0,0,0,0.25)]"
                style={{ fontFamily: "var(--at-font-body)" }}
              >
                Build Together
              </h1>
              <p className="mt-2 font-display text-[clamp(1.4rem,3.6vw,3rem)] font-normal italic leading-[1] tracking-normal text-[#F4EFE6] [text-shadow:0_1px_2px_rgba(0,0,0,0.4),_0_2px_18px_rgba(0,0,0,0.2)]">
                from AI to atoms.
              </p>
            </motion.div>

            <motion.div
              {...driftUp(0.18)}
              className="mt-6 flex flex-wrap items-center gap-5 sm:mt-7 sm:gap-7"
            >
              <button
                type="button"
                onClick={() => onNavigate(2)}
                className="relative inline-flex min-h-11 items-center justify-center bg-[var(--at-ink)] px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#F4EFE6] transition duration-300 after:absolute after:-bottom-1 after:-right-1 after:h-full after:w-full after:border-b-4 after:border-r-4 after:border-[var(--at-accent-warm)] after:content-[''] hover:bg-[var(--at-accent-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--at-accent-primary)]"
              >
                Companies
              </button>
              <button
                type="button"
                onClick={() => onNavigate(1)}
                className="group inline-flex min-h-11 items-center gap-3 border-b border-[rgb(244,239,230_/_0.5)] px-1 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#F4EFE6] [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] transition duration-300 hover:border-[var(--at-accent-warm)] hover:text-[var(--at-accent-warm)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--at-accent-warm)]"
              >
                <span>Philosophy</span>
                <span aria-hidden className="text-[var(--at-accent-warm)] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Slide 1: Thesis ─── */
function ThesisSlide() {
  return (
    <div className="at-philosophy-slide min-h-full text-[var(--at-ink)]">
      <div className="at-philosophy-scene" aria-hidden />

      <main className="relative z-[1] mx-auto flex min-h-full w-full max-w-[1280px] flex-col gap-8 px-6 pb-14 pt-28 sm:px-8 md:pt-32 lg:px-14 lg:pb-12 lg:pt-[128px]">
        <PageHeader title="Philosophy" tone="dark" />

        <div className="w-full min-w-0 max-w-[820px]">
          <motion.h1
            {...driftUp(0.02)}
            className="mb-5 font-display text-[34px] font-normal leading-[1.06] tracking-normal text-[var(--at-ink)] min-[420px]:text-[40px] sm:text-[58px] sm:whitespace-nowrap sm:leading-[1.04] lg:text-[72px]"
          >
            We invest in builders
            <br />
            <em className="font-normal text-[var(--at-ink-3)]">working at the edges</em>
          </motion.h1>

          <motion.p
            {...driftUp(0.08)}
            className="max-w-[44ch] text-[15px] leading-[1.65] text-[var(--at-ink-3)]"
          >
            Five convictions that shape every check we write — from the first call to
            the long arc of partnership.
          </motion.p>

          <div className="mt-8 border-t border-[rgb(var(--at-ink-rgb)_/_0.2)]">
            {philosophyTenets.map((tenet, index) => (
              <motion.article
                key={tenet.title}
                {...driftUp(0.14 + index * 0.05)}
                className="grid grid-cols-[2rem_1fr] gap-4 border-b border-[rgb(var(--at-ink-rgb)_/_0.2)] py-5 sm:grid-cols-[2.25rem_1fr]"
              >
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center bg-[var(--at-marker)] font-mono text-[11px] font-medium text-[var(--at-paper-tint)]">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h2 className="m-0 font-display text-[19px] font-medium leading-[1.15] text-[var(--at-ink)] lg:text-[21px]">
                    {tenet.title}
                  </h2>
                  <p className="m-0 mt-2 max-w-[58ch] text-[13px] leading-[1.55] text-[var(--at-ink-3)] lg:text-[13.5px]">
                    {tenet.body}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ─── Slide 2: Portfolio ─── */
function InvestmentsSlide() {
  return (
    <div className="at-investments-slide min-h-full overflow-y-auto text-[var(--at-paper)]">
      <div className="at-investments-scene" aria-hidden />

      <main className="relative z-[1] mx-auto max-w-[1160px] px-5 pb-24 pt-34 sm:px-6 sm:pt-40 md:px-10 lg:px-14 lg:pb-36 lg:pt-[192px]">
        <PageHeader
          title="Companies"
          className="mb-12 sm:mb-18 lg:mb-20"
        />

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

/* ─── Slide 3: Team ─── */
function TeamSlide() {
  return (
    <div className="at-team-slide min-h-full overflow-y-auto text-[var(--at-ink)]">
      <main className="relative z-[1] mx-auto w-full max-w-[1120px] px-5 pb-20 pt-28 sm:px-6 md:px-10 md:pb-24 md:pt-32 lg:px-14">
        <PageHeader title="Team" tone="dark" className="mb-12" />

        <section className="grid grid-cols-1 justify-center gap-8 md:grid-cols-[minmax(0,440px)_minmax(0,440px)] md:gap-10 lg:gap-12" aria-label="Team">
          {founders.map((member) => (
            <article
              key={member.name}
              className="group relative aspect-[4/5] w-full overflow-hidden bg-[var(--at-paper-soft)]"
            >
              <Image
                src={member.image}
                alt={`Portrait of ${member.name}`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 440px, (min-width: 768px) 42vw, 100vw"
              />

              {/* Bottom overlay bar — instant, no fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-[rgb(var(--at-ink-rgb)_/_0.7)] group-hover:block group-focus-within:block">
                <div className="pointer-events-auto flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5">
                  <div className="min-w-0">
                    <h2
                      className="m-0 truncate text-lg font-medium uppercase leading-[1.05] tracking-normal text-[#F4EFE6] sm:text-xl"
                      style={{ fontFamily: "var(--at-font-body)" }}
                    >
                      {member.name}
                    </h2>
                    <p className="m-0 mt-1 font-display text-base italic leading-tight text-[#F4EFE6] sm:text-lg">
                      Founding Partner
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="inline-flex h-10 w-10 items-center justify-center border border-[rgb(244,239,230_/_0.7)] text-[#F4EFE6] touch-manipulation hover:border-[#F4EFE6] hover:bg-[#F4EFE6] hover:text-[var(--at-ink)]"
                    >
                      <svg className="h-[14px] w-[14px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
                      </svg>
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                      className="inline-flex h-10 w-10 items-center justify-center border border-[rgb(244,239,230_/_0.7)] text-[#F4EFE6] touch-manipulation hover:border-[#F4EFE6] hover:bg-[#F4EFE6] hover:text-[var(--at-ink)]"
                    >
                      <svg className="h-[14px] w-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                        <rect x="2.5" y="5" width="19" height="14" rx="0.5" />
                        <path d="M3 6l9 7 9-7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

/* ─── Main ─── */
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const slideViewportRef = useRef<HTMLDivElement>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentSlide || index < 0 || index >= TOTAL_SLIDES) return;
      setCurrentSlide(index);
    },
    [currentSlide]
  );

  const next = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);
  const prev = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

  useEffect(() => {
    const resetScroll = () => {
      slideViewportRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    resetScroll();
    const animationFrame = window.requestAnimationFrame(resetScroll);
    const timer = window.setTimeout(resetScroll, 120);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(timer);
    };
  }, [currentSlide]);

  // Keyboard navigation — only on home slide
  useEffect(() => {
    if (currentSlide !== 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, next, prev]);


  // Touch/swipe navigation — only on home slide
  useEffect(() => {
    if (currentSlide !== 0) return;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) {
        touchStartRef.current = null;
        return;
      }

      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const start = touchStartRef.current;
      touchStartRef.current = null;
      if (!start || e.changedTouches.length !== 1) return;

      const diffX = start.x - e.changedTouches[0].clientX;
      const diffY = start.y - e.changedTouches[0].clientY;
      const absX = Math.abs(diffX);
      const absY = Math.abs(diffY);

      if (absX > 70 && absX > absY * 1.35) {
        if (diffX > 0) next();
        else prev();
      }
    };
    const touchOptions: AddEventListenerOptions = { passive: true };

    window.addEventListener("touchstart", handleTouchStart, touchOptions);
    window.addEventListener("touchend", handleTouchEnd, touchOptions);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart, touchOptions);
      window.removeEventListener("touchend", handleTouchEnd, touchOptions);
    };
  }, [currentSlide, next, prev]);

  return (
    <div className={`at-site-shell ${currentSlide === 2 ? "bg-[var(--at-deep)]" : "bg-[var(--at-paper)]"}`}>
      {/* Content — instant page swaps, no AnimatePresence */}
      <div className="at-page-frame relative z-10 flex flex-col">
        <AssetWarmup />
        <Navigation onNavigate={goToSlide} currentSlide={currentSlide} />

        <div
          ref={slideViewportRef}
          key={currentSlide}
          className="touch-scroll flex min-h-0 flex-1 flex-col overflow-visible"
        >
          {currentSlide === 0 && <HomeSlide onNavigate={goToSlide} />}
          {currentSlide === 1 && <ThesisSlide />}
          {currentSlide === 2 && <InvestmentsSlide />}
          {currentSlide === 3 && <TeamSlide />}
        </div>
      </div>
    </div>
  );
}
