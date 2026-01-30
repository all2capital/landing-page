"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

const leftLinks = [
  { name: "Thesis", href: "#thesis" },
  { name: "Portfolio", href: "#portfolio" },
];

const rightLinks = [
  { name: "Team", href: "#team" },
  { name: "Founders", href: "#founders" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5"
    >
      <nav className="max-w-[1400px] mx-auto px-6 md:px-12 min-h-20 py-3 flex items-center justify-between">
        {/* Left Navigation - packed toward center */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-end mr-8">
          {leftLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3 + index * 0.05,
              }}
            >
              <Link
                href={link.href}
                className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-300 link-underline"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Center Logo */}
        <Link href="/" className="flex items-center justify-center group shrink-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Logo width={88} height={88} className="transition-transform duration-300" />
          </motion.div>
        </Link>

        {/* Right Navigation - packed toward center */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-start ml-8">
          {rightLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.4 + index * 0.05,
              }}
            >
              <Link
                href={link.href}
                className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-300 link-underline"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isOpen ? "open" : "closed"}
              className="w-5 h-4 flex flex-col justify-between"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 7 },
                }}
                className="w-full h-[1.5px] bg-black dark:bg-white origin-left transition-all"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                className="w-full h-[1.5px] bg-black dark:bg-white transition-all"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -7 },
                }}
                className="w-full h-[1.5px] bg-black dark:bg-white origin-left transition-all"
              />
            </motion.div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden overflow-hidden bg-white dark:bg-black border-t border-black/5 dark:border-white/5"
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {[...leftLinks, ...rightLinks].map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, x: -20 }}
              animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}
