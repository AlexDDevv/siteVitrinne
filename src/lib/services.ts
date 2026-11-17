import type { Metadata } from "next"
import type { Alternates, Lang } from "@/content/i18n"
import { paths } from "@/content/i18n"
import { getService, type Service, type ServiceKey } from "@/content/services"
import { pageMetadata } from "@/lib/metadata"
import { renderOgImage } from "@/lib/og"

/** Équivalents FR / EN d'une page service. */
export function serviceAlternates(service: Service): Alternates {
  return {
    fr: paths.service("fr", service.content.fr.slug),
    en: paths.service("en", service.content.en.slug),
  }
}

/** Metadata d'une page service : le title est complet, sans suffixe ajouté. */
export function serviceMetadata(key: ServiceKey, lang: Lang): Metadata {
  const service = getService(key)
  const c = service.content[lang]
  return pageMetadata({
    lang,
    title: c.metaTitle,
    absoluteTitle: true,
    description: c.metaDescription,
    alternates: serviceAlternates(service),
  })
}

/** Image Open Graph d'une page service. */
export function serviceOgImage(key: ServiceKey, lang: Lang) {
  const { og } = getService(key).content[lang]
  return renderOgImage({
    kicker: og.kicker,
    title: "Alexis Delporte",
    subtitle: og.subtitle,
    footer: og.footer,
  })
}
