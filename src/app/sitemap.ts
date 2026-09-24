import type { MetadataRoute } from "next";

const BASE = "https://spacedrift.in";

const paths = [
  "/",
  "/about",
  "/log",
  "/services/research-ops",
  "/services/document-ai",
  "/services/rag-mvp",
  "/services/data-annotation",
  "/services/web-development",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return paths.map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : 0.7,
  }));
}
