"use client";

import { useState, useMemo } from "react";
import {
  MOCK_JOB_OPPORTUNITIES,
  AVAILABLE_JOB_TYPES,
  AVAILABLE_EXPERIENCE_LEVELS,
} from "./data";
import Link from "next/link";
import {
  Briefcase,
  Search,
  MapPin,
  Building2,
  Calendar,
  Mail,
  ExternalLink,
  SlidersHorizontal,
  X,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function JobsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("All Types");
  const [selectedExperience, setSelectedExperience] = useState("All Levels");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Filter job opportunities dynamically
  const filteredJobs = useMemo(() => {
    return MOCK_JOB_OPPORTUNITIES.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.organizationName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.sector.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (
        selectedJobType !== "All Types" &&
        job.employmentType !== selectedJobType
      ) {
        return false;
      }

      if (
        selectedExperience !== "All Levels" &&
        job.experienceLevel !== selectedExperience
      ) {
        return false;
      }

      if (verifiedOnly && !job.verified) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedJobType, selectedExperience, verifiedOnly]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedJobType("All Types");
    setSelectedExperience("All Levels");
    setVerifiedOnly(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
              <Briefcase className="w-3.5 h-3.5" /> Africa Development
              Intelligence Database
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Development & NGO Job Board
            </h1>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Explore open positions, consultancies, and technical roles across
              leading international NGOs, foundations, and development agencies
              in Africa.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center">
            <span className="block text-2xl font-bold text-emerald-600">
              {filteredJobs.length}
            </span>
            <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
              Active Opportunities
            </span>
          </div>
        </div>

        {/* Search & Control Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role, organization, country, or keyword..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <select
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {AVAILABLE_JOB_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {AVAILABLE_EXPERIENCE_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Secondary Control Row */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                Verified Opportunities Only
              </label>
            </div>

            {(selectedJobType !== "All Types" ||
              selectedExperience !== "All Levels" ||
              searchQuery !== "" ||
              verifiedOnly) && (
              <button
                onClick={clearFilters}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Reset all filters
              </button>
            )}
          </div>
        </div>

        {/* Jobs Feed / List */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800">
              No active job opportunities found
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Try modifying your search criteria or clearing active filters.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                {/* Left: Org Logo & Job Summary */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 font-bold text-slate-700">
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
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                        {job.organizationName}
                      </span>
                      {job.verified && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />{" "}
                          Verified Listing
                        </span>
                      )}
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                        {job.employmentType}
                      </span>
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                        {job.experienceLevel}
                      </span>
                    </div>

                    <Link href={`/jobs/${job.id}`}>
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {job.title}
                      </h2>
                    </Link>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />{" "}
                        {job.location} ({job.country})
                      </span>
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />{" "}
                        Sector: {job.sector}
                      </span>
                      <span className="flex items-center gap-1 text-amber-700 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />{" "}
                        Deadline: {job.deadline}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 mt-3 line-clamp-2">
                      {job.description}
                    </p>

                    {/* Qualifications preview */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {job.qualifications.slice(0, 2).map((qual, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded"
                        >
                          ✓ {qual}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end justify-center gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-all text-center"
                  >
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  {job.applicationEmail && (
                    <a
                      href={`mailto:${job.applicationEmail}?subject=Application for ${job.title}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all text-center"
                    >
                      <Mail className="w-3.5 h-3.5" /> Apply via Email
                    </a>
                  )}
                  {job.applicationUrl && (
                    <a
                      href={job.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-all text-center"
                    >
                      External Link <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
