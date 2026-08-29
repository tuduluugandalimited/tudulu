// D:\tudulu\apps\web\components\home\FeaturedOrganizations.tsx
"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ShieldCheck,
  Users,
  Network,
  Sparkles,
} from "lucide-react";

export function FeaturedOrganizations() {
  return (
    <section className="py-12 md:py-16 bg-[var(--td-bg-soft,#f8fafc)] border-t border-[var(--td-border-subtle)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--td-color-primary)]/10 text-[var(--td-color-primary)] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Ecosystem Network
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--td-text,#0f172a)] tracking-tight">
              Partner with Verified African Enterprises
            </h2>
            <p className="text-xs sm:text-sm text-[var(--td-text-muted)] mt-1 max-w-xl">
              Connect with vetted NGOs, tech hubs, and social ventures driving
              sustainable development and innovation across the continent.
            </p>
          </div>
          <Link
            href="/organizations"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--td-color-primary)] hover:text-[var(--td-color-primary-hover)] transition-colors group self-start sm:self-auto"
          >
            View Directory
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[var(--td-bg-surface,#ffffff)] border border-[var(--td-border-subtle)] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-[var(--td-color-primary)] flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[var(--td-text)]">
                Impact-Driven Startups
              </h3>
              <p className="text-xs text-[var(--td-text-muted)] leading-relaxed">
                Discover pioneering ventures transforming agriculture, renewable
                energy, fintech, and education throughout Sub-Saharan Africa.
              </p>
            </div>
            <Link
              href="/organizations?sector=startup"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--td-color-primary)] hover:underline pt-2"
            >
              Browse Startups <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--td-bg-surface,#ffffff)] border border-[var(--td-border-subtle)] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[var(--td-text)]">
                Verified NGOs & Non-Profits
              </h3>
              <p className="text-xs text-[var(--td-text-muted)] leading-relaxed">
                Partner with trusted developmental organizations and
                international agencies implementing measurable community
                programs.
              </p>
            </div>
            <Link
              href="/organizations?type=ngo"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--td-color-primary)] hover:underline pt-2"
            >
              Explore NGOs <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--td-bg-surface,#ffffff)] border border-[var(--td-border-subtle)] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[var(--td-text)]">
                Incubators & Tech Hubs
              </h3>
              <p className="text-xs text-[var(--td-text-muted)] leading-relaxed">
                Connect with regional innovation hubs, accelerators, and
                investor networks providing mentorship and early-stage capital.
              </p>
            </div>
            <Link
              href="/organizations?type=hub"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--td-color-primary)] hover:underline pt-2"
            >
              Find Tech Hubs <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
