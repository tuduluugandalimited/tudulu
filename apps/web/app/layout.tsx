// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Central config fallback if SITE_CONFIG is imported from a constant file
const SITE_CONFIG = {
  name: "Tudulu",
  fullName: "Tudulu Uganda Limited",
  website: process.env.NEXT_PUBLIC_APP_URL || "https://tudulu.org",
  twitterHandle: "@TuduluL",
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  adsenseId: process.env.NEXT_PUBLIC_ADSENSE_ID,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.website),
  title: {
    default: `${SITE_CONFIG.name} | Africa's Platform for Impact Intelligence`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    "Connecting people, non-profits, healthcare providers, and funding opportunities across Africa through actionable ecosystem intelligence and technology.",
  keywords: [
    "Tudulu",
    "Impact Intelligence Africa",
    "Africa NGO Grants",
    "Development Intelligence",
    "Funding Opportunities Africa",
    "Digital Health Africa",
    "Grassroots Analytics",
  ],
  authors: [{ name: SITE_CONFIG.fullName, url: SITE_CONFIG.website }],
  creator: SITE_CONFIG.fullName,
  publisher: SITE_CONFIG.fullName,
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    url: SITE_CONFIG.website,
    title: `${SITE_CONFIG.name} | Africa's Platform for Impact Intelligence`,
    description:
      "Connecting people, organizations, and funding opportunities across Africa with verified impact data.",
    siteName: SITE_CONFIG.fullName,
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Platform for Impact Intelligence`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_CONFIG.twitterHandle,
    creator: SITE_CONFIG.twitterHandle,
    title: `${SITE_CONFIG.name} | Africa's Platform for Impact Intelligence`,
    description:
      "Connecting people, organizations, and funding opportunities across Africa with verified impact data.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google AdSense Script Loader */}
        {SITE_CONFIG.adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${SITE_CONFIG.adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-screen bg-[var(--td-bg)] text-[var(--td-text)] flex flex-col font-sans antialiased selection:bg-[#15803D] selection:text-white">
        {/* Navigation Bar */}
        <Navbar />

        {/* Core Main Content */}
        <main className="flex-grow">{children}</main>

        {/* Global Footer */}
        <Footer />

        {/* Google Analytics Script & Initialization */}
        {SITE_CONFIG.gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${SITE_CONFIG.gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
