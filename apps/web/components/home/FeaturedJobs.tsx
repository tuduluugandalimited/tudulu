// components/home/FeaturedJobs.tsx

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Building2, Clock3, Globe, MapPin } from "lucide-react";

export function FeaturedJobs() {
  const jobs = [
    {
      id: "1",
      title: "Digital Health Program Manager",
      organization: "PATH",
      location: "Nairobi, Kenya",
      type: "Full-time",
      category: "Health",
      posted: "2 days ago",
      slug: "digital-health-program-manager",
    },
    {
      id: "2",
      title: "Monitoring, Evaluation & Learning Specialist",
      organization: "BRAC International",
      location: "Kampala, Uganda",
      type: "Full-time",
      category: "Monitoring & Evaluation",
      posted: "4 days ago",
      slug: "mel-specialist",
    },
    {
      id: "3",
      title: "Software Engineer – Humanitarian Technology",
      organization: "International Rescue Committee",
      location: "Remote",
      type: "Remote",
      category: "Technology",
      posted: "1 day ago",
      slug: "software-engineer-humanitarian",
    },
    {
      id: "4",
      title: "Climate Finance Advisor",
      organization: "African Development Bank",
      location: "Abidjan, Côte d'Ivoire",
      type: "Full-time",
      category: "Climate",
      posted: "Today",
      slug: "climate-finance-advisor",
    },
    {
      id: "5",
      title: "Biomedical Engineer",
      organization: "Médecins Sans Frontières",
      location: "Juba, South Sudan",
      type: "Contract",
      category: "Biomedical Engineering",
      posted: "Yesterday",
      slug: "biomedical-engineer-msf",
    },
    {
      id: "6",
      title: "Research Data Scientist",
      organization: "Africa CDC",
      location: "Addis Ababa, Ethiopia",
      type: "Full-time",
      category: "Research",
      posted: "3 days ago",
      slug: "research-data-scientist",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200">
      <Container size="lg">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-3xl">
            <p className="text-sky-600 font-semibold uppercase tracking-[0.2em] text-xs">
              Careers Across Africa
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900">
              Verified Development & NGO Jobs
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              Discover verified vacancies from NGOs, UN agencies, donors,
              research institutions, governments, humanitarian organizations and
              technology companies driving Africa's development.
            </p>
          </div>

          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700"
          >
            Browse all vacancies
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <article
              key={job.id}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <Badge variant="blue">{job.category}</Badge>

                  <Badge variant="neutral">{job.type}</Badge>
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                  <Link href={`/jobs/${job.slug}`}>{job.title}</Link>
                </h3>

                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 shrink-0" />
                    <span>{job.organization}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 className="w-4 h-4 shrink-0" />
                    <span>Posted {job.posted}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 px-6 py-4">
                <Link
                  href={`/jobs/${job.slug}`}
                  className="inline-flex items-center gap-2 font-semibold text-sky-600 hover:text-sky-700"
                >
                  View Job
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-slate-900 p-8 text-center text-white">
          <Globe className="w-10 h-10 mx-auto text-sky-400 mb-4" />

          <h3 className="text-2xl font-bold">
            Thousands of African Development Careers
          </h3>

          <p className="mt-3 max-w-2xl mx-auto text-slate-300">
            Search opportunities from NGOs, UN agencies, multilateral banks,
            humanitarian organizations, universities, foundations, governments,
            social enterprises and private sector partners across all African
            regions.
          </p>

          <Link
            href="/jobs"
            className="inline-flex mt-6 items-center gap-2 rounded-xl bg-sky-500 px-6 py-3 font-semibold text-slate-950 hover:bg-sky-400 transition"
          >
            Explore Jobs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
