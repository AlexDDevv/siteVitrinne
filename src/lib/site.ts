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
  phone: { display: "06 68 05 34 83", international: "+33 6 68 05 34 83" },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://alexisdelporte.dev",
  links: {
    malt: "https://www.malt.fr/profile/alexisdelporte",
    github: "https://github.com/AlexDDevv",
    linkedin: "https://www.linkedin.com/in/alexis-delporte/",
  },
} as const

export type NavLink = { href: string; label: string }

/**
 * Liens de la barre de navigation, par langue. « Contact » est traité à part,
 * en bouton. Les ancres sont absolues (`/#offre`) pour fonctionner depuis les
 * sous-pages. L'anglais n'a pas d'accueil freelance : sa nav reste sur /en/profile.
 */
export const navLinks = {
  fr: [
    { href: "/#offre", label: "Offre" },
    { href: "/#projets", label: "Projets" },
    { href: "/#tarifs", label: "Tarifs" },
    { href: "/parcours", label: "Parcours" },
  ],
  en: [
    { href: "/en/profile#projects", label: "Projects" },
    { href: "/en/profile#experience", label: "Experience" },
  ],
} as const satisfies Record<"fr" | "en", NavLink[]>

/** Réseaux affichés en contact et en pied de page. Une seule liste pour les deux. */
export const socialLinks = [
  { label: "Malt", href: site.links.malt },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "GitHub", href: site.links.github },
] as const
