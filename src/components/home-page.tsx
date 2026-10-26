import { PageShell } from "@/components/page-shell"
import { Approche } from "@/components/sections/approche"
import { Contact } from "@/components/sections/contact"
import { Faq } from "@/components/sections/faq"
import { Hero } from "@/components/sections/hero"
import { Offre } from "@/components/sections/offre"
import { Process } from "@/components/sections/process"
import { Projets } from "@/components/sections/projets"
import { Tarifs } from "@/components/sections/tarifs"
import { StructuredData } from "@/components/structured-data"
import { paths, type Lang } from "@/content/i18n"

/** Accueil freelance (/ et /en). */
export function HomePage({ lang }: { lang: Lang }) {
  return (
    <>
      <StructuredData lang={lang} />
      <PageShell lang={lang} alternates={paths.home}>
        <Hero lang={lang} />
        <Offre lang={lang} />
        <Approche lang={lang} />
        <Projets lang={lang} />
        <Tarifs lang={lang} />
        <Process lang={lang} />
        <Faq lang={lang} />
        <Contact lang={lang} />
      </PageShell>
    </>
  )
}
