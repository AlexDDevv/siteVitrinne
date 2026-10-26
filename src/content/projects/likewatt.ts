import type { Project } from "@/types/project"

/** Expérience en entreprise : pas de badge de statut, pas de lien Code / Démo. */
export const likewatt: Project = {
  slug: "likewatt",
  kind: "work",
  stack: [
    "React",
    "TypeScript",
    "TanStack",
    "Zustand",
    "Tailwind",
    "NestJS",
    "MongoDB",
    "PostgreSQL",
    "Docker",
  ],
  content: {
    fr: {
      title: "Likewatt",
      summary:
        "Éditeur SaaS dans les énergies renouvelables. Refonte de l'interface, migration Firebase → MongoDB et découpage en micro-services : -80 % de temps de chargement pour plus de 2 000 utilisateurs professionnels.",
      dates: "Sept. 2024 → aujourd'hui",
      context: [
        "Likewatt est un éditeur SaaS dans les énergies renouvelables, basé à Villeurbanne. Ses utilisateurs sont des professionnels, dont des équipes de TotalEnergies, du Crédit Agricole et d'Eiffage.",
        "J'y suis développeur full-stack : en alternance de septembre 2024 à novembre 2025, puis en poste depuis novembre 2025.",
      ],
      problem: [
        "Des temps de chargement élevés, une base Firebase et une architecture monolithique à faire évoluer. [À COMPLÉTER : problème initial, à confirmer]",
      ],
      work: [
        "Refonte de l'interface et de l'expérience utilisateur.",
        "Migration de la base de données de Firebase vers MongoDB.",
        "Découpage de l'application en micro-services.",
        "Optimisation des performances.",
      ],
      technical: [],
      result: [
        "-80 % de temps de chargement pour plus de 2 000 utilisateurs professionnels, dont des équipes de TotalEnergies, du Crédit Agricole et d'Eiffage.",
      ],
      gallery: [],
      galleryTodo: "[À COMPLÉTER : visuels autorisés ?]",
    },
    en: {
      title: "Likewatt",
      summary:
        "SaaS vendor in renewable energy. Interface redesign, Firebase → MongoDB migration and split into microservices: 80% faster load times for more than 2,000 professional users.",
      dates: "Sept. 2024 → present",
      context: [
        "Likewatt is a SaaS vendor in renewable energy, based in Villeurbanne, France. Its users are professionals, including teams at TotalEnergies, Crédit Agricole and Eiffage.",
        "I work there as a full-stack developer: as a work-study student from September 2024 to November 2025, then full-time since November 2025.",
      ],
      problem: [
        "Slow load times, a Firebase database and a monolithic architecture that needed to evolve. [À COMPLÉTER : problème initial, à confirmer]",
      ],
      work: [
        "Redesign of the interface and user experience.",
        "Database migration from Firebase to MongoDB.",
        "Split of the application into microservices.",
        "Performance optimization.",
      ],
      technical: [],
      result: [
        "80% faster load times for more than 2,000 professional users, including teams at TotalEnergies, Crédit Agricole and Eiffage.",
      ],
      gallery: [],
      galleryTodo: "[À COMPLÉTER : visuels autorisés ?]",
    },
  },
}
