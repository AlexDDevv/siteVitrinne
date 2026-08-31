import { Card } from "@/components/ui/card"
import { Body, CardGrid, Section } from "@/components/ui/section"

const offres = [
  {
    slug: "site-vitrine",
    title: "Site vitrine",
    description:
      "Une présentation claire de votre activité : quelques pages, un formulaire de contact qui arrive bien dans votre boîte mail, un référencement de base propre, et un affichage impeccable sur mobile.",
  },
  {
    slug: "application",
    title: "Application sur-mesure",
    description:
      "Un vrai outil : backend, base de données, logique métier propre à votre activité, comptes utilisateurs et authentification, paiement en ligne si votre modèle en a besoin.",
  },
  {
    slug: "maintenance",
    title: "Maintenance & évolution",
    description:
      "Un abonnement mensuel qui couvre l'hébergement, les mises à jour, les petites modifications de contenu et le support quand quelque chose coince.",
  },
]

export function Offre() {
  return (
    <Section
      id="offre"
      alt
      eyebrow="01 · Ce que je propose"
      title="Trois façons de travailler ensemble"
    >
      <CardGrid className="mt-10">
        {offres.map((offre) => (
          <li key={offre.slug} className="grid">
            <Card interactive className="grid content-start gap-3.5 p-7">
              <span className="text-amber font-mono text-xs">/ {offre.slug}</span>
              <h3 className="text-[21px] font-semibold">{offre.title}</h3>
              <Body>{offre.description}</Body>
            </Card>
          </li>
        ))}
      </CardGrid>
    </Section>
  )
}
