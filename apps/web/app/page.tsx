// app/page.tsx
import { Hero } from "@/components/home/Hero";
import { SearchSection } from "@/components/home/SearchSection";
import { FeaturedNews } from "@/components/home/FeaturedNews";
import { FeaturedOpportunities } from "@/components/home/FeaturedOpportunities";
import { FeaturedOrganizations } from "@/components/home/FeaturedOrganizations";
import { FeaturedJobs } from "@/components/home/FeaturedJobs";
import { Statistics } from "@/components/home/Statistics";
import { Sectors } from "@/components/home/Sectors";
import { WhyTudulu } from "@/components/home/WhyTudulu";
import { Newsletter } from "@/components/home/Newsletter";
import { CTA } from "@/components/home/CTA";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <SearchSection />
      <FeaturedNews />
      <FeaturedOpportunities />
      <FeaturedOrganizations />
      <FeaturedJobs />
      <Statistics />
      <Sectors />
      <WhyTudulu />
      <Newsletter />
      <CTA />
    </main>
  );
}
