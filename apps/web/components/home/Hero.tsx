// D:\tudulu\apps\web\components\home\Hero.tsx

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Globe2, Search, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--td-bg)] text-[var(--td-text)] py-28 sm:py-36 border-b border-[var(--td-border-subtle)]">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 td-glow-hero pointer-events-none" />
      <div className="absolute left-1/2 top-20 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[var(--td-color-primary)]/10 blur-[150px] pointer-events-none" />

      <Container
        size="lg"
        className="relative z-10 flex min-h-[600px] flex-col items-center justify-center text-center"
      >
        {/* Heading */}
        <h1 className="max-w-5xl text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-[var(--td-text)]">
          Discover the organizations,{" "}
          <span className="block td-gradient-text mt-1">
            funding opportunities,
          </span>{" "}
          news and impact shaping Africa.
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-3xl text-lg sm:text-xl leading-relaxed text-[var(--td-text-light)] font-normal">
          Tudulu brings together verified NGOs, grants, tenders, jobs,
          humanitarian updates, research, donors and development intelligence
          into one searchable platform built for Africa.
        </p>

        {/* Highlights */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-medium">
          {[
            "Verified NGOs",
            "Funding Opportunities",
            "Development News",
            "Jobs",
            "Research",
            "Donors",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border border-[var(--td-border-subtle)] bg-[var(--td-bg-soft)] px-4 py-2 text-[var(--td-text-light)]"
            >
              {item}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-14 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <Link href="/organizations" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto inline-flex h-14 items-center justify-center gap-2 rounded-[var(--td-radius-lg)] bg-[var(--td-color-primary)] px-8 text-sm font-bold text-[var(--td-text-inverse)] shadow-lg hover:opacity-90 transition-all cursor-pointer">
              <Globe2 className="h-5 w-5 shrink-0" />
              <span>Browse Organizations</span>
            </button>
          </Link>

          <Link href="/search" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto inline-flex h-14 items-center justify-center gap-2 rounded-[var(--td-radius-lg)] border border-[var(--td-border)] bg-[var(--td-bg-surface-elevated)] px-8 text-sm font-semibold text-[var(--td-text)] hover:bg-[var(--td-border-subtle)] transition-all cursor-pointer">
              <Search className="h-5 w-5 shrink-0 text-[var(--td-color-primary)]" />
              <span>Search Everything</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>
          </Link>
        </div>

        {/* Statistics Grid */}
        <div className="mt-20 grid w-full max-w-5xl grid-cols-2 gap-6 border-t border-[var(--td-border-subtle)] pt-12 md:grid-cols-4">
          <div className="p-4 bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-[var(--td-radius-lg)] text-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--td-color-primary)]">
              5,000+
            </h3>
            <p className="mt-1 text-xs font-semibold text-[var(--td-text-muted)] uppercase tracking-wider">
              Organizations
            </p>
          </div>

          <div className="p-4 bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-[var(--td-radius-lg)] text-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--td-color-primary)]">
              1,200+
            </h3>
            <p className="mt-1 text-xs font-semibold text-[var(--td-text-muted)] uppercase tracking-wider">
              Funding Opportunities
            </p>
          </div>

          <div className="p-4 bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-[var(--td-radius-lg)] text-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--td-color-primary)]">
              54
            </h3>
            <p className="mt-1 text-xs font-semibold text-[var(--td-text-muted)] uppercase tracking-wider">
              African Countries
            </p>
          </div>

          <div className="p-4 bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-[var(--td-radius-lg)] text-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--td-color-primary)]">
              24/7
            </h3>
            <p className="mt-1 text-xs font-semibold text-[var(--td-text-muted)] uppercase tracking-wider">
              Intelligence Updates
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
