import { Body, Section } from "@/components/ui/section"
import { WithTodos } from "@/components/ui/todo"
import { home } from "@/content/home"
import type { Lang } from "@/content/i18n"

/**
 * Questions fréquentes, toutes dépliées : les réponses sont dans le HTML
 * visible, ce que demande le balisage FAQPage du JSON-LD.
 */
export function Faq({ lang }: { lang: Lang }) {
  const c = home[lang]
  return (
    <Section id={c.ids.faq} eyebrow={c.faq.eyebrow} title={c.faq.title}>
      <ul role="list" className="mt-11 grid gap-x-11 gap-y-8 sm:grid-cols-2">
        {c.faq.items.map((item) => (
          <li
            key={item.question}
            className="border-line-strong grid content-start gap-2.5 border-t pt-5"
          >
            <h3 className="text-[18px] font-semibold">{item.question}</h3>
            {item.answer.map((paragraph) => (
              <Body key={paragraph}>
                <WithTodos text={paragraph} />
              </Body>
            ))}
          </li>
        ))}
      </ul>
    </Section>
  )
}
