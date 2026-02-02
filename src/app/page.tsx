"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import { Cpu, Code2, Zap, Rocket, Bot, Dna } from "lucide-react";
import JoinLPForm from "@/components/JoinLPForm";
import Navigation from "@/components/Navigation";

const TOTAL_SLIDES = 3;

/* Investment sectors */
const sectors = [
  { name: "Hardware", Icon: Cpu },
  { name: "Software", Icon: Code2 },
  { name: "Energy", Icon: Zap },
  { name: "Space", Icon: Rocket },
  { name: "Robotics", Icon: Bot },
  { name: "Biotech", Icon: Dna },
];

const team = [
  {
    name: "Rob",
    role: "General Partner",
    bio: "Engineering leader with deep experience in systems and platform architecture.",
    image: "/team-rob.png",
    linkedin: "https://www.linkedin.com/in/robertmneir/",
    email: "robertneir@zbuffercapital.com",
  },
  {
    name: "Hisham",
    role: "General Partner",
    bio: "Technical founder turned investor. Focused on infrastructure and developer tools.",
    image: "/team-hisham.png",
    linkedin: "https://www.linkedin.com/in/hisham-el-husseini/",
    email: "hisham@zbuffercapital.com",
  },
];

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

const alignmentWrapper = "max-w-[1400px] mx-auto w-full px-3 sm:px-6 md:px-10 lg:px-16";

function HeroSlide({ isFirstLoad }: { isFirstLoad: boolean }) {
  const d = isFirstLoad ? 2 : 0;
  return (
    <div className="flex-1 min-h-0 relative flex flex-col">
      <div className="relative z-10 flex flex-col flex-1 min-h-0 justify-end pb-20 sm:pb-20 md:pb-24 lg:pb-28">
        <div className={alignmentWrapper}>
          <div className="max-w-2xl w-full">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: d ? 1.2 : 0.4, ease: [0.16, 1, 0.3, 1], delay: d }}
              className="text-[1.5rem] sm:text-[2.25rem] md:text-[2.8125rem] lg:text-[3.375rem] xl:text-[4.5rem] font-bold tracking-tight leading-[1.08] max-w-4xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            >
              Investing in what matters.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: d ? 0.8 : 0.35, ease: [0.16, 1, 0.3, 1], delay: d + (d ? 0.3 : 0.06) }}
              className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-white/90 max-w-xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
            >
              We&apos;re operators and engineers backing technical founders across AI, infrastructure, and frontier technology.
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
    </div>
  );
}

function InvestmentsSlide() {
  return (
    <div className="flex-1 min-h-0 relative flex flex-col">
      <div className="relative z-10 flex flex-col flex-1 min-h-0 justify-end pb-20 sm:pb-20 md:pb-24 lg:pb-28">
        <div className={alignmentWrapper}>
          <div className="max-w-2xl w-full">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            >
              Investments
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
              className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] mb-5 sm:mb-8"
            >
              We invest exclusively in AI-native companies. Every founder we back is using artificial intelligence to reshape a core industry.
            </motion.p>

            {/* Sector list */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-3"
            >
              {sectors.map(({ name, Icon }) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base md:text-lg text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} aria-hidden />
                  {name}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamSlide() {
  return (
    <div className="flex-1 min-h-0 relative flex flex-col">
      <div className="relative z-10 flex flex-col flex-1 min-h-0 justify-end pb-20 sm:pb-20 md:pb-24 lg:pb-28">
        <div className={alignmentWrapper}>
          <div className="max-w-2xl w-full">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 sm:mb-8 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            >
              Team
            </motion.h2>

            <div className="space-y-6 sm:space-y-8">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 + i * 0.08 }}
                  className="flex items-start gap-4 sm:gap-5"
                >
                  {/* Circular avatar */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden shrink-0 border border-white/10">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-[50%_35%] grayscale"
                      sizes="96px"
                    />
                  </div>

                  {/* Text content */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                        {member.name}
                      </h3>
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on LinkedIn`}
                          className="text-white/50 hover:text-white transition-colors cursor-pointer"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
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
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                        </a>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-white/40 font-mono mb-1 sm:mb-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                      {member.role}
                    </p>
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
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
        {/* Persistent full-screen video background */}
        <div className="fixed inset-0 z-[1] overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover grayscale"
            src="/video.mp4"
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

          {/* Navigation dots */}
          <div
            className="absolute bottom-5 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 pb-safe flex items-center gap-2 sm:gap-3 z-20"
          >
            {slideLabels.map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => goToSlide(i)}
                aria-label={`Go to ${label}`}
                className={`rounded-full transition-all duration-300 touch-manipulation p-2 -m-1 ${
                  i === currentSlide
                    ? "[&>span]:bg-white [&>span]:w-5 [&>span]:sm:w-6"
                    : "[&>span]:bg-white/30 [&>span]:hover:bg-white/50 [&>span]:w-2 [&>span]:sm:w-2"
                }`}
              >
                <span className="block h-1.5 sm:h-2 rounded-full transition-all duration-300" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
