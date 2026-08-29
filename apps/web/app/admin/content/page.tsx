"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Newspaper,
  Building2,
  Briefcase,
  Tags,
  Users,
  BarChart2,
  LogOut,
  ShieldAlert,
  ArrowLeft,
  Activity,
  CheckCircle2,
} from "lucide-react";

interface AdminStats {
  message?: string;
  totalArticles?: number;
  totalOrganizations?: number;
  totalOpportunities?: number;
  totalUsers?: number;
}

export default function AdminContentDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    fetch("/api/v1/admin/dashboard-stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized access");
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => {
        router.push("/auth/login");
      });
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    router.push("/auth/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--td-bg-soft)] flex flex-col items-center justify-center gap-3 text-xs text-[var(--td-text-muted)] font-medium">
        <div className="w-6 h-6 border-2 border-[var(--td-color-primary)] border-t-transparent rounded-full animate-spin" />
        Initializing Admin CMS...
      </div>
    );
  }

  const sections = [
    { label: "News & Articles", href: "/admin/news", icon: Newspaper },
    { label: "Organizations", href: "/admin/organizations", icon: Building2 },
    {
      label: "Opportunities & Grants",
      href: "/admin/opportunities",
      icon: Briefcase,
    },
    { label: "Tags & Taxonomies", href: "/admin/taxonomies", icon: Tags },
    { label: "Users & Roles", href: "/admin/users", icon: Users },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart2 },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--td-bg-soft)] text-[var(--td-text)]">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--td-bg-surface-elevated)] border-r border-[var(--td-border-subtle)] p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-[var(--td-color-primary)]" />
            <h1 className="text-lg font-bold text-[var(--td-text)]">
              Tudulu CMS
            </h1>
          </div>

          <nav className="space-y-1">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <Link
                  key={idx}
                  href={section.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--td-bg-soft)] text-xs font-semibold text-[var(--td-text-muted)] hover:text-[var(--td-color-primary)] transition-all"
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--td-text-muted)] hover:text-[var(--td-color-primary)] transition"
        >
          <ArrowLeft className="w-4 h-4" /> Control Center
        </Link>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 space-y-6">
        <header className="flex justify-between items-center pb-6 border-b border-[var(--td-border-subtle)]">
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--td-text)]">
              Content Management Overview
            </h2>
            <p className="text-xs text-[var(--td-text-muted)]">
              Manage platform operations, verify entries, and monitor real-time
              sync.
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-[var(--td-bg-surface-elevated)] rounded-2xl border border-[var(--td-border-subtle)] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-[var(--td-text-muted)]">
              <span className="text-xs font-semibold">System Status</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              Active & Connected
            </p>
          </div>

          <div className="p-6 bg-[var(--td-bg-surface-elevated)] rounded-2xl border border-[var(--td-border-subtle)] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-[var(--td-text-muted)]">
              <span className="text-xs font-semibold">Backend Status</span>
              <Activity className="w-4 h-4 text-[var(--td-color-primary)]" />
            </div>
            <p className="text-xs font-medium text-[var(--td-text)]">
              {stats?.message || "All core microservices operational."}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
