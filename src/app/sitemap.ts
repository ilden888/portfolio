import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { projects } from "@/data/projects";
import { insights } from "@/data/insights";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://denisil.dev";

const staticPaths = ["", "/about", "/projects", "/insights", "/labs", "/expertise", "/architectures", "/roadmap"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: (path === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "" ? 1.0 : path === "/about" || path === "/projects" || path === "/insights" ? 0.85 : 0.7,
    }))
  );

  const projectRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    projects.map((project) => ({
      url: `${SITE_URL}/${locale}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.75 : 0.6,
    }))
  );

  const insightRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    insights.map((insight) => ({
      url: `${SITE_URL}/${locale}/insights/${insight.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: insight.featured ? 0.75 : 0.6,
    }))
  );

  return [...staticRoutes, ...projectRoutes, ...insightRoutes];
}
