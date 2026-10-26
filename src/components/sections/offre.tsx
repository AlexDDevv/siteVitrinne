import { Card } from "@/components/ui/card"
import { Body, CardGrid, Section } from "@/components/ui/section"
import { home } from "@/content/home"
import type { Lang } from "@/content/i18n"

export function Offre({ lang }: { lang: Lang }) {
  const c = home[lang]
  return (
    <Section id={c.ids.offer} alt eyebrow={c.offer.eyebrow} title={c.offer.title}>
      <CardGrid columns={2} className="mt-10">
        {c.offer.items.map((offre) => (
          <li key={offre.slug} className="grid">
            <Card interactive className="grid content-start gap-3.5 p-7">
              <span className="text-accent font-mono text-xs">/ {offre.slug}</span>
              <h3 className="text-[21px] font-semibold">{offre.title}</h3>
              <Body>{offre.description}</Body>
            </Card>
          </li>
        ))}
      </CardGrid>
    </Section>
  )
}
