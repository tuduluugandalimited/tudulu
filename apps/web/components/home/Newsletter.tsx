"use client";

import { useState, FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Mail, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${apiUrl}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Failed to subscribe. Please try again.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[var(--td-bg)] text-[var(--td-text)] relative overflow-hidden border-t border-[var(--td-border-subtle)]">
      {/* Subtle Background Glow using Primary Token */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--td-color-primary)] to-[var(--td-color-gold)] blur-[100px] rounded-full" />
      </div>

      <Container size="md" className="relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--td-color-primary-light)] text-[var(--td-color-primary)] text-xs font-semibold">
            <Mail className="w-3.5 h-3.5" /> Weekly Opportunity Digest
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--td-text)] leading-tight">
            Stay informed on funding, news, and development across Africa.
          </h2>

          <p className="text-[var(--td-text-muted)] text-xs sm:text-sm leading-relaxed">
            Join over 12,000 professionals, researchers, and changemakers. Get
            curated grant opportunities, NGO intelligence, and jobs delivered
            every Thursday.
          </p>

          {submitted ? (
            <div className="p-4 rounded-[var(--td-radius-lg)] bg-[var(--td-color-primary-light)] border border-[var(--td-border-subtle)] text-[var(--td-color-primary)] flex items-center justify-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="font-semibold text-xs sm:text-sm">
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
                disabled={loading}
                className="flex-1 px-4 py-3 rounded-[var(--td-radius-md)] bg-[var(--td-bg-soft)] border border-[var(--td-border)] text-[var(--td-text)] placeholder:[var(--td-text-muted)] text-xs sm:text-sm focus:outline-none focus:border-[var(--td-color-primary)] transition-all disabled:opacity-50"
              />
              <Button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[var(--td-color-primary)] hover:bg-[var(--td-color-primary-hover)] text-white font-bold text-xs rounded-[var(--td-radius-md)] transition-all shrink-0 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          )}

          {errorMessage && (
            <p className="text-xs text-red-500 font-medium">{errorMessage}</p>
          )}

          <div className="flex items-center justify-center gap-2 text-xs text-[var(--td-text-muted)] pt-1">
            <ShieldCheck className="w-4 h-4 text-[var(--td-color-primary)] shrink-0" />
            <span>Zero spam. Unsubscribe at any time with one click.</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
