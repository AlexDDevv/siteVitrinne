import type { ReactNode } from "react"

/** Conteneur centré partagé par toutes les sections (max-width 1080px de la maquette). */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`mx-auto w-full max-w-[1080px] px-6 ${className}`}>{children}</div>
}

/** Numéro + libellé en monospace au-dessus d'un titre, ex. « 01 · Ce que je propose ». */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-faint font-mono text-xs tracking-[0.14em] uppercase">{children}</p>
}

/** Paragraphe de corps de carte, à la taille et l'interlignage de la maquette. */
export function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-muted text-[15.5px] leading-[1.65] ${className}`}>{children}</p>
}

/**
 * Grille de cartes de la maquette : une colonne en mobile, deux dès `sm`,
 * puis `columns` au-delà. Rendue en liste pour que les lecteurs d'écran
 * annoncent le nombre d'éléments.
 */
export function CardGrid({
  children,
  columns = 3,
  className = "",
}: {
  children: ReactNode
  columns?: 2 | 3 | 4
  className?: string
}) {
  const wide = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }
  return (
    <ul role="list" className={`grid gap-[18px] ${wide[columns]} ${className}`}>
      {children}
    </ul>
  )
}

type SectionProps = {
  /** Sert d'ancre de navigation et de préfixe à l'id du titre. */
  id: string
  eyebrow: string
  title: string
  /** Paragraphe d'introduction optionnel, sous le titre. */
  intro?: string
  children: ReactNode
  /** Fond légèrement plus clair, alterné d'une section à l'autre. */
  alt?: boolean
}

/**
 * Section de la page avec son en-tête. Le titre est rendu ici plutôt que par
 * l'appelant, ce qui garantit que chaque `<section>` est reliée à son `<h2>`
 * via `aria-labelledby` : les lecteurs d'écran nomment alors chaque repère.
 */
export function Section({ id, eyebrow, title, intro, children, alt = false }: SectionProps) {
  const titleId = `${id}-title`

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`border-line border-t ${alt ? "bg-ink-alt" : ""}`}
    >
      <Container className="py-16 sm:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          id={titleId}
          className="mt-3 max-w-[24ch] text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.15] font-semibold tracking-[-0.02em]"
        >
          {title}
        </h2>
        {intro ? (
          <p className="text-subtle mt-3.5 max-w-[52ch] text-base leading-relaxed">{intro}</p>
        ) : null}
        {children}
      </Container>
    </section>
  )
}
