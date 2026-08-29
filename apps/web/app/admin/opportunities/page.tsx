// D:\tudulu\apps\web\app\admin\opportunities\page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Briefcase,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Trash2,
  Edit3,
  Filter,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

interface Opportunity {
  id: string;
  title: string;
  slug?: string;
  type: string;
  provider?: string;
  organization?: { id?: string; name?: string };
  deadline?: string;
  status?: string;
  isVerified: boolean;
  createdAt?: string;
}

export default function AdminOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [error, setError] = useState<string | null>(null);

  const fetchOpportunities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token =
        localStorage.getItem("accessToken") || localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/api/v1/opportunities`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );
      if (!res.ok) throw new Error("Failed to fetch opportunities directory.");
      const data = await res.json();
      setOpportunities(
        Array.isArray(data) ? data : data.data || data.opportunities || [],
      );
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  const handleToggleVerify = async (id: string, currentStatus: boolean) => {
    try {
      const token =
        localStorage.getItem("accessToken") || localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/api/v1/opportunities/${id}`,
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
    if (!window.confirm("Are you sure you want to remove this opportunity?"))
      return;
    try {
      const token =
        localStorage.getItem("accessToken") || localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/api/v1/opportunities/${id}`,
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

      setOpportunities((prev) => prev.filter((opp) => opp.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const getProviderName = (opp: Opportunity): string => {
    if (opp.provider) return opp.provider;
    if (opp.organization?.name) return opp.organization.name;
    return "Independent Provider";
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    const titleVal = typeof opp?.title === "string" ? opp.title : "";
    const providerVal = getProviderName(opp);

    const matchesSearch =
      titleVal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      providerVal.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || (opp.status || "ACTIVE") === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto space-y-6 py-10 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-6">
          <div className="space-y-1">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:underline mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Control Center
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2.5">
              <Briefcase className="w-7 h-7 text-emerald-600" />
              Opportunities & Grants Manager
            </h1>
            <p className="text-gray-500 text-sm">
              Curate and monitor funding calls, fellowships, and career openings
              across East Africa.
            </p>
          </div>
          <button
            onClick={() => alert("Open create modal or navigate to form page")}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 font-medium px-4 py-2 rounded-lg transition-all shadow-sm text-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Opportunity
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or provider..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-emerald-500 text-gray-900 transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Filter className="w-4 h-4" />
              <span>Status:</span>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 text-gray-900 transition-all cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="DRAFT">Draft</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        </div>

        {/* Main Table Container */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center gap-3 text-xs font-medium">
              <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              Loading opportunities database...
            </div>
          ) : error ? (
            <div className="p-12 text-center text-rose-600 flex flex-col items-center gap-2 text-xs">
              <AlertCircle className="w-6 h-6" />
              <p>{error}</p>
            </div>
          ) : filteredOpportunities.length === 0 ? (
            <div className="p-12 text-center text-gray-500 text-xs">
              No matching records found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="py-3.5 px-6">Opportunity Details</th>
                    <th className="py-3.5 px-6">Type</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6">Verification</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {filteredOpportunities.map((opp) => (
                    <tr
                      key={opp.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6 space-y-1">
                        <div className="font-medium text-gray-900">
                          {opp.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          Provided by{" "}
                          <span className="font-medium text-gray-700">
                            {getProviderName(opp)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 border border-gray-200 text-gray-800">
                          {opp.type || "GRANT"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                            (opp.status || "ACTIVE") === "ACTIVE"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
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
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            opp.isVerified
                              ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                              : "bg-gray-100 border border-gray-200 text-gray-600"
                          }`}
                        >
                          {opp.isVerified ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-gray-400" />
                          )}
                          {opp.isVerified ? "Verified" : "Unverified"}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => alert(`Edit item: ${opp.id}`)}
                          className="p-2 text-gray-500 hover:text-emerald-600 bg-gray-50 rounded-lg border border-gray-200 transition-colors cursor-pointer inline-flex items-center"
                          title="Edit entry"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(opp.id)}
                          className="p-2 text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 rounded-lg transition-colors cursor-pointer inline-flex items-center"
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
    </div>
  );
}
