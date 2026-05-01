import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { PortfolioSlide } from "@/components/slides/PortfolioSlide";

export const metadata: Metadata = {
  title: "Portfolio | All Together Capital",
  description:
    "The companies we build with and support. From AI to atoms.",
};

export default function PortfolioPage() {
  return (
    <SiteShell variant="deep">
      <PortfolioSlide />
    </SiteShell>
  );
}
