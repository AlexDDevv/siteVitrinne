import type { ReactNode } from "react"

/** Carte de contenu : le motif surface + bordure repris dans Offre, Projets et Tarifs. */
export function Card({
  children,
  className = "",
  interactive = false,
  accent = false,
}: {
  children: ReactNode
  className?: string
  /** Éclaircit la bordure au survol, pour les cartes que l'on parcourt. */
  interactive?: boolean
  /** Carte mise en avant : fond et bordure ambre. */
  accent?: boolean
}) {
  return (
    <div
      className={`shadow-card rounded-xl border transition-[box-shadow,border-color] ${
        accent ? "bg-surface-accent border-accent" : "bg-surface border-line-strong"
      } ${interactive ? "hover:border-line-hover hover:shadow-card-raised" : ""} ${className}`}
    >
      {children}
    </div>
  )
}

/** Étiquette monospace de la stack technique. `muted` pour la variante sur fond plein. */
export function Tag({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return muted ? (
    <span className="bg-ink text-subtle rounded-[5px] px-2.5 py-1.5 font-mono text-xs">
      {children}
    </span>
  ) : (
    <span className="border-line-strong text-muted rounded-md border px-3 py-1.5 font-mono text-[12.5px]">
      {children}
    </span>
  )
}

/** Liste d'étiquettes, rendue en `<ul>` pour rester annonçable comme une liste. */
export function TagList({
  items,
  muted = false,
  label,
  className = "",
}: {
  items: readonly string[]
  muted?: boolean
  /** Nom accessible de la liste, ex. « Technologies utilisées ». */
  label: string
  className?: string
}) {
  return (
    <ul role="list" aria-label={label} className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <li key={item}>
          <Tag muted={muted}>{item}</Tag>
        </li>
      ))}
    </ul>
  )
}
