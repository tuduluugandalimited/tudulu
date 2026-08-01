// D:\tudulu\apps\web\app\opportunities\[id]\page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { opportunitiesData } from "../data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return opportunitiesData.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const opp = opportunitiesData.find((item) => item.id === id);

  if (!opp) {
    return { title: "Opportunity Not Found | Tudulu" };
  }

  return {
    title: `${opp.title} | Tudulu Impact Opportunities`,
    description: opp.description,
  };
}

export default async function OpportunityDetailPage({ params }: Props) {
  const { id } = await params;
  const opp = opportunitiesData.find((item) => item.id === id);

  if (!opp) {
    notFound();
  }

  const categoryVariantMap: Record<
    string,
    "emerald" | "amber" | "blue" | "default"
  > = {
    HealthTech: "emerald",
    "Energy Resilience": "amber",
    "Youth & Sports": "blue",
    "Digital Tech": "default",
  };

  return (
    <div className="min-h-screen bg-[var(--td-bg-canvas,#F8FAFC)] text-[var(--td-text-primary,#0F172A)] flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      <main className="flex-1">
        <Section spacing="lg" className="bg-white border-b border-slate-200">
          <Container size="md">
            {/* Breadcrumb Back Link */}
            <div className="mb-6">
              <Link
                href="/opportunities"
                className="text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors inline-flex items-center space-x-1"
              >
                <span>&larr;</span>
                <span>Back to All Opportunities</span>
              </Link>
            </div>

            {/* Opportunity Header */}
            <header className="space-y-4 border-b border-slate-200 pb-8">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <Badge variant={categoryVariantMap[opp.category] || "default"}>
                  {opp.category}
                </Badge>
                <Badge variant="outline">{opp.type}</Badge>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-medium">
                  Deadline: {opp.deadline}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                {opp.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm font-semibold text-slate-700">
                <div>
                  <span className="text-slate-400 font-normal text-xs block uppercase tracking-wider">
                    Funding / Value
                  </span>
                  <span className="text-sky-600 text-lg sm:text-xl font-bold">
                    {opp.amount}
                  </span>
                </div>
                <div className="h-8 w-px bg-slate-200 hidden sm:block" />
                <div>
                  <span className="text-slate-400 font-normal text-xs block uppercase tracking-wider">
                    Target Beneficiaries
                  </span>
                  <span>{opp.target}</span>
                </div>
              </div>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-4 border-l-2 border-sky-500 pl-4">
                {opp.description}
              </p>
            </header>

            {/* Details Grid */}
            <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Content: Eligibility & Application Steps */}
              <div className="md:col-span-2 space-y-8">
                {/* Eligibility Criteria */}
                <Card className="p-6 bg-slate-50 border border-slate-200">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                    Eligibility Criteria
                  </h2>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    {opp.eligibility?.map((criterion, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-sky-600 font-bold shrink-0">
                          ✓
                        </span>
                        <span>{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Application Steps */}
                <div>
                  <h2 className="text-lg font-bold text-slate-900 mb-4">
                    Application Process
                  </h2>
                  <div className="space-y-4">
                    {opp.applicationSteps?.map((step, idx) => (
                      <Card key={idx} className="p-5 flex items-start gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-extrabold text-sm shrink-0">
                          {idx + 1}
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed pt-1">
                          {step}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar: Key Dates & Apply Action */}
              <div className="space-y-6">
                <Card className="p-6 bg-white border border-slate-200 space-y-6">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                      Key Timeline & Dates
                    </h3>
                    <div className="space-y-3">
                      {opp.keyDates?.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center text-xs pb-2 border-b border-slate-100 last:border-0 last:pb-0"
                        >
                          <span className="text-slate-600">{item.label}</span>
                          <span className="font-bold text-slate-900">
                            {item.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <a
                      href={`mailto:${opp.contactEmail}?subject=Application: ${encodeURIComponent(
                        opp.title,
                      )}`}
                      className="block w-full"
                    >
                      <Button variant="primary" size="lg" className="w-full">
                        Submit Proposal
                      </Button>
                    </a>
                    <p className="text-[11px] text-center text-slate-400">
                      Direct contact: {opp.contactEmail}
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </div>
  );
}
