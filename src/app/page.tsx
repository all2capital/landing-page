import { SiteShell } from "@/components/site/SiteShell";
import { HomeSlide } from "@/components/slides/HomeSlide";

export default function HomePage() {
  return (
    <SiteShell variant="paper">
      <HomeSlide />
    </SiteShell>
  );
}
