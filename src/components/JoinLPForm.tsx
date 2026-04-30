"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type JoinLPFormProps = {
  className?: string;
  tone?: "dark" | "light";
};

export default function JoinLPForm({ className = "", tone = "dark" }: JoinLPFormProps) {
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

  const triggerToneClass =
    tone === "light"
      ? "border-[rgb(var(--at-ink-rgb)_/_0.64)] text-[var(--at-ink)] hover:border-[var(--at-ink)] hover:bg-[var(--at-ink)] hover:text-[var(--at-paper)] focus-visible:ring-[var(--at-ink)]"
      : "border-[rgb(var(--at-paper-rgb)_/_0.72)] text-[var(--at-paper)] hover:border-[var(--at-paper-tint)] hover:bg-[var(--at-paper-tint)] hover:text-[var(--at-ink)] focus-visible:ring-[var(--at-paper)]";

  return (
    <>
      <div className={className}>
        <motion.div
          whileTap={{ y: 1 }}
          className="inline-block"
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`group inline-flex min-h-11 w-full items-center justify-center gap-3 border px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] transition duration-300 focus-visible:outline-none focus-visible:ring-1 sm:w-auto ${triggerToneClass}`}
          >
            <span>Join as LP</span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-[rgb(var(--at-deep-rgb)_/_0.78)]"
              onClick={closeModal}
              aria-hidden
            />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 14 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 w-full max-w-sm border border-[var(--at-rule)] bg-[var(--at-paper)] p-6 text-left text-[var(--at-ink)] shadow-[0_24px_80px_rgb(var(--at-ink-rgb)_/_0.24)]"
                >
                  <p className="font-display text-2xl font-normal leading-tight text-[var(--at-ink)]">
                    We will contact you within 72 hours.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--at-ink-3)]">
                    Thank you for your interest in All Together Capital.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 14 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  onSubmit={handleSubmit}
                  className="relative z-10 w-full max-w-[420px] border border-[var(--at-rule)] bg-[var(--at-paper)] p-5 text-[var(--at-ink)] shadow-[0_24px_80px_rgb(var(--at-ink-rgb)_/_0.24)] sm:p-6"
                >
                  <div className="mb-5 flex items-start justify-between gap-5 border-b border-[var(--at-rule)] pb-4">
                    <div>
                      <p className="mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--at-ink-3)]">
                        Investor access
                      </p>
                      <h3 className="font-display text-3xl font-normal leading-none text-[var(--at-ink)]">
                        Join as LP
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={closeModal}
                      disabled={loading}
                      aria-label="Close"
                      className="flex h-8 w-8 shrink-0 items-center justify-center border border-transparent font-mono text-2xl leading-none text-[var(--at-ink)] transition hover:border-[var(--at-rule)] hover:bg-[var(--at-paper-soft)] disabled:opacity-50"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mb-5 space-y-4">
                    <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3">
                      <label className="block">
                        <span className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--at-ink-3)]">
                          First name
                        </span>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="h-11 w-full border border-[var(--at-rule)] bg-[var(--at-paper-tint)] px-3 text-[15px] text-[var(--at-ink)] outline-none transition focus:border-[var(--at-ink)]"
                          autoFocus
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--at-ink-3)]">
                          Last name
                        </span>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="h-11 w-full border border-[var(--at-rule)] bg-[var(--at-paper-tint)] px-3 text-[15px] text-[var(--at-ink)] outline-none transition focus:border-[var(--at-ink)]"
                        />
                      </label>
                    </div>
                    <label className="block">
                      <span className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--at-ink-3)]">
                        Email
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 w-full border border-[var(--at-rule)] bg-[var(--at-paper-tint)] px-3 text-[15px] text-[var(--at-ink)] outline-none transition focus:border-[var(--at-ink)]"
                      />
                    </label>
                  </div>
                  {error && (
                    <p className="mb-3 text-sm text-[var(--at-accent-warm)]">{error}</p>
                  )}
                  <div className="flex items-center justify-between gap-3 border-t border-[var(--at-rule)] pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      disabled={loading}
                      className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--at-ink-3)] transition hover:text-[var(--at-ink)] disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <motion.div
                      whileTap={loading ? undefined : { y: 1 }}
                    >
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex min-h-10 items-center justify-center border border-[var(--at-ink)] px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--at-ink)] transition hover:bg-[var(--at-ink)] hover:text-[var(--at-paper-tint)] disabled:opacity-60"
                      >
                        {loading ? "Sending\u2026" : "Submit"}
                      </button>
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
