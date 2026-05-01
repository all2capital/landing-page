import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { CompaniesSlide } from "@/components/slides/CompaniesSlide";

export const metadata: Metadata = {
  title: "Companies | All Together Capital",
  description:
    "The companies we build with and support. From AI to atoms.",
};

export default function CompaniesPage() {
  return (
    <SiteShell variant="deep">
      <CompaniesSlide />
    </SiteShell>
  );
}
