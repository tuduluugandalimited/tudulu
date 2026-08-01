import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "About Us | Tudulu Uganda Limited",
  description:
    "Building Africa's premier development intelligence ecosystem. Discover how Tudulu Uganda Limited connects organizations, health systems, talent analytics, and grant data across the continent.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      <main className="flex-1">
        {/* Hero Section */}
        <Section
          spacing="lg"
          className="relative overflow-hidden bg-white border-b border-slate-100 py-20 sm:py-24"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
          <Container size="md" className="relative z-10 text-center space-y-6">
            <Badge variant="emerald">
              Impact Intelligence & Platform Engineering
            </Badge>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Connecting Africa’s Impact Ecosystem
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Tudulu Uganda Limited is an African-led technology enterprise
              based in Kampala. We build high-trust data platforms, edge health
              architecture, and development intelligence for the continent’s
              next decade.
            </p>
          </Container>
        </Section>

        {/* Who We Are & Overview */}
        <Section
          spacing="lg"
          className="py-16 sm:py-20 bg-slate-50/50 border-b border-slate-100"
        >
          <Container size="lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">
                    Who We Are
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Beyond News: A Platform for Verified Development
                    Intelligence
                  </h2>
                </div>

                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Traditional media platforms across Sub-Saharan Africa are
                  often fragmented or cluttered with tabloid-style distraction.
                  Tudulu was founded to replace visual noise with
                  executive-grade clarity.
                </p>

                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  We engineer structured data pipelines connecting funding
                  opportunities, civil society organizations, health systems
                  engineering, and youth sports analytics into a single
                  cross-linked ecosystem.
                </p>

                <div className="pt-2 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-slate-200/80 rounded-xl">
                    <div className="text-2xl font-extrabold text-slate-900">
                      Kampala
                    </div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                      Headquarters
                    </div>
                  </div>
                  <div className="p-4 bg-white border border-slate-200/80 rounded-xl">
                    <div className="text-2xl font-extrabold text-slate-900">
                      Multi-Pillar
                    </div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                      Platform Architecture
                    </div>
                  </div>
                </div>
              </div>

              {/* Vision / Mission Cards */}
              <div className="lg:col-span-6 space-y-6">
                <Card className="p-8 bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="w-10 h-10 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center font-bold text-lg mb-2"></div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Our Mission
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    To democratize access to critical grant intel, health field
                    data, and development metrics—empowering African
                    institutions, researchers, and field operators with trusted
                    software solutions.
                  </p>
                </Card>

                <Card className="p-8 bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold text-lg mb-2"></div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Our Vision
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    To become Sub-Saharan Africa’s standard enterprise
                    infrastructure for development tracking, grant
                    accessibility, and health technology deployment.
                  </p>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        {/* Core Strategic Pillars */}
        <Section
          spacing="lg"
          className="py-16 sm:py-24 bg-white border-b border-slate-100"
        >
          <Container size="lg" className="space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">
                What We Do
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Four Pillars of the Tudulu Platform
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Our technology ecosystem integrates four dedicated domains into
                a single unified directory.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pillar 1 */}
              <Card className="p-6 bg-white border border-slate-200 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-8 h-8 bg-sky-50 text-sky-600 rounded-md flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Grant & NGO Intelligence
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Structuring funding, tender opportunities, and verified
                    non-profit organization registries for maximum transparency
                    and accessibility.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/opportunities"
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1"
                  >
                    Explore Opportunities &rarr;
                  </Link>
                </div>
              </Card>

              {/* Pillar 2 */}
              <Card className="p-6 bg-white border border-slate-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-md flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Digital Health & Edge AI
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Engineering resilient Health Information Systems (HIS) and
                    edge data architectures optimized for low-bandwidth field
                    environments.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/health"
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
                  >
                    Health Systems Intel &rarr;
                  </Link>
                </div>
              </Card>

              {/* Pillar 3 */}
              <Card className="p-6 bg-white border border-slate-200 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-md flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Sports Talent Analytics
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Data-driven tracking for grassroots athletic talent across
                    East Africa, matching youth potential with global
                    educational and sports opportunities.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/sports"
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
                  >
                    Talent Analytics &rarr;
                  </Link>
                </div>
              </Card>

              {/* Pillar 4 */}
              <Card className="p-6 bg-white border border-slate-200 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-md flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Cloud & Field Engineering
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Building resilient API standards, serverless microservices,
                    and reliable cloud solutions tailored for regional technical
                    infrastructure.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/news"
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
                  >
                    Tech Insights &rarr;
                  </Link>
                </div>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Operating Values */}
        <Section
          spacing="lg"
          className="py-16 sm:py-20 bg-slate-50/50 border-b border-slate-100"
        >
          <Container size="lg" className="space-y-10">
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">
                Our Principles
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Built on Trust and Minimalist Rigor
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  1. White Canvas Precision
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We prioritize functional whitespace, crisp typography, and
                  uncluttered content hierarchy over noisy visual banners.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  2. Interconnected Entities
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every grant, organization, news article, and SDG tag is
                  structured to connect logically to corresponding regional
                  impact metrics.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  3. Field-Ready Engineering
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Software must perform under real field conditions. We optimize
                  for low data usage, fast initial loads, and resilient offline
                  capabilities.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* Call To Action */}
        <Section spacing="lg" className="py-20 bg-white">
          <Container size="md" className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Ready to Collaborate with Tudulu?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Whether you are looking to list an organization, submit grant
              opportunities, or explore health software integration, our team is
              ready to talk.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs"
              >
                Get in Touch
              </Link>
              <Link
                href="/opportunities"
                className="w-full sm:w-auto px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg transition-colors"
              >
                Browse Platform
              </Link>
            </div>
          </Container>
        </Section>
      </main>
    </div>
  );
}
