export type PricingTier = {
  title: string
  /** Libellé affiché, ex. « 750 € – 1 200 € ». */
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
    price: "750 € – 1 200 €",
    features: [
      "Pages statiques",
      "Formulaire de contact",
      "SEO de base",
      "Responsive mobile",
      "Design sur-mesure en option",
    ],
    amount: { min: 750, max: 1200 },
  },
  {
    title: "Application sur-mesure",
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
