import type { ReactNode } from "react"
import { ui, type Lang } from "@/content/i18n"

type TextLinkProps = {
  href: string
  children: ReactNode
  /** `accent` pour un lien ambre mis en avant, `subtle` pour un lien secondaire. */
  tone?: "accent" | "subtle"
  /** Ouvre dans un nouvel onglet, avec `rel` sécurisé et la mention lue par les lecteurs d'écran. */
  external?: boolean
  /** Flèche décorative « → ». Indépendante de `external` : la maquette n'en met pas partout. */
  arrow?: boolean
  className?: string
  /** Langue de la mention « nouvel onglet » lue par les lecteurs d'écran. */
  lang?: Lang
}

const tones = {
  accent: "text-accent hover:text-accent-hover",
  subtle: "text-subtle hover:text-cream",
}

export function TextLink({
  href,
  children,
  tone = "accent",
  external = false,
  arrow = false,
  className = "",
  lang = "fr",
}: TextLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${tones[tone]} transition-colors ${className}`}
    >
      {children}
      {arrow ? <span aria-hidden> →</span> : null}
      {external ? <span className="sr-only"> {ui[lang].newTab}</span> : null}
    </a>
  )
}
