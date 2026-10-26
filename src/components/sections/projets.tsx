import { ProjectCard } from "@/components/project-card"
import { CardGrid, Section } from "@/components/ui/section"
import { projects } from "@/content/projects"

export function Projets() {
  return (
    <Section
      id="projets"
      alt
      eyebrow="03 · Projets"
      title="Des projets en ligne, pas des maquettes"
    >
      <CardGrid columns={3} className="mt-10">
        {projects.map((project) => (
          <li key={project.slug} className="grid">
            <ProjectCard project={project} lang="fr" />
          </li>
        ))}
      </CardGrid>
    </Section>
  )
}
