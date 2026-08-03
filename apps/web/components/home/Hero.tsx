// components/home/Hero.tsx
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Globe2, Search, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />

        <div className="absolute left-1/2 top-20 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-sky-500/15 blur-[150px]" />

        <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="absolute bottom-0 left-0 h-[260px] w-[260px] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <Container
        size="lg"
        className="relative z-10 flex min-h-[720px] flex-col items-center justify-center py-28 text-center"
      >
        {/* Badge */}

        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
          <ShieldCheck className="h-4 w-4" />
          Africa's Development Intelligence Platform
        </div>

        {/* Heading */}

        <h1 className="max-w-5xl text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          Discover the organizations,
          <span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            funding opportunities,
          </span>
          news and impact shaping Africa.
        </h1>

        {/* Description */}

        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
          Tudulu brings together verified NGOs, grants, tenders, jobs,
          humanitarian updates, research, donors and development intelligence
          into one searchable platform built for Africa.
        </p>

        {/* Highlights */}

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
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
              className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-200"
            >
              {item}
            </span>
          ))}
        </div>

        {/* CTA */}

        <div className="mt-14 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/organizations"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-sky-500 px-8 text-sm font-bold text-slate-950 shadow-xl shadow-sky-500/30 transition hover:bg-sky-400"
          >
            <Globe2 className="h-5 w-5" />
            Browse Organizations
          </Link>

          <Link
            href="/search"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-8 text-sm font-semibold text-white transition hover:border-sky-500 hover:bg-slate-800"
          >
            <Search className="h-5 w-5" />
            Search Everything
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Statistics */}

        <div className="mt-20 grid w-full max-w-5xl grid-cols-2 gap-8 border-t border-slate-800 pt-10 md:grid-cols-4">
          <div>
            <h3 className="text-3xl font-black text-white">5,000+</h3>
            <p className="mt-2 text-sm text-slate-400">Organizations</p>
          </div>

          <div>
            <h3 className="text-3xl font-black text-white">1,200+</h3>
            <p className="mt-2 text-sm text-slate-400">Funding Opportunities</p>
          </div>

          <div>
            <h3 className="text-3xl font-black text-white">54</h3>
            <p className="mt-2 text-sm text-slate-400">African Countries</p>
          </div>

          <div>
            <h3 className="text-3xl font-black text-white">24/7</h3>
            <p className="mt-2 text-sm text-slate-400">Intelligence Updates</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
