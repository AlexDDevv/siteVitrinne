import { HomePage } from "@/components/home-page"
import { paths } from "@/content/i18n"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata = pageMetadata({
  lang: "fr",
  title: `${site.name}, développeur full-stack React / TypeScript / NestJS`,
  absoluteTitle: true,
  description:
    "Portfolio et CV d'Alexis Delporte, développeur full-stack React, TypeScript et NestJS basé près de Lyon : projets, études de cas, expériences, formations et articles techniques.",
  keywords: [
    "développeur full-stack",
    "développeur React TypeScript",
    "développeur NestJS",
    "portfolio développeur",
    "CV développeur full-stack",
    "développeur full-stack Lyon",
  ],
  alternates: paths.home,
})

export default function Home() {
  return <HomePage lang="fr" />
}
