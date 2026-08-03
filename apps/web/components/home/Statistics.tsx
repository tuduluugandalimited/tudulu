// components/home/Statistics.tsx
import { Container } from "@/components/ui/Container";
import {
  Building2,
  Briefcase,
  Newspaper,
  Globe2,
  HandCoins,
  Network,
  LucideIcon,
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
    <section className="py-20 sm:py-28 bg-slate-900 text-white border-y border-slate-800 relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      <Container size="lg" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <p className="text-xs font-semibold text-sky-400 uppercase tracking-widest mb-3">
            Trusted Across Africa
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Africa's Development Intelligence at Scale
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4 leading-relaxed">
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
                className="group relative p-8 bg-slate-950/60 hover:bg-slate-950 rounded-2xl border border-slate-800 hover:border-sky-500/50 transition-all duration-200 flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-slate-900 text-sky-400 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors shrink-0 border border-slate-800 group-hover:border-sky-500">
                      <Icon className="w-6 h-6 shrink-0" />
                    </div>
                    <span className="text-4xl sm:text-5xl font-black tracking-tight text-white bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">
                      {stat.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
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
