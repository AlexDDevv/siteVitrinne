import { ArticlesIndexPage } from "@/components/article-page"
import { articlesIndex } from "@/content/articles"
import { paths } from "@/content/i18n"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  lang: "en",
  title: articlesIndex.en.metaTitle,
  absoluteTitle: true,
  description: articlesIndex.en.description,
  alternates: paths.articles,
})

export default function Page() {
  return <ArticlesIndexPage lang="en" />
}
