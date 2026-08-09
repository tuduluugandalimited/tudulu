// D:\tudulu\apps\web\components\home\FeaturedJobs.tsx

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
    <section className="py-20 sm:py-28 bg-[var(--td-bg)] text-[var(--td-text)] border-y border-[var(--td-border-subtle)]">
      <Container size="lg">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16 pb-6 border-b border-[var(--td-border-subtle)]">
          <div className="max-w-3xl">
            <p className="text-[var(--td-color-primary)] font-semibold uppercase tracking-[0.2em] text-xs">
              Careers Across Africa
            </p>

            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--td-text)]">
              Verified Development & NGO Jobs
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[var(--td-text-light)]">
              Discover verified vacancies from NGOs, UN agencies, donors,
              research institutions, governments, humanitarian organizations and
              technology companies driving Africa&apos;s development.
            </p>
          </div>

          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--td-color-primary)] hover:opacity-80 transition-opacity shrink-0"
          >
            <span>Browse all vacancies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <article
              key={job.id}
              className="group bg-[var(--td-bg-soft)] rounded-[var(--td-radius-lg)] border border-[var(--td-border-subtle)] hover:border-[var(--td-border)] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <Badge variant="blue">{job.category}</Badge>
                  <Badge variant="neutral">{job.type}</Badge>
                </div>

                <h3 className="mt-5 text-xl font-bold text-[var(--td-text)] group-hover:text-[var(--td-color-primary)] transition-colors leading-snug">
                  <Link href={`/jobs/${job.slug}`}>{job.title}</Link>
                </h3>

                <div className="mt-5 space-y-3 text-sm text-[var(--td-text-light)]">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[var(--td-text-muted)] shrink-0" />
                    <span>{job.organization}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[var(--td-text-muted)] shrink-0" />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 className="w-4 h-4 text-[var(--td-text-muted)] shrink-0" />
                    <span>Posted {job.posted}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--td-border-subtle)] px-6 py-4">
                <Link
                  href={`/jobs/${job.slug}`}
                  className="inline-flex items-center gap-2 font-semibold text-xs text-[var(--td-color-primary)] hover:underline"
                >
                  <span>View Job</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-[var(--td-radius-lg)] bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] p-8 text-center text-[var(--td-text)] shadow-sm">
          <Globe className="w-10 h-10 mx-auto text-[var(--td-color-primary)] mb-4" />

          <h3 className="text-2xl font-extrabold">
            Thousands of African Development Careers
          </h3>

          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-[var(--td-text-light)]">
            Search opportunities from NGOs, UN agencies, multilateral banks,
            humanitarian organizations, universities, foundations, governments,
            social enterprises and private sector partners across all African
            regions.
          </p>

          <Link
            href="/jobs"
            className="inline-flex mt-6 items-center gap-2 rounded-[var(--td-radius-md)] bg-[var(--td-color-primary)] px-6 py-3 font-bold text-xs text-[var(--td-text-inverse)] hover:opacity-90 transition shadow-md"
          >
            <span>Explore Jobs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
