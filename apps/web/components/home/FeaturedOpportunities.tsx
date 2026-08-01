// components/home/FeaturedOpportunities.tsx
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
    <section className="py-20 sm:py-28 bg-slate-50 border-y border-slate-200">
      <Container size="lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-sky-600 uppercase tracking-widest mb-2">
              Capital & Resources
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Open Grants & Funding
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-2">
              Curated opportunities, equipment subsidies, and partnerships for
              East African entities.
            </p>
          </div>
          <Link
            href="/opportunities"
            className="mt-6 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors group shrink-0"
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
              className={`group relative p-6 sm:p-8 bg-white rounded-2xl border ${
                opp.featured
                  ? "border-sky-300 shadow-md ring-1 ring-sky-300/50"
                  : "border-slate-200 hover:border-slate-300 hover:shadow-md"
              } transition-all duration-200 flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant={opp.badgeVariant}>{opp.type}</Badge>
                  {opp.featured && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-500">
                    {opp.organization}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug mt-1">
                    <Link href={`/opportunities/${opp.slug}`}>{opp.title}</Link>
                  </h3>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-900">
                      {opp.amount}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">{opp.target}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>
                      Deadline:{" "}
                      <strong className="text-slate-800">{opp.deadline}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/opportunities/${opp.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-slate-900 hover:bg-sky-600 text-white font-semibold text-xs transition-colors"
                >
                  <span>View Details & Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
