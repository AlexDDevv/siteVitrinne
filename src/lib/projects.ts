import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    title: "Nuit d'Encre",
    description:
      "Plateforme sociale de bibliothèque en ligne : chacun suit ses lectures, gagne des badges et retrouve l'activité des autres lecteurs dans un fil social. Développée de bout en bout, en ligne et utilisée.",
    stack: ["React 19", "GraphQL", "PostgreSQL", "Docker"],
    links: [
      { label: "nuitdencre.fr", href: "https://nuitdencre.fr" },
      { label: "Code source", href: "https://github.com/AlexDDevv/Nuit-d-Encre" },
    ],
    imagePlaceholder: "capture d'écran — nuitdencre.fr",
  },
  {
    title: "Ask&Trust",
    description:
      "SaaS de création et de diffusion de sondages, avec abonnements payants gérés via Stripe : formulaires personnalisables, collecte des réponses et restitution des résultats côté administrateur.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    // TODO: ajouter le lien démo / dépôt une fois l'URL publique connue.
    links: [],
    imagePlaceholder: "capture d'écran — Ask&Trust",
  },
]
