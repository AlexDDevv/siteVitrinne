/**
 * Source de vérité pour les infos publiques du site.
 * Utilisée par les metadata, les données structurées, le footer et les pages.
 */
export const site = {
  name: "Alexis Delporte",
  role: { fr: "Développeur full-stack", en: "Full-stack developer" },
  city: "Francheville",
  area: "Lyon",
  region: "Auvergne-Rhône-Alpes",
  country: "FR",
  email: "alexddevs@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://alexisdelporte.dev",
  links: {
    github: "https://github.com/AlexDDevv",
    linkedin: "https://www.linkedin.com/in/alexis-delporte/",
  },
} as const

export type NavLink = { href: string; label: string }

/**
 * Liens de la barre de navigation, par langue. « Contact » est traité à part,
 * en bouton. Les ancres sont absolues (`/#projets`) pour fonctionner depuis les
 * sous-pages.
 */
export const navLinks = {
  fr: [
    { href: "/#projets", label: "Projets" },
    { href: "/#experiences", label: "Expériences" },
    { href: "/#formations", label: "Formations" },
    { href: "/articles", label: "Articles" },
  ],
  en: [
    { href: "/en#projects", label: "Projects" },
    { href: "/en#experience", label: "Experience" },
    { href: "/en#education", label: "Education" },
    { href: "/en/articles", label: "Articles" },
  ],
} as const satisfies Record<"fr" | "en", NavLink[]>

/** Réseaux affichés en contact et en pied de page. Une seule liste pour les deux. */
export const socialLinks = [
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "GitHub", href: site.links.github },
] as const
