"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import JoinLPForm from "@/components/JoinLPForm";
import Navigation from "@/components/Navigation";

const TOTAL_SLIDES = 4;

/* Favicon URL from domain (Google's favicon service) */
function faviconUrl(url: string, size = 32) {
  try {
    const host = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${host}&sz=${size}`;
  } catch {
    return "";
  }
}

const philosophies = [
  "Founders first. We build, not just invest.",
  "AI is mankind's greatest invention. We're all in.",
  "Early-stage to market leaders. We back the frontier.",
  "AI, space, energy, robotics. Software to silicon.",
  "We use the tech we invest in. Every day.",
  "Compounding capital for the long run.",
  "Keeping America at the forefront.",
];

/* Thesis principles */
const principles = [
  {
    title: "Operator-Led",
    description:
      "We've built companies, led engineering teams, and shipped products at scale. Our investment decisions are grounded in the reality of building,not abstract market analysis. When we evaluate a company, we're assessing the architecture, the team's technical depth, and the product's path to scale.",
  },
  {
    title: "AI & HALO",
    description:
      "We invest in two lanes. First, cutting-edge AI companies built from the ground up,where artificial intelligence isn't a feature but the reason the company can exist at all. Second, HALO businesses,Heavy Assets, Low Obsolescence,companies with deep physical moats like energy, infrastructure, and space that AI cannot easily replicate or displace. Together, these lanes let us capture the upside of AI while hedging against its disruption.",
  },
  {
    title: "Technical Conviction",
    description:
      "Our engineering backgrounds let us underwrite technology risk that generalist investors can't evaluate. We go deep on system architecture, scalability, and technical moats,the things that separate breakout companies from the rest.",
  },
];

/* Investments */
const investments = [
  { name: "Groq", url: "https://groq.com", logo: "/logos/groq.png" },
  { name: "Figure AI", url: "https://www.figure.ai/", logo: "/logos/figure.png" },
  { name: "1X Technologies", url: "https://www.1x.tech/", logo: "/logos/1x.png" },
  { name: "SmartGun", url: "https://smartgun.com/", logo: "/logos/smartgun.png" },
  { name: "Bitcoin", url: "https://bitcoin.org/", logo: "/logos/bitcoin.png" },
  { name: "Ethereum", url: "https://ethereum.org/", logo: "/logos/ethereum.png" },
  { name: "TAO", url: "https://bittensor.com/", logo: "/logos/tao.png" },
];

const team = [
  {
    name: "Hisham El-Husseini",
    role: "General Partner",
    image: "/team-hisham.png",
    linkedin: "https://www.linkedin.com/in/hisham-el-husseini/",
    email: "hisham@alltogethercapital.com",
  },
  {
    name: "Robert Neir",
    role: "General Partner",
    image: "/team-rob.png",
    linkedin: "https://www.linkedin.com/in/robertmneir/",
    email: "robertneir@alltogethercapital.com",
  },
];

/* Drift-up animation for content page elements */
const driftUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay },
});

const alignmentWrapper = "max-w-[1400px] mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16";

/* ─── Slide 0: Home ─── */
function HomeSlide() {
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % philosophies.length);
    }, 16000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 min-h-0 relative flex flex-col overflow-hidden">
      <div className="relative z-10 flex flex-col flex-1 min-h-0 justify-end pb-3 sm:pb-6">
        <div className={alignmentWrapper}>
          <div className="w-full">
            <h1
              className="gold-text text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.04em] mb-3 sm:mb-6"
              style={{
                fontFamily: '"Oswald", sans-serif',
                fontWeight: 300,
              }}
            >
              TOGETHER WE BUILD.
            </h1>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPhrase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-light leading-snug text-white/70 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
              >
                {philosophies[currentPhrase]}
              </motion.p>
            </AnimatePresence>

            <div className="mt-4 sm:mt-8">
              <JoinLPForm />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — desktop only */}
      <div className="relative z-10 shrink-0 border-t border-white/10 hidden sm:block">
        <div className={`${alignmentWrapper} py-4`}>
          <p className="text-[11px] text-white/30">
            © {new Date().getFullYear()} All Together Capital
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Slide 1: Thesis ─── */
function ThesisSlide() {
  return (
    <div className="bg-black min-h-full overflow-y-auto">
      <div className={`${alignmentWrapper} pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24`}>
        <motion.div {...driftUp(0.05)} className="max-w-3xl mb-8 sm:mb-10">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 sm:mb-4">
            What is going on with AI?
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
            Times are changing in software as AI&apos;s creative destruction wave forces us to
            re-underwrite every company globally. All industries will be disrupted, and software
            will be the medium through which this disruption occurs. Code is so far the only way
            AI successfully manifests itself, which means understanding code deeply is more
            important now than any other time in history (even the dotcom era). You may be able
            to use AI tools without knowing how to code, but you are much less positioned to
            predict how AI tools will progress without understanding code, its structure, how it
            evolves, and what limitations there are within code itself and hardware. Code has
            become as important as the English language.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed mt-4">
            We understand code, use the latest AI religiously, and build our own businesses
            with these tools every day. That insight lets us place big bets on the most
            innovative companies emerging from the AI explosion we are in the middle of.
            We want to be part of it. We want to be in the arena, building and investing.
          </p>
        </motion.div>
        <motion.div {...driftUp(0.1)} className="max-w-3xl">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 sm:mb-4">
            Why we are starting this?
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-white/55 leading-relaxed">
            Our team consists only of software dev entrepreneurs. We code and build companies.
            We&apos;re technical enough to build software, and wise enough to know why something
            should or shouldn&apos;t be built. Since we operate our own software businesses and
            have for many years, we see how AI is changing our personal businesses daily. This
            gives us a chance to prognosticate on how other businesses will be affected by the
            new AI tools and progress we see on a daily basis. Not many people choose to sit or
            can sit at the front of the rollercoaster ride. We&apos;re there.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Slide 2: Portfolio ─── */
function InvestmentsSlide() {
  return (
    <div className="bg-black min-h-full overflow-y-auto">
      <div className={`${alignmentWrapper} pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24`}>
        <motion.div
          {...driftUp(0.1)}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5"
        >
          {investments.map((inv, i) => (
            <motion.a
              key={inv.name}
              href={inv.url}
              target="_blank"
              rel="noopener noreferrer"
              {...driftUp(0.1 + i * 0.03)}
              className="group flex flex-col items-center justify-center gap-3 aspect-square rounded-xl p-6 transition-colors duration-300 hover:bg-white/[0.06]"
            >
              <img
                src={inv.logo}
                alt={inv.name}
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="text-xs sm:text-sm font-medium text-white/40 group-hover:text-white/90 transition-colors duration-300 text-center leading-tight">
                {inv.name}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Slide 3: Team ─── */
function TeamSlide() {
  return (
    <div className="min-h-full overflow-y-auto bg-[#181818]">
      <div className={`${alignmentWrapper} pt-28 md:pt-36 pb-16 sm:pb-20 md:pb-24 flex flex-col items-center`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 lg:gap-14 w-full max-w-[90%] sm:max-w-[75%] md:max-w-[60%] mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              {...driftUp(0.1 + i * 0.08)}
              className="group relative aspect-[3/4] rounded-lg overflow-hidden"
            >
              {/* Photo,object-cover ensures uniform sizing */}
              <Image
                src={member.image}
                alt={member.name}
                fill
                unoptimized
                className="object-cover object-top grayscale group-hover:grayscale-0 transition-[filter] duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Name + role + links pinned to top */}
              <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5 z-10"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)" }}
              >
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-white leading-tight truncate">
                    {member.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-mono text-white/60 leading-tight">
                    {member.role}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="inline-flex text-white/50 hover:text-white transition-colors [&_svg]:w-3.5 [&_svg]:h-3.5"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                      className="inline-flex text-white/50 hover:text-white transition-colors [&_svg]:w-3.5 [&_svg]:h-3.5"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartRef = useRef(0);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentSlide || index < 0 || index >= TOTAL_SLIDES) return;
      setCurrentSlide(index);
    },
    [currentSlide]
  );

  const next = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);
  const prev = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

  // Keyboard navigation,only on home slide
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


  // Touch/swipe navigation,only on home slide
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
    <div className="h-[100dvh] bg-black overflow-hidden">
      {/* Video background,hidden instantly on content pages */}
      <div
        className="fixed inset-0 z-[1] overflow-hidden"
        style={{ visibility: currentSlide === 0 ? "visible" : "hidden" }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover grayscale"
          src="/home_video.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"
          aria-hidden
        />
      </div>

      {/* Content,instant page swaps, no AnimatePresence */}
      <div className="relative z-10 h-full flex flex-col">
        <Navigation onNavigate={goToSlide} currentSlide={currentSlide} />

        <div
          key={currentSlide}
          className={`flex-1 ${currentSlide === 0 ? "flex flex-col" : "overflow-y-auto"}`}
        >
          {currentSlide === 0 && <HomeSlide />}
          {currentSlide === 1 && <ThesisSlide />}
          {currentSlide === 2 && <InvestmentsSlide />}
          {currentSlide === 3 && <TeamSlide />}
        </div>
      </div>
    </div>
  );
}
