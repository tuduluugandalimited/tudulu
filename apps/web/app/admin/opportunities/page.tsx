"use client";

import { useState, useEffect } from "react";
import {
  Briefcase,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Trash2,
  Edit3,
  ExternalLink,
  Filter,
  AlertCircle,
} from "lucide-react";

interface Opportunity {
  id: string;
  title: string;
  slug: string;
  type: string;
  provider: string;
  deadline?: string;
  status: string;
  isVerified: boolean;
  createdAt: string;
}

export default function AdminOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      // Replace or adapt with your API base URL or internal Next.js Route Handler
      const res = await fetch("http://localhost:4000/api/opportunities");
      if (!res.ok) throw new Error("Failed to fetch opportunities directory.");
      const data = await res.json();
      setOpportunities(data.data || data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVerify = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/opportunities/${id}/verify`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isVerified: !currentStatus }),
        },
      );
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
      const res = await fetch(`http://localhost:4000/api/opportunities/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete record.");

      setOpportunities((prev) => prev.filter((opp) => opp.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || opp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-indigo-600" />
            Opportunities & Grants Manager
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Curate and monitor funding calls, fellowships, and career openings
            across East Africa.
          </p>
        </div>
        <button
          onClick={() => alert("Open create modal or route to form page")}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-xl transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Opportunity
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title or provider..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Filter className="w-4 h-4" />
            <span>Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="DRAFT">Draft</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            Loading opportunities database...
          </div>
        ) : error ? (
          <div className="p-12 text-center text-rose-500 flex flex-col items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            <p>{error}</p>
          </div>
        ) : filteredOpportunities.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No matching records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Opportunity Details</th>
                  <th className="py-4 px-6">Type</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Verification</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                {filteredOpportunities.map((opp) => (
                  <tr
                    key={opp.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-4 px-6 space-y-1">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {opp.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Provided by{" "}
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {opp.provider}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {opp.type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${
                          opp.status === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                        }`}
                      >
                        {opp.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() =>
                          handleToggleVerify(opp.id, opp.isVerified)
                        }
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                          opp.isVerified
                            ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-400"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
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
                        onClick={() => alert(`Edit item: ${opp.id}`)}
                        className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="Edit entry"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(opp.id)}
                        className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
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
    </div>
  );
}
