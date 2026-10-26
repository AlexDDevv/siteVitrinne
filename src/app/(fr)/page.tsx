import { PageShell } from "@/components/page-shell"
import { Approche } from "@/components/sections/approche"
import { Contact } from "@/components/sections/contact"
import { Hero } from "@/components/sections/hero"
import { Offre } from "@/components/sections/offre"
import { Process } from "@/components/sections/process"
import { Projets } from "@/components/sections/projets"
import { Tarifs } from "@/components/sections/tarifs"
import { StructuredData } from "@/components/structured-data"

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
