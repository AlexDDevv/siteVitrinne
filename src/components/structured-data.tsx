/**
 * Injecte un graphe Schema.org dans la page. Rendu côté serveur, donc présent
 * dans le HTML initial que lisent les robots d'indexation.
 */
export function StructuredData({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
