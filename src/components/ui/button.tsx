import type { ComponentPropsWithoutRef, ReactNode } from "react"

type Variant = "primary" | "outline" | "pill"

const variants: Record<Variant, string> = {
  /** CTA principal : ambre plein. */
  primary: "bg-amber text-ink hover:bg-amber-light rounded-lg px-6 py-4 font-semibold",
  /** CTA secondaire : bordure neutre sur le fond de la page. */
  outline: "border-line-input hover:border-subtle rounded-lg border px-6 py-4 font-medium",
  /** Bouton compact de la barre de navigation. */
  pill: "border-amber text-amber hover:bg-amber hover:text-ink rounded-full border px-3.5 py-2 font-medium",
}

const base = "inline-block text-center text-base transition-colors"

type ButtonLinkProps = {
  href: string
  variant?: Variant
  children: ReactNode
  className?: string
  /** Ouvre dans un nouvel onglet, avec `rel` sécurisé et la mention lue par les lecteurs d'écran. */
  external?: boolean
  /** Flèche décorative « → ». */
  arrow?: boolean
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className">

/** Bouton d'action rendu en lien — ancre interne ou URL externe. */
export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  external = false,
  arrow = false,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {arrow ? <span aria-hidden> →</span> : null}
      {external ? <span className="sr-only"> (nouvel onglet)</span> : null}
    </a>
  )
}

type ButtonProps = {
  variant?: Variant
  children: ReactNode
  className?: string
} & Omit<ComponentPropsWithoutRef<"button">, "className">

export function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
