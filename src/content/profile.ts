import type { Lang } from "@/content/i18n"
import { site } from "@/lib/site"

/** CV au format PDF, un par langue, servis depuis public/cv/. Chemins stables : des CV envoyés y pointent. */
export const cvPaths: Record<Lang, string> = {
  fr: "/cv/alexis-delporte-fr.pdf",
  en: "/cv/alexis-delporte-en.pdf",
}

export type TimelineItem = {
  title: string
  org: string
  dates: string
  /** Étude de cas liée, ex. l'expérience Likewatt. */
  caseStudy?: string
}

type Profile = {
  subtitle: string
  location: string
  intro: string
  experiences: TimelineItem[]
  education: TimelineItem[]
}

/** Contenu de /parcours et /en/profile, repris du portfolio. */
export const profile: Record<Lang, Profile> = {
  fr: {
    subtitle: "Concepteur Développeur d'Applications · Développeur full-stack",
    location: "Écully, Auvergne-Rhône-Alpes, France",
    intro:
      "Développeur full-stack chez Likewatt depuis 2024 (React, TypeScript, NestJS). En parallèle, je conçois et développe mes propres applications : en voici une sélection, avec le code, les démos et mes choix techniques.",
    experiences: [
      {
        title: "Développeur Full Stack",
        org: "Likewatt, éditeur de logiciel, Villeurbanne",
        dates: "Nov. 2025 → présent",
        caseStudy: "likewatt",
      },
      {
        title: "Développeur Full Stack en alternance",
        org: "Likewatt, éditeur de logiciel, Villeurbanne",
        dates: "Sept. 2024 → Nov. 2025",
      },
    ],
    education: [
      {
        title: "Concepteur Développeur d'Applications",
        org: "Wild Code School (alternance) · RNCP niveau 6",
        dates: "2024-2025",
      },
      {
        title: "Développeur Intégrateur Web",
        org: "OpenClassrooms (en ligne) · RNCP niveau 5",
        dates: "2023-2024",
      },
    ],
  },
  en: {
    subtitle: "Application Designer-Developer · Full-stack developer",
    location: "Écully, Auvergne-Rhône-Alpes, France",
    intro:
      "Full-stack developer at Likewatt since 2024 (React, TypeScript, NestJS). On the side, I design and build my own applications: here is a selection, with the code, the demos and the technical choices behind them.",
    experiences: [
      {
        title: "Full Stack developer",
        org: "Likewatt, software vendor, Villeurbanne",
        dates: "Nov. 2025 → present",
        caseStudy: "likewatt",
      },
      {
        title: "Full Stack developer (work-study)",
        org: "Likewatt, software vendor, Villeurbanne",
        dates: "Sept. 2024 → Nov. 2025",
      },
    ],
    education: [
      {
        title: "Application Designer-Developer",
        org: "Wild Code School (work-study) · RNCP level 6",
        dates: "2024-2025",
      },
      {
        title: "Web Developer-Integrator",
        org: "OpenClassrooms (online) · RNCP level 5",
        dates: "2023-2024",
      },
    ],
  },
}

/** Contact direct de /parcours : CV en tête, puis les canaux. */
export function contactItems(lang: Lang) {
  return [
    { label: "CV", value: lang === "fr" ? "PDF, français" : "PDF, English", href: cvPaths[lang] },
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    {
      label: lang === "fr" ? "Téléphone" : "Phone",
      value: lang === "fr" ? site.phone.display : site.phone.international,
      href: `tel:${site.phone.international.replace(/\s/g, "")}`,
    },
    { label: "LinkedIn", value: "in/alexis-delporte", href: site.links.linkedin, external: true },
    { label: "GitHub", value: "AlexDDevv", href: site.links.github, external: true },
  ]
}
