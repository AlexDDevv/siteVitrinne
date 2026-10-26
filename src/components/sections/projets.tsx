import { ProjectCard } from "@/components/project-card"
import { CardGrid, Section } from "@/components/ui/section"
import { projects } from "@/content/projects"

export function Projets() {
  return (
    <Section
      id="projets"
      alt
      eyebrow="03 · Projets"
      title="Trois études de cas, du contexte au résultat"
      intro="Un logiciel en production chez Likewatt, une plateforme en ligne, une application mobile en cours. Chacune détaille le problème, les choix techniques et le résultat."
    >
      <CardGrid columns={3} className="mt-10">
        {projects.map((project) => {
          const highlights = project.content.fr.highlights
          return (
            <li key={project.slug} className="grid">
              <ProjectCard project={project} lang="fr">
                {highlights ? (
                  <div className="border-line-strong grid gap-2 border-t pt-3.5">
                    <p className="text-faint font-mono text-xs tracking-[0.14em] uppercase">
                      Ce que ça montre
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
