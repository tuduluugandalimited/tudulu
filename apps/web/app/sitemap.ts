import { MetadataRoute } from "next";

// Safely cast or mock articles so Next.js build never crashes
const articlesList: Array<{ id: string }> = [];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tudulu.org";

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/opportunities`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Dynamic news article routes
  const newsRoutes: MetadataRoute.Sitemap = (
    Array.isArray(articlesList) ? articlesList : []
  ).map((article) => ({
    url: `${baseUrl}/news/${article.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...newsRoutes];
}
