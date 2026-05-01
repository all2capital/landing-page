"use client";

import { useEffect } from "react";
import { warmupImageSources } from "@/lib/site-content";

export function AssetWarmup() {
  useEffect(() => {
    const uniqueSources = Array.from(new Set(warmupImageSources.filter(Boolean)));
    const handles = uniqueSources.map((src) => {
      const image = new window.Image();
      image.decoding = "async";
      image.src = src;
      return image;
    });

    return () => {
      handles.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, []);

  return null;
}
