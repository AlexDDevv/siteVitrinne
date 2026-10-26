import type { MetadataRoute } from "next"
import { homeUpdatedAt } from "@/content/home"
import { htmlLang, paths, type Alternates } from "@/content/i18n"
import { profileUpdatedAt } from "@/content/profile"
import { projects } from "@/content/projects"
import { legal } from "@/lib/legal"
import { site } from "@/lib/site"

/**
 * Une entrée par langue, chacune déclarant son équivalent dans l'autre langue.
 * `updatedAt` est la date de révision du contenu : une date qui change à chaque
 * build serait ignorée par Google.
 */
function bilingual(
  alternates: Alternates,
  priority: number,
  updatedAt: string
): MetadataRoute.Sitemap {
  const languages = {
    [htmlLang.fr]: `${site.url}${alternates.fr}`,
    [htmlLang.en]: `${site.url}${alternates.en}`,
  }
  return (["fr", "en"] as const).map((lang) => ({
    url: `${site.url}${alternates[lang]}`,
    lastModified: updatedAt,
    changeFrequency: "monthly",
    priority,
    alternates: { languages },
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...bilingual(paths.home, 1, homeUpdatedAt),
    ...bilingual(paths.profile, 0.8, profileUpdatedAt),
    ...projects.flatMap((project) =>
      bilingual(
        { fr: paths.project("fr", project.slug), en: paths.project("en", project.slug) },
        0.7,
        project.updatedAt
      )
    ),
    ...bilingual(paths.legal, 0.3, legal.updatedAt).map((entry) => ({
      ...entry,
      changeFrequency: "yearly" as const,
    })),
  ]
}
