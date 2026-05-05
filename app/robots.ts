import type { MetadataRoute } from "next";

const BASE_URL = "https://syncity-web-omega.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/dashboard/partenaire", "/admin"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
