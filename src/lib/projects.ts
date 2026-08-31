import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    title: "Nuit d'Encre",
    description:
      "Plateforme sociale de bibliothèque en ligne : chacun suit ses lectures, gagne des badges et retrouve l'activité des autres lecteurs dans un fil social. Développée de bout en bout, en ligne et utilisée.",
    stack: ["React 19", "GraphQL", "PostgreSQL", "Docker"],
    links: [{ label: "nuitdencre.fr", href: "https://nuitdencre.fr" }],
    imagePlaceholder: "capture d'écran · nuitdencre.fr",
  },
]
