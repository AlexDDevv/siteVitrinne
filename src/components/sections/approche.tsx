import { TagList } from "@/components/ui/card"
import { Body, Section } from "@/components/ui/section"
import { TextLink } from "@/components/ui/text-link"
import { home } from "@/content/home"
import { paths, type Lang } from "@/content/i18n"

/** Met en gras le passage `strong` du texte, s'il y figure. */
function Emphasis({ text, strong }: { text: string; strong?: string }) {
  if (!strong || !text.includes(strong)) return text
  const [before, after] = text.split(strong)
  return (
    <>
      {before}
      <strong className="text-cream font-semibold">{strong}</strong>
      {after}
    </>
  )
}

export function Approche({ lang }: { lang: Lang }) {
  const c = home[lang]
  return (
    <Section id={c.ids.why} eyebrow={c.why.eyebrow} title={c.why.title}>
      <ul role="list" className="mt-11 grid gap-x-11 gap-y-6 sm:grid-cols-2">
        {c.why.items.map((atout, index) => (
          <li
            key={atout.title}
            className={`grid content-start gap-2.5 border-t pt-5 ${
              index === 0 ? "border-accent" : "border-line-strong"
            }`}
          >
            <h3 className="text-[18px] font-semibold">{atout.title}</h3>
            <Body>
              <Emphasis text={atout.body} strong={atout.strong} />
            </Body>
            {atout.caseStudy ? (
              <p>
                <TextLink
                  href={paths.project(lang, atout.caseStudy)}
                  arrow
                  className="text-[15px] font-medium"
                >
                  {atout.linkLabel}
                </TextLink>
              </p>
            ) : null}
          </li>
        ))}
      </ul>

      <TagList items={c.why.stack} label={c.why.stackLabel} className="mt-10" />
    </Section>
  )
}
