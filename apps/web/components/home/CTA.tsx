// D:\tudulu\apps\web\components\home\CTA.tsx
"use client";

import Link from "next/link";
import { ArrowRight, PlusCircle, Building2 } from "lucide-react";

export function CTA() {
  return (
    <section className="py-12 md:py-16 bg-[var(--td-bg-section-green,#f0fdf4)] border-t border-[var(--td-border-subtle)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--td-text,#0f172a)] tracking-tight">
            Ready to Amplify Your Impact?
          </h2>
          <p className="text-xs sm:text-sm text-[var(--td-text-muted)] leading-relaxed">
            Whether you are searching for funding, listing a job opening, or
            registering your organization on Tudulu, get started in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/opportunities"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--td-color-primary)] hover:bg-[var(--td-color-primary-hover)] text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2"
            >
              Explore Opportunities <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/organizations/registration"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--td-bg-surface,#ffffff)] border border-[var(--td-border-subtle)] hover:border-[var(--td-color-primary)] text-[var(--td-text)] text-xs font-bold transition shadow-sm flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4 text-[var(--td-color-primary)]" />
              Register Your Organization
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
