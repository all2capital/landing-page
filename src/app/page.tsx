"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";

export default function Home() {
  return (
    <>
      <PageLoader />
      <Navigation />
      <main className="relative">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
