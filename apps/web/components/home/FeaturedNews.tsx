// D:\tudulu\apps\web\components\home\FeaturedNews.tsx
"use client";

import Link from "next/link";
import {
  ArrowRight,
  Newspaper,
  TrendingUp,
  BookOpen,
  Sparkles,
} from "lucide-react";

export function FeaturedNews() {
  return (
    <section className="py-12 md:py-16 bg-[var(--td-bg-soft,#f8fafc)] border-t border-[var(--td-border-subtle)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--td-color-primary)]/10 text-[var(--td-color-primary)] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Market Intelligence
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--td-text,#0f172a)] tracking-tight">
              Ecosystem Insights & News
            </h2>
            <p className="text-xs sm:text-sm text-[var(--td-text-muted)] mt-1 max-w-xl">
              Stay ahead of the curve with expert analysis, venture funding
              trends, and regulatory updates across African impact sectors.
            </p>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--td-color-primary)] hover:text-[var(--td-color-primary-hover)] transition-colors group self-start sm:self-auto"
          >
            Read All Articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[var(--td-bg-surface,#ffffff)] border border-[var(--td-border-subtle)] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[var(--td-text)]">
                Venture & Funding Trends
              </h3>
              <p className="text-xs text-[var(--td-text-muted)] leading-relaxed">
                Analyze capital flows, emerging VC syndicates, and macroeconomic
                factors shaping startup investments throughout Sub-Saharan
                Africa.
              </p>
            </div>
            <Link
              href="/news?category=funding"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--td-color-primary)] hover:underline pt-2"
            >
              Explore Funding Reports <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--td-bg-surface,#ffffff)] border border-[var(--td-border-subtle)] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-[var(--td-color-primary)] flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[var(--td-text)]">
                Policy & Regulatory Updates
              </h3>
              <p className="text-xs text-[var(--td-text-muted)] leading-relaxed">
                Navigate changing compliance standards, tech acts, and
                cross-border trade policies affecting digital businesses and
                NGOs.
              </p>
            </div>
            <Link
              href="/news?category=policy"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--td-color-primary)] hover:underline pt-2"
            >
              Read Policy Insights <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--td-bg-surface,#ffffff)] border border-[var(--td-border-subtle)] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <Newspaper className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[var(--td-text)]">
                Founder Stories & Case Studies
              </h3>
              <p className="text-xs text-[var(--td-text-muted)] leading-relaxed">
                Learn playbook strategies from successful African entrepreneurs
                who built resilient, high-impact ventures from the ground up.
              </p>
            </div>
            <Link
              href="/news?category=stories"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--td-color-primary)] hover:underline pt-2"
            >
              Discover Founder Stories <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
