// components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const platformLinks = [
    { name: "News & Intelligence", href: "/news" },
    { name: "Grants & Opportunities", href: "/opportunities" },
    { name: "Jobs & Careers", href: "/jobs" },
    { name: "Organizations Directory", href: "/organizations" },
    { name: "Sports Development", href: "/sports" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact & Inquiries", href: "/contact" },
    { name: "Sign In", href: "/auth/login" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-12 pb-8 text-xs font-sans transition-colors">
      <Container size="lg" className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info & Brand Branding */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-flex items-center group py-1">
              <Image
                src="/logo.png"
                alt="Tudulu"
                width={310}
                height={58}
                className="h-9 w-auto object-contain dark:invert transition-transform duration-200 group-hover:scale-105"
              />
            </Link>

            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
              Building digital platforms that connect people, organizations, and
              opportunities across Africa through technology, AI, health
              innovation, development intelligence, and community impact.
            </p>
          </div>

          {/* Navigation - Platform */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px]">
              Platform
            </h4>

            <ul className="space-y-2">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-green-700 dark:hover:text-green-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation - Company */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px]">
              Company
            </h4>

            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-green-700 dark:hover:text-green-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons with Full Brand Colors by Default */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px]">
              Follow Us
            </h4>

            <div className="flex items-center space-x-4 pt-1">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/106153826/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tudulu on LinkedIn"
                className="text-[#0A66C2] hover:opacity-80 transition-opacity"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com/TuduluL"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tudulu on X"
                className="text-slate-900 dark:text-white hover:opacity-80 transition-opacity"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@tudulu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tudulu on TikTok"
                className="text-[#FE2C55] hover:opacity-80 transition-opacity"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.31 1.53-1.29 2.53-.02 1.08.51 2.12 1.43 2.69.97.61 2.24.62 3.22.06.91-.51 1.48-1.5 1.5-2.54.02-5.4.01-10.8.01-16.2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {currentYear} Tudulu Uganda Limited. All rights reserved.</p>

          <p>Building accessible, resilient digital ecosystems for Africa.</p>
        </div>
      </Container>
    </footer>
  );
}
