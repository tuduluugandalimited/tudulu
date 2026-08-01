// constants/siteConfig.ts

export const SITE_CONFIG = {
  name: "Tudulu Uganda Limited",
  legalName: "Tudulu Uganda Limited",
  shortName: "Tudulu",
  tagline: "Connecting people, organizations, and opportunities across Africa.",
  description:
    "Tudulu Uganda Limited is an African technology company building digital platforms that connect people, organizations, and opportunities through AI, software innovation, health technology, development intelligence, and community impact.",

  // Company Attributes & SEO Meta
  companyDetails: {
    founded: "2023",
    industry: "Technology, Information and Internet",
    country: "Uganda",
    headquarters: "Kampala, Uganda",
    locale: "en_UG",
  },

  // Contact Info
  contact: {
    email: "tuduluugandalimited@gmail.com",
    phones: [
      { label: "+256 777 936448", raw: "+256777936448" },
      { label: "+256 750 692621", raw: "+256750692621" },
    ],
  },

  // Social Channels
  socials: [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/106153826/",
      ariaLabel: "Follow Tudulu Uganda Limited on LinkedIn",
    },
    {
      name: "X (Twitter)",
      href: "https://x.com/TuduluL",
      ariaLabel: "Follow Tudulu on X",
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@tudulu",
      ariaLabel: "Follow Tudulu on TikTok",
    },
  ],

  // Navigation Links
  navigation: {
    platform: [
      { name: "News", href: "/news" },
      { name: "Jobs", href: "/jobs" },
      { name: "Grants & Opportunities", href: "/opportunities" },
      { name: "Organizations", href: "/organizations" },
      { name: "Sports Development", href: "/sports" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
  },
};

/**
 * Reusable Next.js Metadata Generator for Root Layout & Pages
 */
export const DEFAULT_METADATA = {
  title: {
    default: `${SITE_CONFIG.name} | African Technology & Platform Ecosystem`,
    template: `%s | ${SITE_CONFIG.shortName}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Tudulu Uganda",
    "African Technology Company",
    "AI Africa",
    "Health Technology Uganda",
    "Development Intelligence",
    "Digital Ecosystems East Africa",
    "Grants and Opportunities Africa",
  ],
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.companyDetails.locale,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    site: "@TuduluL",
    creator: "@TuduluL",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
};
