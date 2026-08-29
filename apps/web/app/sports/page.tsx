// D:\tudulu\apps\web\app\sports\page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sports & Youth Development | Tudulu Uganda Limited",
  description:
    "Empowering grassroots athletics in East Africa through tournament management platforms, player analytics, equipment distribution tracking, and digital scouting directories.",
};

const sportsPillars = [
  {
    title: "Tournament & League Management",
    badge: "Operations",
    variant: "blue" as const,
    description:
      "Automated fixture generation, score tracking, team registration, and real-time standings for regional youth tournaments and sports foundations.",
    features: [
      "Offline-first match scoring & event logging",
      "Automated league tables & scheduling",
      "Player eligibility & digital ID verification",
      "SMS & WhatsApp fan notification sync",
    ],
  },
  {
    title: "Player Performance & Analytics",
    badge: "Grassroots Scouting",
    variant: "emerald" as const,
    description:
      "Capturing essential match statistics and biometric data to build verified digital talent profiles for young athletes across rural and urban leagues.",
    features: [
      "Key metrics tracking (goals, assists, mileage)",
      "Standardized talent directory for scouts",
      "Player progress & physical growth logs",
      "Shareable digital athlete passports",
    ],
  },
  {
    title: "Equipment & Grant Distribution",
    badge: "Field Impact",
    variant: "amber" as const,
    description:
      "Helping development partners and sponsors track gear, kits, and grant distributions to sports academies with verified field audit logs.",
    features: [
      "Kit & gear distribution tracking",
      "Academy verification & impact metrics",
      "Attendance & engagement logging",
      "Sponsor dashboard & transparency reporting",
    ],
  },
];

const sportsStats = [
  { label: "Youth Athletes Tracked", value: "2,500+" },
  { label: "Tournaments Powered", value: "40+" },
  { label: "Partner Academies", value: "15+" },
  { label: "Data Uptime", value: "100% Offline" },
];

export default function SportsPage() {
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
              Digital Tools for Grassroots Talent &{" "}
              <span className="td-gradient-text">Sports Organizations</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--td-text-light)] max-w-2xl mx-auto leading-relaxed font-normal">
              We equip sports foundations, academies, and tournament organizers
              across East Africa with software to manage competitions, track
              equipment distribution, and highlight emerging athletic talent.
            </p>
          </Container>
        </Section>

        {/* Stats Bar */}
        <Section
          spacing="sm"
          className="bg-[var(--td-bg)] border-b border-[var(--td-border-subtle)] py-12"
        >
          <Container size="lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {sportsStats.map((stat, i) => (
                <div
                  key={i}
                  className="text-center space-y-1 p-5 bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-[var(--td-radius-lg)]"
                >
                  <p className="text-2xl sm:text-4xl font-extrabold text-[var(--td-color-primary)] tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs font-semibold text-[var(--td-text-muted)] uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Core Pillars Grid */}
        <Section
          spacing="lg"
          className="py-16 sm:py-24 bg-[var(--td-bg-soft)] border-b border-[var(--td-border-subtle)]"
        >
          <Container size="lg" className="space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-xs font-bold text-[var(--td-color-primary)] uppercase tracking-widest">
                Capabilities
              </span>
              <h2 className="text-3xl font-extrabold text-[var(--td-text)] tracking-tight">
                Our Sports Technology Stack
              </h2>
              <p className="text-[var(--td-text-light)] text-sm sm:text-base">
                Tailored solutions engineered to support sports academies and
                youth outreach programs.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {sportsPillars.map((pillar, idx) => (
                <Card
                  key={idx}
                  className="td-card p-8 flex flex-col justify-between space-y-6 transition-all hover:border-[var(--td-color-primary)]"
                >
                  <div className="space-y-4">
                    <Badge variant={pillar.variant}>{pillar.badge}</Badge>
                    <h3 className="text-xl font-bold text-[var(--td-text)] leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-[var(--td-text-light)] text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="border-t border-[var(--td-border-subtle)] pt-6 space-y-3">
                    <h4 className="text-xs font-bold text-[var(--td-text-muted)] uppercase tracking-wider">
                      Key Capabilities
                    </h4>
                    <ul className="space-y-2 text-xs text-[var(--td-text-light)]">
                      {pillar.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <span className="text-[var(--td-color-primary)] font-bold">
                            •
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Call to Action Banner */}
        <Section spacing="lg" className="py-20 sm:py-28 bg-[var(--td-bg)]">
          <Container size="md">
            <Card className="td-card p-8 sm:p-12 text-center space-y-6 bg-[var(--td-bg)] border-[var(--td-border-subtle)] shadow-md">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--td-text)] tracking-tight">
                Partner with Tudulu Sports
              </h2>
              <p className="text-[var(--td-text-light)] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Whether you run a regional youth league, operate an athletic
                academy, or manage sports equipment grant programs, we are ready
                to build with you.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto px-8 py-3.5 bg-[var(--td-color-primary)] hover:opacity-90 text-[var(--td-text-inverse)] font-semibold text-xs rounded-[var(--td-radius-md)] transition-all">
                    Get in Touch
                  </Button>
                </Link>
                <Link href="/opportunities" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[var(--td-bg-surface-elevated)] hover:bg-[var(--td-border-subtle)] text-[var(--td-text)] font-semibold text-xs rounded-[var(--td-radius-md)] transition-all border-[var(--td-border)]"
                  >
                    View Sports Grants
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
