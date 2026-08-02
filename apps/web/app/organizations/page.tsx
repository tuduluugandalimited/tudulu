"use client";

import { useState, useMemo } from "react";
import {
  MOCK_ORGANIZATIONS,
  AVAILABLE_REGIONS,
  AVAILABLE_TYPES,
  AVAILABLE_SECTORS,
  AVAILABLE_DONORS,
  AVAILABLE_SDGS,
  AVAILABLE_BENEFICIARIES,
  Organization,
} from "./data";
import Link from "next/link";
import {
  Search,
  Building2,
  MapPin,
  ShieldCheck,
  Globe,
  ExternalLink,
  SlidersHorizontal,
  X,
} from "lucide-react";

export default function OrganizationsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedSector, setSelectedSector] = useState("All Sectors");
  const [selectedDonor, setSelectedDonor] = useState("All Donors");
  const [selectedSdg, setSelectedSdg] = useState<number | null>(null);
  const [selectedBeneficiary, setSelectedBeneficiary] =
    useState("All Beneficiaries");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Filter organizations based on multi-facet intelligence query
  const filteredOrganizations = useMemo(() => {
    return MOCK_ORGANIZATIONS.filter((org) => {
      // Search term match
      const matchesSearch =
        org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (org.acronym &&
          org.acronym.toLowerCase().includes(searchQuery.toLowerCase())) ||
        org.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.headquarters.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.countriesServed.some((c) =>
          c.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      if (!matchesSearch) return false;

      // Region filter
      if (selectedRegion !== "All Regions" && org.region !== selectedRegion) {
        return false;
      }

      // Organization Type filter
      if (
        selectedType !== "All Types" &&
        org.organizationType !== selectedType
      ) {
        return false;
      }

      // Sector filter
      if (
        selectedSector !== "All Sectors" &&
        !org.sectors.includes(selectedSector)
      ) {
        return false;
      }

      // Donor filter
      if (
        selectedDonor !== "All Donors" &&
        !org.donors.includes(selectedDonor)
      ) {
        return false;
      }

      // SDG filter
      if (selectedSdg !== null && !org.sdgs.includes(selectedSdg)) {
        return false;
      }

      // Beneficiary filter
      if (
        selectedBeneficiary !== "All Beneficiaries" &&
        !org.beneficiaries.includes(selectedBeneficiary)
      ) {
        return false;
      }

      // Verified filter
      if (verifiedOnly && org.verificationLevel !== "Verified") {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedRegion,
    selectedType,
    selectedSector,
    selectedDonor,
    selectedSdg,
    selectedBeneficiary,
    verifiedOnly,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedRegion("All Regions");
    setSelectedType("All Types");
    setSelectedSector("All Sectors");
    setSelectedDonor("All Donors");
    setSelectedSdg(null);
    setSelectedBeneficiary("All Beneficiaries");
    setVerifiedOnly(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
              <Building2 className="w-3.5 h-3.5" /> Africa Development
              Intelligence Database
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              African NGO & Ecosystem Directory
            </h1>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Discover verified organizations, development actors, and
              implementers driving change across Africa. Filter by region, type,
              sector, funding sources, and SDGs.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center">
            <span className="block text-2xl font-bold text-emerald-600">
              {filteredOrganizations.length}
            </span>
            <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
              Organizations Found
            </span>
          </div>
        </div>

        {/* Advanced Search & Control Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, acronym, country served, or keyword..."
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

            {/* Quick Filter Selectors */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              {/* Region Dropdown */}
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {AVAILABLE_REGIONS.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              {/* Type Dropdown */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {AVAILABLE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {/* Sector Dropdown */}
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All Sectors">All Sectors</option>
                {AVAILABLE_SECTORS.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Secondary Filter Row (Donors, SDGs & Toggles) */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filters:
              </span>

              <select
                value={selectedDonor}
                onChange={(e) => setSelectedDonor(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All Donors">All Donors</option>
                {AVAILABLE_DONORS.map((donor) => (
                  <option key={donor} value={donor}>
                    {donor}
                  </option>
                ))}
              </select>

              <select
                value={selectedSdg ?? ""}
                onChange={(e) =>
                  setSelectedSdg(e.target.value ? Number(e.target.value) : null)
                }
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">All SDGs (1-17)</option>
                {AVAILABLE_SDGS.map((sdg) => (
                  <option key={sdg.id} value={sdg.id}>
                    {sdg.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedBeneficiary}
                onChange={(e) => setSelectedBeneficiary(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All Beneficiaries">All Beneficiaries</option>
                {AVAILABLE_BENEFICIARIES.map((ben) => (
                  <option key={ben} value={ben}>
                    {ben}
                  </option>
                ))}
              </select>

              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                Verified Only
              </label>
            </div>

            {(selectedRegion !== "All Regions" ||
              selectedType !== "All Types" ||
              selectedSector !== "All Sectors" ||
              selectedDonor !== "All Donors" ||
              selectedSdg !== null ||
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

        {/* Organizations Grid */}
        {filteredOrganizations.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800">
              No organizations matched your criteria
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Try loosening your search terms or clearing specific sector and
              donor filters.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrganizations.map((org) => (
              <div
                key={org.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group"
              >
                {/* Card Header */}
                <div className="p-6 pb-4 flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 font-bold text-slate-700">
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

                    <div className="flex flex-col items-end gap-1">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 text-right">
                        {org.organizationType}
                      </span>
                      {org.verificationLevel === "Verified" && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          <ShieldCheck className="w-3.5 h-3.5" /> Verified
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors flex items-center gap-2">
                    {org.name}
                    {org.acronym && (
                      <span className="text-xs font-normal text-slate-400">
                        ({org.acronym})
                      </span>
                    )}
                  </h3>

                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> HQ:{" "}
                    {org.headquarters}
                  </p>

                  <p className="text-sm text-slate-600 mt-3 line-clamp-2">
                    {org.description}
                  </p>

                  {/* Sectors Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {org.sectors.slice(0, 3).map((sec) => (
                      <span
                        key={sec}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium"
                      >
                        {sec}
                      </span>
                    ))}
                    {org.sectors.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-slate-50 text-slate-400 text-xs">
                        +{org.sectors.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Ecosystem Counters Footer */}
                <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 grid grid-cols-4 gap-2 text-center text-xs">
                  <div>
                    <span className="block font-bold text-slate-900">
                      {org.counts.jobs}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-tight">
                      Jobs
                    </span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900">
                      {org.counts.grants}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-tight">
                      Grants
                    </span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900">
                      {org.counts.reports}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-tight">
                      Reports
                    </span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900">
                      {org.counts.news}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-tight">
                      News
                    </span>
                  </div>
                </div>

                {/* Action Link Footer */}
                <div className="px-6 py-3 bg-white border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span>{org.countriesServed.length} Countries</span>
                  </div>
                  {org.website && (
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      Visit Profile <ExternalLink className="w-3.5 h-3.5" />
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
