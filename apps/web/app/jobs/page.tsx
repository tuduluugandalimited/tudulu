// D:\tudulu\apps\web\app\jobs\page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Building2,
  Calendar,
  ShieldCheck,
  Search,
  ArrowRight,
} from "lucide-react";

interface JobOpportunity {
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
  summary?: string;
  type?: string;
}

export default function JobsDirectoryPage() {
  const [jobs, setJobs] = useState<JobOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    fetch(`${apiUrl}/jobs`, {
      headers: {
        Accept: "application/json",
      },
    })
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error(
            `Received HTML instead of JSON from ${apiUrl}/jobs. Ensure NestJS backend is running on port 3001 and /jobs route is active. Preview: ${text.substring(0, 80)}`,
          );
        }
        if (!res.ok)
          throw new Error("Failed to fetch jobs from backend server.");
        return res.json();
      })
      .then((data) => {
        let list: any[] = [];
        if (Array.isArray(data)) {
          list = data;
        } else if (data && typeof data === "object") {
          list = data.jobs || data.data || data.items || data.results || [];
        }

        if (!Array.isArray(list)) {
          throw new Error(
            `API returned invalid payload format. Expected an array of jobs.`,
          );
        }

        setJobs(list);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredJobs = jobs.filter((item) => {
    const orgName = item.organization?.name || item.organizationName || "";
    const secName = item.sector?.name || item.sectorName || "";
    const typeVal = item.employmentType || item.type || "";

    const matchesSearch =
      (item.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      orgName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.location?.toLowerCase() || "").includes(searchQuery.toLowerCase());

    const matchesSector =
      selectedSector === "all" ||
      secName.toLowerCase() === selectedSector.toLowerCase();
    const matchesType =
      selectedType === "all" ||
      typeVal.toLowerCase() === selectedType.toLowerCase();

    return matchesSearch && matchesSector && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md mb-3 inline-block">
              Jobs & Opportunities Directory
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Explore Active Positions & RFPs
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              Browse professional engineering, biomedical, field operations, and
              technical software development postings.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative sm:col-span-1">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search title, organization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              />
            </div>

            <div className="relative sm:col-span-1">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              >
                <option value="all">All Sectors</option>
                <option value="Health">Health & Biomedical</option>
                <option value="Engineering">Engineering & Software</option>
                <option value="Logistics">Logistics & Non-Profit</option>
              </select>
            </div>

            <div className="relative sm:col-span-1">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              >
                <option value="all">All Types</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Contract">Contract / RFP</option>
                <option value="Grant">Grant</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-4 px-2">
          <p className="text-xs font-semibold text-slate-500">
            Active Listings:{" "}
            <span className="text-slate-800">{filteredJobs.length}</span>
          </p>
        </div>

        {/* Listings List */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-sm font-medium shadow-sm">
            Loading job directory...
          </div>
        ) : error ? (
          <div className="bg-red-50 rounded-2xl border border-red-200 p-8 text-center text-red-700 text-xs shadow-sm">
            <p className="font-bold text-sm mb-1">
              Failed to Connect to Jobs Server
            </p>
            <p className="font-mono bg-red-100 p-2 rounded inline-block mt-2">
              {error}
            </p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 mb-1">
              No job positions found
            </h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search filters or check back later for new
              postings.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((item) => {
              const orgName =
                item.organization?.name ||
                item.organizationName ||
                "Organization";
              const orgLogo = item.organization?.logo || item.organizationLogo;
              const secName = item.sector?.name || item.sectorName || "General";
              const deadlineStr = item.deadline
                ? new Date(item.deadline).toLocaleDateString()
                : "Open";
              const employmentType =
                item.employmentType || item.type || "Full-Time";
              const targetRoute = `/jobs/${item.slug || item.id}`;

              return (
                <Link
                  key={item.id || item.slug}
                  href={targetRoute}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 font-bold text-slate-700 text-sm">
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
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                          {orgName}
                        </span>
                        {item.verified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />{" "}
                            Verified
                          </span>
                        )}
                        <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {employmentType}
                        </span>
                      </div>

                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                        {item.title}
                      </h2>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                        {item.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />{" "}
                            {item.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />{" "}
                          {secName}
                        </span>
                        <span className="flex items-center gap-1 text-amber-700 font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-amber-500" />{" "}
                          Due: {deadlineStr}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-end">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 group-hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm">
                      View Position <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
