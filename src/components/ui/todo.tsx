import { Fragment, type ReactNode } from "react"

const TODO_PATTERN = /(\[À COMPLÉTER[^\]]*\])/

/** Information encore manquante, signalée en évidence sur la page. */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <mark className="bg-amber/20 text-cream rounded px-1.5 py-0.5 font-mono text-[13px]">
      {children}
    </mark>
  )
}

/**
 * Texte de contenu dont les marqueurs « [À COMPLÉTER : …] » sont mis en
 * évidence, pour qu'aucun trou ne passe inaperçu une fois en ligne.
 */
export function WithTodos({ text }: { text: string }) {
  return text
    .split(TODO_PATTERN)
    .map((part, i) =>
      TODO_PATTERN.test(part) ? <Todo key={i}>{part}</Todo> : <Fragment key={i}>{part}</Fragment>
    )
}
