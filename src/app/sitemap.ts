import type { MetadataRoute } from "next";
import { getAllProjects } from "@/content/projects-data";
import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  // Use a stable date unless a real CMS is providing dynamic modification dates
  const staticDate = new Date("2026-09-22");

  // Static routes
  const routes = [
    "",
    "/work",
    "/design-system",
    "/services",
    "/about",
    "/resume",
    "/contact",
    "/privacy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: staticDate,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic project routes (excluding any password-gated ones per spec §7)
  const projects = getAllProjects()
    .filter((p) => p.published && p.confidential !== "password")
    .map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: staticDate,
      changeFrequency: "monthly" as const,
      priority: project.category === "flagship" ? 0.9 : 0.7,
    }));

  return [...routes, ...projects];
}
