"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface VideoSectionProps {
  title: string;
  description: string;
  videoPlaceholder: string;
  index: number;
}

export default function VideoSection({
  title,
  description,
  videoPlaceholder,
  index,
}: VideoSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  const isEven = index % 2 === 0;

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity }}
      className="relative py-24 md:py-40 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div
          className={`flex flex-col ${
            isEven ? "lg:flex-row" : "lg:flex-row-reverse"
          } items-center gap-12 lg:gap-20`}
        >
          {/* Video/Visual Area */}
          <motion.div
            style={{ y, scale }}
            className="w-full lg:w-1/2"
          >
            <div className="video-container aspect-video bg-neutral-100 dark:bg-neutral-900 rounded-2xl overflow-hidden relative group">
              {/* Animated gradient background as video placeholder */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  background: videoPlaceholder,
                }}
              />
              
              {/* Play button overlay */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="w-16 h-16 bg-white/90 dark:bg-black/90 rounded-full flex items-center justify-center shadow-2xl">
                  <svg
                    className="w-6 h-6 text-black dark:text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </motion.div>

              {/* Corner decoration mimicking logo dither effect */}
              <div className="absolute top-0 left-0 w-32 h-32 opacity-20">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <pattern id={`dots-${index}`} width="8" height="8" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.5" fill="currentColor" className="text-black dark:text-white" />
                    </pattern>
                  </defs>
                  <path d="M0,0 L100,0 L0,100 Z" fill={`url(#dots-${index})`} />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight"
            >
              {title}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <button className="group flex items-center gap-2 text-sm font-medium hover:gap-4 transition-all duration-300 cursor-pointer">
                Learn more
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
