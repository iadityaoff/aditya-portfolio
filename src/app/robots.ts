import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/protected/", "/work/*?password="],
    },
    sitemap: "https://adityatripathi.design/sitemap.xml",
  };
}
