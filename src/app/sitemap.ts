import type { MetadataRoute } from "next"
import { htmlLang, paths, type Alternates } from "@/content/i18n"
import { projects } from "@/content/projects"
import { legal } from "@/lib/legal"
import { site } from "@/lib/site"

/** Une entrée par langue, chacune déclarant son équivalent dans l'autre langue. */
function bilingual(alternates: Alternates, priority: number): MetadataRoute.Sitemap {
  const languages = {
    [htmlLang.fr]: `${site.url}${alternates.fr}`,
    [htmlLang.en]: `${site.url}${alternates.en}`,
  }
  return (["fr", "en"] as const).map((lang) => ({
    url: `${site.url}${alternates[lang]}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
    alternates: { languages },
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...bilingual(paths.profile, 0.8),
    ...projects.flatMap((project) =>
      bilingual(
        { fr: paths.project("fr", project.slug), en: paths.project("en", project.slug) },
        0.7
      )
    ),
    {
      url: `${site.url}/mentions-legales`,
      lastModified: new Date(legal.updatedAt),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
