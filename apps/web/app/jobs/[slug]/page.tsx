import { MOCK_JOB_OPPORTUNITIES } from "../data";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Building2,
  Calendar,
  Mail,
  ExternalLink,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

interface JobDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return MOCK_JOB_OPPORTUNITIES.map((job) => ({
    slug: job.id,
  }));
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const resolvedParams = await params;
  const job = MOCK_JOB_OPPORTUNITIES.find((j) => j.id === resolvedParams.slug);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Back */}
        <div className="mb-6">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-emerald-600 transition-colors bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Job Board
          </Link>
        </div>

        {/* Main Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 font-bold text-slate-700 text-xl">
                {job.organizationLogo ? (
                  <img
                    src={job.organizationLogo}
                    alt={job.organizationName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>
                    {job.organizationName.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md">
                    {job.organizationName}
                  </span>
                  {job.verified && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />{" "}
                      Verified Listing
                    </span>
                  )}
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    {job.employmentType}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {job.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-3">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" /> {job.location}{" "}
                    ({job.country})
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-slate-400" /> Sector:{" "}
                    {job.sector}
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-700 font-medium">
                    <Calendar className="w-4 h-4 text-amber-500" /> Deadline:{" "}
                    {job.deadline}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="flex flex-col gap-2 shrink-0">
              {job.applicationEmail && (
                <a
                  href={`mailto:${job.applicationEmail}?subject=Application for ${job.title}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all text-center"
                >
                  <Mail className="w-4 h-4" /> Apply via Email
                </a>
              )}
              {job.applicationUrl && (
                <a
                  href={job.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-all text-center"
                >
                  External Portal <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left / Main Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Overview Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                About the Role
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Key Responsibilities */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Key Responsibilities
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((resp, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-slate-600"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Candidate Qualifications */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Required Qualifications & Skills
              </h2>
              <ul className="space-y-3">
                {job.qualifications.map((qual, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-slate-600"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{qual}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Sidebar Metadata */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
                Position Summary
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="block text-slate-400 font-medium mb-1">
                    Employment Type
                  </span>
                  <span className="font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md inline-block">
                    {job.employmentType}
                  </span>
                </div>

                <div>
                  <span className="block text-slate-400 font-medium mb-1">
                    Experience Level
                  </span>
                  <span className="font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md inline-block">
                    {job.experienceLevel}
                  </span>
                </div>

                <div>
                  <span className="block text-slate-400 font-medium mb-1">
                    Primary Region
                  </span>
                  <span className="font-semibold text-slate-800">
                    {job.region}
                  </span>
                </div>

                <div>
                  <span className="block text-slate-400 font-medium mb-1">
                    Posted Date
                  </span>
                  <span className="font-semibold text-slate-800">
                    {job.postedDate}
                  </span>
                </div>

                <div>
                  <span className="block text-slate-400 font-medium mb-1">
                    Application Deadline
                  </span>
                  <span className="font-semibold text-amber-700">
                    {job.deadline}
                  </span>
                </div>
              </div>
            </div>

            {/* Organization Quick Widget */}
            <div className="bg-emerald-900 text-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold mb-2">Want to explore more?</h3>
              <p className="text-xs text-emerald-100 mb-4 leading-relaxed">
                Check out verified profiles, sector metrics, and active programs
                for {job.organizationName} and other leading actors.
              </p>
              <Link
                href="/organizations"
                className="inline-flex items-center justify-center w-full px-4 py-2 bg-white text-emerald-900 rounded-xl text-xs font-bold hover:bg-emerald-50 transition-colors"
              >
                View Organizations Directory
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
