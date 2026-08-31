export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  title: string
  description: string
  stack: string[]
  links: ProjectLink[]
  /**
   * Capture d'écran dans /public/projets/. Tant qu'elle est absente, la carte affiche
   * le placeholder rayé de la maquette plutôt qu'une image cassée.
   */
  image?: {
    src: string
    alt: string
  }
  /** Texte du placeholder quand `image` n'est pas encore fournie. */
  imagePlaceholder: string
}
