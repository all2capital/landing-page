"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useEffect, useRef, MouseEvent as ReactMouseEvent } from "react";
import { Bot, Code2, Cpu, Dna, Rocket, Zap } from "lucide-react";
import JoinLPForm from "@/components/JoinLPForm";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const sectorIcons = { Cpu, Zap, Rocket, Bot, Dna, Code2 } as const;

const TOTAL_SLIDES = 3;

/* Investment sectors; each has video and description */
const investmentSubNodes = [
  {
    name: "Hardware",
    icon: "Cpu" as const,
    videoSrc: "/post-scarcity-odyssey.mp4",
    description:
      "We back chips, systems, and infrastructure that make AI faster and more efficient. From custom silicon to data centers — the physical layer that scales intelligence.",
  },
  {
    name: "Software",
    icon: "Code2" as const,
    videoSrc: "/post-scarcity-odyssey.mp4",
    description:
      "Developer tools, platforms, and applications powered by AI. We invest in technical founders building the stack that every team will use to ship smarter software.",
  },
  {
    name: "Energy",
    icon: "Zap" as const,
    videoSrc: "/post-scarcity-odyssey.mp4",
    description:
      "AI and automation are reshaping power generation, storage, and distribution. We back companies that make energy abundant, clean, and aligned with compute demand.",
  },
  {
    name: "Space",
    icon: "Rocket" as const,
    videoSrc: "/post-scarcity-odyssey.mp4",
    description:
      "From launch and satellites to in-space infrastructure — we invest in teams using software and autonomy to open the frontier. Space is the next platform.",
  },
  {
    name: "Robotics",
    icon: "Bot" as const,
    videoSrc: "/post-scarcity-odyssey.mp4",
    description:
      "Embodied AI that moves: manipulation, mobility, and human-in-the-loop systems. We back founders building robots that work in the real world, not just demos.",
  },
  {
    name: "Biotech",
    icon: "Dna" as const,
    videoSrc: "/post-scarcity-odyssey.mp4",
    description:
      "AI-driven discovery and engineering in biology and longevity. We invest in technical teams using computation to decode life and extend healthspan.",
  },
];

const team = [
  {
    name: "Hisham",
    role: "General Partner",
    bio: "Technical founder turned investor. Focused on infrastructure and developer tools.",
    image: "/team-hisham.png",
    linkedin: "https://www.linkedin.com/in/hisham-el-husseini/",
    email: "hisham@zbuffercapital.com",
  },
  {
    name: "Rob",
    role: "General Partner",
    bio: "Engineering leader with deep experience in systems and platform architecture.",
    image: "/team-rob.png",
    linkedin: "https://www.linkedin.com/in/robertmneir/",
    email: "robertneir@zbuffercapital.com",
  },
];

function GlowCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
      style={{
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: isHovered
          ? "0 8px 32px -8px rgba(0, 0, 0, 0.4)"
          : "none",
      }}
    >
      {/* RGB glow that follows cursor — very subtle, small radius */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(100px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,0,60,0.03), rgba(255,140,0,0.02) 30%, transparent 55%)`,
        }}
      />
      {/* Border glow that follows cursor — very subtle, small radius */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(70px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,100,50,0.06), rgba(0,150,255,0.04) 40%, transparent 65%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      <Card className="relative z-10 rounded-xl border border-white/[0.06] bg-white/[0.03] shadow-none text-card-foreground">
        <div className="relative z-10">{children}</div>
      </Card>
    </motion.div>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "50%" : "-50%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-50%" : "50%",
    opacity: 0,
  }),
};

const slideContentTop = "pt-[6vh] sm:pt-[10vh] md:pt-[14vh] lg:pt-[18vh] pb-16 sm:pb-24 md:pb-32";

function HeroSlide({ isFirstLoad }: { isFirstLoad: boolean }) {
  const d = isFirstLoad ? 2 : 0;
  return (
    <div className="flex-1 min-h-0 relative flex flex-col">
      {/* Content overlay — bottom left (Founders Fund style) */}
      <div className="relative z-10 flex flex-col flex-1 min-h-0 justify-end pb-12 sm:pb-20 md:pb-24 lg:pb-28 px-4 sm:px-6 md:px-8 lg:px-10 lg:pl-16">
        <div className="max-w-2xl w-full">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: d ? 1.2 : 0.4, ease: [0.16, 1, 0.3, 1], delay: d }}
            className="text-[1.5rem] sm:text-[2.25rem] md:text-[2.8125rem] lg:text-[3.375rem] xl:text-[4.5rem] font-bold tracking-tight leading-[1.08] max-w-4xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            style={{ fontFamily: '"Proxima Nova", sans-serif' }}
          >
            Reimagining the world.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: d ? 0.8 : 0.35, ease: [0.16, 1, 0.3, 1], delay: d + (d ? 0.3 : 0.06) }}
            className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-white/90 max-w-xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
          >
            We are tech builders and founders investing in AI, the new era of software, hardware, space, biotech, and longevity. No bullshit crypto projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: d ? 0.8 : 0.35, ease: [0.16, 1, 0.3, 1], delay: d + (d ? 0.5 : 0.12) }}
            className="mt-6 sm:mt-8"
          >
            <JoinLPForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function InvestmentsSlide() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = investmentSubNodes[selectedIndex];

  return (
    <div className="flex-1 min-h-0 relative flex flex-col">
      {/* Video at top — shorter height, stays up top */}
      <div className="relative w-full h-[38vh] min-h-[200px] shrink-0 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <video
              className="absolute inset-0 w-full h-full object-cover object-top grayscale"
              src={selected.videoSrc}
              autoPlay
              muted
              loop
              playsInline
              onLoadedMetadata={(e) => { e.currentTarget.playbackRate = 1; }}
            />
          </motion.div>
        </AnimatePresence>
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"
          aria-hidden
        />
      </div>

      {/* Black background + rainbow glow; sectors just below video, then selected description */}
      <div className="relative flex-1 min-h-0 flex flex-col bg-[#08080c] overflow-hidden">
        {/* Rainbow glow — same effect as landing, positioned for this section */}
        <div
          className="absolute bottom-0 left-0 w-[800px] h-[800px] -translate-x-1/2 translate-y-1/2 rounded-full opacity-20 blur-[100px] bg-glow-rgb pointer-events-none"
          aria-hidden
          suppressHydrationWarning
        />
        <div
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[1000px] h-[500px] rounded-full blur-3xl bg-glow-center pointer-events-none"
          aria-hidden
          suppressHydrationWarning
        />

        <div className="relative z-10 flex flex-col flex-1 min-h-0 px-4 sm:px-6 md:px-8 lg:px-10 lg:pl-16">
          {/* Thesis overview for the whole page */}
          <div className="w-full max-w-2xl pt-4 sm:pt-5 md:pt-6 pb-4 sm:pb-5">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4 text-white"
              style={{ fontFamily: '"Proxima Nova", sans-serif' }}
            >
              Thesis
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
              We&apos;re builders ourselves. We back technical founders working on AI, software,
              hardware, space, biotech, and longevity — the things that actually matter. Everything we invest in touches AI in some way. This is a must.
            </p>
          </div>

          {/* Sectors — selectable sector buttons, bottom-aligned */}
          <div className="w-full pb-6 sm:pb-8">
            <h3
              className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-3 sm:mb-4 text-white"
              style={{ fontFamily: '"Proxima Nova", sans-serif' }}
            >
              Sectors
            </h3>
            <div className="flex flex-wrap items-end gap-x-3 gap-y-2 sm:gap-x-4 sm:gap-y-2 md:gap-x-5 lg:gap-x-6 max-w-4xl">
              {investmentSubNodes.map((sector, i) => {
                const Icon = sectorIcons[sector.icon];
                const isSelected = i === selectedIndex;
                return (
                  <button
                    key={sector.name}
                    type="button"
                    onClick={() => setSelectedIndex(i)}
                    className={`inline-flex items-end gap-1.5 sm:gap-2 min-h-[44px] py-2 px-1 -mx-1 rounded-lg transition-colors duration-200 touch-manipulation cursor-pointer border-0 bg-transparent text-left shrink-0 ${
                      isSelected
                        ? "text-white font-semibold"
                        : "text-white/60 hover:text-white/80 active:text-white/90"
                    }`}
                    aria-pressed={isSelected}
                    aria-label={`Select AI ${sector.name}`}
                  >
                    <span className="inline-flex shrink-0 items-end leading-none">
                      <Icon
                        className={isSelected ? "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" : "w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5"}
                        strokeWidth={isSelected ? 2 : 1.5}
                        aria-hidden
                      />
                    </span>
                    <span
                      className={`whitespace-nowrap leading-none transition-[font-size] duration-200 ${
                        isSelected ? "text-base sm:text-lg md:text-xl lg:text-2xl" : "text-xs sm:text-sm md:text-base"
                      }`}
                    >
                      AI {sector.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected sector description — directly below tabs, no gap */}
          <div className="w-full max-w-2xl pb-12 sm:pb-20 md:pb-24 lg:pb-28">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
              >
                <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
                  {selected.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamSlide() {
  return (
    <div className={`flex-1 flex flex-col min-h-0 ${slideContentTop} px-4 sm:px-6 md:px-8 lg:px-12 overflow-y-auto overflow-x-hidden overscroll-contain touch-scroll`}>
      <div className="max-w-[1100px] mx-auto w-full min-w-0">
        <div className="max-w-[700px] mx-auto w-full text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 sm:mb-12"
          >
            Team
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {team.map((member, i) => (
            <GlowCard key={member.name} className="p-0 overflow-hidden" delay={0.05 + i * 0.05}>
              <div className="relative h-52 sm:h-60 md:h-72 -m-px rounded-t-xl overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-[50%_35%] grayscale"
                  sizes="(max-width: 640px) 100vw, 350px"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(to bottom, transparent 55%, rgba(8,8,12,0.4) 80%, rgba(10,10,12,0.92) 100%)",
                  }}
                />
              </div>
              <div className="p-4 sm:p-5 md:p-6 lg:p-8 relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">{member.name}</h3>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="text-white/50 hover:text-white transition-colors cursor-pointer"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                      className="text-white/50 hover:text-white transition-colors cursor-pointer"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </a>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-medium text-white/40 font-mono mb-2 sm:mb-4">{member.role}</p>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed">{member.bio}</p>
              </div>
            </GlowCard>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const slideLabels = ["Home", "Investments", "Team"];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const touchStartRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsFirstLoad(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === currentSlide || index < 0 || index >= TOTAL_SLIDES) return;
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
      setIsAnimating(true);
    },
    [currentSlide, isAnimating]
  );

  const next = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);
  const prev = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
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
  }, [next, prev]);

  // Wheel navigation with cooldown
  useEffect(() => {
    let lastWheel = 0;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel < 800) return;
      if (Math.abs(e.deltaY) > 30) {
        lastWheel = now;
        if (e.deltaY > 0) next();
        else prev();
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [next, prev]);

  // Touch/swipe navigation
  useEffect(() => {
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
  }, [next, prev]);

  return (
    <>
      <div className="min-h-screen h-screen max-h-[100dvh] bg-[#08080c] overflow-hidden">
        {/* Background */}
        <div className="fixed inset-0 z-0" suppressHydrationWarning>
          <div className="absolute inset-0 bg-[#08080c]" />
          {/* RGB corner glow — echoes logo (CSS class avoids Dark Reader hydration mismatch) */}
          <div
            className="absolute -top-[300px] -left-[300px] w-[900px] h-[900px] rounded-full opacity-[0.25] blur-[100px] bg-glow-rgb"
            suppressHydrationWarning
          />
          {/* Subtle center glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full blur-3xl bg-glow-center"
            suppressHydrationWarning
          />
        </div>

        {/* Hero video: full-screen behind nav when on slide 0 so nav blends into it */}
        {currentSlide === 0 && (
          <div className="fixed inset-0 z-[1] overflow-hidden">
            <video
              className="absolute inset-0 w-full h-full object-cover grayscale"
              src="/post-scarcity-odyssey.mp4"
              autoPlay
              muted
              loop
              playsInline
              onLoadedMetadata={(e) => { e.currentTarget.playbackRate = 1; }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"
              aria-hidden
            />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          <Navigation onNavigate={goToSlide} currentSlide={currentSlide} />

          <AnimatePresence
            initial={false}
            custom={direction}
            mode="wait"
            onExitComplete={() => setIsAnimating(false)}
          >
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col"
            >
              {currentSlide === 0 && <HeroSlide isFirstLoad={isFirstLoad} />}
              {currentSlide === 1 && <InvestmentsSlide />}
              {currentSlide === 2 && <TeamSlide />}
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots — bottom right (page indicator), smaller on mobile */}
          <div
            className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 pb-safe flex items-center gap-1.5 sm:gap-3 z-20"
          >
            {slideLabels.map((label, i) => (
              <Button
                key={label}
                variant="ghost"
                size="icon"
                onClick={() => goToSlide(i)}
                aria-label={`Go to ${label}`}
                className={`rounded-full transition-all duration-300 touch-manipulation flex items-center justify-center hover:bg-transparent bg-transparent shadow-none border-0 min-h-[36px] min-w-[36px] sm:min-h-0 sm:min-w-0 p-2.5 sm:p-0 sm:m-0 ${
                  i === currentSlide
                    ? "bg-white h-1.5 w-4 min-w-4 sm:h-2 sm:min-w-6"
                    : "bg-white/20 hover:bg-white/40 active:bg-white/50 h-1.5 w-1.5 sm:h-2 sm:w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
