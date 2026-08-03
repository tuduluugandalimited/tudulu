// D:\tudulu\apps\web\components\home\Newsletter.tsx

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
    setSubmitted(true);
  };

  return (
    <section className="py-20 sm:py-28 bg-[var(--td-bg)] text-[var(--td-text)] relative overflow-hidden border-t border-[var(--td-border-subtle)]">
      {/* Background Linear Light Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--td-color-primary)] via-blue-600 to-indigo-600 blur-[120px] rounded-full" />
      </div>

      <Container size="md" className="relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--td-text)] leading-tight">
            Stay informed on funding, news, and development across Africa.
          </h2>

          <p className="text-[var(--td-text-light)] text-base sm:text-lg leading-relaxed">
            Join over 12,000 professionals, researchers, and changemakers. Get
            curated grant opportunities, NGO intelligence, and jobs delivered
            every Thursday.
          </p>

          {submitted ? (
            <div className="p-6 rounded-[var(--td-radius-lg)] bg-[var(--td-bg-soft)] border border-[var(--td-border)] text-[var(--td-color-primary)] flex items-center justify-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="font-semibold text-sm">
                Thank you for subscribing! Check your inbox soon.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-[var(--td-radius-md)] bg-[var(--td-bg-soft)] border border-[var(--td-border)] text-[var(--td-text)] placeholder-[var(--td-text-muted)] text-sm focus:outline-hidden focus:border-[var(--td-color-primary)] transition-all"
              />
              <Button
                type="submit"
                className="px-6 py-3 bg-[var(--td-color-primary)] hover:opacity-90 text-[var(--td-text-inverse)] font-semibold text-xs rounded-[var(--td-radius-md)] transition-all shrink-0"
              >
                Subscribe
              </Button>
            </form>
          )}

          <div className="flex items-center justify-center gap-2 text-xs text-[var(--td-text-muted)] pt-2">
            <ShieldCheck className="w-4 h-4 text-[var(--td-color-primary)] shrink-0" />
            <span>Zero spam. Unsubscribe at any time with one click.</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
