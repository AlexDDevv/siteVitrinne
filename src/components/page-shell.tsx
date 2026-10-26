import type { ReactNode } from "react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ui, type Alternates, type Lang } from "@/content/i18n"

/** Cadre commun des pages : lien d'évitement, en-tête, contenu principal et pied de page. */
export function PageShell({
  lang = "fr",
  alternates,
  contactHref,
  children,
}: {
  lang?: Lang
  alternates?: Alternates
  contactHref?: string
  children: ReactNode
}) {
  return (
    <>
      <a
        href="#main"
        className="bg-amber text-on-amber sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2 focus:font-semibold"
      >
        {ui[lang].skipLink}
      </a>
      <SiteHeader lang={lang} alternates={alternates} contactHref={contactHref} />
      <main id="main" className="overflow-x-hidden">
        {children}
      </main>
      <SiteFooter lang={lang} />
    </>
  )
}
