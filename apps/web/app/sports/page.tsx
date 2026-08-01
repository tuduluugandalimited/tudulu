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
    <div className="min-h-screen bg-[var(--td-bg-canvas,#F8FAFC)] text-[var(--td-text-primary,#0F172A)] flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      <main className="flex-1">
        {/* Hero Section */}
        <Section
          spacing="lg"
          className="bg-white border-b border-slate-200 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
          <Container size="md" className="relative z-10 text-center space-y-4">
            <Badge variant="blue">Sports & Youth Analytics</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Digital Tools for Grassroots Talent & Sports Organizations
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              We equip sports foundations, academies, and tournament organizers
              across East Africa with software to manage competitions, track
              equipment distribution, and highlight emerging athletic talent.
            </p>
          </Container>
        </Section>

        {/* Stats Bar */}
        <Section spacing="sm" className="bg-white border-b border-slate-200">
          <Container size="lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
              {sportsStats.map((stat, i) => (
                <div key={i} className="text-center space-y-1 p-3">
                  <p className="text-2xl sm:text-3xl font-black text-sky-600 tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Core Pillars Grid */}
        <Section spacing="lg" className="bg-slate-50 border-b border-slate-200">
          <Container size="lg" className="space-y-10">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Our Sports Technology Stack
              </h2>
              <p className="text-slate-600 text-sm">
                Tailored solutions engineered to support sports academies and
                youth outreach programs.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {sportsPillars.map((pillar, idx) => (
                <Card
                  key={idx}
                  hoverable
                  className="p-8 flex flex-col justify-between space-y-6 transition-all duration-200"
                >
                  <div className="space-y-4">
                    <Badge variant={pillar.variant}>{pillar.badge}</Badge>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-4 space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Key Capabilities
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {pillar.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <span className="text-sky-600 font-bold">•</span>
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
        <Section spacing="lg" className="bg-white">
          <Container size="md">
            <Card className="p-8 sm:p-12 text-center space-y-6 bg-slate-900 text-white rounded-2xl shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Partner with Tudulu Sports
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Whether you run a regional youth league, operate an athletic
                academy, or manage sports equipment grant programs, we are ready
                to build with you.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Get in Touch
                  </Button>
                </Link>
                <Link href="/opportunities">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-700 text-white hover:bg-slate-800"
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
