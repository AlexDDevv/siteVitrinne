import type { Project } from "@/types/project"

/** Expérience en entreprise : pas de badge de statut, pas de lien Code / Démo, pas de visuels (code et interface non publics). */
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
  updatedAt: "2026-10-26",
  content: {
    fr: {
      title: "Likewatt",
      summary:
        "Éditeur SaaS dans les énergies renouvelables. Refonte de l'interface, migration Firebase → MongoDB et découpage en micro-services : temps de chargement réduits de moitié pour plus de 2 000 utilisateurs professionnels.",
      dates: "Sept. 2024 → aujourd'hui",
      context: [
        "Likewatt est un éditeur SaaS dans les énergies renouvelables, basé à Villeurbanne. Ses utilisateurs sont des professionnels, dont des équipes de TotalEnergies, du Crédit Agricole et d'Eiffage.",
        "J'y suis développeur full-stack : en alternance de septembre 2024 à novembre 2025, puis en poste depuis novembre 2025.",
      ],
      problem: [
        "Une application legacy écrite en composants de classe React, avec une interface vieillissante.",
        "Des bugs récurrents et des temps de chargement élevés pour les utilisateurs.",
        "Une base Firebase et une architecture monolithique à faire évoluer.",
      ],
      work: [
        "Migration de l'application legacy (composants de classe React) vers React 18, TanStack Router et TanStack Query.",
        "Refonte de l'interface et de l'expérience utilisateur, de la maquette à l'intégration.",
        "Migration de la base de données de Firebase vers MongoDB.",
        "Découpage de l'application en micro-services.",
        "Optimisation des performances.",
        "Développement de nouvelles fonctionnalités et maintenance du logiciel.",
      ],
      technical: [],
      result: [
        "Des temps de chargement réduits de moitié pour plus de 2 000 utilisateurs professionnels, dont des équipes de TotalEnergies, du Crédit Agricole et d'Eiffage.",
        "Nettement moins de bugs, sur une base de code modernisée que l'équipe fait évoluer plus facilement.",
      ],
      gallery: [],
    },
    en: {
      title: "Likewatt",
      summary:
        "SaaS vendor in renewable energy. Interface redesign, Firebase → MongoDB migration and split into microservices: load times cut in half for more than 2,000 professional users.",
      dates: "Sept. 2024 → present",
      context: [
        "Likewatt is a SaaS vendor in renewable energy, based in Villeurbanne, France. Its users are professionals, including teams at TotalEnergies, Crédit Agricole and Eiffage.",
        "I work there as a full-stack developer: as a work-study student from September 2024 to November 2025, then full-time since November 2025.",
      ],
      problem: [
        "A legacy application written with React class components, with an outdated interface.",
        "Recurring bugs and slow load times for users.",
        "A Firebase database and a monolithic architecture that needed to evolve.",
      ],
      work: [
        "Migration of the legacy application (React class components) to React 18, TanStack Router and TanStack Query.",
        "Redesign of the interface and user experience, from mockups to implementation.",
        "Database migration from Firebase to MongoDB.",
        "Split of the application into microservices.",
        "Performance optimization.",
        "New feature development and software maintenance.",
      ],
      technical: [],
      result: [
        "Load times cut in half for more than 2,000 professional users, including teams at TotalEnergies, Crédit Agricole and Eiffage.",
        "Far fewer bugs, on a modernized codebase the team can evolve more easily.",
      ],
      gallery: [],
    },
  },
}
