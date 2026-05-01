"use client";

import Navigation from "@/components/Navigation";
import { AssetWarmup } from "@/components/site/AssetWarmup";

export function SiteShell({
  children,
  variant = "paper",
}: {
  children: React.ReactNode;
  variant?: "paper" | "deep";
}) {
  const bgClass = variant === "deep" ? "bg-[var(--at-deep)]" : "bg-[var(--at-paper)]";
  return (
    <div className={`at-site-shell ${bgClass}`}>
      <div className="at-page-frame relative z-10 flex flex-col">
        <AssetWarmup />
        <Navigation />
        <div className="touch-scroll flex min-h-0 flex-1 flex-col overflow-visible">
          {children}
        </div>
      </div>
    </div>
  );
}
