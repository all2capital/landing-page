"use client";

import { useState } from "react";

export function InvestmentLogo({
  name,
  fallback,
  sources,
}: {
  name: string;
  fallback: string;
  sources: string[];
}) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const src = sources[sourceIndex];
  const useFallback = !src;

  const tryNextSource = () => {
    setSourceIndex((index) => Math.min(index + 1, sources.length));
  };

  return (
    <div className="mb-[18px] flex h-14 w-full items-center justify-center">
      {!useFallback && (
        <img
          src={src}
          alt={name}
          className="at-investment-logo max-h-12 max-w-[78%] object-contain opacity-90 transition duration-500 group-hover:opacity-100"
          onError={tryNextSource}
          onLoad={(event) => {
            const image = event.currentTarget;
            if (image.naturalWidth < 16 || image.naturalHeight < 16) {
              tryNextSource();
            }
          }}
        />
      )}
      {useFallback && (
        <span className="font-display text-[26px] font-normal leading-none tracking-normal text-[var(--at-paper)] transition duration-500 group-hover:text-[#ffffff]">
          {fallback}
        </span>
      )}
    </div>
  );
}
