"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Discover", href: "/opportunities" },
    { name: "Resources", href: "/news" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Left */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo.png"
                alt="Tudulu"
                width={200}
                height={50}
                className="h-9 sm:h-10 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10 text-sm font-medium text-slate-800">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-[#0d3b2e] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Sign In CTA Button Right */}
          <div className="hidden md:flex items-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-[#0d3b2e] hover:bg-[#092920] transition-colors shadow-sm"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
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

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden border-t border-slate-100 bg-white px-4 pt-4 pb-6 space-y-3 shadow-lg"
          id="mobile-menu"
        >
          <nav className="flex flex-col space-y-2 text-base font-medium text-slate-800">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#0d3b2e] hover:bg-[#092920] transition-colors"
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
