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

const philosophySignals = [
  { label: "Stage", value: "Earliest checks" },
  { label: "Scope", value: "AI to atoms" },
  { label: "Mode", value: "Operators" },
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
    name: "SpaceX",
    fallback: "SpaceX",
    meta: "Space · Infrastructure",
    href: "https://www.spacex.com/",
    logoSources: logoSources("spacex.com", "spacex"),
  },
  {
    name: "OpenAI",
    fallback: "OpenAI",
    meta: "AI",
    href: "https://openai.com/",
    logoSources: logoSources("openai.com", undefined, "/design-assets/logos/openai.svg"),
  },
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

/* Drift-up animation for content page elements */
const driftUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay },
});

function PageHeader({ title, className = "" }: { title: string; className?: string }) {
  return (
    <motion.div
      {...driftUp(0)}
      className={`flex items-center gap-5 border-b border-[rgb(var(--at-paper-rgb)_/_0.2)] pb-[18px] ${className}`}
    >
      <div className="flex min-w-0 items-center gap-4">
        <span className="h-px w-14 shrink-0 bg-[rgb(var(--at-paper-rgb)_/_0.42)]" />
        <p className="m-0 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[rgb(var(--at-paper-rgb)_/_0.68)]">
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
        <span className="font-display text-[26px] font-normal leading-none tracking-normal text-[var(--at-paper)] transition duration-500 group-hover:text-[var(--at-ink)]">
          {fallback}
        </span>
      )}
    </div>
  );
}

const alignmentWrapper = "max-w-[1400px] mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16";

/* ─── Slide 0: Home ─── */
function HomeSlide({ onNavigate }: { onNavigate: (slide: number) => void }) {
  return (
    <div className="relative flex min-h-full flex-col">
      <div className="relative z-10 flex min-h-full flex-col justify-center pb-[10vh] pt-16 sm:pt-20 md:pt-24">
        <div className={alignmentWrapper}>
          <div className="w-full max-w-[650px] -translate-y-[2vh] text-[var(--at-ink)] sm:-translate-y-[4vh]">
            <motion.div {...driftUp(0.08)}>
              <h1
                className="m-0 text-[clamp(2.65rem,8.4vw,6rem)] font-medium uppercase leading-[0.9] tracking-normal text-[var(--at-ink)]"
                style={{ fontFamily: "var(--at-font-body)" }}
              >
                Build Together
              </h1>
              <p className="mt-2 font-display text-[clamp(2.25rem,6vw,5rem)] font-normal italic leading-[0.98] tracking-normal text-[rgb(var(--at-ink-rgb)_/_0.82)]">
                from AI to atoms.
              </p>
              <p className="mt-6 max-w-[45ch] text-[15px] leading-[1.65] text-[rgb(var(--at-ink-rgb)_/_0.72)] sm:text-base">
                We partner with founders building software, AI, robotics, and space.
                We don&apos;t evaluate companies from pitch decks — we evaluate them
                from the command line.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
                <button
                  type="button"
                  onClick={() => onNavigate(2)}
                  className="relative inline-flex min-h-11 items-center justify-center bg-[var(--at-ink)] px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--at-paper)] transition duration-300 after:absolute after:-bottom-1 after:-right-1 after:h-full after:w-full after:border-r-4 after:border-b-4 after:border-[var(--at-accent-warm)] after:content-[''] hover:bg-[var(--at-accent-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--at-accent-primary)]"
                >
                  Investments
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(1)}
                  className="group inline-flex min-h-11 items-center gap-3 border-b border-[rgb(var(--at-ink-rgb)_/_0.42)] px-1 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--at-ink)] transition duration-300 hover:border-[var(--at-accent-primary)] hover:text-[var(--at-accent-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--at-accent-primary)]"
                >
                  <span>What we build</span>
                  <span aria-hidden className="text-[var(--at-accent-warm)] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
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
    <div className="at-philosophy-slide min-h-full">
      <div className="at-philosophy-scene" aria-hidden />

      <main className="relative z-[1] mx-auto grid min-h-full max-w-[1280px] grid-cols-1 content-start gap-8 px-6 pb-14 pt-28 sm:px-8 md:pt-32 lg:grid-cols-[minmax(320px,0.78fr)_minmax(560px,1.22fr)] lg:items-start lg:gap-x-16 lg:gap-y-9 lg:px-14 lg:pb-12 lg:pt-[128px]">
        <PageHeader title="Philosophy" className="lg:col-span-2" />

        <div className="w-full min-w-0 lg:max-w-[430px] lg:pt-1">
          <motion.h1
            {...driftUp(0.02)}
            className="mb-5 max-w-[11ch] font-display text-[40px] font-normal leading-[1.04] tracking-normal text-[var(--at-paper)] sm:text-[52px] lg:text-[58px]"
          >
            We invest in builders
            <br />
            <em className="font-normal text-[var(--at-mist)]">working at the edges</em>
            <br />
            of what&apos;s possible.
          </motion.h1>

          <motion.p
            {...driftUp(0.08)}
            className="max-w-[39ch] text-[15px] leading-[1.65] text-[rgb(var(--at-paper-rgb)_/_0.72)]"
          >
            Five convictions that shape every check we write — from the first call to
            the long arc of partnership.
          </motion.p>

          <motion.div
            {...driftUp(0.12)}
            className="mt-8 grid max-w-[430px] grid-cols-1 border border-[rgb(var(--at-paper-rgb)_/_0.2)] sm:grid-cols-3"
          >
            {philosophySignals.map((signal) => (
              <div
                key={signal.label}
                className="border-b border-[rgb(var(--at-paper-rgb)_/_0.2)] p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
              >
                <div className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[rgb(var(--at-paper-rgb)_/_0.45)]">
                  {signal.label}
                </div>
                <div className="mt-2 font-display text-[18px] italic leading-[1.1] text-[rgb(var(--at-paper-rgb)_/_0.88)]">
                  {signal.value}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="min-w-0 border-t border-[rgb(var(--at-paper-rgb)_/_0.24)] lg:pt-0">
          {philosophyTenets.map((tenet, index) => (
            <motion.article
              key={tenet.title}
              {...driftUp(0.14 + index * 0.05)}
              className="grid grid-cols-[2rem_1fr] gap-4 border-b border-[rgb(var(--at-paper-rgb)_/_0.2)] py-4 sm:grid-cols-[2.25rem_1fr] lg:py-[15px]"
            >
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center bg-[var(--at-marker)] font-mono text-[11px] font-medium text-[var(--at-paper-tint)]">
                {index + 1}
              </span>
              <div className="min-w-0">
                <h2 className="m-0 font-display text-[19px] font-medium leading-[1.15] text-[var(--at-paper)] lg:text-[21px]">
                  {tenet.title}
                </h2>
                <p className="m-0 mt-2 max-w-[62ch] text-[13px] leading-[1.52] text-[rgb(var(--at-paper-rgb)_/_0.7)] lg:text-[13.5px]">
                  {tenet.body}
                </p>
              </div>
            </motion.article>
          ))}
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
          title="Investments"
          className="mb-12 sm:mb-18 lg:mb-20"
        />

        <section
          className="grid grid-cols-1 border-l border-t border-[rgb(var(--at-paper-rgb)_/_0.14)] sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Investments"
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
              className="at-investment-cell group relative isolate flex min-h-[190px] flex-col items-center justify-center overflow-hidden border-b border-r border-[rgb(var(--at-paper-rgb)_/_0.14)] px-4 py-8 text-center sm:min-h-[220px] sm:px-5"
            >
              <InvestmentLogo
                name={company.name}
                fallback={company.fallback}
                sources={company.logoSources}
              />
              <div className="font-display text-lg italic tracking-normal text-[rgb(var(--at-paper-rgb)_/_0.94)] transition duration-500 group-hover:text-[var(--at-ink)]">
                {company.name}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[rgb(var(--at-paper-rgb)_/_0.45)] transition duration-500 group-hover:text-[var(--at-ink-3)]">
                {company.meta}
              </div>
              <span className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--at-ink-3)] opacity-0 transition delay-0 duration-300 group-hover:opacity-100 group-hover:delay-200">
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
    <div className="at-team-slide min-h-full overflow-y-auto text-[var(--at-paper)]">
      <div className="at-team-scene" aria-hidden />

      <main className="relative z-[1] mx-auto w-full max-w-[1120px] px-5 pb-20 pt-28 sm:px-6 md:px-10 md:pb-24 md:pt-32 lg:px-14">
        <PageHeader title="Team" className="mb-7" />

        <motion.div
          {...driftUp(0.04)}
          className="mb-8 grid gap-4 border-b border-[rgb(var(--at-paper-rgb)_/_0.2)] pb-7 md:grid-cols-[minmax(0,0.8fr)_minmax(320px,1fr)] md:items-end"
        >
          <h1 className="m-0 max-w-[10ch] font-display text-[38px] font-normal leading-[1.04] tracking-normal text-[var(--at-paper)] sm:text-[48px]">
            Builders backing builders.
          </h1>
          <p className="m-0 max-w-[56ch] text-sm leading-[1.65] text-[rgb(var(--at-paper-rgb)_/_0.68)] md:justify-self-end">
            We work with technical founders from the first product questions through
            the long, quiet years of building.
          </p>
        </motion.div>

        <section className="grid grid-cols-1 justify-center gap-10 md:grid-cols-[minmax(0,440px)_minmax(0,440px)] md:gap-12 lg:gap-14" aria-label="Team">
          {founders.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1] as const,
                delay: 0.08 + index * 0.12,
              }}
              className="group flex flex-col"
            >
              <div className="relative mb-[18px] aspect-square w-full overflow-hidden bg-[var(--at-tide)] shadow-[inset_0_0_0_1px_rgb(var(--at-paper-rgb)_/_0.08)]">
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  fill
                  className="object-cover grayscale transition duration-700 group-hover:scale-[1.015] group-hover:grayscale-0"
                  sizes="(min-width: 1024px) 440px, (min-width: 768px) 42vw, 100vw"
                />
              </div>

              <div className="mb-3.5 flex flex-wrap items-baseline justify-between gap-4 border-b border-[rgb(var(--at-paper-rgb)_/_0.2)] pb-2.5">
                <h2 className="m-0 font-sans text-2xl font-medium uppercase leading-[1.05] tracking-normal text-[rgb(var(--at-paper-rgb)_/_0.86)] transition-colors duration-300 group-hover:text-[var(--at-paper)]">
                  {member.name}
                </h2>
                <span className="font-display text-sm italic text-[rgb(var(--at-paper-rgb)_/_0.58)]">
                  {member.role}
                </span>
              </div>

              <p className="mb-4 text-sm leading-[1.6] text-[rgb(var(--at-paper-rgb)_/_0.68)] transition-colors duration-300 group-hover:text-[rgb(var(--at-paper-rgb)_/_0.78)]">
                {member.bioBefore}{" "}
                <em className="font-display text-[15px] font-normal text-[var(--at-paper)]">
                  {member.emphasis}
                </em>{" "}
                {member.bioAfter}
              </p>

              <div className="flex flex-wrap gap-2">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="inline-flex items-center gap-2 border border-[rgb(var(--at-paper-rgb)_/_0.75)] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--at-paper)] transition duration-200 hover:border-[var(--at-paper-tint)] hover:bg-[var(--at-paper-tint)] hover:text-[var(--at-ink)]"
                >
                  <svg className="h-[13px] w-[13px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href={`mailto:${member.email}`}
                  aria-label={`Email ${member.name}`}
                  className="inline-flex items-center gap-2 border border-[rgb(var(--at-paper-rgb)_/_0.75)] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--at-paper)] transition duration-200 hover:border-[var(--at-paper-tint)] hover:bg-[var(--at-paper-tint)] hover:text-[var(--at-ink)]"
                >
                  <svg className="h-[13px] w-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                    <rect x="2.5" y="5" width="19" height="14" rx="0.5" />
                    <path d="M3 6l9 7 9-7" />
                  </svg>
                  Email
                </a>
              </div>
            </motion.article>
          ))}
        </section>
      </main>
    </div>
  );
}

/* ─── Main ─── */
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartRef = useRef(0);
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
      touchStartRef.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartRef.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 60) {
        if (diff > 0) next();
        else prev();
      }
    };
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSlide, next, prev]);

  return (
    <div className="min-h-screen h-screen max-h-[100dvh] bg-[var(--at-paper)] overflow-hidden">
      {/* Home image background — hidden instantly on content pages */}
      <div
        className="fixed inset-0 z-[1] overflow-hidden"
        style={{ visibility: currentSlide === 0 ? "visible" : "hidden" }}
      >
        <Image
          src="/design-assets/home-launch-city.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] md:object-center"
        />
      </div>

      {/* Content — instant page swaps, no AnimatePresence */}
      <div className="relative z-10 h-full flex flex-col">
        <Navigation onNavigate={goToSlide} currentSlide={currentSlide} />

        <div
          ref={slideViewportRef}
          key={currentSlide}
          className={`flex-1 ${
            currentSlide === 0
              ? "flex flex-col overflow-y-auto"
              : currentSlide === 1
                ? "overflow-y-auto"
                : "overflow-y-auto"
          }`}
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
