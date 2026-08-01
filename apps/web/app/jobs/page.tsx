import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Jobs & Careers | Tudulu Impact Platform",
  description:
    "Explore career opportunities, consultancy roles, and field engineering positions across health, development, sports, and technology in East Africa.",
};

export default function JobsPage() {
  const featuredJobs = [
    {
      id: "job-1",
      title: "Senior Health Information System (HIS) Engineer",
      organization: "Tudulu Health",
      location: "Kampala, Uganda (Hybrid)",
      type: "Full-time",
      category: "Engineering",
      variant: "emerald" as const,
      postedAt: "3 days ago",
      description:
        "Lead the architectural deployment of low-latency, offline-first clinical decision tools and medical record bridges for regional clinics.",
    },
    {
      id: "job-2",
      title: "Development Intelligence Analyst",
      organization: "Tudulu Impact",
      location: "Remote (East Africa)",
      type: "Full-time",
      category: "Research & Data",
      variant: "amber" as const,
      postedAt: "1 week ago",
      description:
        "Monitor, structure, and evaluate grant intelligence, humanitarian reports, and NGO funding flows across Uganda and regional hubs.",
    },
    {
      id: "job-3",
      title: "Grassroots Sports Development Specialist",
      organization: "Tudulu Sports",
      location: "Jinja, Uganda (On-site)",
      type: "Contract",
      category: "Community",
      variant: "blue" as const,
      postedAt: "2 weeks ago",
      description:
        "Coordinate youth tournament logistics, talent scouting workflows, and partner sports foundation data integration.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      <main className="flex-1">
        {/* Hero Section */}
        <Section
          spacing="lg"
          className="relative overflow-hidden bg-white border-b border-slate-200"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
          <Container size="md" className="relative z-10">
            <div className="text-center space-y-6">
              <Badge variant="blue">Development & Impact Marketplace</Badge>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                Empowering Purpose-Driven Talent
              </h1>

              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
                Connecting technical engineers, health specialists, and NGO
                leaders with high-impact roles and consultancy opportunities
                across East Africa.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link href="#listings" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full">
                    Browse Open Roles
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full">
                    Post an Opportunity
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>

        {/* Job Listings Section */}
        <Section
          id="listings"
          spacing="lg"
          className="bg-slate-50 border-b border-slate-200"
        >
          <Container size="lg">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Featured Opportunities
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Verified roles across Tudulu divisions and partner
                  organizations.
                </p>
              </div>
              <div className="mt-4 md:mt-0 text-xs text-slate-500 font-medium">
                Showing {featuredJobs.length} active positions
              </div>
            </div>

            <div className="space-y-4">
              {featuredJobs.map((job) => (
                <Card
                  key={job.id}
                  hoverable
                  className="p-6 transition-all duration-200 group bg-white border border-slate-200 shadow-xs"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={job.variant}>{job.category}</Badge>
                        <span className="text-xs font-semibold text-slate-500">
                          {job.organization}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs text-slate-500">
                          {job.postedAt}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                        {job.title}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 pt-1">
                        <span>📍 {job.location}</span>
                        <span>💼 {job.type}</span>
                      </div>
                    </div>

                    <div className="pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 flex items-center md:flex-col justify-between md:justify-center gap-3 shrink-0">
                      <Link href="/contact" className="w-full md:w-auto">
                        <Button variant="outline" size="sm" className="w-full">
                          Apply Now &rarr;
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Talent Network Callout */}
        <Section
          spacing="md"
          className="bg-white border-b border-slate-200 py-12"
        >
          <Container size="md">
            <Card className="p-8 text-center bg-slate-900 text-white rounded-2xl shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Join the Tudulu Talent Network
              </h2>
              <p className="text-slate-300 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
                Don’t see a specific fit right now? Register your profile to be
                notified when relevant health, engineering, or development
                consultancy roles open up.
              </p>
              <div className="mt-6">
                <Link href="/contact">
                  <Button variant="primary" size="md">
                    Register Your CV
                  </Button>
                </Link>
              </div>
            </Card>
          </Container>
        </Section>
      </main>
    </div>
  );
}
