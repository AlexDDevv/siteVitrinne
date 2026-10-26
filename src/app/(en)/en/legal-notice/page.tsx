import { LegalPage } from "@/components/legal-page"
import { paths } from "@/content/i18n"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata = pageMetadata({
  lang: "en",
  title: "Legal notice",
  description: `Legal notice and privacy policy of the website of ${site.name}, full-stack developer based near Lyon, France.`,
  alternates: paths.legal,
})

export default function LegalNotice() {
  return <LegalPage lang="en" />
}
