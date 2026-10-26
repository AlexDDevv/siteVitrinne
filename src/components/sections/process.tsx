import { Section } from "@/components/ui/section"
import { home } from "@/content/home"
import type { Lang } from "@/content/i18n"

export function Process({ lang }: { lang: Lang }) {
  const c = home[lang]
  return (
    <Section id={c.ids.process} alt eyebrow={c.process.eyebrow} title={c.process.title}>
      {/* <ol> plutôt qu'<ul> : l'ordre des étapes porte le sens. */}
      <ol className="mt-11 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {c.process.steps.map((step, index) => (
          <li
            key={step.title}
            className={`grid content-start gap-3 border-t-2 pt-[18px] ${
              index === 0 ? "border-accent" : "border-line-input"
            }`}
          >
            <span
              aria-hidden
              className={`font-mono text-[13px] ${index === 0 ? "text-accent" : "text-subtle"}`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-[17.5px] font-semibold">{step.title}</h3>
            <p className="text-muted text-[15px] leading-[1.6]">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
