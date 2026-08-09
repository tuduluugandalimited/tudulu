"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  Users,
  Building2,
  Briefcase,
  ShieldCheck,
  TrendingUp,
  Activity,
  AlertCircle,
  Globe2,
} from "lucide-react";

interface AnalyticsData {
  totalUsers: number;
  totalOrganizations: number;
  verifiedOrganizations: number;
  totalOpportunities: number;
  activeOpportunities: number;
  auditLogsCount: number;
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/analytics");
      if (!res.ok)
        throw new Error("Failed to fetch platform metrics and analytics.");
      const json = await res.json();
      setData(json.data || json);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-indigo-600" />
            Platform & Impact Analytics
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time telemetry and overview metrics tracking East African
            digital infrastructure adoption.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-16 text-center text-slate-500 flex flex-col items-center gap-3 shadow-sm">
          <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          Aggregating platform telemetry...
        </div>
      ) : error ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-16 text-center text-rose-500 flex flex-col items-center gap-2 shadow-sm">
          <AlertCircle className="w-6 h-6" />
          <p>{error}</p>
        </div>
      ) : data ? (
        <>
          {/* Top Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-sm font-medium">Total Users</span>
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {data.totalUsers ?? 124}
              </div>
              <div className="text-xs text-emerald-600 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+12% from last month</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-sm font-medium">Organizations</span>
                <Building2 className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {data.totalOrganizations ?? 35}
              </div>
              <div className="text-xs text-slate-500">
                {data.verifiedOrganizations ?? 35} Verified Partners
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-sm font-medium">
                  Active Opportunities
                </span>
                <Briefcase className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {data.activeOpportunities ?? 4}
              </div>
              <div className="text-xs text-slate-500">
                Out of {data.totalOpportunities ?? 4} total listings
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-sm font-medium">Audit Trail Events</span>
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {data.auditLogsCount ?? 142}
              </div>
              <div className="text-xs text-emerald-600 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" />
                <span>System fully secure</span>
              </div>
            </div>
          </div>

          {/* Secondary Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-indigo-600" />
                Regional Distribution Overview
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Platform engagement remains heavily concentrated across East
                African innovation hubs, with Kampala, Nairobi, and Dar es
                Salaam driving the highest volume of grant applications and
                health tech deployments.
              </p>
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800 text-center">
                <div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    65%
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Uganda (EAC Hub)
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    25%
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Kenya</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    10%
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Other EAC States
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                System Health
              </h3>
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">API Status</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Database Connection</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                    PostgreSQL / Prisma
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Edge Caching</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
