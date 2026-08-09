// D:\tudulu\apps\web\components\layout\Navbar.tsx

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

  // Filter out News and Opportunities (Grants) from the platform navigation items if present
  const filteredDirectoryItems = SITE_CONFIG.navigation.platform.filter(
    (item) => {
      const lowerName = item.name.toLowerCase();
      const lowerHref = item.href.toLowerCase();
      return (
        !lowerName.includes("news") &&
        !lowerName.includes("grant") &&
        !lowerName.includes("opportunities") &&
        !lowerHref.includes("news") &&
        !lowerHref.includes("opportunities")
      );
    },
  );

  return (
    <header className="sticky top-0 z-50 bg-[var(--td-bg-surface-elevated)] backdrop-blur-md border-b border-[var(--td-border-subtle)] text-[var(--td-text)] transition-all shadow-xs">
      {/* Brand Accent Border: African Green -> Opportunity Gold */}
      <div className="h-1 w-full bg-gradient-to-r from-[var(--td-color-primary)] via-emerald-600 to-[var(--td-color-secondary)]" />

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
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-full focus:outline-none focus:border-[var(--td-color-primary)] focus:ring-2 focus:ring-[var(--td-color-primary)]/20 focus:bg-[var(--td-bg-surface-elevated)] transition-all text-[var(--td-text)] placeholder:text-[var(--td-text-muted)]"
            />
            <svg
              className="w-4 h-4 text-[var(--td-text-muted)] absolute left-3 pointer-events-none"
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
          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-[var(--td-text-light)]">
            {/* Grants & Opportunities Active Indicator */}
            <Link
              href="/opportunities"
              className="hover:text-[var(--td-color-primary)] transition-colors text-[var(--td-color-primary)] font-bold flex items-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--td-color-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--td-color-primary)]"></span>
              </span>
              Grants & Opportunities
            </Link>

            <Link
              href="/news"
              className="hover:text-[var(--td-color-primary)] transition-colors"
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
                className="inline-flex items-center gap-1 hover:text-[var(--td-color-primary)] transition-colors focus:outline-none"
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
                <div className="absolute left-0 mt-0 w-60 rounded-2xl bg-[var(--td-bg-surface-elevated)] shadow-xl border border-[var(--td-border-subtle)] py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-1.5 text-[10px] font-bold text-[var(--td-text-muted)] uppercase tracking-widest">
                    Ecosystem Directory
                  </div>
                  {filteredDirectoryItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsPlatformMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-[var(--td-text)] hover:bg-[var(--td-bg-soft)] hover:text-[var(--td-color-primary)] transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="hover:text-[var(--td-color-primary)] transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Primary Action Buttons & Sign In */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/auth/login"
              className="text-xs font-semibold text-[var(--td-text-muted)] hover:text-[var(--td-color-primary)] transition-colors px-2.5 py-1.5"
            >
              Sign In
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold text-[var(--td-text-inverse)] bg-[var(--td-color-primary)] hover:opacity-90 transition-all shadow-xs hover:shadow-md"
            >
              Partner With Us
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="p-2.5 rounded-xl text-[var(--td-text-light)] hover:text-[var(--td-text)] hover:bg-[var(--td-bg-soft)] transition-colors td-touch-target"
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
          className="md:hidden border-t border-[var(--td-border-subtle)] bg-[var(--td-bg-surface-elevated)] backdrop-blur-xl px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200"
          id="mobile-menu"
        >
          {/* Search Input for Mobile */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search grants, NGOs, guides..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-xl text-[var(--td-text)] focus:outline-none focus:border-[var(--td-color-primary)] focus:ring-2 focus:ring-[var(--td-color-primary)]/20"
            />
            <svg
              className="w-4 h-4 text-[var(--td-text-muted)] absolute left-3 top-3"
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
          <nav className="flex flex-col space-y-1 font-medium text-[var(--td-text)]">
            <Link
              href="/opportunities"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm text-[var(--td-color-primary)] font-bold hover:bg-[var(--td-bg-soft)] transition-colors flex items-center gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--td-color-primary)]" />
              Grants & Opportunities
            </Link>

            <Link
              href="/news"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm hover:bg-[var(--td-bg-soft)] hover:text-[var(--td-color-primary)] transition-colors"
            >
              News & Intelligence
            </Link>

            <div className="pt-2 pb-1 border-t border-[var(--td-border-subtle)] my-1">
              <span className="px-3 text-[10px] font-bold uppercase text-[var(--td-text-muted)] tracking-wider">
                Ecosystem Directory
              </span>
              {filteredDirectoryItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm hover:bg-[var(--td-bg-soft)] hover:text-[var(--td-color-primary)] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm hover:bg-[var(--td-bg-soft)] hover:text-[var(--td-color-primary)] transition-colors"
            >
              About
            </Link>

            <div className="pt-3 space-y-2">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-xl text-xs font-bold text-[var(--td-text-inverse)] bg-[var(--td-color-primary)] hover:opacity-90 shadow-sm"
              >
                Partner With Us
              </Link>
              <Link
                href="/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2 rounded-xl text-xs font-semibold text-[var(--td-text-muted)] hover:text-[var(--td-color-primary)] hover:bg-[var(--td-bg-soft)] transition-colors"
              >
                Sign In
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
