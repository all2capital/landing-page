"use client";

import { useRef, useEffect } from "react";
import { SolarSystem3D } from "@/components/ui/solar-system-3d";

export default function Hero() {
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <SolarSystem3D className="absolute inset-0" scrollY={scrollY} />
    </section>
  );
}
