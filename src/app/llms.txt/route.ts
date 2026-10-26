import { home } from "@/content/home"
import { paths, type Lang } from "@/content/i18n"
import { projects } from "@/content/projects"
import { site } from "@/lib/site"

/** Généré au build : un fichier statique, servi comme public/llms.txt. */
export const dynamic = "force-static"

const heading = {
  fr: {
    services: "Services",
    rates: "Tarifs",
    area: "Zone d'intervention",
    caseStudies: "Études de cas",
    links: "Liens",
    colon: " : ",
    profile: "Parcours, expériences et formations",
    faq: "Questions fréquentes (coût, délais, agences, stack, code)",
  },
  en: {
    services: "Services (English)",
    rates: "Rates (English)",
    area: "Area (English)",
    caseStudies: "Case studies (English)",
    links: "Links (English)",
    colon: ": ",
    profile: "Profile, experience and education",
    faq: "FAQ (cost, timelines, agencies, stack, code)",
  },
} satisfies Record<Lang, unknown>

/**
 * Une langue du site, résumée en sections `##` : le format llms.txt n'admet
 * qu'un seul titre `#`, d'où le suffixe « (English) » sur les sections anglaises.
 */
function section(lang: Lang) {
  const c = home[lang]
  const t = heading[lang]
  const homeUrl = `${site.url}${paths.home[lang]}`
  return [
    `## ${t.services}`,
    ...c.offer.items.map((offer) => `- ${offer.title}${t.colon}${offer.description}`),
    "",
    `## ${t.rates}`,
    c.rates.intro,
    ...c.rates.tiers.map((tier) => `- ${tier.title}${t.colon}${tier.price}`),
    "",
    `## ${t.area}`,
    c.hero.location(site.city, site.area),
    "",
    `## ${t.caseStudies}`,
    ...projects.map(
      (project) =>
        `- [${project.content[lang].title}](${site.url}${paths.project(lang, project.slug)}): ${project.content[lang].summary}`
    ),
    "",
    `## ${t.links}`,
    `- [${t.profile}](${site.url}${paths.profile[lang]})`,
    `- [${t.faq}](${homeUrl}#${c.ids.faq})`,
    `- [Contact](${homeUrl}#${c.ids.contact})`,
  ]
}

export function GET() {
  const body = [
    `# ${site.name}`,
    "",
    `> ${home.fr.role} (React, TypeScript, NestJS) basé à ${site.city}, près de ${site.area}. ${home.fr.hero.lead}`,
    "",
    `> ${home.en.role} (React, TypeScript, NestJS) based in ${site.city}, near ${site.area}, France. ${home.en.hero.lead}`,
    "",
    `- Email${heading.fr.colon}${site.email}`,
    `- ${site.links.malt}`,
    `- ${site.links.linkedin}`,
    `- ${site.links.github}`,
    "",
    ...section("fr"),
    "",
    ...section("en"),
    "",
  ].join("\n")

  return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } })
}
