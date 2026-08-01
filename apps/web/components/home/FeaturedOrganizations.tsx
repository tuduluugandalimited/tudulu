// components/home/FeaturedOrganizations.tsx
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Building2, CheckCircle2, ArrowRight } from "lucide-react";

export function FeaturedOrganizations() {
  const organizations = [
    {
      id: "org-1",
      name: "USAID East Africa",
      type: "International Donor",
      location: "Nairobi, Kenya",
      verified: true,
      activeFunding: 12,
      slug: "usaid-east-africa",
      initials: "USAID",
    },
    {
      id: "org-2",
      name: "World Health Organization (WHO)",
      type: "Multilateral Agency",
      location: "Geneva / Kampala",
      verified: true,
      activeFunding: 8,
      slug: "who-africa",
      initials: "WHO",
    },
    {
      id: "org-3",
      name: "BRAC Uganda",
      type: "International NGO",
      location: "Kampala, Uganda",
      verified: true,
      activeFunding: 5,
      slug: "brac-uganda",
      initials: "BRAC",
    },
    {
      id: "org-4",
      name: "African Development Bank (AfDB)",
      type: "Financial Institution",
      location: "Abidjan, Côte d'Ivoire",
      verified: true,
      activeFunding: 18,
      slug: "afdb",
      initials: "AfDB",
    },
    {
      id: "org-5",
      name: "World Vision East Africa",
      type: "Humanitarian NGO",
      location: "Nairobi, Kenya",
      verified: true,
      activeFunding: 6,
      slug: "world-vision-ea",
      initials: "WV",
    },
    {
      id: "org-6",
      name: "Mastercard Foundation",
      type: "Philanthropic Foundation",
      location: "Kigali, Rwanda",
      verified: true,
      activeFunding: 15,
      slug: "mastercard-foundation",
      initials: "MCF",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white">
      <Container size="lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-slate-100">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-sky-600 uppercase tracking-widest mb-2">
              Verified Ecosystem
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Leading Organizations & Partners
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-2">
              Connect with top international donors, NGOs, and development
              entities funding African progress.
            </p>
          </div>
          <Link
            href="/organizations"
            className="mt-6 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors group shrink-0"
          >
            <span>View all 2,300+ organizations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org) => (
            <Link
              key={org.id}
              href={`/organizations/${org.slug}`}
              className="group relative p-6 bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  {/* Monogram / Logo Avatar */}
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm group-hover:bg-sky-600 transition-colors">
                    {org.initials}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {org.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors flex items-center gap-1.5">
                    {org.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {org.type} • {org.location}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <strong className="text-slate-900">
                    {org.activeFunding}
                  </strong>{" "}
                  active opportunities
                </span>
                <span className="text-sky-600 font-semibold group-hover:underline flex items-center gap-0.5">
                  Profile
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
