// D:\tudulu\apps\web\app\admin\jobs\page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
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

interface Opportunity {
  id: string;
  title: string;
  slug?: string;
  type: string;
  provider: string;
  deadline?: string;
  status: string;
  isVerified: boolean;
  createdAt?: string;
}

export default function AdminOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [error, setError] = useState<string | null>(null);

  // Modal State for Adding New Opportunity/Job
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newProvider, setNewProvider] = useState("");
  const [newType, setNewType] = useState("GRANT");
  const [newStatus, setNewStatus] = useState("ACTIVE");
  const [submitting, setSubmitting] = useState(false);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:3001/api/v1/jobs", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Failed to fetch opportunities directory.");
      const data = await res.json();
      setOpportunities(
        Array.isArray(data) ? data : data.data || data.jobs || [],
      );
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const handleToggleVerify = async (id: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`http://localhost:3001/api/v1/jobs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ isVerified: !currentStatus }),
      });
      if (!res.ok) throw new Error("Failed to update verification status.");

      setOpportunities((prev) =>
        prev.map((opp) =>
          opp.id === id ? { ...opp, isVerified: !currentStatus } : opp,
        ),
      );
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this opportunity?")) return;
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`http://localhost:3001/api/v1/jobs/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Failed to delete record.");

      setOpportunities((prev) => prev.filter((opp) => opp.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCreateOpportunity = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const token = localStorage.getItem("accessToken");

    try {
      const res = await fetch("http://localhost:3001/api/v1/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: newTitle,
          provider: newProvider,
          type: newType,
          status: newStatus,
          isVerified: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        const errorMsg = Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message || "Failed to create opportunity";
        throw new Error(errorMsg);
      }

      setIsModalOpen(false);
      setNewTitle("");
      setNewProvider("");
      setNewType("GRANT");
      setNewStatus("ACTIVE");
      fetchOpportunities();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    const titleMatch =
      opp.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const providerMatch =
      opp.provider?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const matchesSearch = titleMatch || providerMatch;
    const matchesStatus = statusFilter === "ALL" || opp.status === statusFilter;
    return matchesSearch && matchesStatus;
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
              <Briefcase className="w-8 h-8 text-[var(--td-color-primary)]" />
              Opportunities & Grants Manager
            </h1>
            <p className="text-[var(--td-text-muted)] text-sm">
              Curate and monitor funding calls, fellowships, and career openings
              across East Africa.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[var(--td-color-primary)] text-[var(--td-text-inverse)] hover:opacity-95 font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer text-xs"
          >
            <Plus className="w-4 h-4" />
            Add Opportunity
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[var(--td-text-muted)]" />
            <input
              type="text"
              placeholder="Search by title or provider..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-xl text-xs focus:outline-none focus:border-[var(--td-color-primary)] text-[var(--td-text)] transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-2 text-xs text-[var(--td-text-muted)]">
              <Filter className="w-4 h-4" />
              <span>Status:</span>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[var(--td-color-primary)] text-[var(--td-text)] transition-all cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="DRAFT">Draft</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        </div>

        {/* Main Table Container */}
        <div className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-[var(--td-text-muted)] flex flex-col items-center gap-3 text-xs font-medium">
              <div className="w-6 h-6 border-2 border-[var(--td-color-primary)] border-t-transparent rounded-full animate-spin" />
              Loading opportunities database...
            </div>
          ) : error ? (
            <div className="p-12 text-center text-rose-500 flex flex-col items-center gap-2 text-xs">
              <AlertCircle className="w-6 h-6" />
              <p>{error}</p>
            </div>
          ) : filteredOpportunities.length === 0 ? (
            <div className="p-12 text-center text-[var(--td-text-muted)] text-xs">
              No matching records found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--td-border-subtle)] bg-[var(--td-bg-soft)] text-xs font-semibold text-[var(--td-text-muted)] uppercase tracking-wider">
                    <th className="py-4 px-6">Opportunity Details</th>
                    <th className="py-4 px-6">Type</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Verification</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--td-border-subtle)] text-sm">
                  {filteredOpportunities.map((opp) => (
                    <tr
                      key={opp.id}
                      className="hover:bg-[var(--td-bg-soft)] transition-colors"
                    >
                      <td className="py-4 px-6 space-y-1">
                        <div className="font-semibold text-[var(--td-text)]">
                          {opp.title}
                        </div>
                        <div className="text-xs text-[var(--td-text-muted)]">
                          Provided by{" "}
                          <span className="font-medium text-[var(--td-text-light)]">
                            {opp.provider || "Tudulu Partner"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] text-[var(--td-text)]">
                          {opp.type || "GRANT"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${
                            opp.status === "ACTIVE"
                              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                              : "bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {opp.status || "ACTIVE"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() =>
                            handleToggleVerify(opp.id, opp.isVerified)
                          }
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                            opp.isVerified
                              ? "bg-[var(--td-color-primary)]/10 border border-[var(--td-color-primary)]/20 text-[var(--td-color-primary)]"
                              : "bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] text-[var(--td-text-muted)]"
                          }`}
                        >
                          {opp.isVerified ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5" />
                          )}
                          {opp.isVerified ? "Verified" : "Unverified"}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => handleDelete(opp.id)}
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

        {/* Add Opportunity Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs px-4">
            <div className="max-w-md w-full bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--td-border-subtle)] pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[var(--td-color-primary)]/10 text-[var(--td-color-primary)]">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--td-text)]">
                    Create Opportunity
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-[var(--td-bg-soft)] text-[var(--td-text-muted)] hover:text-[var(--td-text)] transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateOpportunity} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--td-text-light)] mb-1">
                    Opportunity Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. East Africa Health Innovation Grant"
                    className="w-full px-3.5 py-2.5 text-xs bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-xl text-[var(--td-text)] focus:outline-none focus:border-[var(--td-color-primary)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--td-text-light)] mb-1">
                    Provider / Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={newProvider}
                    onChange={(e) => setNewProvider(e.target.value)}
                    placeholder="e.g. Sembeza Africa / WHO"
                    className="w-full px-3.5 py-2.5 text-xs bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-xl text-[var(--td-text)] focus:outline-none focus:border-[var(--td-color-primary)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--td-text-light)] mb-1">
                    Opportunity Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-xl text-[var(--td-text)] focus:outline-none focus:border-[var(--td-color-primary)] transition-all cursor-pointer"
                  >
                    <option value="GRANT">GRANT</option>
                    <option value="FELLOWSHIP">FELLOWSHIP</option>
                    <option value="JOB">JOB</option>
                    <option value="TENDER">TENDER</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--td-text-light)] mb-1">
                    Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-xl text-[var(--td-text)] focus:outline-none focus:border-[var(--td-color-primary)] transition-all cursor-pointer"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
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
                    {submitting ? "Publishing..." : "Save Opportunity"}
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
