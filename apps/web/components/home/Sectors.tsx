// components/home/Sectors.tsx
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  HeartPulse,
  GraduationCap,
  CloudSun,
  Sprout,
  Cpu,
  Trophy,
  HandHeart,
  Building2,
  ArrowRight,
} from "lucide-react";

export function Sectors() {
  const sectors = [
    {
      id: "health",
      name: "Health & Medicine",
      description:
        "Digital HIS, clinical tools, medical research, and health grants.",
      icon: HeartPulse,
      href: "/sectors/health",
      badge: "Featured",
    },
    {
      id: "education",
      name: "Education & EdTech",
      description:
        "Scholarships, school infrastructure, digital learning, and literacy programs.",
      icon: GraduationCap,
      href: "/sectors/education",
    },
    {
      id: "climate",
      name: "Climate & Resilience",
      description:
        "Renewable energy, clean water access, carbon finance, and sustainability.",
      icon: CloudSun,
      href: "/sectors/climate",
    },
    {
      id: "agriculture",
      name: "Agriculture & Food",
      description:
        "AgriTech innovations, rural development, supply chain, and food security.",
      icon: Sprout,
      href: "/sectors/agriculture",
    },
    {
      id: "technology",
      name: "Technology & AI",
      description:
        "Edge AI, software engineering, connectivity, and open-source intelligence.",
      icon: Cpu,
      href: "/sectors/technology",
    },
    {
      id: "sports",
      name: "Youth & Sports",
      description:
        "Grassroots academies, tournament tech, sports analytics, and talent development.",
      icon: Trophy,
      href: "/sectors/sports",
    },
    {
      id: "humanitarian",
      name: "Humanitarian Aid",
      description:
        "Emergency response, displacement support, community aid, and NGO relief.",
      icon: HandHeart,
      href: "/sectors/humanitarian",
    },
    {
      id: "governance",
      name: "Governance & Policy",
      description:
        "Civic tech, public sector innovation, policy research, and legal tech.",
      icon: Building2,
      href: "/sectors/governance",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-50 border-y border-slate-200">
      <Container size="lg">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-xs font-semibold text-sky-600 uppercase tracking-widest mb-2">
            Ecosystem Focus
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore by Sector
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-2">
            Find funding, organizations, news, and research tailored to your
            focus area across Africa.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector) => {
            const Icon = sector.icon;
            return (
              <Link
                key={sector.id}
                href={sector.href}
                className="group relative flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="p-3 rounded-xl bg-slate-100 text-slate-800 group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors shrink-0">
                      <Icon className="w-6 h-6 shrink-0" />
                    </div>
                    {sector.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 shrink-0">
                        {sector.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                      {sector.name}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
                      {sector.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-400 group-hover:text-sky-600 transition-colors">
                  <span>Browse sector</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
