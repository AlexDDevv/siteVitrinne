import { Approche } from "@/components/sections/approche"
import { Contact } from "@/components/sections/contact"
import { Hero } from "@/components/sections/hero"
import { Offre } from "@/components/sections/offre"
import { Process } from "@/components/sections/process"
import { Projets } from "@/components/sections/projets"
import { Tarifs } from "@/components/sections/tarifs"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="bg-amber text-ink sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2 focus:font-semibold"
      >
        Aller au contenu
      </a>
      <SiteHeader />
      <main id="main" className="overflow-x-hidden">
        <Hero />
        <Offre />
        <Approche />
        <Projets />
        <Tarifs />
        <Process />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
