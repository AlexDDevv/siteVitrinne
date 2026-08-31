import Image from "next/image"
import { TagList } from "@/components/ui/card"
import { Body, CardGrid, Section } from "@/components/ui/section"
import { TextLink } from "@/components/ui/text-link"
import { projects } from "@/lib/projects"
import type { Project } from "@/types/project"

/** Visuel de la carte : capture réelle si elle existe, sinon le placeholder rayé de la maquette. */
function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="border-line-strong relative h-40 border-b">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(max-width: 640px) 100vw, 520px"
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div
      aria-hidden
      className="border-line-strong flex h-40 items-center justify-center border-b bg-[repeating-linear-gradient(135deg,#221E18_0_8px,#1A1712_8px_16px)]"
    >
      <span className="text-faint font-mono text-[11.5px] tracking-[0.06em]">
        {project.imagePlaceholder}
      </span>
    </div>
  )
}

export function Projets() {
  return (
    <Section
      id="projets"
      alt
      eyebrow="03 — Projets"
      title="Des projets en ligne, pas des maquettes"
    >
      <CardGrid columns={2} className="mt-10">
        {projects.map((project) => (
          <li key={project.title} className="grid">
            <article className="bg-surface border-line-strong grid content-start overflow-hidden rounded-xl border">
              <ProjectVisual project={project} />
              <div className="grid gap-3.5 p-6 sm:p-[26px]">
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
                        <TextLink
                          href={link.href}
                          external
                          arrow
                          className="text-[15px] font-medium"
                        >
                          {link.label}
                        </TextLink>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          </li>
        ))}
      </CardGrid>
    </Section>
  )
}
