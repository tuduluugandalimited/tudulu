// components/home/Hero.tsx
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-slate-900 text-white pt-24 pb-20 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-sky-500/15 blur-[120px] rounded-full pointer-events-none" />

      <Container size="lg" className="relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-sky-400 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Impact Intelligence Network</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
          Discover verified funding, news & development opportunities across
          Africa.
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Connecting non-profits, healthcare providers, startups, and donors
          with actionable ecosystem data.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA Button */}
          <Link
            href="/opportunities"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition-all shadow-md hover:scale-[1.02]"
          >
            <span>Explore Opportunities</span>
            <ArrowRight className="w-4 h-4 text-slate-900" />
          </Link>

          {/* Secondary CTA Button */}
          <Link
            href="/news"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 transition-all hover:scale-[1.02]"
          >
            <span>Read Latest News</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
