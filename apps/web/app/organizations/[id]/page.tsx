// D:\tudulu\apps\web\app\organizations\[id]\page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Globe,
  Mail,
  Phone,
  ShieldCheck,
  ArrowLeft,
  Briefcase,
  Calendar,
  ExternalLink,
} from "lucide-react";

interface OrganizationDetail {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  coverImage?: string;
  verified: boolean;
  sector?: {
    name: string;
  };
  sectorName?: string;
  location?: string;
  country?: string;
  website?: string;
  email?: string;
  phone?: string;
  about?: string;
  mission?: string;
  jobs?: Array<{
    id: string;
    slug: string;
    title: string;
    employmentType: string;
    location: string;
    deadline?: string;
    type?: string;
  }>;
}

export default function OrganizationDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [org, setOrg] = useState<OrganizationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    // Use relative path to leverage the Next.js API proxy rewrite instead of hardcoding external backend URLs
    const fetchUrl = `/api/organizations/${id}`;

    fetch(fetchUrl, {
      headers: {
        Accept: "application/json",
      },
    })
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error(
            `Received HTML instead of JSON from ${fetchUrl}. Ensure the API proxy route is active. Preview: ${text.substring(0, 80)}`,
          );
        }
        if (!res.ok)
          throw new Error(
            "Failed to fetch organization details from backend server.",
          );
        return res.json();
      })
      .then((data) => {
        setOrg(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 text-center text-slate-500 text-sm font-medium">
        Loading organization profile...
      </div>
    );
  }

  if (error || !org) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h1 className="text-lg font-bold text-slate-800 mb-2">
            Organization Not Found
          </h1>
          <p className="text-xs text-slate-500 mb-6 font-mono">
            {error || "The requested organization could not be located."}
          </p>
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Opportunities Board
          </Link>
        </div>
      </div>
    );
  }

  const sectorName = org.sector?.name || org.sectorName || "General Sector";
  const locationStr = org.location || org.country || "East Africa";

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Opportunities Board
          </Link>
        </div>

        {/* Organization Profile Container */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Cover Header Banner */}
          <div className="h-40 sm:h-48 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 relative">
            {org.coverImage && (
              <img
                src={org.coverImage}
                alt={org.name}
                className="w-full h-full object-cover opacity-30"
              />
            )}
          </div>

          {/* Profile Header Info */}
          <div className="px-6 sm:px-10 pb-8 pt-0 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-12 sm:-mt-16 mb-6">
              <div className="flex items-end gap-5">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border-4 border-white shadow-md flex items-center justify-center overflow-hidden font-bold text-slate-700 text-xl shrink-0">
                  {org.logo ? (
                    <img
                      src={org.logo}
                      alt={org.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{org.name.substring(0, 2).toUpperCase()}</span>
                  )}
                </div>

                <div className="pt-2 sm:pt-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                      {sectorName}
                    </span>
                    {org.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />{" "}
                        Verified Partner
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {org.name}
                  </h1>
                </div>
              </div>

              {org.website && (
                <a
                  href={org.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all shrink-0"
                >
                  <Globe className="w-3.5 h-3.5" /> Visit Website{" "}
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              )}
            </div>

            {/* Meta Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-slate-100 text-xs text-slate-600 mb-8">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="block font-medium text-slate-400 text-[10px]">
                    Location
                  </span>
                  <span className="font-semibold text-slate-800">
                    {locationStr}
                  </span>
                </div>
              </div>
              {org.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="block font-medium text-slate-400 text-[10px]">
                      Contact Email
                    </span>
                    <a
                      href={`mailto:${org.email}`}
                      className="font-semibold text-emerald-700 hover:underline"
                    >
                      {org.email}
                    </a>
                  </div>
                </div>
              )}
              {org.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="block font-medium text-slate-400 text-[10px]">
                      Phone Line
                    </span>
                    <span className="font-semibold text-slate-800">
                      {org.phone}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* About & Mission Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    About Organization
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {org.about ||
                      "No detailed background description provided for this organization."}
                  </p>
                </div>

                {org.mission && (
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      Core Mission & Focus
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                      {org.mission}
                    </p>
                  </div>
                )}
              </div>

              {/* Sidebar Info / Quick Stats */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4 h-fit">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Entity Verification
                </h3>
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Status</span>
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Active Partner
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Sector</span>
                    <span className="font-semibold text-slate-800">
                      {sectorName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Active Listings</span>
                    <span className="font-semibold text-slate-800">
                      {org.jobs?.length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Openings by Organization */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-600" /> Active
                  Postings & Opportunities ({org.jobs?.length || 0})
                </h3>
              </div>

              {!org.jobs || org.jobs.length === 0 ? (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center text-slate-500 text-xs">
                  This organization has no open listings at the moment. Check
                  back later for upcoming opportunities.
                </div>
              ) : (
                <div className="space-y-3">
                  {org.jobs.map((job) => {
                    const deadlineStr = job.deadline
                      ? new Date(job.deadline).toLocaleDateString()
                      : "Open";
                    const employmentType =
                      job.employmentType || job.type || "Full-Time";

                    return (
                      <Link
                        key={job.id || job.slug}
                        href={`/opportunities/${job.id || job.slug}`}
                        className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              {employmentType}
                            </span>
                            <span className="text-[10px] font-medium text-slate-400">
                              {job.location}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {job.title}
                          </h4>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-amber-500" /> Due:{" "}
                            {deadlineStr}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
