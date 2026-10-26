import { Card } from "@/components/ui/card"
import { CardGrid, Section } from "@/components/ui/section"
import { WithTodos } from "@/components/ui/todo"
import { pricing } from "@/lib/pricing"

export function Tarifs() {
  return (
    <Section
      id="tarifs"
      eyebrow="04 · Tarifs"
      title="Une proposition écrite, après un premier échange"
      intro="Pas de grille figée : après un premier échange sur votre besoin, vous recevez une proposition écrite avec le périmètre, les livrables, le planning et le prix."
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
              <p className="text-accent text-[26px] leading-tight font-semibold tracking-[-0.02em]">
                <span className="sr-only">Tarif : </span>
                <WithTodos text={offer.price} />
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
