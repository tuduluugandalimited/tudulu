"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Briefcase,
  Building2,
  FolderTree,
  ShieldCheck,
  LogOut,
  ArrowRight,
  Activity,
  Server,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    usersCount: 0,
    jobsCount: 0,
    orgsCount: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    if (
      userRole &&
      !["ADMIN", "SUPER_ADMIN"].includes(userRole.toUpperCase())
    ) {
      router.push("/");
      return;
    }

    // Use relative paths to route through Next.js rewrite proxy
    Promise.all([
      fetch("/api/v1/users", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => (r.ok ? r.json() : [])),
      fetch("/api/v1/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => (r.ok ? r.json() : [])),
      fetch("/api/v1/organizations", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([usersData, jobsData, orgsData]) => {
        setStats({
          usersCount: Array.isArray(usersData) ? usersData.length : 1,
          jobsCount: Array.isArray(jobsData) ? jobsData.length : 0,
          orgsCount: Array.isArray(orgsData) ? orgsData.length : 0,
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    router.push("/auth/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--td-bg-soft)] flex items-center justify-center text-[var(--td-text-muted)] text-xs font-medium tracking-wide">
        Initializing Admin Control Center...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--td-bg-soft)] text-[var(--td-text)]">
      <div className="max-w-6xl mx-auto space-y-8 py-10 px-4">
        {/* Top Header & Navigation Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--td-border-subtle)] pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--td-color-primary)]/10 border border-[var(--td-color-primary)]/20 text-[var(--td-color-primary)] text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Secure Admin Control
              Center
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--td-text)]">
              Tudulu Platform Management
            </h1>
            <p className="text-[var(--td-text-muted)] text-xs sm:text-sm">
              Manage platform directories, intelligence grants, user registries,
              and system parameters.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] hover:border-[var(--td-color-primary)] text-xs font-semibold text-[var(--td-text)] transition shadow-sm"
            >
              View Live Portal
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/20 text-xs font-semibold transition shadow-sm cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] shadow-lg flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-[var(--td-text-muted)]">
                Total Users
              </p>
              <h3 className="text-2xl font-bold text-[var(--td-text)]">
                {stats.usersCount}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-[var(--td-color-primary)]/10 border border-[var(--td-color-primary)]/20 text-[var(--td-color-primary)]">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] shadow-lg flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-[var(--td-text-muted)]">
                Active Opportunities
              </p>
              <h3 className="text-2xl font-bold text-[var(--td-text)]">
                {stats.jobsCount}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] shadow-lg flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-[var(--td-text-muted)]">
                Registered Orgs
              </p>
              <h3 className="text-2xl font-bold text-[var(--td-text)]">
                {stats.orgsCount}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Admin Navigation Hub / Modules */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--td-text)]">
            Management Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* User & Role Management Card */}
            <Link
              href="/admin/users"
              className="group p-6 rounded-2xl bg-[var(--td-bg-surface-elevated)] hover:border-[var(--td-color-primary)] border border-[var(--td-border-subtle)] transition-all shadow-lg flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--td-color-primary)] group-hover:translate-x-1 transition-transform">
                  Manage <ArrowRight className="w-4 h-4" />
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[var(--td-text)]">
                  User & Role Management
                </h3>
                <p className="text-xs text-[var(--td-text-muted)]">
                  Inspect user accounts, update assigned administrative roles,
                  toggle active status, or revoke access permissions.
                </p>
              </div>
            </Link>

            {/* Opportunities Hub Card */}
            <Link
              href="/admin/jobs"
              className="group p-6 rounded-2xl bg-[var(--td-bg-surface-elevated)] hover:border-[var(--td-color-primary)] border border-[var(--td-border-subtle)] transition-all shadow-lg flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--td-color-primary)] group-hover:translate-x-1 transition-transform">
                  Manage <ArrowRight className="w-4 h-4" />
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[var(--td-text)]">
                  Opportunities & Grants Hub
                </h3>
                <p className="text-xs text-[var(--td-text-muted)]">
                  Post, edit, curate, and review funding grants, career
                  opportunities, and regional calls for proposals.
                </p>
              </div>
            </Link>

            {/* Organizations Directory Card */}
            <Link
              href="/admin/organizations"
              className="group p-6 rounded-2xl bg-[var(--td-bg-surface-elevated)] hover:border-[var(--td-color-primary)] border border-[var(--td-border-subtle)] transition-all shadow-lg flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--td-color-primary)] group-hover:translate-x-1 transition-transform">
                  Manage <ArrowRight className="w-4 h-4" />
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[var(--td-text)]">
                  Organizations Directory
                </h3>
                <p className="text-xs text-[var(--td-text-muted)]">
                  Review partner organizations, non-governmental organizations,
                  and ecosystem networks indexed on Tudulu.
                </p>
              </div>
            </Link>

            {/* Sectors & Categories Card */}
            <Link
              href="/admin/categories"
              className="group p-6 rounded-2xl bg-[var(--td-bg-surface-elevated)] hover:border-[var(--td-color-primary)] border border-[var(--td-border-subtle)] transition-all shadow-lg flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  <FolderTree className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--td-color-primary)] group-hover:translate-x-1 transition-transform">
                  Manage <ArrowRight className="w-4 h-4" />
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[var(--td-text)]">
                  Categories & Sectors
                </h3>
                <p className="text-xs text-[var(--td-text-muted)]">
                  Configure structural classifications, industry sectors, and
                  tagging parameters for platform listings.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* System Health Footer Note */}
        <div className="p-4 rounded-2xl bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] flex items-center justify-between text-xs text-[var(--td-text-muted)]">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span>
              NestJS Engine API:{" "}
              <strong className="text-[var(--td-text)]">Connected</strong>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[var(--td-text-muted)]">
            <Server className="w-3.5 h-3.5" /> Tudulu Platform v1.0.0
          </div>
        </div>
      </div>
    </div>
  );
}
