"use client";

import { Search, ShieldCheck, Zap, Network } from "lucide-react";

const features = [
  {
    title: "Aggregated Intelligence",
    description:
      "We index grants, fellowships, ecosystem news, and career calls from hundreds of verified African sources.",
    icon: Search,
  },
  {
    title: "Verified & Vetted Listings",
    description:
      "Protecting users with authentic opportunities vetted directly by our regional operations team.",
    icon: ShieldCheck,
  },
  {
    title: "Real-Time Pipeline Updates",
    description:
      "Instant notifications and smart filtering to make sure you never miss high-value funding deadlines.",
    icon: Zap,
  },
  {
    title: "Connected African Ecosystem",
    description:
      "Bridging the gap between grassroots non-profits, tech founders, donors, and impact investors.",
    icon: Network,
  },
];

export function WhyTudulu() {
  return (
    <section className="py-12 md:py-16 bg-[var(--td-bg-surface,#ffffff)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--td-text,#0f172a)] tracking-tight">
            Why Choose Tudulu?
          </h2>
          <p className="text-xs sm:text-sm text-[var(--td-text-muted)] mt-2">
            The single point of entry for impact, funding, and growth across the
            continent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-6 rounded-2xl bg-[var(--td-bg-soft,#f8fafc)] border border-[var(--td-border-subtle)] space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--td-color-primary-light)] text-[var(--td-color-primary)] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[var(--td-text)]">
                  {feat.title}
                </h3>
                <p className="text-xs text-[var(--td-text-muted)] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
