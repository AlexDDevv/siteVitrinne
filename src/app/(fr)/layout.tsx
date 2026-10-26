import type { Metadata } from "next"
import { RootHtml } from "@/components/root-html"
import { baseMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export { viewport } from "@/lib/metadata"

/** Root layout français : accueil freelance, /parcours, études de cas FR, mentions légales. */
export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    default: `${site.name}, développeur web freelance à Lyon`,
    template: `%s | ${site.name}`,
  },
  description:
    "Développeur web full-stack freelance à Écully, près de Lyon. Sites vitrines, applications sur-mesure et maintenance en React, Next.js, TypeScript et NestJS.",
  keywords: [
    "développeur web freelance Lyon",
    "développeur freelance Écully",
    "développeur full-stack Lyon",
    "création site vitrine Lyon",
    "développeur React Next.js freelance",
    "application sur-mesure Lyon",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.url,
    siteName: site.name,
    title: `${site.name}, développeur web freelance à Lyon`,
    description:
      "Sites vitrines, applications sur-mesure et maintenance web. Développeur full-stack freelance basé à Écully, près de Lyon.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}, développeur web freelance à Lyon`,
    description:
      "Sites vitrines, applications sur-mesure et maintenance web. Développeur full-stack freelance près de Lyon.",
  },
}

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return <RootHtml lang="fr">{children}</RootHtml>
}
