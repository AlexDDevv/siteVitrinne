import type { MetadataRoute } from "next"
import { legal } from "@/lib/legal"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/mentions-legales`,
      lastModified: new Date(legal.updatedAt),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
