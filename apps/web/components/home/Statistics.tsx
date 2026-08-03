// D:\tudulu\apps\web\components\home\Statistics.tsx

import { Container } from "@/components/ui/Container";
import {
  Building2,
  Briefcase,
  Newspaper,
  Globe2,
  HandCoins,
  Network,
  type LucideIcon,
} from "lucide-react";

interface StatItem {
  id: string;
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export async function Statistics() {
  // TODO: Replace with dynamic data from backend
  // const statsData = await getPlatformStatistics();

  const stats: StatItem[] = [
    {
      id: "organizations",
      value: "8,500+",
      label: "Organizations",
      description: "Verified NGOs, donors and institutions",
      icon: Building2,
    },
    {
      id: "opportunities",
      value: "3,200+",
      label: "Funding Opportunities",
      description: "Grants, RFPs and partnerships",
      icon: HandCoins,
    },
    {
      id: "jobs",
      value: "1,800+",
      label: "Careers",
      description: "Development and humanitarian jobs",
      icon: Briefcase,
    },
    {
      id: "news",
      value: "25K+",
      label: "News & Research",
      description: "Daily intelligence and sector reports",
      icon: Newspaper,
    },
    {
      id: "countries",
      value: "54",
      label: "Countries",
      description: "Coverage across Africa",
      icon: Globe2,
    },
    {
      id: "sectors",
      value: "30+",
      label: "Development Sectors",
      description: "Health, climate, education, agriculture and more",
      icon: Network,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[var(--td-bg-surface-elevated)] text-[var(--td-text)] border-y border-[var(--td-border-subtle)] relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[var(--td-color-primary)]/10 blur-[120px] rounded-full pointer-events-none" />

      <Container size="lg" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <p className="text-xs font-semibold text-[var(--td-color-primary)] uppercase tracking-widest mb-3">
            Trusted Across Africa
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--td-text)] leading-tight">
            Africa's Development Intelligence at Scale
          </h2>
          <p className="text-[var(--td-text-light)] text-base sm:text-lg mt-4 leading-relaxed">
            Connecting organizations, donors, researchers, governments, and
            changemakers through verified opportunities, trusted data, and
            actionable intelligence across all 54 African countries.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="group relative p-8 bg-[var(--td-bg-soft)] hover:bg-[var(--td-bg)] rounded-[var(--td-radius-lg)] border border-[var(--td-border-subtle)] hover:border-[var(--td-color-primary)]/50 transition-all duration-200 flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-[var(--td-radius-md)] bg-[var(--td-bg)] text-[var(--td-color-primary)] group-hover:bg-[var(--td-color-primary)] group-hover:text-[var(--td-text-inverse)] transition-colors shrink-0 border border-[var(--td-border-subtle)] group-hover:border-[var(--td-color-primary)]">
                      <Icon className="w-6 h-6 shrink-0" />
                    </div>
                    <span className="text-4xl sm:text-5xl font-black tracking-tight text-[var(--td-text)]">
                      {stat.value}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[var(--td-text)] group-hover:text-[var(--td-color-primary)] transition-colors">
                      {stat.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--td-text-light)] mt-1.5 leading-relaxed">
                      {stat.description}
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
