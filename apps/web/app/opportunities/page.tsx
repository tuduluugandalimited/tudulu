// D:\tudulu\apps\web\app\opportunities\page.tsx

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Opportunities & Grants | Tudulu Uganda Limited",
  description:
    "Active funding rounds, equipment subsidies, and technology partnerships for healthcare, development, and sports organizations in East Africa.",
};

export interface Opportunity {
  id: string;
  title: string;
  type: "Grant" | "Equipment Subsidy" | "Partnership" | "Fellowship";
  amount: string;
  deadline: string;
  target: string;
  description: string;
  category:
    | "HealthTech"
    | "Energy Resilience"
    | "Youth & Sports"
    | "Digital Tech";
}

const opportunities: Opportunity[] = [
  {
    id: "1",
    title: "East Africa Digital Health & AI Innovation Fund 2026",
    type: "Grant",
    amount: "$50,000 - $250,000",
    deadline: "Aug 30, 2026",
    target: "HealthTech Startups, Hospitals & Clinics",
    description:
      "Funding for low-latency Health Information Systems (HIS), offline-first clinical tools, and Edge AI integrations tailored for East African health centers.",
    category: "HealthTech",
  },
  {
    id: "2",
    title: "Community Solar Resilience Equipment Grant",
    type: "Equipment Subsidy",
    amount: "Up to 60% Subsidy",
    deadline: "Rolling Basis",
    target: "Rural Clinics & Community Schools",
    description:
      "Subsidy program providing hybrid solar power systems, battery storage, and installation support for off-grid healthcare and education centers.",
    category: "Energy Resilience",
  },
  {
    id: "3",
    title: "Grassroots Sports Analytics & Tournament Tech Sponsorship",
    type: "Partnership",
    amount: "Technical Support & Tools",
    deadline: "Sept 15, 2026",
    target: "Youth Sports Foundations & Academies",
    description:
      "Providing tournament management software, player stat tracking, and digital scouting directories to grassroots sports organizations.",
    category: "Youth & Sports",
  },
];

const categoryVariantMap: Record<
  string,
  "emerald" | "amber" | "blue" | "default"
> = {
  HealthTech: "emerald",
  "Energy Resilience": "amber",
  "Youth & Sports": "blue",
  "Digital Tech": "default",
};

export default function OpportunitiesPage() {
  return (
    <div className="min-h-screen bg-[var(--td-bg-canvas,#FFFFFF)] text-[var(--td-text-primary,#0F172A)] flex flex-col font-sans selection:bg-[var(--td-color-sky)] selection:text-white">
      <main className="flex-1">
        {/* Hero Section with Unsplash Background */}
        <Section
          spacing="lg"
          className="relative overflow-hidden py-24 sm:py-32 bg-slate-900 border-b border-slate-800"
        >
          {/* East Africa Collaboration Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1920&auto=format&fit=crop"
            alt="East Africa Collaboration"
            fill
            priority
            className="object-cover object-center opacity-20 pointer-events-none"
          />

          {/* Dark Overlay Gradient for Optimal Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-900 pointer-events-none" />

          {/* Hero Content */}
          <Container size="md" className="relative z-10 text-center space-y-4">
            <Badge
              variant="blue"
              className="bg-sky-500/20 text-sky-300 border border-sky-400/30"
            >
              Funding & Partnerships
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Active Grants & Opportunities
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
              Curated funding rounds, equipment subsidies, and technology
              partnerships open for healthcare, development, and sports
              organizations in East Africa.
            </p>
          </Container>
        </Section>

        {/* Opportunities Grid Section */}
        <Section
          spacing="lg"
          className="bg-[var(--td-bg-canvas)] border-b border-[var(--td-border-subtle)]"
        >
          <Container size="lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.map((opp) => (
                <Card
                  key={opp.id}
                  hoverable
                  className="p-6 flex flex-col justify-between group transition-all duration-200 td-focus-ring"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <Badge
                        variant={categoryVariantMap[opp.category] || "default"}
                      >
                        {opp.category}
                      </Badge>
                      <span className="text-[var(--td-text-muted)] font-medium">
                        {opp.type}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-[var(--td-text-primary)] leading-snug group-hover:text-[var(--td-color-primary)] transition-colors">
                      {opp.title}
                    </h2>

                    <p className="text-[var(--td-text-secondary)] text-sm leading-relaxed line-clamp-3">
                      {opp.description}
                    </p>

                    <div className="pt-4 border-t border-[var(--td-border-subtle)] space-y-2 text-xs text-[var(--td-text-secondary)]">
                      <p>
                        <strong className="text-[var(--td-text-primary)] font-semibold">
                          Target:
                        </strong>{" "}
                        {opp.target}
                      </p>
                      <p>
                        <strong className="text-[var(--td-text-primary)] font-semibold">
                          Value:
                        </strong>{" "}
                        <span className="text-[var(--td-color-primary)] font-bold">
                          {opp.amount}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--td-border-subtle)] mt-6 flex items-center justify-between text-xs">
                    <span className="text-[var(--td-status-deadline)] font-semibold">
                      Deadline: {opp.deadline}
                    </span>
                    <Link
                      href={`/opportunities/${opp.id}`}
                      className="td-focus-ring rounded-lg"
                    >
                      <Button variant="outline" size="sm">
                        View Details &rarr;
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      </main>
    </div>
  );
}
