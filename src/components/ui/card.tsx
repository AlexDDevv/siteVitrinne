import type { ReactNode } from "react"

/** Étiquette monospace de la stack technique. `muted` pour la variante sur fond plein. */
function Tag({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
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
