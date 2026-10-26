import { home } from "@/content/home"
import { htmlLang, paths, type Lang } from "@/content/i18n"
import { projects } from "@/content/projects"
import { site } from "@/lib/site"

const personId = `${site.url}/#person`
const businessId = `${site.url}/#business`

const copy = {
  fr: {
    knowsAbout: ["Développement full-stack", "Développement de MVP", "Performance web"],
    credential: "Concepteur Développeur d'Applications",
    credentialCategory: "RNCP niveau 6",
    business:
      "MVP, refonte et performance d'applications web, sous-traitance pour agences et renfort technique, par un développeur full-stack freelance React / TypeScript / NestJS basé près de Lyon.",
    catalog: "Prestations",
  },
  en: {
    knowsAbout: ["Full-stack development", "MVP development", "Web performance"],
    credential: "Application Designer-Developer",
    credentialCategory: "RNCP level 6 (France)",
    business:
      "MVPs, rebuilds and performance work on web applications, white-label subcontracting for agencies and technical support, by a freelance React / TypeScript / NestJS full-stack developer based near Lyon, France.",
    catalog: "Services",
  },
} satisfies Record<Lang, unknown>

/**
 * Graphe Schema.org de l'accueil, dans la langue de la page : identité,
 * activité et catalogue d'offres (sans prix : chaque mission fait l'objet
 * d'une proposition écrite).
 */
export function buildStructuredData(lang: Lang) {
  const c = home[lang]
  const t = copy[lang]
  const url = `${site.url}${lang === "fr" ? "" : paths.home.en}`
  const sameAs = [site.links.malt, site.links.linkedin, site.links.github]
  const address = {
    "@type": "PostalAddress",
    addressLocality: site.city,
    postalCode: site.postalCode,
    addressRegion: site.region,
    addressCountry: site.country,
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        jobTitle: c.role,
        email: `mailto:${site.email}`,
        url,
        sameAs,
        address,
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "NestJS",
          "React Native",
          "PostgreSQL",
          "MongoDB",
          ...t.knowsAbout,
        ],
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name: t.credential,
          credentialCategory: t.credentialCategory,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": businessId,
        name: `${site.name}, ${c.role}`,
        description: t.business,
        url,
        image: `${url}/opengraph-image`,
        email: `mailto:${site.email}`,
        founder: { "@id": personId },
        sameAs,
        address,
        areaServed: [
          { "@type": "City", name: site.area },
          { "@type": "Country", name: "France" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t.catalog,
          itemListElement: c.offer.items.map((offre) => ({
            "@type": "Offer",
            name: offre.title,
            description: offre.description,
            itemOffered: { "@type": "Service", name: offre.title, serviceType: offre.title },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: [htmlLang.fr, htmlLang.en],
        publisher: { "@id": personId },
      },
      ...projects.map((project) => ({
        "@type": "CreativeWork",
        name: project.content[lang].title,
        description: project.content[lang].summary,
        url: `${site.url}${paths.project(lang, project.slug)}`,
        inLanguage: htmlLang[lang],
        author: { "@id": personId },
        keywords: project.stack.join(", "),
        ...(project.repo ? { codeRepository: project.repo } : {}),
      })),
    ],
  }
}
