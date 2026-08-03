// D:\tudulu\apps\web\components\home\CTA.tsx

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Building2, Search, Globe } from "lucide-react";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--td-bg)] py-24 text-[var(--td-text)] border-t border-[var(--td-border-subtle)]">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute top-0 left-1/2 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[var(--td-color-primary)]/10 blur-[150px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full bg-[var(--td-color-secondary)]/10 blur-[120px]" />
      </div>

      <Container size="lg" className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Heading */}
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-[var(--td-text)]">
            Build partnerships that create
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg leading-relaxed text-[var(--td-text-light)]">
            Join a growing ecosystem of NGOs, foundations, donors, governments,
            universities, healthcare institutions, researchers, innovators, and
            social enterprises discovering funding, partnerships, verified
            organizations, jobs, events, and development intelligence from one
            trusted platform.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Primary */}
            <Link
              href="/organizations/claim"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--td-radius-md)] bg-[var(--td-color-primary)] px-7 text-xs font-bold text-[var(--td-text-inverse)] shadow-lg shadow-emerald-900/10 transition-all duration-200 hover:scale-[1.03] hover:opacity-90"
            >
              <Building2 className="h-4 w-4 shrink-0" />
              <span>Claim Your Organization</span>
            </Link>

            {/* Secondary */}
            <Link
              href="/organizations"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--td-radius-md)] border border-[var(--td-border)] bg-[var(--td-bg-soft)] px-7 text-xs font-semibold text-[var(--td-text)] transition-all duration-200 hover:border-[var(--td-color-primary)] hover:bg-[var(--td-bg-surface-elevated)]"
            >
              <Search className="h-4 w-4 shrink-0 text-[var(--td-color-primary)]" />
              <span>Explore Organizations</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </div>

          {/* Statistics */}
          <div className="mt-14 grid grid-cols-2 gap-8 border-t border-[var(--td-border-subtle)] pt-10 md:grid-cols-4">
            <div>
              <h3 className="text-3xl font-extrabold text-[var(--td-color-primary)]">
                50K+
              </h3>
              <p className="mt-2 text-xs font-medium text-[var(--td-text-muted)]">
                Organizations
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-extrabold text-[var(--td-color-secondary)]">
                54
              </h3>
              <p className="mt-2 text-xs font-medium text-[var(--td-text-muted)]">
                African Countries
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-extrabold text-[var(--td-color-primary)]">
                2M+
              </h3>
              <p className="mt-2 text-xs font-medium text-[var(--td-text-muted)]">
                Opportunities
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-extrabold text-[var(--td-color-secondary)]">
                17
              </h3>
              <p className="mt-2 text-xs font-medium text-[var(--td-text-muted)]">
                UN SDGs Covered
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
