"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function JoinLPForm({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const closeModal = useCallback(() => {
    setOpen(false);
    // Reset form state after close animation
    setTimeout(() => {
      if (!submitted) return;
      setSubmitted(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      setError(null);
    }, 300);
  }, [submitted]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, closeModal]);

  // Auto-close after success
  useEffect(() => {
    if (!submitted || !open) return;
    const timer = setTimeout(() => closeModal(), 2000);
    return () => clearTimeout(timer);
  }, [submitted, open, closeModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/lp-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger button, stays inline, never moves */}
      <div className={className}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="inline-block"
        >
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={() => setOpen(true)}
            className="px-8 sm:px-8 py-3 sm:py-3.5 font-medium text-base sm:text-base text-white/95 h-auto min-h-[48px] sm:min-h-[48px] rounded-xl border border-white/25 w-full sm:w-auto"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
              backdropFilter: 'blur(20px) saturate(150%)',
              WebkitBackdropFilter: 'blur(20px) saturate(150%)',
              boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.2), 0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            Join as LP
          </Button>
        </motion.div>
      </div>

      {/* Modal overlay */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeModal}
              aria-hidden
            />

            {/* Modal content */}
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 40, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative z-10 btn-liquid-glass w-full max-w-sm p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pb-6 text-left rounded-t-2xl sm:rounded-2xl"
                >
                  <p className="text-base font-medium text-white/95 leading-relaxed">
                    We will contact you within 72 hours.
                  </p>
                  <p className="mt-2 text-sm text-white/60">
                    Thank you for your interest in All2 Capital.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 40, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onSubmit={handleSubmit}
                  className="relative z-10 btn-liquid-glass w-full max-w-sm p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:pb-5 rounded-t-2xl sm:rounded-2xl"
                >
                  <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-4 sm:hidden" />
                  <h3 className="text-lg font-semibold text-white/95 mb-5">Join as LP</h3>
                  <div className="space-y-4 mb-5">
                    <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4">
                      <label className="block">
                        <span className="block text-xs font-medium text-white/60 mb-1.5">
                          First name
                        </span>
                        <Input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="input-liquid-glass w-full h-auto min-h-[44px] border-white/25 bg-white/12"
                          autoFocus
                        />
                      </label>
                      <label className="block">
                        <span className="block text-xs font-medium text-white/60 mb-1.5">
                          Last name
                        </span>
                        <Input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="input-liquid-glass w-full h-auto min-h-[44px] border-white/25 bg-white/12"
                        />
                      </label>
                    </div>
                    <label className="block">
                      <span className="block text-xs font-medium text-white/60 mb-1.5">
                        Email
                      </span>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-liquid-glass w-full h-auto min-h-[44px] border-white/25 bg-white/12"
                      />
                    </label>
                  </div>
                  {error && (
                    <p className="text-sm text-red-400/90 mb-3">{error}</p>
                  )}
                  <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-end gap-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="default"
                      onClick={closeModal}
                      disabled={loading}
                      className="text-sm text-white/50 hover:text-white/80 transition-colors disabled:opacity-50 h-auto min-h-[48px] sm:min-h-0 sm:p-0 hover:bg-transparent shadow-none rounded-xl sm:rounded-none"
                    >
                      Cancel
                    </Button>
                    <motion.div
                      whileHover={loading ? undefined : { scale: 1.02 }}
                      whileTap={loading ? undefined : { scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        variant="ghost"
                        size="default"
                        disabled={loading}
                        className="w-full sm:w-auto px-5 py-3 sm:py-2.5 text-sm font-medium text-white disabled:opacity-70 h-auto min-h-[48px] rounded-xl border border-white/30 bg-white/20 hover:bg-white/25 transition-colors"
                      >
                        {loading ? "Sending\u2026" : "Submit"}
                      </Button>
                    </motion.div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
