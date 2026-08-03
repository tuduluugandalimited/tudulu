// components/home/Newsletter.tsx
"use client";

import { useState, FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Mail, CheckCircle2, ShieldCheck } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Add newsletter API signup logic here
    setSubmitted(true);
  };

  return (
    <section className="py-20 sm:py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Linear Light Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 blur-[120px] rounded-full" />
      </div>

      <Container size="md" className="relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 shrink-0" />
            <span>Impact Intelligence Weekly</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Stay informed on funding, news, and development across Africa.
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Join over 12,000 professionals, researchers, and changemakers. Get
            curated grant opportunities, NGO intelligence, and jobs delivered
            every Thursday.
          </p>

          {submitted ? (
            <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-800/60 text-emerald-300 flex items-center justify-center gap-3 animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-sm font-medium">
                You’re subscribed! Check your inbox soon for updates.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-3 pt-2"
            >
              <div className="relative w-full">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email..."
                  className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full sm:w-auto h-12 px-6 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl shrink-0 transition-colors"
              >
                Subscribe
              </Button>
            </form>
          )}

          {/* Trust indicators */}
          <div className="pt-2 flex items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 shrink-0">
              <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
              <span>No spam. Unsubscribe anytime.</span>
            </span>
            <span className="shrink-0">•</span>
            <span className="shrink-0">Zero third-party sharing</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
