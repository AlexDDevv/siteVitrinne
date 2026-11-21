import type { ReactNode } from "react"
import { Logo } from "@/components/ui/logo"
import { Container } from "@/components/ui/section"
import { TextLink } from "@/components/ui/text-link"
import { paths, ui, type Lang } from "@/content/i18n"
import { cvPaths } from "@/content/profile"
import { site, socialLinks } from "@/lib/site"

const heading = {
  fr: { site: "Le site", elsewhere: "Ailleurs" },
  en: { site: "Site", elsewhere: "Elsewhere" },
} satisfies Record<Lang, unknown>

/** Colonne de liens avec son intitulé, reliée par `aria-labelledby`. */
function Column({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <nav aria-labelledby={id} className="grid content-start gap-3">
      <p id={id} className="font-mono text-xs tracking-[0.14em] uppercase">
        {title}
      </p>
      <ul role="list" className="grid gap-2">
        {children}
      </ul>
    </nav>
  )
}

/**
 * Pied de page en colonnes : identité, pages du site, réseaux. Une colonne en
 * mobile, deux en tablette, trois en desktop.
 */
export function SiteFooter({ lang = "fr" }: { lang?: Lang }) {
  const t = ui[lang]
  return (
    <footer className="border-line bg-ink-alt border-t">
      <Container className="text-faint grid gap-10 py-12 text-sm">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div className="grid content-start gap-2">
            <p>
              <Logo size={32} />
            </p>
            <p className="max-w-[30ch] leading-relaxed">
              {site.role[lang]} · {site.city}, {lang === "fr" ? "près de" : "near"} {site.area}
            </p>
          </div>

          <Column id="footer-site" title={heading[lang].site}>
            <li>
              <TextLink href={paths.articles[lang]} tone="subtle">
                {t.articles}
              </TextLink>
            </li>
            <li>
              <TextLink href={cvPaths[lang]} tone="subtle">
                {lang === "fr" ? "CV (PDF)" : "Resume (PDF)"}
              </TextLink>
            </li>
            <li>
              <TextLink href={paths.legal[lang]} tone="subtle">
                {t.legal}
              </TextLink>
            </li>
          </Column>

          <Column id="footer-elsewhere" title={heading[lang].elsewhere}>
            {socialLinks.map((social) => (
              <li key={social.label}>
                <TextLink href={social.href} tone="subtle" external lang={lang}>
                  {social.label}
                </TextLink>
              </li>
            ))}
          </Column>
        </div>

        <p className="border-line border-t pt-6">
          {site.name} © {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  )
}
