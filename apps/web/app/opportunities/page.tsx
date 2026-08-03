// D:\tudulu\apps\web\app\opportunities\page.tsx

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { opportunitiesData } from "./data";

export const metadata: Metadata = {
  title: "Opportunities & Grants | Tudulu Uganda Limited",
  description:
    "Active funding rounds, equipment subsidies, and technology partnerships for healthcare, development, and sports organizations in East Africa.",
};

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
    <div className="min-h-screen bg-[var(--td-bg-soft)] text-[var(--td-text)] flex flex-col font-sans selection:bg-[var(--td-color-primary)] selection:text-[var(--td-text-inverse)]">
      <main className="flex-1">
        {/* Hero Section */}
        <Section
          spacing="lg"
          className="relative overflow-hidden bg-[var(--td-bg)] border-b border-[var(--td-border-subtle)] py-20 sm:py-28"
        >
          {/* East Africa Collaboration Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1920&auto=format&fit=crop"
            alt="East Africa Collaboration"
            fill
            priority
            className="object-cover object-center opacity-15 pointer-events-none"
          />

          <div className="absolute inset-0 td-glow-hero pointer-events-none" />

          <Container size="md" className="relative z-10 text-center space-y-6">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Active Grants &{" "}
              <span className="td-gradient-text">Opportunities</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--td-text-light)] max-w-2xl mx-auto leading-relaxed font-normal">
              Curated funding rounds, equipment subsidies, and technology
              partnerships open for healthcare, development, and sports
              organizations in East Africa.
            </p>
          </Container>
        </Section>

        {/* Opportunities Grid Section */}
        <Section
          spacing="lg"
          className="py-16 sm:py-24 bg-[var(--td-bg-soft)] border-b border-[var(--td-border-subtle)]"
        >
          <Container size="lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunitiesData.map((opp) => (
                <Card
                  key={opp.id}
                  className="td-card p-6 flex flex-col justify-between group transition-all hover:border-[var(--td-color-primary)]"
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

                    <h2 className="text-lg font-bold text-[var(--td-text)] leading-snug group-hover:text-[var(--td-color-primary)] transition-colors">
                      {opp.title}
                    </h2>

                    <p className="text-[var(--td-text-light)] text-sm leading-relaxed line-clamp-3">
                      {opp.description}
                    </p>

                    <div className="pt-4 border-t border-[var(--td-border-subtle)] space-y-2 text-xs text-[var(--td-text-light)]">
                      <p>
                        <strong className="text-[var(--td-text)] font-semibold">
                          Target:
                        </strong>{" "}
                        {opp.target}
                      </p>
                      <p>
                        <strong className="text-[var(--td-text)] font-semibold">
                          Value:
                        </strong>{" "}
                        <span className="text-[var(--td-color-primary)] font-bold">
                          {opp.amount}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--td-border-subtle)] mt-6 flex items-center justify-between text-xs">
                    <span className="text-[var(--td-text-muted)] font-semibold">
                      Deadline: {opp.deadline}
                    </span>
                    <Link
                      href={`/opportunities/${opp.id}`}
                      className="rounded-lg focus:outline-hidden"
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
