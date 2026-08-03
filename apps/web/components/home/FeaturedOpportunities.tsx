// D:\tudulu\apps\web\components\home\FeaturedOpportunities.tsx

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import {
  DollarSign,
  Calendar,
  Target,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export function FeaturedOpportunities() {
  const opportunities = [
    {
      id: "opp-1",
      title: "East Africa Digital Health & AI Innovation Fund 2026",
      organization: "USAID & Gates Foundation",
      type: "Grant Opportunity",
      amount: "$50,000 - $250,000",
      deadline: "Aug 30, 2026",
      target: "HealthTech Startups & Hospitals",
      slug: "east-africa-digital-health-ai-fund-2026",
      featured: true,
      badgeVariant: "emerald" as const,
    },
    {
      id: "opp-2",
      title: "Community Solar Resilience Equipment Subsidy",
      organization: "Power Africa",
      type: "Equipment Grant",
      amount: "Up to 60% Subsidy",
      deadline: "Rolling Basis",
      target: "Rural Clinics & Schools",
      slug: "community-solar-resilience-subsidy",
      featured: false,
      badgeVariant: "blue" as const,
    },
    {
      id: "opp-3",
      title: "Grassroots Sports Analytics & Tournament Tech Sponsorship",
      organization: "Tudulu Sports Foundation",
      type: "Technical Partnership",
      amount: "Software & Hardware Tools",
      deadline: "Sept 15, 2026",
      target: "Youth Sports Academies",
      slug: "grassroots-sports-analytics-sponsorship",
      featured: false,
      badgeVariant: "amber" as const,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[var(--td-bg)] text-[var(--td-text)] border-y border-[var(--td-border-subtle)]">
      <Container size="lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[var(--td-border-subtle)]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[var(--td-color-primary)] uppercase tracking-widest mb-2">
              Capital & Resources
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--td-text)] tracking-tight">
              Open Grants & Funding
            </h2>
            <p className="text-[var(--td-text-light)] text-base sm:text-lg mt-2">
              Curated opportunities, equipment subsidies, and partnerships for
              East African entities.
            </p>
          </div>
          <Link
            href="/opportunities"
            className="mt-6 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--td-color-primary)] hover:opacity-80 transition-opacity group shrink-0"
          >
            <span>Explore all 850+ opportunities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className={`group relative p-6 sm:p-8 bg-[var(--td-bg-soft)] rounded-[var(--td-radius-lg)] border ${
                opp.featured
                  ? "border-[var(--td-color-primary)] shadow-md ring-1 ring-[var(--td-color-primary)]/50"
                  : "border-[var(--td-border-subtle)] hover:border-[var(--td-border)] hover:shadow-md"
              } transition-all duration-200 flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant={opp.badgeVariant}>{opp.type}</Badge>
                  {opp.featured && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[var(--td-color-primary)] bg-[var(--td-color-primary)]/10 px-2 py-0.5 rounded-full border border-[var(--td-color-primary)]/20 shrink-0">
                      <Sparkles className="w-3 h-3 shrink-0" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-xs font-semibold text-[var(--td-text-muted)]">
                    {opp.organization}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--td-text)] group-hover:text-[var(--td-color-primary)] transition-colors leading-snug mt-1">
                    <Link href={`/opportunities/${opp.slug}`}>{opp.title}</Link>
                  </h3>
                </div>

                <div className="space-y-2 pt-2 border-t border-[var(--td-border-subtle)] text-xs text-[var(--td-text-light)]">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-semibold text-[var(--td-text)]">
                      {opp.amount}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <Target className="w-4 h-4 text-[var(--td-text-muted)] shrink-0" />
                    <span className="truncate">{opp.target}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[var(--td-text-muted)] shrink-0" />
                    <span className="truncate">
                      Deadline:{" "}
                      <strong className="text-[var(--td-text)]">
                        {opp.deadline}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--td-border-subtle)] flex items-center justify-between">
                <Link
                  href={`/opportunities/${opp.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 h-10 px-4 rounded-[var(--td-radius-md)] bg-[var(--td-text)] hover:bg-[var(--td-color-primary)] text-[var(--td-text-inverse)] font-semibold text-xs transition-colors"
                >
                  <span>View Details & Apply</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
