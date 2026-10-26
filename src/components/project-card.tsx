import type { ReactNode } from "react"
import { TagList } from "@/components/ui/card"
import { ProjectLinks } from "@/components/ui/project-links"
import { Body } from "@/components/ui/section"
import { StatusBadge } from "@/components/ui/status-badge"
import { paths, ui, type Lang } from "@/content/i18n"
import type { Project } from "@/types/project"

/**
 * Carte d'une étude de cas, partagée par l'accueil, /parcours et les pages projet.
 * Toute la carte mène à l'étude de cas ; les liens Code / Démo restent cliquables
 * au-dessus du lien étiré.
 */
export function ProjectCard({
  project,
  lang,
  children,
}: {
  project: Project
  lang: Lang
  /** Contenu additionnel entre le résumé et la stack. */
  children?: ReactNode
}) {
  const t = ui[lang]
  const content = project.content[lang]
  const href = paths.project(lang, project.slug)

  return (
    <article className="bg-surface border-line-strong shadow-card hover:border-line-hover hover:shadow-card-raised relative grid h-full content-start gap-3.5 rounded-xl border p-6 transition-[box-shadow,border-color] sm:p-[26px]">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="text-faint font-mono text-[13px]">{content.dates}</p>
        {project.status ? <StatusBadge status={project.status} lang={lang} /> : null}
      </div>
      <h3 className="text-[22px] font-semibold">
        <a href={href} className="after:absolute after:inset-0 after:rounded-xl">
          {content.title}
        </a>
      </h3>
      <Body>{content.summary}</Body>
      {children}
      <TagList
        items={project.stack}
        muted
        label={t.technologiesOf(content.title)}
        className="gap-1.5"
      />
      <div className="mt-1 flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
        <p aria-hidden className="text-accent text-[15px] font-medium">
          {t.readCaseStudy} →
        </p>
        <ProjectLinks
          repo={project.repo}
          demo={project.demo}
          lang={lang}
          className="relative z-10"
        />
      </div>
    </article>
  )
}
