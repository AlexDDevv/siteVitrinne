import { HomePage } from "@/components/home-page"
import { paths } from "@/content/i18n"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata = pageMetadata({
  lang: "fr",
  title: `${site.name}, développeur full-stack freelance React / NestJS`,
  absoluteTitle: true,
  description:
    "Développeur full-stack freelance React, TypeScript et NestJS. MVP, refonte et performance d'applications web pour startups, équipes produit et agences. Basé près de Lyon, missions à distance.",
  keywords: [
    "développeur full-stack freelance",
    "freelance React TypeScript",
    "freelance NestJS",
    "développement MVP",
    "refonte application web",
    "performance application web",
    "sous-traitance agence web",
    "développeur freelance startup",
    "développeur full-stack Lyon",
  ],
  alternates: paths.home,
})

export default function Home() {
  return <HomePage lang="fr" />
}
