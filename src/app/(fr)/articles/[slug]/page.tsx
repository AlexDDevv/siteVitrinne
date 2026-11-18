import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArticlePage, articleAlternates } from "@/components/article-page"
import { articles, getArticle } from "@/content/articles"
import { pageMetadata } from "@/lib/metadata"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.content.fr.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle("fr", (await params).slug)
  if (!article) return {}
  const c = article.content.fr
  return pageMetadata({
    lang: "fr",
    title: c.metaTitle,
    absoluteTitle: true,
    description: c.description,
    alternates: articleAlternates(article),
    type: "article",
  })
}

export default async function Page({ params }: Props) {
  const article = getArticle("fr", (await params).slug)
  if (!article) notFound()
  return <ArticlePage article={article} lang="fr" />
}
