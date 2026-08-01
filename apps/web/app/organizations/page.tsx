import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Organizations & Partners | Tudulu Uganda Limited",
  description:
    "Partnering with healthcare networks, development organizations, and field teams across Uganda to deploy offline-first HIMS, edge AI, and data intelligence platforms.",
};

const partnerCategories = [
  {
    title: "Healthcare Facilities & Networks",
    badge: "HIMS & Clinical Edge",
    variant: "emerald" as const,
    description:
      "Equipping regional hospitals, private clinics, and specialized centers with offline-first digital medical record systems that keep patient workflows running seamlessly during power or internet outages.",
    features: [
      "Local-first patient database & caching",
      "PrintBridge medical report integration",
      "Low-latency diagnostic workflows",
      "Sub-second offline sync on network restore",
    ],
  },
  {
    title: "Development & NGO Partners",
    badge: "Field Intelligence",
    variant: "amber" as const,
    description:
      "Powering community initiatives, field tracking programs, and sports equipment distribution projects with real-time analytics, automated attendance tools, and verified data pipelines.",
    features: [
      "Custom KoboToolbox & mobile integrations",
      "Equipment & distribution tracking MVPs",
      "Field team analytics & reporting",
      "Impact verification dashboards",
    ],
  },
  {
    title: "Technical & Academic Partners",
    badge: "System Architecture",
    variant: "blue" as const,
    description:
      "Collaborating with research institutes, universities, and technology labs to deliver hands-on workshops, system architecture training, and robust monorepo infrastructures.",
    features: [
      "Embedded system & Edge AI R&D",
      "Technical workshops & facilitation",
      "Open-source data toolchain tooling",
      "High-reliability edge server setups",
    ],
  },
];

const impactStats = [
  { label: "Offline Uptime", value: "99.9%" },
  { label: "Data Sync Latency", value: "< 2s" },
  { label: "Field Networks Served", value: "Regional" },
  { label: "Deployment Architecture", value: "Edge-First" },
];

export default function OrganizationsPage() {
  return (
    <div className="min-h-screen bg-[var(--td-bg-canvas,#F8FAFC)] text-[var(--td-text-primary,#0F172A)] flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Section
          spacing="lg"
          className="bg-white border-b border-slate-200 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
          <Container size="md" className="relative z-10 text-center space-y-4">
            <Badge variant="blue">Organizations & Partners</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Deploying Resilient Technology for Field Organizations
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              We partner with health centers, non-profits, and regional teams
              across Uganda to build zero-downtime health information systems
              and intelligent field data platforms.
            </p>
          </Container>
        </Section>

        {/* Stats Strip */}
        <Section spacing="sm" className="bg-white border-b border-slate-200">
          <Container size="lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
              {impactStats.map((stat, i) => (
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

        {/* Sectors / Categories Grid */}
        <Section spacing="lg" className="bg-slate-50 border-b border-slate-200">
          <Container size="lg" className="space-y-10">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Who We Work With
              </h2>
              <p className="text-slate-600 text-sm">
                Tailored software architectures for complex, low-bandwidth
                environments.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {partnerCategories.map((cat, idx) => (
                <Card
                  key={idx}
                  hoverable
                  className="p-8 flex flex-col justify-between space-y-6 transition-all duration-200"
                >
                  <div className="space-y-4">
                    <Badge variant={cat.variant}>{cat.badge}</Badge>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug">
                      {cat.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-4 space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Key Capabilities
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {cat.features.map((feat, fIdx) => (
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
                Ready to deploy resilient systems for your team?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Whether you run a healthcare facility requiring uninterrupted
                offline medical records or a development initiative tracking
                field operations, we are ready to partner.
              </p>
              <div className="pt-2">
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Partner With Us
                  </Button>
                </Link>
              </div>
            </Card>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
