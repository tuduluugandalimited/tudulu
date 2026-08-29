// D:\tudulu\apps\web\app\layout.tsx

import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Central config fallback with multiple GA IDs supported
const SITE_CONFIG = {
  name: "Tudulu",
  fullName: "Tudulu Uganda Limited",
  website: process.env.NEXT_PUBLIC_APP_URL || "https://tudulu.org",
  twitterHandle: "@TuduluL",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-MCL2JTZC",
  gaIds: [process.env.NEXT_PUBLIC_GA_ID || "G-6CH31J565R", "G-NSQL7NBP5E"],
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
  const primaryGaId = SITE_CONFIG.gaIds[0];
  const secondaryGaId = SITE_CONFIG.gaIds[1];

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Analytics 4 (gtag.js) for both accounts */}
        {primaryGaId && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${primaryGaId}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${primaryGaId}');
                  ${secondaryGaId ? `gtag('config', '${secondaryGaId}');` : ""}
                `,
              }}
            />
          </>
        )}

        {/* Google Tag Manager Head Script */}
        {SITE_CONFIG.gtmId && (
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${SITE_CONFIG.gtmId}');
            `,
            }}
          />
        )}

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
        {/* Google Tag Manager (noscript fallback) */}
        {SITE_CONFIG.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${SITE_CONFIG.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
