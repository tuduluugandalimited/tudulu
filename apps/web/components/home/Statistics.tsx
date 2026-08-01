// components/home/Statistics.tsx
import { Container } from "@/components/ui/Container";

export function Statistics() {
  const stats = [
    {
      id: "orgs",
      value: "2,300+",
      label: "Verified Organizations",
      description: "NGOs, civil society, startups, and institutions",
    },
    {
      id: "opportunities",
      value: "850+",
      label: "Active Opportunities",
      description: "Grants, RFP funding, subsidies, and technical aid",
    },
    {
      id: "articles",
      value: "14,000+",
      label: "Impact News & Research",
      description: "Field updates, policy briefs, and innovation stories",
    },
    {
      id: "reach",
      value: "27",
      label: "African Countries",
      description: "Active coverage across East, West, and Southern Africa",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white border-y border-slate-800 relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />

      <Container size="lg" className="relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col justify-between space-y-2 border-l border-slate-800 pl-6 sm:pl-8 first:border-none lg:first:border-none"
            >
              <div>
                <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <h3 className="text-sm font-semibold text-sky-400 mt-2">
                  {stat.label}
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
