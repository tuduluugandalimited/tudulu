export type NewsCategory =
  | "Health"
  | "Impact"
  | "Sports"
  | "Technology"
  | "Climate"
  | "Education";

export interface NewsPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content?: string; // Rich text / markdown string for full reader view
  category: NewsCategory;
  pillarId: "health" | "impact" | "sports" | "technology";
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  featuredImage: {
    url: string;
    alt: string;
    caption?: string;
  };
  tags: string[];
  readingTimeMinutes: number;
  publishedAt: string; // ISO Date String: YYYY-MM-DD
  isFeatured: boolean;
  isTrending?: boolean;
}

export const newsCategories: NewsCategory[] = [
  "Health",
  "Impact",
  "Sports",
  "Technology",
  "Climate",
  "Education",
];

export const newsPosts: NewsPost[] = [
  {
    id: "post-001",
    slug: "offline-first-his-deployment-southwestern-uganda",
    title:
      "Offline-First Health Information Systems Ensuring Continuity of Care in Rural Uganda",
    summary:
      "How edge AI and low-latency local database caching are keeping medical records accessible and clinical decision support active during prolonged power blackouts.",
    category: "Health",
    pillarId: "health",
    author: {
      name: "Tudulu Health Desk",
      role: "Digital Health Research Team",
    },
    featuredImage: {
      url: "/images/news/rural-health-tech.jpg",
      alt: "Doctor using tablet in rural healthcare facility",
      caption:
        "Local server caching allows uninterrupted patient triage even off-grid.",
    },
    tags: ["Digital Health", "HIS", "Edge AI", "Offline-First", "Uganda"],
    readingTimeMinutes: 4,
    publishedAt: "2026-07-22",
    isFeatured: true,
    isTrending: true,
  },
  {
    id: "post-002",
    slug: "hybrid-solar-transitions-critical-care-wards",
    title:
      "Hybrid Solar Systems Safeguard Critical Care Equipment Across Regional Hospitals",
    summary:
      "Targeted solar transitions reduce Yaka tariff overheads while ensuring life-support apparatus and cold chain storage remain online 24/7.",
    category: "Climate",
    pillarId: "health",
    author: {
      name: "Eng. Motoy Asaph",
      role: "Lead Systems Engineer",
    },
    featuredImage: {
      url: "/images/news/solar-hospital.jpg",
      alt: "Rooftop solar panel installation on regional health facility",
      caption: "Clean energy integration directly protects clinical workflows.",
    },
    tags: [
      "Renewable Energy",
      "Solar Energy",
      "Biomedical",
      "Healthcare Resilience",
    ],
    readingTimeMinutes: 5,
    publishedAt: "2026-07-18",
    isFeatured: false,
    isTrending: true,
  },
  {
    id: "post-003",
    slug: "grassroots-talent-discovery-digital-analytics",
    title:
      "Bridging the Scouting Gap: How Data Platforms Are Unlocking African Youth Sports Talent",
    summary:
      "Grassroots tournament tracking and digital player profiles are helping rural athletes gain visibility with international academies and developmental foundations.",
    category: "Sports",
    pillarId: "sports",
    author: {
      name: "Tudulu Sports Intelligence",
      role: "Youth Development Desk",
    },
    featuredImage: {
      url: "/images/news/grassroots-football.jpg",
      alt: "Youth football tournament in progress",
      caption:
        "Digital tournament logs empower talent discovery beyond urban centers.",
    },
    tags: ["Youth Sports", "Talent Scouting", "Sports Analytics", "PlayOn"],
    readingTimeMinutes: 3,
    publishedAt: "2026-07-15",
    isFeatured: true,
    isTrending: false,
  },
  {
    id: "post-004",
    slug: "east-africa-grant-intelligence-digest-q3-2026",
    title:
      "East Africa Impact Funding Digest: $15M Allocated for Sustainable Health & AI Tech",
    summary:
      "A curated breakdown of active grants, innovation funds, and humanitarian calls for proposals open to NGOs and social enterprises in Uganda and Kenya.",
    category: "Impact",
    pillarId: "impact",
    author: {
      name: "Tudulu Editorial Desk",
      role: "Development Intelligence",
    },
    featuredImage: {
      url: "/images/news/grant-funding.jpg",
      alt: "Community development team reviewing funding proposal",
      caption: "Unlocking access to development capital for local innovators.",
    },
    tags: ["Grants", "NGO Funding", "Social Impact", "East Africa"],
    readingTimeMinutes: 6,
    publishedAt: "2026-07-10",
    isFeatured: false,
    isTrending: true,
  },
  {
    id: "post-005",
    slug: "nextjs-app-router-architecture-for-ngo-platforms",
    title:
      "Building High-Performance, Low-Bandwidth Web Platforms for African NGOs",
    summary:
      "Best practices for architecting Next.js applications that load rapidly on mobile networks across East Africa without sacrificing accessibility.",
    category: "Technology",
    pillarId: "technology",
    author: {
      name: "Tudulu Tech Lab",
      role: "Software Engineering Division",
    },
    featuredImage: {
      url: "/images/news/software-code.jpg",
      alt: "Software development workspace on laptop",
      caption:
        "Optimized web architecture drives digital transformation across sectors.",
    },
    tags: ["Next.js", "Web Development", "Performance", "Software Engineering"],
    readingTimeMinutes: 5,
    publishedAt: "2026-07-05",
    isFeatured: false,
    isTrending: false,
  },
];

// Helper Query Functions
export const getFeaturedNews = () =>
  newsPosts.filter((post) => post.isFeatured);
export const getTrendingNews = () =>
  newsPosts.filter((post) => post.isTrending);
export const getNewsBySlug = (slug: string) =>
  newsPosts.find((post) => post.slug === slug);
export const getNewsByCategory = (category: NewsCategory) =>
  newsPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase(),
  );
export const getNewsByPillar = (
  pillarId: "health" | "impact" | "sports" | "technology",
) => newsPosts.filter((post) => post.pillarId === pillarId);
