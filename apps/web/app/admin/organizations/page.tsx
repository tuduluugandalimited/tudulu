// D:\tudulu\apps\web\app\admin\organizations\page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Trash2,
  Filter,
  AlertCircle,
  ArrowLeft,
  X,
} from "lucide-react";

interface Organization {
  id: string;
  name: string;
  slug?: string;
  type: string;
  country?: string | { id?: string; name?: string; code?: string };
  status?: string;
  isVerified: boolean;
  createdAt?: string;
}

export default function AdminOrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [error, setError] = useState<string | null>(null);

  // Modal State for Adding New Organization
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("LOCAL_NGO");
  const [newCountry, setNewCountry] = useState("Uganda");
  const [submitting, setSubmitting] = useState(false);

  const fetchOrganizations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:3001/api/v1/organizations", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Failed to fetch organizations directory.");
      const data = await res.json();
      setOrganizations(
        Array.isArray(data) ? data : data.data || data.organizations || [],
      );
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  const handleToggleVerify = async (id: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `http://localhost:3001/api/v1/organizations/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ isVerified: !currentStatus }),
        },
      );
      if (!res.ok) throw new Error("Failed to update verification status.");

      setOrganizations((prev) =>
        prev.map((org) =>
          org.id === id ? { ...org, isVerified: !currentStatus } : org,
        ),
      );
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this organization?"))
      return;
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `http://localhost:3001/api/v1/organizations/${id}`,
        {
          method: "DELETE",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const errorMsg = Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message || "Failed to delete record.";
        throw new Error(errorMsg);
      }

      setOrganizations((prev) => prev.filter((org) => org.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const token = localStorage.getItem("accessToken");

    try {
      const res = await fetch("http://localhost:3001/api/v1/organizations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: newName,
          type: newType,
          country: newCountry,
          isVerified: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        const errorMsg = Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message || "Failed to create organization";
        throw new Error(errorMsg);
      }

      setIsModalOpen(false);
      setNewName("");
      setNewType("LOCAL_NGO");
      setNewCountry("Uganda");
      fetchOrganizations();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const getCountryString = (
    country?: string | { id?: string; name?: string; code?: string },
  ): string => {
    if (!country) return "Uganda";
    if (typeof country === "string") return country;
    return country.name || country.code || "Uganda";
  };

  const filteredOrganizations = organizations.filter((org) => {
    const query = searchQuery.toLowerCase();
    const nameVal = typeof org?.name === "string" ? org.name : "";
    const countryVal = getCountryString(org?.country);

    const nameMatch = nameVal.toLowerCase().includes(query);
    const countryMatch = countryVal.toLowerCase().includes(query);
    const matchesSearch = nameMatch || countryMatch;
    const matchesType = typeFilter === "ALL" || org?.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-[var(--td-bg-soft)] text-[var(--td-text)]">
      <div className="max-w-6xl mx-auto space-y-8 py-10 px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--td-border-subtle)] pb-6">
          <div className="space-y-1">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--td-color-primary)] hover:underline mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Control Center
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--td-text)] flex items-center gap-3">
              <Building2 className="w-8 h-8 text-[var(--td-color-primary)]" />
              Organizations & Partners Directory
            </h1>
            <p className="text-[var(--td-text-muted)] text-sm">
              Manage NGO partnerships, health tech providers, foundations, and
              verified entities.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[var(--td-color-primary)] text-[var(--td-text-inverse)] hover:opacity-95 font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer text-xs"
          >
            <Plus className="w-4 h-4" />
            Add Organization
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[var(--td-text-muted)]" />
            <input
              type="text"
              placeholder="Search by organization name or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-xl text-xs focus:outline-none focus:border-[var(--td-color-primary)] text-[var(--td-text)] transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-2 text-xs text-[var(--td-text-muted)]">
              <Filter className="w-4 h-4" />
              <span>Type:</span>
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--td-color-primary)] text-[var(--td-text)] transition-all cursor-pointer"
            >
              <option value="ALL">All Entity Types</option>
              <option value="LOCAL_NGO">Local NGO</option>
              <option value="INTL_NGO">International NGO</option>
              <option value="FOUNDATION">Foundation</option>
            </select>
          </div>
        </div>

        {/* Main Table Container */}
        <div className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-[var(--td-text-muted)] flex flex-col items-center gap-3 text-xs font-medium">
              <div className="w-6 h-6 border-2 border-[var(--td-color-primary)] border-t-transparent rounded-full animate-spin" />
              Loading organizations database...
            </div>
          ) : error ? (
            <div className="p-12 text-center text-rose-500 flex flex-col items-center gap-2 text-xs">
              <AlertCircle className="w-6 h-6" />
              <p>{error}</p>
            </div>
          ) : filteredOrganizations.length === 0 ? (
            <div className="p-12 text-center text-[var(--td-text-muted)] text-xs">
              No matching records found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--td-border-subtle)] bg-[var(--td-bg-soft)] text-xs font-semibold text-[var(--td-text-muted)] uppercase tracking-wider">
                    <th className="py-4 px-6">Organization Name</th>
                    <th className="py-4 px-6">Entity Type</th>
                    <th className="py-4 px-6">Country</th>
                    <th className="py-4 px-6">Verification</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--td-border-subtle)] text-sm">
                  {filteredOrganizations.map((org) => (
                    <tr
                      key={org.id}
                      className="hover:bg-[var(--td-bg-soft)] transition-colors"
                    >
                      <td className="py-4 px-6 space-y-1">
                        <div className="font-semibold text-[var(--td-text)]">
                          {org.name}
                        </div>
                        <div className="text-xs text-[var(--td-text-muted)]">
                          Registered Entity Partner
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] text-[var(--td-text)]">
                          {org.type || "LOCAL_NGO"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs text-[var(--td-text-muted)]">
                        {getCountryString(org.country)}
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() =>
                            handleToggleVerify(org.id, org.isVerified)
                          }
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                            org.isVerified
                              ? "bg-[var(--td-color-primary)]/10 border border-[var(--td-color-primary)]/20 text-[var(--td-color-primary)]"
                              : "bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] text-[var(--td-text-muted)]"
                          }`}
                        >
                          {org.isVerified ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5" />
                          )}
                          {org.isVerified ? "Verified" : "Unverified"}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => handleDelete(org.id)}
                          className="p-2.5 text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-xl transition-colors cursor-pointer"
                          title="Delete entry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add Organization Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs px-4">
            <div className="max-w-md w-full bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--td-border-subtle)] pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[var(--td-color-primary)]/10 text-[var(--td-color-primary)]">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--td-text)]">
                    Add Organization
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-[var(--td-bg-soft)] text-[var(--td-text-muted)] hover:text-[var(--td-text)] transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateOrganization} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--td-text-light)] mb-1">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Sembeza Africa"
                    className="w-full px-3.5 py-2.5 text-xs bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-xl text-[var(--td-text)] focus:outline-none focus:border-[var(--td-color-primary)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--td-text-light)] mb-1">
                    Entity Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-xl text-[var(--td-text)] focus:outline-none focus:border-[var(--td-color-primary)] transition-all cursor-pointer"
                  >
                    <option value="LOCAL_NGO">Local NGO</option>
                    <option value="INTL_NGO">International NGO</option>
                    <option value="FOUNDATION">Foundation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--td-text-light)] mb-1">
                    Country / Region
                  </label>
                  <input
                    type="text"
                    required
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    placeholder="e.g. Uganda"
                    className="w-full px-3.5 py-2.5 text-xs bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-xl text-[var(--td-text)] focus:outline-none focus:border-[var(--td-color-primary)] transition-all"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] text-xs font-semibold text-[var(--td-text)] hover:bg-[var(--td-border-subtle)] transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2.5 rounded-xl bg-[var(--td-color-primary)] text-[var(--td-text-inverse)] hover:opacity-95 text-xs font-bold transition shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? "Saving..." : "Save Organization"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
