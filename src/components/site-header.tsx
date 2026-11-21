import { ThemeToggle } from "@/components/theme-toggle"
import { ButtonLink } from "@/components/ui/button"
import { LangSwitcher } from "@/components/ui/lang-switcher"
import { Logo } from "@/components/ui/logo"
import { Container } from "@/components/ui/section"
import { paths, ui, type Alternates, type Lang } from "@/content/i18n"
import { navLinks, site } from "@/lib/site"

export function SiteHeader({
  lang = "fr",
  alternates,
  contactHref,
}: {
  lang?: Lang
  /** Équivalents FR / EN de la page : affiche le sélecteur de langue. */
  alternates?: Alternates
  /** Cible du bouton Contact : par défaut, la section Contact de l'accueil. */
  contactHref?: string
}) {
  const t = ui[lang]
  const home = paths.home[lang]
  const contact = contactHref ?? `${home}#contact`

  return (
    <header className="border-line-strong/70 bg-ink/85 sticky top-0 z-20 border-b backdrop-blur-md">
      {/*
        En mobile, les liens passent sur une seconde ligne pleine largeur plutôt
        que dans un menu masqué : la navigation reste visible dès 320 px.
      */}
      <Container className="flex flex-wrap items-center justify-between gap-x-2 gap-y-2.5 px-4 py-3 sm:flex-nowrap sm:px-6 sm:py-3.5">
        <a href={home} aria-label={`${site.name}, ${t.home.toLowerCase()}`}>
          <Logo priority compact />
        </a>
        <nav
          aria-label={t.mainNav}
          className="order-last w-full sm:order-none sm:ml-auto sm:w-auto"
        >
          <ul
            role="list"
            className="flex items-center justify-between gap-3 text-[13px] sm:justify-start sm:gap-[22px] sm:text-sm"
          >
            {navLinks[lang].map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-subtle hover:text-cream transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2.5 sm:gap-[18px]">
          <ButtonLink href={contact} variant="pill" className="text-[13px] sm:text-sm">
            {t.contact}
          </ButtonLink>
          {alternates ? <LangSwitcher lang={lang} alternates={alternates} /> : null}
          <ThemeToggle lang={lang} />
        </div>
      </Container>
    </header>
  )
}
