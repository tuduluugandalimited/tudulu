// D:\tudulu\apps\web\components\home\FeaturedOpportunities.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Target } from "lucide-react";

export function FeaturedOpportunities() {
  return (
    <section className="py-12 md:py-16 bg-[var(--td-bg-section-green,#f0fdf4)] border-y border-[var(--td-border-subtle)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--td-color-primary)]/10 text-[var(--td-color-primary)] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> High Impact Grants & Capital
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--td-text,#0f172a)] tracking-tight">
              Unlock Direct Funding for Your Venture
            </h2>
            <p className="text-xs sm:text-sm text-[var(--td-text-muted)] mt-1 max-w-xl">
              Accelerate your growth with vetted grants, non-dilutive capital,
              and strategic fellowships designed for visionary African
              innovators.
            </p>
          </div>
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--td-color-primary)] hover:text-[var(--td-color-primary-hover)] transition-colors group self-start sm:self-auto"
          >
            Explore All Grants
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[var(--td-bg-surface,#ffffff)] border border-[var(--td-border-subtle)] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-[var(--td-color-primary)] flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[var(--td-text)]">
                Non-Dilutive Seed Grants
              </h3>
              <p className="text-xs text-[var(--td-text-muted)] leading-relaxed">
                Secure equity-free funding to scale your prototype, expand
                operations, or launch critical community impact initiatives
                across the continent.
              </p>
            </div>
            <Link
              href="/opportunities?type=grant"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--td-color-primary)] hover:underline pt-2"
            >
              Browse Active Grants <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--td-bg-surface,#ffffff)] border border-[var(--td-border-subtle)] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[var(--td-text)]">
                Ecosystem Fellowships
              </h3>
              <p className="text-xs text-[var(--td-text-muted)] leading-relaxed">
                Gain access to world-class mentorship, cross-border networks,
                and specialized technical assistance tailored for high-growth
                African founders.
              </p>
            </div>
            <Link
              href="/opportunities?type=fellowship"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--td-color-primary)] hover:underline pt-2"
            >
              Discover Fellowships <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--td-bg-surface,#ffffff)] border border-[var(--td-border-subtle)] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[var(--td-text)]">
                Verified Opportunities
              </h3>
              <p className="text-xs text-[var(--td-text-muted)] leading-relaxed">
                Every listing on Tudulu is manually reviewed to ensure absolute
                authenticity, protecting your team from fraudulent calls and
                dead ends.
              </p>
            </div>
            <Link
              href="/organizations/registration"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--td-color-primary)] hover:underline pt-2"
            >
              Register Your Organization <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
