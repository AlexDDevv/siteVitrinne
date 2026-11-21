import { LegalPage } from "@/components/legal-page"
import { paths } from "@/content/i18n"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata = pageMetadata({
  lang: "fr",
  title: "Mentions légales",
  description: `Mentions légales et politique de confidentialité du site personnel de ${site.name}, développeur full-stack.`,
  alternates: paths.legal,
})

export default function MentionsLegales() {
  return <LegalPage lang="fr" />
}
