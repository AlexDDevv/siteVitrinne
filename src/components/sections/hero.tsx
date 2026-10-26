import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/section"
import { TextLink } from "@/components/ui/text-link"
import { home } from "@/content/home"
import { paths, type Lang } from "@/content/i18n"
import { site } from "@/lib/site"

export function Hero({ lang }: { lang: Lang }) {
  const c = home[lang]
  const t = c.hero

  return (
    <section id="top" aria-labelledby="hero-title">
      <Container className="grid gap-7 py-20 sm:py-24">
        <p className="text-sage flex items-center gap-2.5 font-mono text-[13px]">
          <span aria-hidden className="bg-sage inline-block size-2 rounded-full" />
          {t.available}
        </p>

        <h1
          id="hero-title"
          className="max-w-[16ch] text-[clamp(2.375rem,7vw,4.25rem)] leading-[1.03] font-semibold tracking-[-0.03em] text-pretty"
        >
          {site.name}
        </h1>

        <p className="text-accent font-mono text-[clamp(0.875rem,2vw,1.0625rem)] tracking-[0.02em]">
          {c.role} · React / TypeScript / NestJS
        </p>

        <p className="max-w-[34ch] text-[clamp(1.1875rem,2.6vw,1.625rem)] leading-[1.45] text-pretty">
          {t.lead}
        </p>

        <p className="text-muted max-w-[52ch] text-[17px] leading-relaxed">
          {t.productBefore}
          <TextLink href={paths.project(lang, "grindrise")} className="font-medium">
            Grindrise
          </TextLink>
          {t.productAfter}
        </p>

        <p className="text-subtle max-w-[46ch] text-base leading-relaxed">
          {t.location(site.city, site.area)}
        </p>

        {/* w-fit + auto-cols-fr : les deux boutons adoptent la largeur du plus large,
            sans que la grille s'étire sur toute la colonne. Empilés en mobile. */}
        <div className="mt-2 grid gap-3 sm:w-fit sm:auto-cols-fr sm:grid-flow-col">
          <ButtonLink href={`#${c.ids.contact}`}>{t.cta}</ButtonLink>
          <ButtonLink href={site.links.malt} variant="outline" external arrow lang={lang}>
            {t.malt}
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
