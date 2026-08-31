import { TagList } from "@/components/ui/card"
import { Body, CardGrid, Section } from "@/components/ui/section"
import { TextLink } from "@/components/ui/text-link"
import { projects } from "@/lib/projects"

export function Projets() {
  return (
    <Section
      id="projets"
      alt
      eyebrow="03 · Projets"
      title="Des projets en ligne, pas des maquettes"
    >
      <CardGrid columns={2} className="mt-10">
        {projects.map((project) => (
          <li key={project.title} className="grid">
            <article className="bg-surface border-line-strong grid content-start gap-3.5 rounded-xl border p-6 sm:p-[26px]">
              <h3 className="text-[22px] font-semibold">{project.title}</h3>
              <Body>{project.description}</Body>
              <TagList
                items={project.stack}
                muted
                label={`Technologies de ${project.title}`}
                className="gap-1.5"
              />
              {project.links.length > 0 ? (
                <ul role="list" className="flex flex-wrap gap-x-5 gap-y-2">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <TextLink href={link.href} external arrow className="text-[15px] font-medium">
                        {link.label}
                      </TextLink>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          </li>
        ))}
      </CardGrid>
    </Section>
  )
}
