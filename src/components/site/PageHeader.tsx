"use client";

import { motion } from "framer-motion";
import { driftUp } from "@/lib/site-content";

export function PageHeader({
  title,
  className = "",
  tone = "light",
}: {
  title: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const ruleClass =
    tone === "dark"
      ? "border-[rgb(var(--at-ink-rgb)_/_0.2)]"
      : "border-[rgb(var(--at-paper-rgb)_/_0.2)]";
  const lineClass =
    tone === "dark"
      ? "bg-[rgb(var(--at-ink-rgb)_/_0.42)]"
      : "bg-[rgb(var(--at-paper-rgb)_/_0.42)]";
  const textClass =
    tone === "dark"
      ? "text-[rgb(var(--at-ink-rgb)_/_0.68)]"
      : "text-[rgb(var(--at-paper-rgb)_/_0.68)]";
  return (
    <motion.div
      {...driftUp(0)}
      className={`flex items-center gap-5 border-b ${ruleClass} pb-[18px] ${className}`}
    >
      <div className="flex min-w-0 items-center gap-4">
        <span className={`h-px w-14 shrink-0 ${lineClass}`} />
        <p className={`m-0 font-mono text-[11px] font-medium uppercase tracking-[0.22em] ${textClass}`}>
          {title}
        </p>
      </div>
    </motion.div>
  );
}
