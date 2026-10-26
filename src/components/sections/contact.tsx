import { ContactForm } from "@/components/contact-form"
import { Container, Eyebrow } from "@/components/ui/section"
import { TextLink } from "@/components/ui/text-link"
import { home } from "@/content/home"
import type { Lang } from "@/content/i18n"
import { site, socialLinks } from "@/lib/site"

export function Contact({ lang }: { lang: Lang }) {
  const c = home[lang]
  const t = c.contact

  return (
    <section
      id={c.ids.contact}
      aria-labelledby="contact-title"
      className="border-line-strong border-t"
    >
      <Container className="grid items-start gap-12 py-20 sm:py-24 lg:grid-cols-2">
        <div className="grid content-start gap-4.5">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2
            id="contact-title"
            className="text-[clamp(1.875rem,4.4vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.025em]"
          >
            {t.title}
          </h2>
          <p className="text-muted max-w-[40ch] text-[17px] leading-relaxed">{t.intro}</p>
          <ul role="list" className="mt-2 grid gap-2.5 text-[15.5px]">
            {/* Masqué tant que l'URL de réservation n'est pas renseignée dans site.ts. */}
            {site.links.booking ? (
              <li>
                <TextLink href={site.links.booking} external arrow lang={lang}>
                  {t.booking}
                </TextLink>
              </li>
            ) : null}
            <li>
              <TextLink href={site.links.malt} external arrow lang={lang}>
                {t.malt}
              </TextLink>
            </li>
            {socialLinks
              .filter((social) => social.label !== "Malt")
              .map((social) => (
                <li key={social.label}>
                  <TextLink href={social.href} tone="subtle" external lang={lang}>
                    {social.label}
                  </TextLink>
                </li>
              ))}
          </ul>
        </div>

        <div className="bg-surface border-line-strong shadow-card rounded-2xl border p-6 sm:p-7">
          <ContactForm lang={lang} />
        </div>
      </Container>
    </section>
  )
}
