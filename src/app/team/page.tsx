import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { TeamSlide } from "@/components/slides/TeamSlide";

export const metadata: Metadata = {
  title: "Team — All Together Capital",
  description: "The founding partners of All Together Capital.",
};

export default function TeamPage() {
  return (
    <SiteShell variant="paper">
      <TeamSlide />
    </SiteShell>
  );
}
