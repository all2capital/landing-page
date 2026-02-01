"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function JoinLPForm({ className = "" }: { className?: string }) {
  const [expanded, setExpanded] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!expanded) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [expanded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: wire to your LP signup endpoint
    console.log({ firstName, lastName, email });
  };

  return (
    <div ref={containerRef} className={`overflow-hidden rounded-xl ${className}`}>
      <AnimatePresence initial={false} mode="wait">
        {!expanded ? (
          <motion.div
            key="button"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="inline-block"
          >
            <motion.button
              type="button"
              onClick={() => setExpanded(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="btn-liquid-glass px-8 py-3.5 font-medium text-base"
            >
              Join as LP
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ maxHeight: 0, opacity: 0 }}
            animate={{ maxHeight: 280, opacity: 1 }}
            exit={{ maxHeight: 0, opacity: 0 }}
            transition={{
              maxHeight: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
              opacity: { duration: 0.3 },
            }}
            onSubmit={handleSubmit}
            className="btn-liquid-glass block w-full max-w-sm overflow-hidden p-5"
          >
            <div className="space-y-4 mb-5">
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="block text-xs font-medium text-white/60 mb-1.5">
                    First name
                  </span>
                  <motion.input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input-liquid-glass w-full"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 }}
                    autoFocus
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-medium text-white/60 mb-1.5">
                    Last name
                  </span>
                  <motion.input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input-liquid-glass w-full"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  />
                </label>
              </div>
              <label className="block">
                <span className="block text-xs font-medium text-white/60 mb-1.5">
                  Email
                </span>
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-liquid-glass w-full"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14 }}
                />
              </label>
            </div>
            <div className="flex items-center justify-end gap-3">
              <motion.button
                type="button"
                onClick={() => setExpanded(false)}
                className="text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-liquid-glass px-5 py-2.5 text-sm font-medium"
              >
                Submit
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
