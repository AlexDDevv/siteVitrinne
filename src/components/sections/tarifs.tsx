import { Card } from "@/components/ui/card"
import { CardGrid, Section } from "@/components/ui/section"
import { pricing } from "@/lib/pricing"

export function Tarifs() {
  return (
    <Section
      id="tarifs"
      eyebrow="04 · Tarifs indicatifs"
      title="Les ordres de grandeur, sans détour"
      intro="Ce sont des fourchettes indicatives. Chaque projet fait l'objet d'un devis personnalisé après un premier échange sur votre besoin réel."
    >
      <CardGrid className="mt-10">
        {pricing.map((offer) => (
          <li key={offer.title} className="grid">
            <Card
              accent={Boolean(offer.highlight)}
              className="relative grid content-start gap-4 p-7"
            >
              {offer.highlight ? (
                <span className="bg-amber text-on-amber absolute -top-[11px] left-6 rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold tracking-[0.08em]">
                  {offer.highlight}
                </span>
              ) : null}
              <h3 className="text-[18px] font-semibold">{offer.title}</h3>
              {/*
                Le prix est une valeur, pas un titre de section : le passer en <h4>
                casserait la hiérarchie et le mettrait en concurrence avec le <h3>.
                Le préfixe lu lève l'ambiguïté sans changer le rendu — un montant
                annoncé seul par un lecteur d'écran ne dit pas ce qu'il désigne.
              */}
              <p className="text-accent text-[32px] font-semibold tracking-[-0.02em]">
                <span className="sr-only">Tarif : </span>
                {offer.price}
                {offer.priceSuffix ? (
                  <>
                    <span aria-hidden className="text-subtle text-base font-normal">
                      {offer.priceSuffix}
                    </span>
                    <span className="sr-only"> par mois</span>
                  </>
                ) : null}
              </p>
              <ul
                role="list"
                className="text-muted grid list-disc gap-2 pl-[18px] text-[15px] leading-[1.55]"
              >
                {offer.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </Card>
          </li>
        ))}
      </CardGrid>
    </Section>
  )
}
