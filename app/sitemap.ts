import type { MetadataRoute } from "next";

const BASE_URL = "https://syncity-web-omega.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/explorer", priority: 0.9, changeFrequency: "daily" as const },
    { url: "/partenaires", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/auth", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/a-propos", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/aide", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/presse", priority: 0.5, changeFrequency: "monthly" as const },
    { url: "/cgu", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/cgv", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/confidentialite", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/mentions-legales", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return staticRoutes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
