import type { Metadata } from "next"
import { RootHtml } from "@/components/root-html"
import { baseMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export { viewport } from "@/lib/metadata"

/**
 * Root layout français : accueil freelance, /parcours, études de cas FR, mentions légales.
 * Le SEO de l'accueil vit dans sa page, pour ne pas fuiter sur les autres pages.
 */
export const metadata: Metadata = {
  ...baseMetadata,
  description: `${site.name}, développeur full-stack React, TypeScript et NestJS, basé près de Lyon.`,
}

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return <RootHtml lang="fr">{children}</RootHtml>
}
