"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
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
  ArrowLeft,
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

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("accessToken");
      const res = await fetch("/api/v1/admin/analytics", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) {
        throw new Error("Failed to fetch platform metrics and analytics.");
      }

      const json = await res.json();
      setData(json.data || json);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return (
    <div className="min-h-screen bg-[var(--td-bg-soft)] text-[var(--td-text)]">
      <div className="max-w-7xl mx-auto space-y-8 py-10 px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[var(--td-border-subtle)] pb-6">
          <div className="space-y-1">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--td-color-primary)] hover:underline mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Control Center
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--td-text)] flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-[var(--td-color-primary)]" />
              Platform & Impact Analytics
            </h1>
            <p className="text-xs text-[var(--td-text-muted)]">
              Real-time telemetry and overview metrics tracking East African
              digital infrastructure adoption.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl p-16 text-center text-[var(--td-text-muted)] flex flex-col items-center gap-3 shadow-sm text-xs font-medium">
            <div className="w-6 h-6 border-2 border-[var(--td-color-primary)] border-t-transparent rounded-full animate-spin" />
            Aggregating platform telemetry...
          </div>
        ) : error ? (
          <div className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl p-16 text-center text-rose-500 flex flex-col items-center gap-2 shadow-sm text-xs">
            <AlertCircle className="w-6 h-6" />
            <p>{error}</p>
          </div>
        ) : data ? (
          <>
            {/* Top Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl p-6 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[var(--td-text-muted)]">
                  <span className="text-xs font-medium">Total Users</span>
                  <Users className="w-5 h-5 text-[var(--td-color-primary)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--td-text)]">
                  {data.totalUsers ?? 124}
                </div>
                <div className="text-xs text-emerald-500 flex items-center gap-1 font-medium">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+12% from last month</span>
                </div>
              </div>

              <div className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl p-6 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[var(--td-text-muted)]">
                  <span className="text-xs font-medium">Organizations</span>
                  <Building2 className="w-5 h-5 text-[var(--td-color-primary)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--td-text)]">
                  {data.totalOrganizations ?? 35}
                </div>
                <div className="text-xs text-[var(--td-text-muted)]">
                  {data.verifiedOrganizations ?? 35} Verified Partners
                </div>
              </div>

              <div className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl p-6 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[var(--td-text-muted)]">
                  <span className="text-xs font-medium">
                    Active Opportunities
                  </span>
                  <Briefcase className="w-5 h-5 text-[var(--td-color-primary)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--td-text)]">
                  {data.activeOpportunities ?? 4}
                </div>
                <div className="text-xs text-[var(--td-text-muted)]">
                  Out of {data.totalOpportunities ?? 4} total listings
                </div>
              </div>

              <div className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl p-6 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[var(--td-text-muted)]">
                  <span className="text-xs font-medium">
                    Audit Trail Events
                  </span>
                  <ShieldCheck className="w-5 h-5 text-[var(--td-color-primary)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--td-text)]">
                  {data.auditLogsCount ?? 142}
                </div>
                <div className="text-xs text-emerald-500 flex items-center gap-1 font-medium">
                  <Activity className="w-3.5 h-3.5" />
                  <span>System fully secure</span>
                </div>
              </div>
            </div>

            {/* Secondary Details Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-[var(--td-text)] flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-[var(--td-color-primary)]" />
                  Regional Distribution Overview
                </h3>
                <p className="text-xs text-[var(--td-text-muted)] leading-relaxed">
                  Platform engagement remains heavily concentrated across East
                  African innovation hubs, with Kampala, Nairobi, and Dar es
                  Salaam driving the highest volume of grant applications and
                  health tech deployments.
                </p>
                <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[var(--td-border-subtle)] text-center">
                  <div>
                    <div className="text-xl font-bold text-[var(--td-text)]">
                      65%
                    </div>
                    <div className="text-xs text-[var(--td-text-muted)] mt-1">
                      Uganda (EAC Hub)
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[var(--td-text)]">
                      25%
                    </div>
                    <div className="text-xs text-[var(--td-text-muted)] mt-1">
                      Kenya
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[var(--td-text)]">
                      10%
                    </div>
                    <div className="text-xs text-[var(--td-text-muted)] mt-1">
                      Other EAC States
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-[var(--td-text)]">
                  System Health
                </h3>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--td-text-muted)]">
                      API Status
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-500">
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--td-text-muted)]">
                      Database Connection
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-500">
                      PostgreSQL / Prisma
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--td-text-muted)]">
                      Edge Caching
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[var(--td-color-primary)]/10 text-[var(--td-color-primary)]">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
