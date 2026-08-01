// components/home/CTA.tsx
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight, PlusCircle, Search } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Radial Gradient Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[250px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      <Container size="lg" className="relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-xs font-semibold text-sky-400 uppercase tracking-widest">
            Accelerate Your Impact
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Ready to unlock funding, data, and institutional partnerships?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Join thousands of NGOs, research institutions, and donors leveraging
            Tudulu to discover grants and publish high-impact opportunities
            across East Africa.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-sky-500/20 hover:scale-[1.02]"
            >
              <span>List Your Organization</span>
              <PlusCircle className="w-4 h-4" />
            </Link>

            <Link
              href="/opportunities"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all hover:scale-[1.02]"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span>Explore Opportunities</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
