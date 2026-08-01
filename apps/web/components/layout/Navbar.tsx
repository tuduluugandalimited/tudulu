"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SITE_CONFIG } from "@/constants/siteConfig";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlatformMenuOpen, setIsPlatformMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsPlatformMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/news?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-slate-100 transition-all shadow-xs">
      {/* Brand Accent Border: African Green -> Opportunity Gold */}
      <div className="h-1 w-full bg-gradient-to-r from-green-700 via-emerald-600 to-amber-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo Container */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group py-1">
              <Image
                src="/logo.png"
                alt="Tudulu"
                width={320}
                height={52}
                className="h-10 sm:h-11 w-auto object-contain dark:invert transition-transform duration-200 group-hover:scale-105"
                priority
              />
            </Link>
          </div>

          {/* Global Search Bar (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex flex-1 max-w-xs xl:max-w-sm relative items-center"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search grants, NGOs, intelligence..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-100/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20 focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
            {/* Grants & Opportunities Active Indicator */}
            <Link
              href="/opportunities"
              className="hover:text-green-800 dark:hover:text-green-400 transition-colors text-green-700 dark:text-green-500 font-bold flex items-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
              </span>
              Grants & Opportunities
            </Link>

            <Link
              href="/news"
              className="hover:text-green-700 dark:hover:text-green-400 transition-colors"
            >
              News & Intelligence
            </Link>

            {/* Ecosystem Directory Dropdown */}
            <div
              className="relative py-2"
              ref={dropdownRef}
              onMouseEnter={() => setIsPlatformMenuOpen(true)}
              onMouseLeave={() => setIsPlatformMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsPlatformMenuOpen(!isPlatformMenuOpen)}
                className="inline-flex items-center gap-1 hover:text-green-700 dark:hover:text-green-400 transition-colors focus:outline-none"
                aria-expanded={isPlatformMenuOpen}
                aria-haspopup="true"
              >
                <span>Directory</span>
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isPlatformMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isPlatformMenuOpen && (
                <div className="absolute left-0 mt-0 w-60 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Ecosystem Directory
                  </div>
                  {SITE_CONFIG.navigation.platform.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsPlatformMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-green-700 dark:hover:text-green-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="hover:text-green-700 dark:hover:text-green-400 transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Primary Action Button */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-green-700 hover:bg-green-800 transition-all shadow-xs hover:shadow-md"
            >
              Partner With Us
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors td-touch-target"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200"
          id="mobile-menu"
        >
          {/* Search Input for Mobile */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search grants, NGOs, guides..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3 top-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>

          {/* Navigation Links List */}
          <nav className="flex flex-col space-y-1 font-medium text-slate-700 dark:text-slate-300">
            <Link
              href="/opportunities"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-bold text-green-800 dark:text-green-400 bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-between"
            >
              <span>Grants & Opportunities</span>
              <span className="text-[10px] uppercase font-bold bg-amber-600 text-white px-2 py-0.5 rounded-full">
                Active
              </span>
            </Link>

            <Link
              href="/news"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm hover:bg-emerald-50 dark:hover:bg-slate-900 hover:text-green-700 dark:hover:text-green-400 transition-colors"
            >
              News & Intelligence
            </Link>

            <div className="pt-2 pb-1 border-t border-slate-100 dark:border-slate-800 my-1">
              <span className="px-3 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Ecosystem Directory
              </span>
              {SITE_CONFIG.navigation.platform.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm hover:bg-emerald-50 dark:hover:bg-slate-900 hover:text-green-700 dark:hover:text-green-400 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm hover:bg-emerald-50 dark:hover:bg-slate-900 hover:text-green-700 dark:hover:text-green-400 transition-colors"
            >
              About
            </Link>

            <div className="pt-3">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-green-700 hover:bg-green-800 shadow-sm"
              >
                Partner With Us
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
