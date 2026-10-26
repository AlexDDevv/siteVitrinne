/** Langues du site. Chaque page existe en français et en anglais. */
export const languages = ["fr", "en"] as const
export type Lang = (typeof languages)[number]

export const htmlLang: Record<Lang, string> = { fr: "fr-FR", en: "en-US" }
export const ogLocale: Record<Lang, string> = { fr: "fr_FR", en: "en_US" }

/** Chemins des pages bilingues. Une seule définition, utilisée par la nav, le sitemap et les hreflang. */
export const paths = {
  home: { fr: "/", en: "/en" } satisfies Record<Lang, string>,
  profile: { fr: "/parcours", en: "/en/profile" } satisfies Record<Lang, string>,
  legal: { fr: "/mentions-legales", en: "/en/legal-notice" } satisfies Record<Lang, string>,
  project: (lang: Lang, slug: string) =>
    lang === "fr" ? `/projets/${slug}` : `/en/projects/${slug}`,
}

/** Équivalent d'une page dans chaque langue, pour les hreflang et le sélecteur FR · EN. */
export type Alternates = Record<Lang, string>

export const ui = {
  fr: {
    skipLink: "Aller au contenu",
    home: "Accueil",
    profile: "Parcours",
    mainNav: "Navigation principale",
    langSwitch: "Langue",
    projects: "Projets",
    experience: "Expériences",
    education: "Formations",
    contact: "Contact",
    fullCv: "Parcours détaillé dans le CV (PDF)",
    code: "Code",
    demo: "Démo",
    readCaseStudy: "Lire l'étude de cas",
    caseStudy: "Étude de cas",
    context: "Contexte",
    problem: "Problème",
    work: "Ce que j'ai fait",
    technical: "Choix techniques",
    result: "Résultat",
    stack: "Stack",
    links: "Liens",
    previews: "Aperçus",
    otherProjects: "Autres projets",
    status: { "in-progress": "En cours", done: "Terminé" },
    technologiesOf: (title: string) => `Technologies de ${title}`,
    enlarge: (caption: string) => `Agrandir : ${caption}`,
    close: "Fermer",
    newTab: "(nouvel onglet)",
    theme: {
      unknown: "Changer de thème",
      toLight: "Activer le thème clair",
      toDark: "Activer le thème sombre",
    },
    legal: "Mentions légales",
  },
  en: {
    skipLink: "Skip to content",
    home: "Home",
    profile: "Profile",
    mainNav: "Main navigation",
    langSwitch: "Language",
    projects: "Projects",
    experience: "Experience",
    education: "Education",
    contact: "Contact",
    fullCv: "Full background in the resume (PDF)",
    code: "Code",
    demo: "Demo",
    readCaseStudy: "Read the case study",
    caseStudy: "Case study",
    context: "Context",
    problem: "Problem",
    work: "What I did",
    technical: "Technical choices",
    result: "Result",
    stack: "Stack",
    links: "Links",
    previews: "Previews",
    otherProjects: "Other projects",
    status: { "in-progress": "In progress", done: "Finished" },
    technologiesOf: (title: string) => `${title} technologies`,
    enlarge: (caption: string) => `Enlarge: ${caption}`,
    close: "Close",
    newTab: "(new tab)",
    theme: {
      unknown: "Change theme",
      toLight: "Switch to light theme",
      toDark: "Switch to dark theme",
    },
    legal: "Legal notice",
  },
} as const

export type UI = (typeof ui)[Lang]
