"use client";

import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              tudulu
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800">
              Uganda Ltd
            </span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-400">
            <a href="#solutions" className="hover:text-slate-200 transition">
              Solutions
            </a>
            <a href="#expertise" className="hover:text-slate-200 transition">
              Expertise
            </a>
            <a href="#contact" className="hover:text-slate-200 transition">
              Contact
            </a>
          </nav>
          <div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-950 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-lg hover:opacity-90 transition shadow-lg shadow-indigo-500/10"
            >
              Request Demo
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32 border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_45%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-slate-100">
              High-Performance Systems Built for{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Real-World Infrastructure.
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-400 leading-relaxed">
              We design and engineer resilient software solutions for East
              Africa. Specializing in offline-first Health Information
              Management Systems (HIMS), low-latency data structures, and secure
              Edge AI.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="px-6 py-3 font-semibold text-slate-950 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-lg hover:opacity-90 transition"
              >
                Partner With Us
              </a>
              <a
                href="#solutions"
                className="px-6 py-3 font-semibold text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition"
              >
                Explore Solutions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section id="solutions" className="py-20 lg:py-28 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Core Architecture
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
              Engineering around network limitations, not assuming they don't
              exist.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-400 flex items-center justify-center font-bold mb-6">
                  ⚡
                </div>
                <h3 className="text-xl font-bold text-slate-100">
                  Low-Latency HIMS
                </h3>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                  Medical records infrastructure built with localized
                  sub-millisecond querying capabilities, ensuring practitioners
                  never wait on spinning loader wheels when looking at patient
                  history.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center font-bold mb-6">
                  🔌
                </div>
                <h3 className="text-xl font-bold text-slate-100">
                  Offline Continuity
                </h3>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                  Robust peer-to-peer data syncing systems that completely
                  function offline during network outages. Local data is
                  encrypted, cached using local client stores, and reconciled
                  once a connection resolves.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-purple-950 border border-purple-800 text-purple-400 flex items-center justify-center font-bold mb-6">
                  🤖
                </div>
                <h3 className="text-xl font-bold text-slate-100">
                  Edge AI Deployments
                </h3>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                  Running machine learning modules directly on consumer-grade
                  client hardware. We cut cloud compute operational overhead
                  while providing predictive analysis on-site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Consultation Request */}
      <section
        id="contact"
        className="py-20 lg:py-28 border-t border-slate-900 relative"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.05),transparent_40%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-100 sm:text-4xl">
                Let's engineer solutions together.
              </h2>
              <p className="mt-4 text-slate-400 leading-relaxed">
                Whether you want to audit your existing enterprise setup,
                execute an offline architecture strategy, or explore how our
                medical record solutions adapt to your clinic, let's talk tech.
              </p>
              <div className="mt-8 space-y-3 text-sm text-slate-400">
                <div className="flex items-center space-x-3">
                  <span className="text-indigo-400">📍</span>
                  <span>Kampala, Uganda</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-cyan-400">✉️</span>
                  <span>engineering@tudulu.co.ug</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Organization / Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition text-sm"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Project Brief
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition text-sm resize-none"
                    placeholder="Tell us about the software constraints you are trying to solve..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 font-semibold text-slate-950 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-lg hover:opacity-90 transition shadow-lg shadow-indigo-500/10 text-sm"
                >
                  Send Engineering Brief
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 space-y-4 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} Tudulu Uganda Limited. All rights
            reserved.
          </div>
          <div className="flex space-x-6">
            <span className="text-slate-600">
              Built with Next.js & Tailwind CSS
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
