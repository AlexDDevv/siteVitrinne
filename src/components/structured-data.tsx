import { buildStructuredData } from "@/lib/structured-data"

/**
 * Injecte le graphe Schema.org de la page. Rendu côté serveur, donc présent
 * dans le HTML initial que lisent les robots d'indexation.
 */
export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredData()) }}
    />
  )
}
