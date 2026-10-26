import type { Project } from "@/types/project"
import { grindrise } from "./grindrise"
import { likewatt } from "./likewatt"
import { nuitDEncre } from "./nuit-d-encre"

/**
 * Source unique des études de cas, dans l'ordre d'affichage.
 * Utilisée par l'accueil, /parcours, les pages projet, le sitemap et le JSON-LD.
 */
export const projects: Project[] = [likewatt, nuitDEncre, grindrise]

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
