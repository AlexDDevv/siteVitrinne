import { ArticlesIndexPage } from "@/components/article-page"
import { articlesIndex } from "@/content/articles"
import { paths } from "@/content/i18n"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  lang: "fr",
  title: articlesIndex.fr.metaTitle,
  absoluteTitle: true,
  description: articlesIndex.fr.description,
  alternates: paths.articles,
})

export default function Page() {
  return <ArticlesIndexPage lang="fr" />
}
