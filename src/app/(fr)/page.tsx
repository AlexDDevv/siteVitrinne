import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { Approche } from "@/components/sections/approche"
import { Contact } from "@/components/sections/contact"
import { Hero } from "@/components/sections/hero"
import { Offre } from "@/components/sections/offre"
import { Process } from "@/components/sections/process"
import { Projets } from "@/components/sections/projets"
import { Tarifs } from "@/components/sections/tarifs"
import { StructuredData } from "@/components/structured-data"
import { site } from "@/lib/site"

const title = `${site.name}, développeur full-stack freelance React / NestJS`
const description =
  "Développeur full-stack freelance React, TypeScript et NestJS. MVP, refonte et performance d'applications web pour startups, équipes produit et agences. Basé près de Lyon, missions à distance."

export const metadata: Metadata = {
  title: { absolute: title },
  description,
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: site.name,
    title,
    description:
      "MVP, refonte et performance d'applications web pour startups, équipes produit et agences. React, TypeScript, NestJS.",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "MVP, refonte et performance d'applications web pour startups, équipes produit et agences. React, TypeScript, NestJS.",
  },
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <PageShell>
        <Hero />
        <Offre />
        <Approche />
        <Projets />
        <Tarifs />
        <Process />
        <Contact />
      </PageShell>
    </>
  )
}
