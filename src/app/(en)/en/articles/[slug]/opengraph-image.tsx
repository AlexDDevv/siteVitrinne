import { articles, getArticle } from "@/content/articles"
import { renderOgImage } from "@/lib/og"

export { ogSize as size } from "@/lib/og"
export const contentType = "image/png"
export const alt = "Article · Alexis Delporte"

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.content.en.slug }))
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getArticle("en", (await params).slug)?.content.en
  return renderOgImage({
    kicker: "Article · Alexis Delporte",
    title: c?.keywords.slice(1, 3).join(" · ") ?? "Article",
    subtitle: c?.title ?? "",
    footer: "alexisdelporte.dev",
  })
}
