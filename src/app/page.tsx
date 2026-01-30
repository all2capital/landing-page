"use client";

import { useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ThesisSection from "@/components/ThesisSection";
import ProductsShowcase from "@/components/ProductsShowcase";
import TeamSection from "@/components/TeamSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import { SolarSystem3D } from "@/components/ui/solar-system-3d";

export default function Home() {
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <PageLoader />

      {/* Fixed 3D background */}
      <SolarSystem3D
        className="fixed inset-0 z-0"
        scrollY={scrollY}
      />

      {/* Scrolling content */}
      <div className="relative z-10">
        <Navigation />
        <main>
          <Hero />
          <ThesisSection />
          <ProductsShowcase />
          <TeamSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}
