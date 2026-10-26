export type PricingTier = {
  title: string
  /** Libellé affiché. */
  price: string
  features: string[]
  /** Badge de mise en avant ; sa présence bascule la carte en style accentué. */
  highlight?: string
}

/** Pas de fourchette affichée : chaque mission fait l'objet d'une proposition écrite. */
export const pricing: PricingTier[] = [
  {
    title: "Mission au temps passé",
    price: "450 € / jour",
    features: [
      "Refonte, performance, renfort technique",
      "Facturation au temps passé",
      "Périmètre ajustable en cours de mission",
    ],
  },
  {
    title: "MVP",
    price: "à partir de 6 000 €",
    highlight: "SUR PROPOSITION",
    features: [
      "Front, API, base de données, auth, paiement",
      "Périmètre, livrables et planning fixés par écrit",
      "Code documenté, prêt à être repris par une équipe",
    ],
  },
  {
    title: "Agences",
    price: "Forfait ou TJM",
    features: [
      "Selon votre fonctionnement",
      "Sous-traitance en marque blanche",
      "Vos conventions, vos outils",
    ],
  },
]
