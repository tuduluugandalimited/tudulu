"use client";

import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo and Brand Title Container */}
          <div className="flex items-center space-x-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner">
              <Image
                src="/tudulu-uganda-limited.png"
                alt="Tudulu Uganda Limited Logo"
                width={36}
                height={36}
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                tudulu
              </span>
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800 w-fit">
                Uganda Ltd
              </span>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-400">
            <a href="#solutions" className="hover:text-slate-200 transition">
              Solutions
            </a>
            <a href="#partnerships" className="hover:text-slate-200 transition">
              Partnerships
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
              Get in Touch
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
              Full-Stack Engineering Built for{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Real-World Impact.
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-400 leading-relaxed">
              Based in Kampala, we design and engineer resilient digital
              solutions. From native mobile app development and beautiful
              corporate web presences to offline-first medical architectures
              (HIMS) and Edge AI.
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
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions & Engineering Expertise */}
      <section id="solutions" className="py-20 lg:py-28 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Software Engineering Capabilities
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
              End-to-end development across web, mobile, and complex data
              environments.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: App Development */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between shadow-md">
              <div>
                <div className="h-10 w-10 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-400 flex items-center justify-center font-bold mb-6">
                  📱
                </div>
                <h3 className="text-xl font-bold text-slate-100">
                  Mobile App Development
                </h3>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                  Crafting highly responsive, cross-platform and native mobile
                  applications that perform fluidly across diverse smart
                  devices, completely optimized for performance.
                </p>
              </div>
            </div>

            {/* Card 2: Custom Web Engineering */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between shadow-md">
              <div>
                <div className="h-10 w-10 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center font-bold mb-6">
                  💻
                </div>
                <h3 className="text-xl font-bold text-slate-100">
                  Custom Web Engineering
                </h3>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                  Designing custom, highly dynamic user experiences and
                  lightweight web platforms optimized for fast visual rendering,
                  conversion mechanics, and clean SEO setups.
                </p>
              </div>
            </div>

            {/* Card 3: Low-Latency HIMS */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between shadow-md">
              <div>
                <div className="h-10 w-10 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center font-bold mb-6">
                  🏥
                </div>
                <h3 className="text-xl font-bold text-slate-100">
                  Low-Latency HIMS
                </h3>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                  Medical records infrastructure built with localized
                  sub-millisecond querying capabilities, ensuring healthcare
                  practitioners never wait on spinning loader animations.
                </p>
              </div>
            </div>

            {/* Card 4: Offline Continuity */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between shadow-md">
              <div>
                <div className="h-10 w-10 rounded-lg bg-purple-950 border border-purple-800 text-purple-400 flex items-center justify-center font-bold mb-6">
                  🔌
                </div>
                <h3 className="text-xl font-bold text-slate-100">
                  Offline Continuity
                </h3>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                  Robust peer-to-peer data syncing systems that fully function
                  during unexpected network outages, reconciling with client
                  data cache layers automatically once links resolve.
                </p>
              </div>
            </div>

            {/* Card 5: Edge AI Deployments */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between shadow-md">
              <div>
                <div className="h-10 w-10 rounded-lg bg-amber-950 border border-amber-800 text-amber-400 flex items-center justify-center font-bold mb-6">
                  🤖
                </div>
                <h3 className="text-xl font-bold text-slate-100">
                  Edge AI Deployments
                </h3>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                  Running lightweight machine learning modules directly on
                  consumer-grade hardware, cutting heavy cloud server computing
                  operational overhead.
                </p>
              </div>
            </div>

            {/* Card 6: Advanced Solutions */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-dashed border-slate-800 hover:border-slate-700 transition flex flex-col justify-center items-center text-center shadow-md">
              <span className="text-4xl mb-2">🚀</span>
              <h3 className="text-lg font-bold text-slate-300">
                And Many More
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
                Architecting bespoke data logic pipelines tailored to complex
                custom specs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Partnerships & Collaborations */}
      <section
        id="partnerships"
        className="py-20 lg:py-28 border-t border-slate-900 bg-slate-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Proven Collaborations
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
              Driving Digital Transformations Across Uganda
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800">
                Strategic Partnership
              </span>
              <h3 className="text-2xl font-black text-slate-100 mt-4">
                Playon Foundation Uganda
              </h3>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                We manage and scale the comprehensive digital presence of Playon
                Foundation Uganda, ensuring their administrative operational
                workflows, community outreach communication, and foundational
                web assets run continuously without downtime.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-cyan-950/40 border border-slate-800 shadow-xl">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                Web Design & Development
              </span>
              <h3 className="text-2xl font-black text-slate-100 mt-4">
                Mo-Toys Kids Corner
              </h3>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                Proud designers and development engineers behind the Mo-Toys
                Kids Corner web interface—building a colorful, fast-loading,
                highly immersive user journey designed to optimize commercial
                client engagement seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
                Whether you want to build a dynamic mobile app, expand your
                company's online footprint, or audit enterprise offline systems,
                we are ready to build it. Reach out to our Kampala office
                directly.
              </p>
              <div className="mt-8 space-y-4 text-sm text-slate-400">
                <div className="flex items-center space-x-3">
                  <span className="text-indigo-400 text-lg">📍</span>
                  <span>Kampala, Uganda</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-cyan-400 text-lg">✉️</span>
                  <a
                    href="mailto:tuduluugandalimited@gmail.com"
                    className="hover:text-slate-200 transition underline decoration-slate-700"
                  >
                    tuduluugandalimited@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-purple-400 text-lg">📞</span>
                  <div className="flex flex-col">
                    <span>0777936448</span>
                    <span>0750692621</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm shadow-xl">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Email Address / Contact
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition text-sm"
                    placeholder="name@domain.com or phone"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Project Requirements Brief
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition text-sm resize-none"
                    placeholder="Tell us about the application or digital infrastructure you want us to design and engineer..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 font-semibold text-slate-950 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-lg hover:opacity-90 transition shadow-lg shadow-indigo-500/10 text-sm"
                >
                  Send Project Brief
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
              Engineered with Next.js, TypeScript & Tailwind CSS
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
