// components/home/WhyTudulu.tsx
import { Container } from "@/components/ui/Container";
import { Compass, Network, TrendingUp } from "lucide-react";

export function WhyTudulu() {
  const pillars = [
    {
      id: "discover",
      title: "Discover",
      subtitle: "Verified Information Fast",
      description:
        "Access real-time grant opportunities, humanitarian news, and research data curated directly from across the African development ecosystem.",
      icon: Compass,
    },
    {
      id: "connect",
      title: "Connect",
      subtitle: "Bridges Across Ecosystems",
      description:
        "Seamlessly bridge NGOs, healthcare providers, startups, and funding partners with verified institutional directories and direct applications.",
      icon: Network,
    },
    {
      id: "grow",
      title: "Grow",
      subtitle: "Sustainable Impact at Scale",
      description:
        "Equip your organization with impact analytics, digital tools, and funding resources designed specifically for regional resilience.",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[var(--td-bg)] border-b border-[var(--td-border-subtle)]">
      <Container size="lg">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 td-slide-up">
          <p className="text-xs font-bold text-green-700 dark:text-green-500 uppercase tracking-widest mb-2">
            Platform Purpose
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Why Tudulu?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-2">
            Built to reduce information asymmetry and power data-driven progress
            across Africa.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="group relative p-8 td-card-interactive flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon Container with Green -> Gold Interaction */}
                  <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-slate-900 dark:text-slate-100 group-hover:text-amber-600 group-hover:border-green-700/40 td-transition-colors shrink-0">
                    <Icon className="w-6 h-6 td-transition-transform group-hover:scale-110 shrink-0" />
                  </div>

                  {/* Text Content */}
                  <div>
                    <span className="text-xs font-bold text-green-700 dark:text-green-400 tracking-wider uppercase">
                      {pillar.title}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1 leading-snug">
                      {pillar.subtitle}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
