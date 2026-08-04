// D:\tudulu\apps\web\app\fintech\page.tsx

import Link from "next/link";

export const metadata = {
  title: "FinTech Sector Intelligence & Grants | Tudulu",
  description:
    "Explore financial technology innovations, digital banking, inclusion grants, and payment infrastructure research across Africa.",
};

export default function FinTechSectorPage() {
  return (
    <div className="min-h-screen bg-[var(--td-bg)] text-[var(--td-text)]">
      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-[var(--td-bg-surface-elevated)] to-[var(--td-bg)] border-b border-[var(--td-border-subtle)] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--td-color-primary)]/10 text-[var(--td-color-primary)] uppercase tracking-wider">
              Sector Intelligence
            </span>
            <span className="text-[var(--td-text-muted)] text-sm">•</span>
            <span className="text-sm font-medium text-[var(--td-text-light)]">
              Financial Technology & Inclusion
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--td-text)] mb-6 max-w-3xl">
            Accelerating Digital Finance, Payment Infrastructure, & Inclusion
            Across Africa
          </h1>

          <p className="text-lg text-[var(--td-text-light)] max-w-2xl mb-8">
            Access targeted FinTech grants, regulatory tech insights, digital
            banking innovations, and market intelligence expanding access to
            economic opportunity.
          </p>

          {/* Quick Action Filters / Links */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/opportunities?sector=fintech"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-[var(--td-text-inverse)] bg-[var(--td-color-primary)] hover:opacity-90 transition-all shadow-xs"
            >
              Browse FinTech Grants
            </Link>
            <Link
              href="/news?sector=fintech"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-[var(--td-text)] bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] hover:bg-[var(--td-bg-soft)] transition-all"
            >
              Latest FinTech News
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed / Left 2 Columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview / About the Sector */}
            <div className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-bold mb-4 text-[var(--td-text)]">
                Sector Overview
              </h2>
              <p className="text-[var(--td-text-light)] text-sm leading-relaxed mb-4">
                Financial technology continues to reshape commerce, lending, and
                remittance systems across the continent. From mobile money
                interoperability to decentralized credit scoring and SME digital
                banking, Tudulu links innovators, regulators, and venture
                syndicates.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--td-border-subtle)]">
                <div>
                  <div className="text-2xl font-black text-[var(--td-color-primary)]">
                    270+
                  </div>
                  <div className="text-xs text-[var(--td-text-muted)] mt-1">
                    FinTech Funds & Calls
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[var(--td-color-secondary)]">
                    510+
                  </div>
                  <div className="text-xs text-[var(--td-text-muted)] mt-1">
                    Digital Finance Hubs
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[var(--td-text)]">
                    54
                  </div>
                  <div className="text-xs text-[var(--td-text-muted)] mt-1">
                    Countries Covered
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-Topics / Related Tags */}
            <div className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg font-bold mb-4 text-[var(--td-text)]">
                Explore FinTech Sub-Sectors
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Mobile Money & Payments",
                  "Digital Banking",
                  "RegTech & Compliance",
                  "Micro-Lending & Credit",
                  "InsuranceTech",
                  "Remittances",
                  "Blockchain & Web3",
                  "SME Financial Services",
                ].map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--td-bg-soft)] text-[var(--td-text)] border border-[var(--td-border-subtle)] hover:border-[var(--td-color-primary)] hover:text-[var(--td-color-primary)] transition-all"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / Right Column */}
          <div className="space-y-6">
            {/* Quick Navigation / Related Sectors */}
            <div className="bg-[var(--td-bg-surface-elevated)] border border-[var(--td-border-subtle)] rounded-2xl p-6 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--td-text-muted)] mb-4">
                Other Key Sectors
              </h3>
              <div className="space-y-2">
                {[
                  "Health",
                  "Agriculture",
                  "Climate Change",
                  "Education",
                  "Energy",
                ].map((sec) => (
                  <Link
                    key={sec}
                    href={`/${sec.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="block px-3 py-2 rounded-xl text-sm font-medium text-[var(--td-text)] hover:bg-[var(--td-bg-soft)] hover:text-[var(--td-color-primary)] transition-colors"
                  >
                    {sec}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-gradient-to-br from-[var(--td-color-primary)] to-[var(--td-color-secondary)] text-[var(--td-text-inverse)] rounded-2xl p-6 shadow-md">
              <h3 className="text-base font-bold mb-2">
                Are you a FinTech Startup?
              </h3>
              <p className="text-xs text-white/90 mb-4 leading-relaxed">
                Publish investment calls, list your platform, or highlight
                financial inclusion milestones across the network.
              </p>
              <Link
                href="/contact"
                className="inline-block px-4 py-2 rounded-xl text-xs font-bold bg-[var(--td-bg-surface-elevated)] text-[var(--td-color-primary)] hover:bg-[var(--td-bg-soft)] transition-all shadow-xs"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
