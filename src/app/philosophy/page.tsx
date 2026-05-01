import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { PhilosophySlide } from "@/components/slides/PhilosophySlide";

export const metadata: Metadata = {
  title: "Philosophy | All Together Capital",
  description:
    "Five convictions that shape how we partner with founders, from the first call through the long arc of building a company together.",
};

export default function PhilosophyPage() {
  return (
    <SiteShell variant="paper">
      <PhilosophySlide />
    </SiteShell>
  );
}
