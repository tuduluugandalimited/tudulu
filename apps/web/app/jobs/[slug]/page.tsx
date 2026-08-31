// D:\tudulu\apps\web\app\jobs\[slug]\page.tsx
"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Building2,
  Calendar,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

interface JobDetail {
  id: string;
  slug: string;
  title: string;
  organization?: {
    name: string;
    logo?: string;
  };
  organizationName?: string;
  organizationLogo?: string;
  verified: boolean;
  employmentType: string;
  experienceLevel: string;
  location: string;
  sector?: {
    name: string;
  };
  sectorName?: string;
  deadline?: string;
  applicationUrl?: string;
  applicationEmail?: string;
  summary?: string;
  description?: string;
  requirements?: string[];
  type?: string;
}

export default function JobSlugDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/opportunities/${slug}`, {
      headers: {
        Accept: "application/json",
      },
    })
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error(
            `Received non-JSON response from server. Preview: ${text.substring(0, 80)}`,
          );
        }
        if (!res.ok)
          throw new Error(
            "Failed to fetch opportunity details from backend server.",
          );
        return res.json();
      })
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 text-center text-slate-500 text-sm font-medium">
        Loading opportunity details...
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h1 className="text-lg font-bold text-slate-800 mb-2">
            Position Not Found
          </h1>
          <p className="text-xs text-slate-500 mb-6 font-mono">
            {error || "The requested opportunity could not be located."}
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Jobs Directory
          </Link>
        </div>
      </div>
    );
  }

  const orgName =
    job.organization?.name || job.organizationName || "Organization";
  const orgLogo = job.organization?.logo || job.organizationLogo;
  const secName = job.sector?.name || job.sectorName || "General";
  const deadlineStr = job.deadline
    ? new Date(job.deadline).toLocaleDateString()
    : "Open";
  const applyUrl =
    job.applicationUrl ||
    (job.applicationEmail ? `mailto:${job.applicationEmail}` : null);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Jobs Directory
          </Link>
        </div>

        {/* Main Details Container */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 font-bold text-slate-700 text-base">
                {orgLogo ? (
                  <img
                    src={orgLogo}
                    alt={orgName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{orgName.substring(0, 2).toUpperCase()}</span>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                    {orgName}
                  </span>
                  {job.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />{" "}
                      Verified
                    </span>
                  )}
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {job.employmentType || job.type}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {job.title}
                </h1>
              </div>
            </div>

            <div>
              {applyUrl ? (
                <a
                  href={applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
                >
                  Apply Now <ArrowRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-xs font-medium text-slate-400 bg-slate-100 px-4 py-3 rounded-xl block text-center">
                  Application Unavailable
                </span>
              )}
            </div>
          </div>

          {/* Meta Information Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6 border-b border-slate-100 text-xs text-slate-600">
            {job.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="block font-medium text-slate-400 text-[10px]">
                    Location
                  </span>
                  <span className="font-semibold text-slate-800">
                    {job.location}
                  </span>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="block font-medium text-slate-400 text-[10px]">
                  Sector
                </span>
                <span className="font-semibold text-slate-800">{secName}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <span className="block font-medium text-slate-400 text-[10px]">
                  Deadline
                </span>
                <span className="font-semibold text-amber-700">
                  {deadlineStr}
                </span>
              </div>
            </div>
          </div>

          {/* Summary / Description */}
          <div className="py-6 space-y-4">
            {job.summary && (
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Summary
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {job.summary}
                </p>
              </div>
            )}

            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Role Overview & Details
              </h3>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-800 leading-relaxed space-y-3">
                {job.description ? (
                  <div dangerouslySetInnerHTML={{ __html: job.description }} />
                ) : (
                  <p className="text-slate-500 italic">
                    No extended description provided for this listing.
                  </p>
                )}
              </div>
            </div>

            {job.requirements && job.requirements.length > 0 && (
              <div className="pt-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Key Requirements
                </h3>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-700">
                  {job.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
