"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect, useRef, MouseEvent as ReactMouseEvent } from "react";
import Navigation from "@/components/Navigation";
import PageLoader from "@/components/PageLoader";

const TOTAL_SLIDES = 3;

const focusAreas = [
  { name: "AI", description: "Infrastructure, models, and applied AI" },
  { name: "Software", description: "New era developer tools and platforms" },
  { name: "Hardware", description: "Chips, devices, and compute" },
  { name: "Space", description: "Launch, satellites, and exploration" },
  { name: "Biotech", description: "Drug discovery and synthetic biology" },
  { name: "Longevity", description: "Healthspan and life extension" },
];

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
      className={`relative rounded-xl border border-white/[0.06] bg-white/[0.03] overflow-hidden ${className}`}
      style={{
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: isHovered
          ? "0 8px 32px -8px rgba(0, 0, 0, 0.4)"
          : "none",
      }}
    >
      {/* RGB glow that follows cursor */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,0,60,0.15), rgba(255,140,0,0.1) 25%, rgba(0,200,80,0.08) 40%, rgba(0,120,255,0.1) 55%, rgba(120,0,255,0.08) 70%, transparent 80%)`,
        }}
      />
      {/* Border glow that follows cursor */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,100,50,0.3), rgba(0,150,255,0.2) 40%, transparent 70%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

function HeroSlide({ isFirstLoad }: { isFirstLoad: boolean }) {
  const d = isFirstLoad ? 2 : 0;
  return (
    <div className="flex-1 flex flex-col justify-end px-6 md:px-12 pb-20 md:pb-28">
      <div className="max-w-[1100px] mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: d }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] max-w-4xl"
        >
          Investing in new era AI builders.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: d + 0.3 }}
          className="mt-8 text-lg md:text-xl text-white/40 max-w-xl"
        >
          We are tech builders and founders investing in AI, the new era of software, hardware, space, biotech, and longevity. No bullshit crypto projects.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: d + 0.5 }}
          className="mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="rgb-btn px-8 py-3.5 font-medium text-base"
          >
            <span>Get in Touch</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

function ThesisSlide() {
  return (
    <div className="flex-1 flex items-center px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
        >
          Our Thesis
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-base md:text-lg text-white/50 max-w-2xl mb-12"
        >
          We&apos;re builders ourselves. We back technical founders working on AI, software,
          hardware, space, biotech, and longevity — the things that actually matter.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {focusAreas.map((area, i) => (
            <GlowCard key={area.name} className="p-4 md:p-5" delay={0.2 + i * 0.06}>
              <h3 className="text-sm md:text-base font-semibold mb-1">{area.name}</h3>
              <p className="text-xs md:text-sm text-white/40">{area.description}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamSlide() {
  return (
    <div className="flex-1 flex items-center px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-12"
        >
          Team
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-[700px]">
          {team.map((member, i) => (
            <GlowCard key={member.name} className="p-6 md:p-8" delay={0.1 + i * 0.1}>
              <h3 className="text-xl md:text-2xl font-semibold mb-1">{member.name}</h3>
              <p className="text-sm font-medium text-white/40 font-mono mb-4">{member.role}</p>
              <p className="text-base text-white/60">{member.bio}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const slideLabels = ["Home", "Thesis", "Team"];

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
      <PageLoader />

      <div className="h-screen bg-[#08080c] overflow-hidden">
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[#08080c]" />
          {/* RGB corner glow — echoes logo */}
          <div
            className="absolute -top-[300px] -left-[300px] w-[900px] h-[900px] rounded-full opacity-[0.25] blur-[100px]"
            style={{
              background: "conic-gradient(from 135deg at 50% 50%, #ff0000, #ff6600, #ffdd00, #00ff44, #0088ff, #6600ff, #ff0066, transparent 75%)",
            }}
          />
          {/* Subtle center glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full blur-3xl"
            style={{
              background: "radial-gradient(ellipse, rgba(255,255,255,0.02), transparent)",
            }}
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
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col"
            >
              {currentSlide === 0 && <HeroSlide isFirstLoad={isFirstLoad} />}
              {currentSlide === 1 && <ThesisSlide />}
              {currentSlide === 2 && <TeamSlide />}
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
            {slideLabels.map((label, i) => (
              <button
                key={label}
                onClick={() => goToSlide(i)}
                aria-label={label}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? "bg-white w-6"
                    : "bg-white/20 hover:bg-white/40 w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
