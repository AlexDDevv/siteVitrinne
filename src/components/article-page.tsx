import { Fragment } from "react"
import { PageShell } from "@/components/page-shell"
import { StructuredData } from "@/components/structured-data"
import { Container, Eyebrow } from "@/components/ui/section"
import { TextLink } from "@/components/ui/text-link"
import { articles, articlesIndex, type Article, type ArticleBlock } from "@/content/articles"
import { htmlLang, paths, ui, type Alternates, type Lang } from "@/content/i18n"
import { getProject } from "@/content/projects"
import { buildArticleStructuredData, buildArticlesIndexStructuredData } from "@/lib/structured-data"

/** Texte où les passages entre backticks sont rendus en `<code>`. */
function Inline({ text }: { text: string }) {
  return text.split(/(`[^`]+`)/).map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code key={i} className="bg-ink-alt text-cream rounded px-1.5 py-0.5 font-mono text-[0.88em]">
        {part.slice(1, -1)}
      </code>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  )
}

function formatDate(date: string, lang: Lang) {
  return new Date(date).toLocaleDateString(htmlLang[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function articleAlternates(article: Article): Alternates {
  return {
    fr: paths.article("fr", article.content.fr.slug),
    en: paths.article("en", article.content.en.slug),
  }
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          id={block.id}
          className="mt-8 scroll-mt-24 text-[clamp(1.375rem,2.6vw,1.75rem)] leading-[1.25] font-semibold tracking-[-0.02em]"
        >
          {block.text}
        </h2>
      )
    case "p":
      return (
        <p className="text-muted text-[17px] leading-[1.75]">
          <Inline text={block.text} />
        </p>
      )
    case "ul":
      return (
        <ul role="list" className="grid gap-3">
          {block.items.map((item) => (
            <li key={item} className="text-muted flex gap-3 text-[17px] leading-[1.7]">
              <span aria-hidden className="text-accent mt-[0.1em] shrink-0 font-mono">
                →
              </span>
              <span>
                <Inline text={item} />
              </span>
            </li>
          ))}
        </ul>
      )
  }
}

/** Article technique : titre, points clés, corps, lien vers l'étude de cas. */
export function ArticlePage({ article, lang }: { article: Article; lang: Lang }) {
  const t = articlesIndex[lang]
  const c = article.content[lang]
  const project = article.project ? getProject(article.project) : undefined

  return (
    <>
      <StructuredData data={buildArticleStructuredData(article, lang)} />
      <PageShell lang={lang} alternates={articleAlternates(article)}>
        <article aria-labelledby="article-title">
          <Container className="py-16 sm:py-20">
            <div className="mx-auto grid max-w-[720px] gap-7">
              <TextLink href={paths.articles[lang]} tone="subtle" className="font-mono text-[13px]">
                <span aria-hidden>←</span> {t.back}
              </TextLink>
              <header className="grid gap-5">
                <h1
                  id="article-title"
                  className="text-[clamp(1.875rem,4.6vw,2.75rem)] leading-[1.12] font-semibold tracking-[-0.025em] text-pretty"
                >
                  {c.title}
                </h1>
                <p className="text-subtle font-mono text-[13px]">
                  {t.published}{" "}
                  <time dateTime={article.publishedAt}>
                    {formatDate(article.publishedAt, lang)}
                  </time>
                  {article.updatedAt !== article.publishedAt ? (
                    <>
                      {" · "}
                      {t.updated}{" "}
                      <time dateTime={article.updatedAt}>
                        {formatDate(article.updatedAt, lang)}
                      </time>
                    </>
                  ) : null}
                  {" · "}
                  {t.minutes(article.readingMinutes)}
                </p>
                <p className="text-[clamp(1.125rem,2.2vw,1.3125rem)] leading-[1.6] text-pretty">
                  {c.lead}
                </p>
              </header>

              <aside
                aria-labelledby="takeaways-title"
                className="bg-surface border-line-strong shadow-card grid gap-4 rounded-xl border p-6"
              >
                <Eyebrow>
                  <span id="takeaways-title">{t.takeaways}</span>
                </Eyebrow>
                <ul role="list" className="grid gap-3">
                  {c.takeaways.map((item) => (
                    <li key={item} className="text-muted flex gap-3 text-[15.5px] leading-[1.65]">
                      <span aria-hidden className="text-accent mt-[0.1em] shrink-0 font-mono">
                        →
                      </span>
                      <span>
                        <Inline text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              </aside>

              <div className="grid gap-5">
                {c.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>

              {project ? (
                <p className="border-line-strong border-t pt-7 text-[15.5px]">
                  <TextLink href={paths.project(lang, project.slug)} arrow className="font-medium">
                    {t.caseStudy}
                    {lang === "fr" ? " : " : ": "}
                    {project.content[lang].title}
                  </TextLink>
                </p>
              ) : null}
            </div>
          </Container>
        </article>
      </PageShell>
    </>
  )
}

/** Liste des articles (/articles et /en/articles). */
export function ArticlesIndexPage({ lang }: { lang: Lang }) {
  const t = articlesIndex[lang]
  return (
    <>
      <StructuredData data={buildArticlesIndexStructuredData(lang)} />
      <PageShell lang={lang} alternates={paths.articles}>
        <Container className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-[720px] gap-10">
            <header className="grid gap-4">
              <h1 className="text-[clamp(2.125rem,6vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
                {ui[lang].articles}
              </h1>
              <p className="text-subtle max-w-[52ch] text-[17px] leading-relaxed">{t.lead}</p>
            </header>
            <ul role="list" className="grid gap-6">
              {articles.map((article) => {
                const c = article.content[lang]
                return (
                  <li key={article.key}>
                    <article className="bg-surface border-line-strong shadow-card hover:border-line-hover hover:shadow-card-raised relative grid gap-3 rounded-xl border p-6 transition-[box-shadow,border-color] sm:p-7">
                      <p className="text-faint font-mono text-[13px]">
                        <time dateTime={article.publishedAt}>
                          {formatDate(article.publishedAt, lang)}
                        </time>
                        {" · "}
                        {t.minutes(article.readingMinutes)}
                      </p>
                      <h2 className="text-[21px] leading-[1.3] font-semibold">
                        <a
                          href={paths.article(lang, c.slug)}
                          className="after:absolute after:inset-0 after:rounded-xl"
                        >
                          {c.title}
                        </a>
                      </h2>
                      <p className="text-muted text-[15.5px] leading-[1.65]">{c.description}</p>
                      <p className="text-accent text-[15px] font-medium">
                        {t.read} <span aria-hidden>→</span>
                      </p>
                    </article>
                  </li>
                )
              })}
            </ul>
          </div>
        </Container>
      </PageShell>
    </>
  )
}
