import { getProject, projects } from "@/content/projects"
import { renderOgImage } from "@/lib/og"

export { ogSize as size } from "@/lib/og"
export const contentType = "image/png"
export const alt = "Case study · Alexis Delporte"

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug)
  const content = project?.content.en
  return renderOgImage({
    kicker: "Case study · Alexis Delporte",
    title: content?.title ?? "Alexis Delporte",
    subtitle: project?.stack.slice(0, 5).join(" · ") ?? "",
    footer: content?.dates ?? "",
  })
}
