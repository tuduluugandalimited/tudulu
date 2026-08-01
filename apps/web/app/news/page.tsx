import Link from "next/link";
import { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  variant?: "emerald" | "blue" | "amber";
}

export const articles: NewsArticle[] = [
  {
    id: "fiscal-sponsorship-guide",
    title: "Understanding Fiscal Sponsorship: A Guide for Growing Initiatives",
    date: "July 28, 2026",
    category: "Funding",
    variant: "emerald",
    summary:
      "A comprehensive guide on how fiscal sponsorship enables emerging non-profits and community projects to access funding, manage grants, and scale impact quickly.",
  },
  {
    id: "edge-hims-offline-resilience",
    title:
      "Deploying Edge AI & Offline-First HIMS in Low-Resource Health Centers",
    date: "July 20, 2026",
    category: "Health Tech",
    variant: "emerald",
    summary:
      "How continuous medical records syncing and local-first databases ensure uninterrupted healthcare service even during extended power or network outages.",
  },
  {
    id: "field-data-intelligence-mvp",
    title: "Optimizing Resource Tracking & Attendance for Regional Initiatives",
    date: "June 14, 2026",
    category: "Data Platforms",
    variant: "amber",
    summary:
      "A look into building high-reliability asset distribution systems and field tracking applications using edge data architectures.",
  },
  {
    id: "monorepo-printbridge-integration",
    title: "Architecting PrintBridge for Local Clinical Report Generation",
    date: "May 02, 2026",
    category: "System Architecture",
    variant: "blue",
    summary:
      "Streamlining background print jobs and PDF caching with IndexedDB and local print servers for clinical hardware workflows.",
  },
];

export const metadata: Metadata = {
  title: "Impact & News | Tudulu Uganda Limited",
  description:
    "Insights, technical breakdowns, and updates on our field engineering, health systems, and development intelligence across Sub-Saharan Africa.",
};

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      <main className="flex-1">
        {/* Header Section */}
        <Section
          spacing="lg"
          className="bg-white border-b border-slate-200 relative overflow-hidden py-16 sm:py-20"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
          <Container size="md" className="relative z-10 text-center space-y-4">
            <Badge variant="blue">Impact & Updates</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Latest News
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Insights, technical breakdowns, and updates on our field
              engineering, offline medical systems, and edge data architectures.
            </p>
          </Container>
        </Section>

        {/* News Grid Section */}
        <Section spacing="lg" className="bg-slate-50 py-12 sm:py-16">
          <Container size="lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((item) => (
                <Card
                  key={item.id}
                  hoverable
                  className="p-6 flex flex-col justify-between group transition-all duration-200 bg-white border border-slate-200 shadow-xs"
                >
                  <Link
                    href={`/news/${item.id}`}
                    className="space-y-3 block focus:outline-none"
                    aria-label={`Read article: ${item.title}`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant={item.variant || "blue"}>
                        {item.category}
                      </Badge>
                      <span className="text-slate-500 font-medium">
                        {item.date}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-sky-600 transition-colors pt-1">
                      {item.title}
                    </h2>

                    <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </Link>

                  <div className="pt-6 border-t border-slate-100 mt-6">
                    <Link
                      href={`/news/${item.id}`}
                      className="text-xs font-semibold text-slate-600 group-hover:text-sky-600 transition-colors inline-flex items-center gap-1.5 focus:outline-none"
                    >
                      <span>Read article</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        &rarr;
                      </span>
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
