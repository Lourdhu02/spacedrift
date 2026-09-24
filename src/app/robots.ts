import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://spacedrift.in/sitemap.xml",
    host: "https://spacedrift.in",
  };
}
