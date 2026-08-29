// D:\tudulu\apps\web\components\home\FeaturedJobs.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Briefcase, Globe, Users, Sparkles } from "lucide-react";

export function FeaturedJobs() {
  return (
    <section className="py-12 md:py-16 bg-[var(--td-bg-surface,#ffffff)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--td-color-primary)]/10 text-[var(--td-color-primary)] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Impact Careers
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--td-text,#0f172a)] tracking-tight">
              Join Mission-Driven African Ventures
            </h2>
            <p className="text-xs sm:text-sm text-[var(--td-text-muted)] mt-1 max-w-xl">
              Connect with high-growth social enterprises, tech innovators, and
              NGOs shaping the future of work across the continent.
            </p>
          </div>
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--td-color-primary)] hover:text-[var(--td-color-primary-hover)] transition-colors group self-start sm:self-auto"
          >
            Browse All Jobs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[var(--td-bg-surface,#ffffff)] border border-[var(--td-border-subtle)] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-[var(--td-color-primary)] flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[var(--td-text)]">
                Tech & Engineering Roles
              </h3>
              <p className="text-xs text-[var(--td-text-muted)] leading-relaxed">
                Build scalable software, fintech infrastructure, and digital
                public goods with leading engineering teams scaling across East
                Africa.
              </p>
            </div>
            <Link
              href="/opportunities?category=technology"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--td-color-primary)] hover:underline pt-2"
            >
              Explore Tech Roles <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--td-bg-surface,#ffffff)] border border-[var(--td-border-subtle)] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[var(--td-text)]">
                Remote & Hybrid Positions
              </h3>
              <p className="text-xs text-[var(--td-text-muted)] leading-relaxed">
                Enjoy location flexibility with remote-first enterprises and
                distributed international organizations hiring top-tier African
                talent.
              </p>
            </div>
            <Link
              href="/opportunities?location=remote"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--td-color-primary)] hover:underline pt-2"
            >
              Find Remote Work <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--td-bg-surface,#ffffff)] border border-[var(--td-border-subtle)] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[var(--td-text)]">
                Leadership & Program Management
              </h3>
              <p className="text-xs text-[var(--td-text-muted)] leading-relaxed">
                Drive large-scale community initiatives, policy advocacy, and
                sustainable development programs with trusted regional networks.
              </p>
            </div>
            <Link
              href="/opportunities?type=full-time"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--td-color-primary)] hover:underline pt-2"
            >
              View Leadership Roles <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
