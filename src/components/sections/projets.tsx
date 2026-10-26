import { ProjectCard } from "@/components/project-card"
import { CardGrid, Section } from "@/components/ui/section"
import { home } from "@/content/home"
import type { Lang } from "@/content/i18n"
import { projects } from "@/content/projects"

export function Projets({ lang }: { lang: Lang }) {
  const c = home[lang]
  return (
    <Section
      id={c.ids.projects}
      alt
      eyebrow={c.projects.eyebrow}
      title={c.projects.title}
      intro={c.projects.intro}
    >
      <CardGrid columns={3} className="mt-10">
        {projects.map((project) => {
          const highlights = project.content[lang].highlights
          return (
            <li key={project.slug} className="grid">
              <ProjectCard project={project} lang={lang}>
                {highlights ? (
                  <div className="border-line-strong grid gap-2 border-t pt-3.5">
                    <p className="text-faint font-mono text-xs tracking-[0.14em] uppercase">
                      {c.projects.highlights}
                    </p>
                    <ul role="list" className="grid gap-2">
                      {highlights.map((item) => (
                        <li
                          key={item}
                          className="text-muted flex gap-2.5 text-[14.5px] leading-[1.55]"
                        >
                          <span aria-hidden className="text-accent shrink-0 font-mono">
                            →
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </ProjectCard>
            </li>
          )
        })}
      </CardGrid>
    </Section>
  )
}
