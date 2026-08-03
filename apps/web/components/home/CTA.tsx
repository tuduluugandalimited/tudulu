// components/home/CTA.tsx

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Building2, Search, Globe } from "lucide-react";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-600/15 blur-[150px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full bg-amber-500/10 blur-[120px]" />
      </div>

      <Container size="lg" className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-900/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
            <Globe className="h-4 w-4 shrink-0" />
            <span>Africa's Impact Intelligence Platform</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Build partnerships that create
            <span className="block bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-400 bg-clip-text text-transparent">
              measurable impact across Africa
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
            Join a growing ecosystem of NGOs, foundations, donors, governments,
            universities, healthcare institutions, researchers, innovators, and
            social enterprises discovering funding, partnerships, verified
            organizations, jobs, events, and development intelligence from one
            trusted platform.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Primary */}
            <Link
              href="/organizations/claim"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 text-sm font-bold text-white shadow-lg shadow-emerald-900/30 transition-all duration-200 hover:scale-[1.03] hover:bg-emerald-500"
            >
              <Building2 className="h-4 w-4 shrink-0" />
              <span>Claim Your Organization</span>
            </Link>

            {/* Secondary */}
            <Link
              href="/organizations"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-7 text-sm font-semibold text-white transition-all duration-200 hover:border-emerald-500 hover:bg-slate-800"
            >
              <Search className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Explore Organizations</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </div>

          {/* Statistics */}
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-slate-800 pt-10 md:grid-cols-4">
            <div>
              <h3 className="text-3xl font-bold text-emerald-400">50K+</h3>
              <p className="mt-2 text-sm text-slate-400">Organizations</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-amber-400">54</h3>
              <p className="mt-2 text-sm text-slate-400">African Countries</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-emerald-400">2M+</h3>
              <p className="mt-2 text-sm text-slate-400">Opportunities</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-amber-400">17</h3>
              <p className="mt-2 text-sm text-slate-400">UN SDGs Covered</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
