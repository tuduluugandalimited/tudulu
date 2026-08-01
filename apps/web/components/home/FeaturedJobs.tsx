// components/home/FeaturedJobs.tsx
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  ArrowRight,
  Building2,
} from "lucide-react";

export function FeaturedJobs() {
  const jobs = [
    {
      id: "job-1",
      title: "Senior Health Information Systems (HIS) Architect",
      organization: "Tudulu Health",
      location: "Kampala, Uganda (Hybrid)",
      type: "Full-time",
      salary: "$3,500 - $5,000 / mo",
      postedAt: "2 days ago",
      category: "Engineering",
      slug: "senior-his-architect",
    },
    {
      id: "job-2",
      title: "Regional Monitoring & Evaluation (M&E) Specialist",
      organization: "World Vision East Africa",
      location: "Nairobi, Kenya",
      type: "Full-time",
      salary: "Competitive",
      postedAt: "3 days ago",
      category: "Development",
      slug: "regional-me-specialist",
    },
    {
      id: "job-3",
      title: "Edge AI Clinical Decision Support Engineer",
      organization: "Tudulu Technology",
      location: "Remote (Africa)",
      type: "Contract",
      salary: "$4,000 - $6,000 / mo",
      postedAt: "1 week ago",
      category: "AI & Data",
      slug: "edge-ai-clinical-engineer",
    },
    {
      id: "job-4",
      title: "Grants & Institutional Partnerships Manager",
      organization: "BRAC Uganda",
      location: "Kampala, Uganda",
      type: "Full-time",
      salary: "Undisclosed",
      postedAt: "Just now",
      category: "Fundraising",
      slug: "grants-partnerships-manager",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
      <Container size="lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-sky-600 uppercase tracking-widest mb-2">
              Career Opportunities
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Careers & Talent
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-2">
              Find impactful roles at leading technology platforms, NGOs, and
              global development entities.
            </p>
          </div>
          <Link
            href="/jobs"
            className="mt-6 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors group shrink-0"
          >
            <span>View all active job listings</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Jobs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="group relative p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-sky-600 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    {job.organization}
                  </span>
                  <Badge variant="neutral">{job.type}</Badge>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                  <Link href={`/jobs/${job.slug}`}>{job.title}</Link>
                </h3>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    {job.salary}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {job.postedAt}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">
                  Category:{" "}
                  <strong className="text-slate-700">{job.category}</strong>
                </span>
                <Link
                  href={`/jobs/${job.slug}`}
                  className="text-sky-600 font-semibold group-hover:underline flex items-center gap-1"
                >
                  Apply Role
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
