import { Card } from "@/components/ui/card"
import { Body, CardGrid, Section } from "@/components/ui/section"
import { offres } from "@/lib/offres"

export function Offre() {
  return (
    <Section
      id="offre"
      alt
      eyebrow="01 · Ce que je propose"
      title="Quatre façons de travailler ensemble"
    >
      <CardGrid columns={2} className="mt-10">
        {offres.map((offre) => (
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
