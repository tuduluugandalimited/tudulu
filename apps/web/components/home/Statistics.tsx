// D:\tudulu\apps\web\components\home\Statistics.tsx
"use client";

import { Users, Briefcase, Building2, DollarSign } from "lucide-react";

const stats = [
  {
    id: "grants",
    label: "Grants Cataloged",
    value: "$12.5M+",
    description: "Non-dilutive capital tracked for regional innovators",
    icon: DollarSign,
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
  {
    id: "opportunities",
    label: "Active Opportunities",
    value: "1,200+",
    description: "Vetted jobs, fellowships, and open funding calls",
    icon: Briefcase,
    color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "organizations",
    label: "Verified Partners",
    value: "450+",
    description: "Trusted NGOs, tech hubs, and social enterprises",
    icon: Building2,
    color: "text-indigo-600 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    id: "impacted",
    label: "African Innovators",
    value: "35,000+",
    description: "Visionary builders driving sustainable growth",
    icon: Users,
    color:
      "text-[var(--td-color-primary)] bg-[var(--td-color-primary-light)] border-[var(--td-color-primary)]/20",
  },
];

export function Statistics() {
  return (
    <section className="py-12 bg-[var(--td-bg-soft,#f8fafc)] border-y border-[var(--td-border-subtle)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-[var(--td-bg-surface,#ffffff)] border border-[var(--td-border-subtle)] shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl border ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--td-text-muted)]">
                    Ecosystem Metric
                  </span>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[var(--td-text,#0f172a)] tracking-tight">
                    {item.value}
                  </p>
                  <p className="text-xs font-bold text-[var(--td-text)] mt-1">
                    {item.label}
                  </p>
                  <p className="text-xs text-[var(--td-text-muted)] mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
