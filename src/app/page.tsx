"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import { Cpu, Code2, Zap, Rocket, Bot, Dna } from "lucide-react";
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
  "We build and invest in the technologies shaping the future.",
  "We learn by building, not just observing.",
  "We stay close to emerging technologies and the markets around them.",
  "We build, experiment, and invest with conviction.",
  "We understand systems by working inside them.",
  "We invest in what we've spent time building and testing.",
];

/* Thesis principles */
const principles = [
  {
    title: "Operator-Led",
    description:
      "We've built companies, led engineering teams, and shipped products at scale. Our investment decisions are grounded in the reality of building — not abstract market analysis. When we evaluate a company, we're assessing the architecture, the team's technical depth, and the product's path to scale.",
  },
  {
    title: "AI-Native Only",
    description:
      "Every company in our portfolio is built from the ground up with AI at its foundation. We don't invest in companies that bolt machine learning onto legacy products. We look for founders building entirely new systems — where artificial intelligence isn't a feature but the reason the company can exist at all.",
  },
  {
    title: "Technical Conviction",
    description:
      "Our engineering backgrounds let us underwrite technology risk that generalist investors can't evaluate. We go deep on system architecture, scalability, and technical moats — the things that separate breakout companies from the rest.",
  },
];

/* Investment sectors */
const sectors = [
  {
    name: "Hardware",
    Icon: Cpu,
    description:
      "The future of AI hardware lies in the transition from general-purpose GPUs to highly specialized Neuromorphic and LPU (Language Processing Unit) architectures. These systems mimic human neural pathways, enabling \"Edge AI\" where complex reasoning occurs locally with near-zero latency. As silicon reaches its physical limits, the industry is pivoting toward optical computing and 3D-stacked chip designs to meet the global demand for high-speed inference.",
    areas: [
      "Custom AI accelerators",
      "Edge inference hardware",
      "Semiconductor design automation",
      "Next-gen memory architectures",
    ],
    opportunities: [
      { name: "Groq", url: "https://groq.com", desc: "Specialists in ultra-fast inference hardware; we have personally invested in this venture and are currently seeing a significant 2.7x return." },
      { name: "Cerebras Systems", url: "https://cerebras.net", desc: "Innovators of \"Wafer-Scale\" processing designed to handle massive AI workloads with a single, giant chip." },
    ],
  },
  {
    name: "Software",
    Icon: Code2,
    description:
      "AI software is evolving into a paradigm of Agentic AI, where autonomous systems move beyond simple chat interfaces to independently plan and execute complex workflows. This era features self-healing code and intent-based architectures that allow users to achieve goals through natural language rather than manual configuration. By prioritizing transparency and open-weight models, the industry is shifting toward a more modular and accessible ecosystem that avoids the pitfalls of centralized, \"black-box\" systems.",
    areas: [
      "AI development platforms",
      "Code generation & dev tools",
      "Enterprise AI infrastructure",
      "Data pipeline orchestration",
    ],
    opportunities: [
      { name: "Google", url: "https://google.com", desc: "Having effectively shifted into \"startup mode,\" Google is now shipping hundreds of AI-integrated products and features monthly, reclaiming its position as a rapid-response leader in the space." },
      { name: "Hugging Face", url: "https://huggingface.co", desc: "The central hub for the open-source community, facilitating the democratization of AI models and datasets for developers globally." },
    ],
  },
  {
    name: "Energy",
    Icon: Zap,
    description:
      "Energy may replace currency one day. The energy sector is evolving into a \"Cognitive Grid\"—a self-optimizing ecosystem replacing reactive, manual infrastructure. As volatile renewables challenge legacy systems, AI acts as the grid's \"brain,\" using real-time telemetry to balance supply and demand with millisecond precision.\n\nBeyond management, AI transforms energy exploration into high-precision engineering. By modeling subsurface physics and nuclear dynamics, it makes complex sources like geothermal and fusion both technically viable and economically competitive.",
    areas: [
      "Next-generation nuclear",
      "Grid-scale energy storage",
      "AI-optimized power management",
      "Sustainable data center infrastructure",
    ],
    opportunities: [
      { name: "Fervo Energy", url: "https://fervoenergy.com", desc: "A leader in enhanced geothermal systems." },
      { name: "Zanskar", url: "https://zanskar.us", desc: "Utilizes AI to identify naturally occurring reservoirs with high precision." },
      { name: "Oklo", url: "https://oklo.com", desc: "Pioneering a \"Nuclear as a Service\" model with its Aurora powerhouse." },
      { name: "NuScale Power", url: "https://nuscalepower.com", desc: "Holds the first NRC-certified SMR design." },
      { name: "Nextracker", url: "https://nextracker.com", desc: "The global leader in AI-driven solar tracking." },
      { name: "Terabase Energy", url: "https://terabase.energy", desc: "Uses automation and digital twins to scale utility-scale solar construction." },
    ],
  },
  {
    name: "Space",
    Icon: Rocket,
    description:
      "Space exploration is being redefined by Autonomous Orbitals, allowing satellites to process data in-situ and make real-time decisions without waiting for ground control. AI is the foundational pilot for deep-space missions, providing terrain-relative navigation and autonomous hazard avoidance in environments where communication lag is a barrier. Furthermore, AI-driven situational awareness is now vital for coordinating satellite traffic and maintaining orbital safety in increasingly crowded corridors.",
    areas: [
      "Autonomous launch vehicles",
      "Small satellite platforms",
      "Space-based edge computing",
      "Earth observation & analytics",
    ],
    opportunities: [
      { name: "SpaceX", url: "https://spacex.com", desc: "Leveraging AI for autonomous launch vehicle recovery and Starlink constellation management; notably, they are currently pushing for orbital computing platforms to handle AI workloads directly in space." },
      { name: "Planet Labs", url: "https://planet.com", desc: "Operates the world's largest fleet of Earth observation satellites, using AI to turn a massive archive of daily global imagery into actionable geospatial intelligence." },
      { name: "Slingshot Aerospace", url: "https://slingshotaerospace.com", desc: "Provides AI-powered analytics for space traffic coordination, helping to prevent collisions and manage the growing \"space junk\" problem." },
    ],
  },
  {
    name: "Robotics",
    Icon: Bot,
    description:
      "The robotics sector is moving from specialized industrial automation to General-Purpose Humanoids capable of learning through observation and natural language instruction. The integration of Large Behavior Models (LBMs) allows robots to navigate unstructured environments, such as homes and construction sites, with human-like dexterity. This transition marks the shift from robots as programmed tools to collaborative partners capable of performing multifaceted, high-dexterity tasks.",
    areas: [
      "Autonomous mobile robots",
      "Precision manipulation",
      "Humanoid & legged systems",
      "3D perception & planning",
    ],
    opportunities: [
      { name: "Boston Dynamics", url: "https://bostondynamics.com", desc: "The world leader in advanced mobile robotics, setting the standard for agility and dynamic balance in machines." },
    ],
  },
  {
    name: "Biotech",
    Icon: Dna,
    description:
      "Biotechnology has shifted from a trial-and-error discipline to a predictive digital science, where therapeutic compounds are designed computationally rather than discovered through traditional lab work. AI models are successfully solving the \"protein folding\" problem, allowing for the creation of custom enzymes and personalized medicine tailored to individual genetic profiles. This digital transformation is significantly reducing the time and cost required to bring life-saving treatments to market.",
    areas: [
      "AI-powered drug discovery",
      "Protein design & engineering",
      "Synthetic biology platforms",
      "Computational genomics & diagnostics",
    ],
    opportunities: [
      { name: "Isomorphic Labs", url: "https://isomorphiclabs.com", desc: "An Alphabet subsidiary building on the success of AlphaFold to radically accelerate drug design and understand the fundamental molecular building blocks of life." },
    ],
  },
];

const team = [
  {
    name: "Robert Neir",
    role: "General Partner",
    bio: "Engineering leader with deep experience in systems and platform architecture. Focused on building and scaling reliable, high-performance infrastructure.",
    image: "/team-rob.png",
    linkedin: "https://www.linkedin.com/in/robertmneir/",
    email: "robertneir@all2capital.com",
  },
  {
    name: "Hisham El-Husseini",
    role: "General Partner",
    bio: "Engineer building products that shape behavior, coordinate users, and scale into durable networks over time.",
    image: "/team-hisham.png",
    linkedin: "https://www.linkedin.com/in/hisham-el-husseini/",
    email: "hisham@all2capital.com",
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
    <div className="flex-1 min-h-0 relative flex flex-col">
      <div className="relative z-10 flex flex-col flex-1 min-h-0 justify-end pb-20 sm:pb-20 md:pb-24 lg:pb-28">
        <div className={alignmentWrapper}>
          <div className="max-w-2xl w-full">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPhrase}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
              >
                {philosophies[currentPhrase]}
              </motion.p>
            </AnimatePresence>

            <div className="mt-8 sm:mt-10">
              <JoinLPForm />
            </div>
          </div>
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
        <motion.h2
          {...driftUp(0)}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 sm:mb-8 text-white"
        >
          Manifesto
        </motion.h2>
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = sectors[selectedIndex];

  return (
    <div className="bg-black min-h-full overflow-y-auto">
      <div className={`${alignmentWrapper} pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24`}>
        <motion.h2
          {...driftUp(0)}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 sm:mb-8 text-white"
        >
          Investments
        </motion.h2>
        <motion.p
          {...driftUp(0.05)}
          className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mb-10 sm:mb-14"
        >
          We back technical founders working across six core sectors. Everything we
          invest in touches AI in some way — these are the industries being reshaped by it.
        </motion.p>

        {/* Sector tabs */}
        <motion.div
          {...driftUp(0.1)}
          className="flex flex-wrap items-end gap-x-3 gap-y-2 sm:gap-x-5 sm:gap-y-3 mb-8 sm:mb-10"
        >
          {sectors.map(({ name, Icon }, i) => {
            const isSelected = i === selectedIndex;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setSelectedIndex(i)}
                className={`inline-flex items-center gap-1.5 sm:gap-2 py-2 px-1 transition-colors duration-200 touch-manipulation cursor-pointer ${
                  isSelected
                    ? "text-white font-semibold"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                <Icon
                  className={isSelected ? "w-5 h-5 sm:w-6 sm:h-6" : "w-4 h-4 sm:w-5 sm:h-5"}
                  strokeWidth={isSelected ? 2 : 1.5}
                />
                <span
                  className={`whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? "text-base sm:text-lg md:text-xl lg:text-2xl"
                      : "text-sm sm:text-base md:text-lg"
                  }`}
                >
                  {name}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Selected sector description + opportunities */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
              {/* Description */}
              <div className="max-w-2xl">
                <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed whitespace-pre-line">
                  {selected.description}
                </p>
              </div>

              {/* Opportunities */}
              {selected.opportunities.length > 0 && (
                <div className="shrink-0 lg:w-[380px]">
                  <h4 className="text-lg sm:text-xl font-semibold text-white mb-4">
                    Opportunities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {selected.opportunities.map((opp) => (
                      <div key={opp.name}>
                        <a
                          href={opp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
                        >
                          <img
                            src={faviconUrl(opp.url)}
                            alt=""
                            width={18}
                            height={18}
                            className="w-[18px] h-[18px] rounded shrink-0"
                          />
                          <span className="font-medium underline decoration-white/30 underline-offset-2 group-hover:decoration-white/60 text-sm sm:text-base">
                            {opp.name}
                          </span>
                        </a>
                        <p className="text-xs sm:text-sm text-white/45 leading-relaxed mt-1">
                          {opp.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Slide 3: Team ─── */
function TeamSlide() {
  return (
    <div className="bg-black min-h-full overflow-y-auto">
      <div className={`${alignmentWrapper} pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24`}>
        <motion.h2
          {...driftUp(0)}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 sm:mb-8 text-white"
        >
          Team
        </motion.h2>
        <motion.p
          {...driftUp(0.05)}
          className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mb-14 sm:mb-20"
        >
          We&apos;re technical founders and long-term investors with over a decade of experience building systems, shipping products, and working at the edge of emerging technologies. We stay close to the market by continuously building, experimenting, and learning.
        </motion.p>

        <div className="space-y-14 sm:space-y-20">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              {...driftUp(0.1 + i * 0.08)}
              className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8"
            >
              {/* Photo */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden shrink-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-[50%_30%] grayscale"
                  sizes="176px"
                />
              </div>
              {/* Info */}
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                    {member.name}
                  </h3>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="text-white/30 hover:text-white/70 transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                      className="text-white/30 hover:text-white/70 transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </a>
                  )}
                </div>
                <p className="text-sm sm:text-base font-medium text-white/30 font-mono mb-3 sm:mb-4">
                  {member.role}
                </p>
                <p className="text-base sm:text-lg text-white/55 leading-relaxed max-w-3xl">
                  {member.bio}
                </p>
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
    <div className="min-h-screen h-screen max-h-[100dvh] bg-black overflow-hidden">
      {/* Video background — hidden instantly on content pages */}
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

      {/* Content — instant page swaps, no AnimatePresence */}
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
