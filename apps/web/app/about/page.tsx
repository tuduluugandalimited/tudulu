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
    <div className="min-h-screen bg-[var(--td-bg-soft)] text-[var(--td-text)] flex flex-col font-sans selection:bg-[var(--td-color-primary)] selection:text-[var(--td-text-inverse)]">
      <main className="flex-1">
        {/* Hero Section */}
        <Section
          spacing="lg"
          className="relative overflow-hidden bg-[var(--td-bg)] border-b border-[var(--td-border-subtle)] py-20 sm:py-28"
        >
          <div className="absolute inset-0 td-glow-hero pointer-events-none" />
          <Container size="md" className="relative z-10 text-center space-y-6">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Connecting Africa’s{" "}
              <span className="td-gradient-text">Impact Ecosystem</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--td-text-light)] max-w-2xl mx-auto leading-relaxed font-normal">
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
          className="py-16 sm:py-24 bg-[var(--td-bg-soft)] border-b border-[var(--td-border-subtle)]"
        >
          <Container size="lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[var(--td-color-primary)] uppercase tracking-widest">
                    Who We Are
                  </span>
                  <h2 className="text-3xl font-extrabold text-[var(--td-text)] tracking-tight">
                    Beyond News: A Platform for Verified Development
                    Intelligence
                  </h2>
                </div>

                <p className="text-[var(--td-text-light)] leading-relaxed text-sm sm:text-base">
                  Traditional media platforms across Sub-Saharan Africa are
                  often fragmented or cluttered with tabloid-style distraction.
                  Tudulu was founded to replace visual noise with
                  executive-grade clarity.
                </p>

                <p className="text-[var(--td-text-light)] leading-relaxed text-sm sm:text-base">
                  We engineer structured data pipelines connecting funding
                  opportunities, civil society organizations, health systems
                  engineering, and youth sports analytics into a single
                  cross-linked ecosystem.
                </p>

                <div className="pt-2 grid grid-cols-2 gap-4">
                  <div className="p-5 bg-[var(--td-bg)] border border-[var(--td-border-subtle)] rounded-[var(--td-radius-lg)] shadow-xs transition-all hover:border-[var(--td-border)]">
                    <div className="text-2xl font-extrabold text-[var(--td-text)]">
                      Kampala
                    </div>
                    <div className="text-xs font-semibold text-[var(--td-text-muted)] uppercase tracking-wider mt-1">
                      Headquarters
                    </div>
                  </div>
                  <div className="p-5 bg-[var(--td-bg)] border border-[var(--td-border-subtle)] rounded-[var(--td-radius-lg)] shadow-xs transition-all hover:border-[var(--td-border)]">
                    <div className="text-2xl font-extrabold text-[var(--td-text)]">
                      Multi-Pillar
                    </div>
                    <div className="text-xs font-semibold text-[var(--td-text-muted)] uppercase tracking-wider mt-1">
                      Platform Architecture
                    </div>
                  </div>
                </div>
              </div>

              {/* Vision / Mission Cards */}
              <div className="lg:col-span-6 space-y-6">
                <Card className="td-card p-8 space-y-3 hover:border-[var(--td-color-primary)] transition-all">
                  <h3 className="text-xl font-bold text-[var(--td-text)]">
                    Our Mission
                  </h3>
                  <p className="text-[var(--td-text-light)] text-sm sm:text-base leading-relaxed">
                    To democratize access to critical grant intel, health field
                    data, and development metrics—empowering African
                    institutions, researchers, and field operators with trusted
                    software solutions.
                  </p>
                </Card>

                <Card className="td-card p-8 space-y-3 hover:border-[var(--td-color-secondary)] transition-all">
                  <h3 className="text-xl font-bold text-[var(--td-text)]">
                    Our Vision
                  </h3>
                  <p className="text-[var(--td-text-light)] text-sm sm:text-base leading-relaxed">
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
          className="py-16 sm:py-24 bg-[var(--td-bg)] border-b border-[var(--td-border-subtle)]"
        >
          <Container size="lg" className="space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-[var(--td-color-primary)] uppercase tracking-widest">
                What We Do
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--td-text)] tracking-tight">
                Four Pillars of the Tudulu Platform
              </h2>
              <p className="text-[var(--td-text-light)] text-sm sm:text-base">
                Our technology ecosystem integrates four dedicated domains into
                a single unified directory.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pillar 1 */}
              <Card className="td-card p-6 flex flex-col justify-between hover:border-[var(--td-color-primary)] transition-all">
                <div className="space-y-4">
                  <div className="w-9 h-9 bg-[var(--td-color-primary-light)] text-[var(--td-color-primary)] rounded-[var(--td-radius-md)] flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h3 className="text-lg font-bold text-[var(--td-text)]">
                    Grant & NGO Intelligence
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--td-text-light)] leading-relaxed">
                    Structuring funding, tender opportunities, and verified
                    non-profit organization registries for maximum transparency
                    and accessibility.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/opportunities"
                    className="text-xs font-bold text-[var(--td-color-primary)] hover:underline inline-flex items-center gap-1 group"
                  >
                    Explore Opportunities{" "}
                    <span className="transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </Card>

              {/* Pillar 2 */}
              <Card className="td-card p-6 flex flex-col justify-between hover:border-[var(--td-color-secondary)] transition-all">
                <div className="space-y-4">
                  <div className="w-9 h-9 bg-[var(--td-color-secondary-light)] text-[var(--td-color-secondary)] rounded-[var(--td-radius-md)] flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h3 className="text-lg font-bold text-[var(--td-text)]">
                    Digital Health & Edge AI
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--td-text-light)] leading-relaxed">
                    Engineering resilient Health Information Systems (HIS) and
                    edge data architectures optimized for low-bandwidth field
                    environments.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/health"
                    className="text-xs font-bold text-[var(--td-color-secondary)] hover:underline inline-flex items-center gap-1 group"
                  >
                    Health Systems Intel{" "}
                    <span className="transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </Card>

              {/* Pillar 3 */}
              <Card className="td-card p-6 flex flex-col justify-between hover:border-[var(--td-color-gold)] transition-all">
                <div className="space-y-4">
                  <div className="w-9 h-9 bg-[var(--td-color-gold-light)] text-[var(--td-color-gold)] rounded-[var(--td-radius-md)] flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h3 className="text-lg font-bold text-[var(--td-text)]">
                    Sports Talent Analytics
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--td-text-light)] leading-relaxed">
                    Data-driven tracking for grassroots athletic talent across
                    East Africa, matching youth potential with global
                    educational and sports opportunities.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/sports"
                    className="text-xs font-bold text-[var(--td-color-gold)] hover:underline inline-flex items-center gap-1 group"
                  >
                    Talent Analytics{" "}
                    <span className="transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </Card>

              {/* Pillar 4 */}
              <Card className="td-card p-6 flex flex-col justify-between hover:border-[var(--td-border)] transition-all">
                <div className="space-y-4">
                  <div className="w-9 h-9 bg-[var(--td-bg-surface-elevated)] text-[var(--td-text)] rounded-[var(--td-radius-md)] flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <h3 className="text-lg font-bold text-[var(--td-text)]">
                    Cloud & Field Engineering
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--td-text-light)] leading-relaxed">
                    Building resilient API standards, serverless microservices,
                    and reliable cloud solutions tailored for regional technical
                    infrastructure.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/news"
                    className="text-xs font-bold text-[var(--td-text)] hover:underline inline-flex items-center gap-1 group"
                  >
                    Tech Insights{" "}
                    <span className="transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Operating Values */}
        <Section
          spacing="lg"
          className="py-16 sm:py-24 bg-[var(--td-bg-soft)] border-b border-[var(--td-border-subtle)]"
        >
          <Container size="lg" className="space-y-12">
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <span className="text-xs font-bold text-[var(--td-color-primary)] uppercase tracking-widest">
                Our Principles
              </span>
              <h2 className="text-3xl font-extrabold text-[var(--td-text)] tracking-tight">
                Built on Trust and Minimalist Rigor
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="td-card p-6 space-y-3">
                <div className="text-[var(--td-color-primary)] font-bold text-sm">
                  01
                </div>
                <h3 className="text-base font-bold text-[var(--td-text)]">
                  White Canvas Precision
                </h3>
                <p className="text-xs sm:text-sm text-[var(--td-text-light)] leading-relaxed">
                  We prioritize functional whitespace, crisp typography, and
                  uncluttered content hierarchy over noisy visual banners.
                </p>
              </Card>

              <Card className="td-card p-6 space-y-3">
                <div className="text-[var(--td-color-primary)] font-bold text-sm">
                  02
                </div>
                <h3 className="text-base font-bold text-[var(--td-text)]">
                  Interconnected Entities
                </h3>
                <p className="text-xs sm:text-sm text-[var(--td-text-light)] leading-relaxed">
                  Every grant, organization, news article, and SDG tag is
                  structured to connect logically to corresponding regional
                  impact metrics.
                </p>
              </Card>

              <Card className="td-card p-6 space-y-3">
                <div className="text-[var(--td-color-primary)] font-bold text-sm">
                  03
                </div>
                <h3 className="text-base font-bold text-[var(--td-text)]">
                  Field-Ready Engineering
                </h3>
                <p className="text-xs sm:text-sm text-[var(--td-text-light)] leading-relaxed">
                  Software must perform under real field conditions. We optimize
                  for low data usage, fast initial loads, and resilient offline
                  capabilities.
                </p>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Call To Action */}
        <Section spacing="lg" className="py-20 sm:py-28 bg-[var(--td-bg)]">
          <Container size="md" className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--td-text)] tracking-tight">
              Ready to Collaborate with Tudulu?
            </h2>
            <p className="text-[var(--td-text-light)] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Whether you are looking to list an organization, submit grant
              opportunities, or explore health software integration, our team is
              ready to talk.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 bg-[var(--td-color-primary)] hover:opacity-90 text-[var(--td-text-inverse)] font-semibold text-xs rounded-[var(--td-radius-md)] transition-all shadow-sm hover:shadow-md"
              >
                Get in Touch
              </Link>
              <Link
                href="/opportunities"
                className="w-full sm:w-auto px-8 py-3.5 bg-[var(--td-bg-surface-elevated)] hover:bg-[var(--td-border-subtle)] text-[var(--td-text)] font-semibold text-xs rounded-[var(--td-radius-md)] transition-all"
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
