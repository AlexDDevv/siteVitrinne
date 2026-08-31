/**
 * Source de vérité pour les infos publiques du site.
 * Utilisée par les metadata, les données structurées, le footer et les sections.
 */
export const site = {
  name: "Alexis Delporte",
  role: "Développeur web full-stack freelance",
  city: "Écully",
  postalCode: "69130",
  area: "Lyon",
  region: "Auvergne-Rhône-Alpes",
  country: "FR",
  email: "alexddevs@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://alexisdelporte.dev",
  links: {
    malt: "https://www.malt.fr/profile/alexisdelporte?overview",
    github: "https://github.com/AlexDDevv",
    linkedin: "https://www.linkedin.com/in/alexis-delporte/",
  },
} as const

/** Liens de la barre de navigation. « Contact » est traité à part, en bouton. */
export const navLinks = [
  { href: "#offre", label: "Offre" },
  { href: "#projets", label: "Projets" },
  { href: "#tarifs", label: "Tarifs" },
] as const

/** Réseaux affichés en contact et en pied de page — une seule liste pour les deux. */
export const socialLinks = [
  { label: "Malt", href: site.links.malt },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "GitHub", href: site.links.github },
] as const
