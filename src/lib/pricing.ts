export type PricingTier = {
  title: string
  /** Libellé affiché, ex. « 800 € – 1 500 € ». */
  price: string
  /** Suffixe en plus petit après le prix, ex. « /mois ». */
  priceSuffix?: string
  features: string[]
  /** Badge de mise en avant ; sa présence bascule la carte en style accentué. */
  highlight?: string
  /** Bornes en euros, pour les données structurées Schema.org. */
  amount: { min: number; max?: number; unit?: "MON" }
}

export const pricing: PricingTier[] = [
  {
    title: "Site vitrine",
    price: "800 € – 1 500 €",
    features: ["Pages statiques", "Formulaire de contact", "SEO de base", "Responsive mobile"],
    amount: { min: 800, max: 1500 },
  },
  {
    title: "Site sur-mesure avec back & BDD",
    price: "à partir de 3 000 €",
    highlight: "SUR DEVIS",
    features: [
      "Selon le scope du projet",
      "Authentification utilisateurs",
      "Base de données",
      "Logique métier spécifique",
    ],
    amount: { min: 3000 },
  },
  {
    title: "Maintenance mensuelle",
    price: "50 € – 150 €",
    priceSuffix: "/mois",
    features: ["Hébergement", "Mises à jour", "Petites modifications", "Support"],
    amount: { min: 50, max: 150, unit: "MON" },
  },
]
