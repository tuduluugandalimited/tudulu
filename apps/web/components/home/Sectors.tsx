// D:\tudulu\apps\web\components\home\Sectors.tsx
"use client";

import Link from "next/link";
import {
  Sprout,
  HeartPulse,
  Sun,
  Cpu,
  GraduationCap,
  Scale,
  ArrowRight,
} from "lucide-react";

const sectors = [
  {
    label: "Agriculture & Food Security",
    icon: Sprout,
    description:
      "Scale agritech solutions, food systems, and farmer empowerment initiatives.",
    href: "/opportunities?sector=agriculture",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    label: "Healthcare & Public Wellbeing",
    icon: HeartPulse,
    description:
      "Support health innovations, medical access, and community wellness programs.",
    href: "/opportunities?sector=healthcare",
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  {
    label: "Renewable Energy & Climate",
    icon: Sun,
    description:
      "Accelerate clean energy transitions and climate resilience ventures.",
    href: "/opportunities?sector=climate",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    label: "Technology & Digital Economy",
    icon: Cpu,
    description:
      "Build foundational tech infrastructure, fintech, and digital public goods.",
    href: "/opportunities?sector=technology",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    label: "Education & Skills Building",
    icon: GraduationCap,
    description:
      "Empower the next generation with digital literacy, training, and edtech.",
    href: "/opportunities?sector=education",
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  {
    label: "Governance & Human Rights",
    icon: Scale,
    description:
      "Strengthen civic tech, transparency, and sustainable community advocacy.",
    href: "/opportunities?sector=governance",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
];

export function Sectors() {
  return (
    <section className="py-12 md:py-16 bg-[var(--td-bg-surface,#ffffff)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--td-text,#0f172a)] tracking-tight">
            Explore by Sector
          </h2>
          <p className="text-xs sm:text-sm text-[var(--td-text-muted)] mt-1.5">
            Discover targeted grants, funding, and career opportunities
            categorized by high-priority developmental pillars.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sectors.map((sec) => {
            const Icon = sec.icon;
            return (
              <Link
                key={sec.label}
                href={sec.href}
                className="group p-6 rounded-2xl bg-[var(--td-bg-surface,#ffffff)] border border-[var(--td-border-subtle)] hover:border-[var(--td-color-primary)] transition-all shadow-sm hover:shadow-md flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${sec.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--td-text)] group-hover:text-[var(--td-color-primary)] transition-colors">
                      {sec.label}
                    </h3>
                    <p className="text-xs text-[var(--td-text-muted)] mt-1.5 leading-relaxed">
                      {sec.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[var(--td-color-primary)] group-hover:underline">
                  <span>Explore Sector</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
