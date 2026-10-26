import type { ReactNode } from "react"
import { PageShell } from "@/components/page-shell"
import { ProjectCard } from "@/components/project-card"
import { TagList } from "@/components/ui/card"
import { Gallery } from "@/components/ui/gallery"
import { ProjectLinks } from "@/components/ui/project-links"
import { CardGrid, Container, Eyebrow } from "@/components/ui/section"
import { StatusBadge } from "@/components/ui/status-badge"
import { WithTodos } from "@/components/ui/todo"
import { paths, ui, type Lang } from "@/content/i18n"
import { projects } from "@/content/projects"
import type { Project } from "@/types/project"

/**
 * Étude de cas, rédigée de façon neutre pour les clients comme pour les
 * recruteurs : Contexte / Problème / Ce que j'ai fait / Résultat / Stack / Liens.
 */
export function ProjectPage({ project, lang }: { project: Project; lang: Lang }) {
  const t = ui[lang]
  const c = project.content[lang]
  const others = projects.filter((other) => other.slug !== project.slug)
  const hasLinks = Boolean(project.repo || project.demo)

  // Numérotation continue : les blocs absents (liens, aperçus) ne laissent pas de trou.
  const blocks: { id: string; title: string; content: ReactNode }[] = [
    { id: "contexte", title: t.context, content: <Paragraphs items={c.context} /> },
    { id: "probleme", title: t.problem, content: <Paragraphs items={c.problem} /> },
    {
      id: "realisation",
      title: t.work,
      content: (
        <div className="grid gap-10">
          <ul role="list" className="grid gap-3.5">
            {c.work.map((item) => (
              <li key={item} className="text-muted flex gap-3 text-[15.5px] leading-[1.7]">
                <span aria-hidden className="text-accent mt-[0.1em] shrink-0 font-mono">
                  →
                </span>
                <span>
                  <WithTodos text={item} />
                </span>
              </li>
            ))}
          </ul>
          {c.technical.length > 0 ? (
            <div className="grid gap-5">
              <h3 className="text-[19px] font-semibold">{t.technical}</h3>
              <dl className="grid gap-5">
                {c.technical.map((entry) => (
                  <div key={entry.label} className="border-line-strong grid gap-2 border-l-2 pl-5">
                    <dt className="text-accent font-mono text-[13px] tracking-[0.04em]">
                      {entry.label}
                    </dt>
                    <dd className="text-muted text-[15px] leading-[1.7]">{entry.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </div>
      ),
    },
    { id: "resultat", title: t.result, content: <Paragraphs items={c.result} /> },
    {
      id: "stack",
      title: t.stack,
      content: <TagList items={project.stack} label={t.technologiesOf(c.title)} />,
    },
    ...(hasLinks
      ? [
          {
            id: "liens",
            title: t.links,
            content: <ProjectLinks repo={project.repo} demo={project.demo} lang={lang} />,
          },
        ]
      : []),
    ...(c.gallery.length > 0
      ? [
          {
            id: "apercus",
            title: t.previews,
            content: <Gallery items={c.gallery} lang={lang} idPrefix={`${project.slug}-shot`} />,
          },
        ]
      : []),
  ]

  return (
    <PageShell
      lang={lang}
      alternates={{ fr: paths.project("fr", project.slug), en: paths.project("en", project.slug) }}
      contactHref={lang === "fr" ? "/#contact" : `${paths.profile.en}#contact`}
    >
      <article aria-labelledby="project-title">
        <header>
          <Container className="grid gap-6 py-20 sm:py-24">
            <Eyebrow>{t.caseStudy}</Eyebrow>
            <h1
              id="project-title"
              className="text-[clamp(2.375rem,7vw,4.25rem)] leading-[1.03] font-semibold tracking-[-0.03em]"
            >
              {c.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-accent font-mono text-[15px] tracking-[0.02em]">{c.dates}</p>
              {project.status ? <StatusBadge status={project.status} lang={lang} /> : null}
            </div>
            <p className="max-w-[44ch] text-[clamp(1.1875rem,2.6vw,1.5rem)] leading-[1.5] text-pretty">
              {c.summary}
            </p>
            <ProjectLinks repo={project.repo} demo={project.demo} lang={lang} />
          </Container>
        </header>

        {blocks.map((block, i) => (
          <section
            key={block.id}
            id={block.id}
            aria-labelledby={`${block.id}-title`}
            className={`border-line border-t ${i % 2 === 0 ? "bg-ink-alt" : ""}`}
          >
            <Container className="grid gap-6 py-12 sm:py-16 md:grid-cols-[220px_1fr] md:gap-12">
              <div className="grid content-start gap-2">
                <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
                <h2
                  id={`${block.id}-title`}
                  className="text-[clamp(1.5rem,3vw,1.875rem)] leading-[1.2] font-semibold tracking-[-0.02em]"
                >
                  {block.title}
                </h2>
              </div>
              <div className="max-w-[760px] min-w-0">{block.content}</div>
            </Container>
          </section>
        ))}
      </article>

      <section aria-labelledby="others-title" className="border-line border-t">
        <Container className="py-16 sm:py-20">
          <h2
            id="others-title"
            className="text-[clamp(1.5rem,3vw,1.875rem)] leading-[1.2] font-semibold tracking-[-0.02em]"
          >
            {t.otherProjects}
          </h2>
          <CardGrid columns={2} className="mt-8">
            {others.map((other) => (
              <li key={other.slug} className="grid">
                <ProjectCard project={other} lang={lang} />
              </li>
            ))}
          </CardGrid>
        </Container>
      </section>
    </PageShell>
  )
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="grid gap-4">
      {items.map((text) => (
        <p key={text} className="text-muted text-[16.5px] leading-[1.7]">
          <WithTodos text={text} />
        </p>
      ))}
    </div>
  )
}
