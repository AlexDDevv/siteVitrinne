import type { StaticImageData } from "next/image"
import type { Lang } from "@/content/i18n"

/** Statut affiché en badge. Absent = pas de badge (ex. un poste salarié). */
export type ProjectStatus = "in-progress" | "done"

export type GalleryItem = {
  image: StaticImageData
  /** Titre de la figure, ex. « Fig. 1 : Recherche de livres ». */
  caption: string
  description?: string
}

/** Contenu rédigé d'une étude de cas, dans une langue. */
export type ProjectContent = {
  title: string
  /** Résumé court : cartes et meta description. */
  summary: string
  dates: string
  /** Chaque section est une liste de paragraphes. */
  context: string[]
  problem: string[]
  /** Ce que j'ai fait, en liste à puces. */
  work: string[]
  /** Détail des choix techniques, par domaine. Vide = bloc masqué. */
  technical: { label: string; value: string }[]
  result: string[]
  gallery: GalleryItem[]
  /** Ce que le projet montre à un client : affiché sur la carte de l'accueil. */
  highlights?: string[]
}

export type Project = {
  slug: string
  /** `personal` : projet perso, listé sur /parcours. `work` : expérience en entreprise. */
  kind: "personal" | "work"
  status?: ProjectStatus
  stack: string[]
  /** Dernière révision de l'étude de cas (AAAA-MM-JJ) : sitemap et JSON-LD. */
  updatedAt: string
  /** Liens Code / Démo : une chaîne vide masque le lien. */
  repo?: string
  demo?: string
  content: Record<Lang, ProjectContent>
}
