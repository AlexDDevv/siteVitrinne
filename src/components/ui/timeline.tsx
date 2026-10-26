import type { ReactNode } from "react"

export type TimelineEntry = {
  title: string
  org: string
  dates: string
  /** Contenu additionnel sous l'entrée, ex. un lien vers une étude de cas. */
  extra?: ReactNode
}

/** Frise verticale : un trait, un point ambre par entrée, dates en monospace. */
export function Timeline({ items }: { items: TimelineEntry[] }) {
  return (
    <ol role="list" className="border-line-strong grid gap-8 border-l pl-6 sm:pl-8">
      {items.map((item) => (
        <li key={`${item.title}-${item.dates}`} className="relative grid gap-1.5">
          <span
            aria-hidden
            className="bg-amber ring-ink absolute top-[7px] -left-[29px] size-2.5 rounded-full ring-4 sm:-left-[37px]"
          />
          <p className="text-faint font-mono text-[13px] tracking-[0.02em]">{item.dates}</p>
          <h3 className="text-[19px] leading-snug font-semibold">{item.title}</h3>
          <p className="text-muted text-[15.5px] leading-[1.6]">{item.org}</p>
          {item.extra}
        </li>
      ))}
    </ol>
  )
}
