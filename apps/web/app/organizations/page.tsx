// D:\tudulu\apps\web\app\organizations\page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  MapPin,
  ShieldCheck,
  Search,
  ArrowRight,
} from "lucide-react";

interface Organization {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  description?: string;
  region?: string;
  type?: string;
  isVerified?: boolean;
  country?: {
    name: string;
  };
}

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    // Relative endpoint relies on Next.js rewrite proxy to target Fly.io safely
    const fetchUrl = "/api/organizations";

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
            `Received non-JSON response from ${fetchUrl}. Preview: ${text.substring(0, 80)}`,
          );
        }
        if (!res.ok)
          throw new Error("Failed to fetch organizations from backend server.");
        return res.json();
      })
      .then((data) => {
        let list: any[] = [];
        if (Array.isArray(data)) {
          list = data;
        } else if (data && typeof data === "object") {
          list =
            data.organizations || data.data || data.items || data.results || [];
        }

        if (!Array.isArray(list)) {
          throw new Error(
            `API returned invalid payload format. Expected an array of organizations.`,
          );
        }

        setOrganizations(list);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredOrgs = organizations.filter((org) => {
    const matchesSearch =
      (org.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (org.description?.toLowerCase() || "").includes(
        searchQuery.toLowerCase(),
      );
    const matchesRegion =
      selectedRegion === "All" || org.region === selectedRegion;
    const matchesType = selectedType === "All" || org.type === selectedType;
    return matchesSearch && matchesRegion && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md mb-3 inline-block">
              African NGO & Ecosystem Directory
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Africa Development Intelligence Database
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              Discover verified organizations, development actors, and
              implementers driving change across Africa.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search organizations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              />
            </div>

            <div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              >
                <option value="All">All Regions</option>
                <option value="Global">Global</option>
                <option value="Pan-African">Pan-African</option>
                <option value="East Africa">East Africa</option>
                <option value="West Africa">West Africa</option>
                <option value="Central Africa">Central Africa</option>
                <option value="Southern Africa">Southern Africa</option>
                <option value="North Africa">North Africa</option>
              </select>
            </div>

            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              >
                <option value="All">All Types</option>
                <option value="International NGO">International NGO</option>
                <option value="Local NGO">Local NGO</option>
                <option value="Community Based Organization (CBO)">
                  Community Based Organization (CBO)
                </option>
                <option value="Civil Society Organization (CSO)">
                  Civil Society Organization (CSO)
                </option>
                <option value="Foundation">Foundation</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-4 px-2">
          <p className="text-xs font-semibold text-slate-500">
            <span className="text-slate-800">{filteredOrgs.length}</span>{" "}
            Organizations Found
          </p>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-sm font-medium shadow-sm">
            Fetching organizations from backend server...
          </div>
        ) : error ? (
          <div className="bg-red-50 rounded-2xl border border-red-200 p-8 text-center text-red-700 text-xs shadow-sm">
            <p className="font-bold text-sm mb-1">
              Failed to Load Organizations
            </p>
            <p className="font-mono bg-red-100 p-2 rounded inline-block mt-2">
              {error}
            </p>
          </div>
        ) : filteredOrgs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 mb-1">
              No organizations matched your criteria
            </h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search parameters or check back later.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrgs.map((org) => {
              const targetRoute = `/organizations/${org.slug || org.id}`;

              return (
                <Link
                  key={org.id || org.slug}
                  href={targetRoute}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 font-bold text-slate-700 text-sm">
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

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                          {org.type || "Organization"}
                        </span>
                        {org.isVerified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />{" "}
                            Verified
                          </span>
                        )}
                        {org.region && (
                          <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {org.region}
                          </span>
                        )}
                      </div>

                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {org.name}
                      </h2>

                      {org.description && (
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                          {org.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-3">
                        {org.country?.name && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />{" "}
                            {org.country.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 group-hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm">
                      View Profile <ArrowRight className="w-3.5 h-3.5" />
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
