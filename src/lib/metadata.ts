import type { Metadata, Viewport } from "next"
import { htmlLang, ogLocale, type Alternates, type Lang } from "@/content/i18n"
import { site } from "@/lib/site"

/** Réglages communs aux deux root layouts. */
export const baseMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

export const viewport: Viewport = {
  // Une valeur par thème : la barre d'adresse mobile suit le fond de la page.
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#14120F" },
    { media: "(prefers-color-scheme: light)", color: "#F7F4ED" },
  ],
}

/**
 * Metadata d'une page bilingue : canonical, hreflang, Open Graph et Twitter.
 * Next remplace l'objet `openGraph` du layout au lieu de le fusionner, d'où
 * la déclaration complète ici. L'image OG vient du fichier `opengraph-image`
 * du segment.
 */
export function pageMetadata({
  lang,
  title,
  description,
  alternates,
  type = "website",
}: {
  lang: Lang
  title: string
  description: string
  alternates: Alternates
  type?: "website" | "article"
}): Metadata {
  const path = alternates[lang]
  const fullTitle = `${title} | ${site.name}`
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        [htmlLang.fr]: alternates.fr,
        [htmlLang.en]: alternates.en,
        "x-default": alternates.fr,
      },
    },
    openGraph: {
      type,
      locale: ogLocale[lang],
      alternateLocale: ogLocale[lang === "fr" ? "en" : "fr"],
      url: path,
      siteName: site.name,
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  }
}
