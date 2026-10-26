import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProjectPage } from "@/components/project-page"
import { paths } from "@/content/i18n"
import { getProject, projects } from "@/content/projects"
import { pageMetadata } from "@/lib/metadata"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug)
  if (!project) return {}
  const content = project.content.fr
  return pageMetadata({
    lang: "fr",
    title: `${content.title}, étude de cas`,
    description: content.summary,
    alternates: { fr: paths.project("fr", project.slug), en: paths.project("en", project.slug) },
    type: "article",
  })
}

export default async function Page({ params }: Props) {
  const project = getProject((await params).slug)
  if (!project) notFound()
  return <ProjectPage project={project} lang="fr" />
}
