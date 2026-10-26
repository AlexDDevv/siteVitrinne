import { home } from "@/content/home"
import { htmlLang, paths, ui, type Lang } from "@/content/i18n"
import { profile } from "@/content/profile"
import { projects } from "@/content/projects"
import { site } from "@/lib/site"
import type { Project } from "@/types/project"

const personId = `${site.url}/#person`
const businessId = `${site.url}/#business`
const websiteId = `${site.url}/#website`
const todoMarker = "[À COMPLÉTER"

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
        "@id": websiteId,
        url: site.url,
        name: site.name,
        inLanguage: [htmlLang.fr, htmlLang.en],
        publisher: { "@id": personId },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#${c.ids.faq}`,
        url,
        inLanguage: htmlLang[lang],
        isPartOf: { "@id": websiteId },
        // Une réponse encore à compléter n'est pas publiée dans le balisage.
        mainEntity: c.faq.items
          .filter((item) => !item.answer.some((paragraph) => paragraph.includes(todoMarker)))
          .map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer.join(" ") },
          })),
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

/**
 * Auteur des pages hors accueil : référence au `Person` du graphe de l'accueil
 * par son `@id`, avec le nom pour rester lisible sans ce graphe.
 */
const author = { "@type": "Person", "@id": personId, name: site.name, url: site.url }

/** Fil d'Ariane Accueil › page, dans la langue de la page. */
function breadcrumb(lang: Lang, url: string, name: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: ui[lang].home,
        item: `${site.url}${paths.home[lang]}`,
      },
      { "@type": "ListItem", position: 2, name, item: url },
    ],
  }
}

/** Graphe d'une étude de cas : l'article et son fil d'Ariane. */
export function buildProjectStructuredData(project: Project, lang: Lang) {
  const c = project.content[lang]
  const url = `${site.url}${paths.project(lang, project.slug)}`
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: `${c.title}, ${ui[lang].caseStudy.toLowerCase()}`,
        description: c.summary,
        url,
        mainEntityOfPage: url,
        image: `${url}/opengraph-image`,
        inLanguage: htmlLang[lang],
        author,
        publisher: { "@id": personId },
        isPartOf: { "@id": websiteId },
        keywords: project.stack.join(", "),
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      breadcrumb(lang, url, c.title),
    ],
  }
}

/** Graphe de /parcours et /en/profile : une page profil dont le sujet est le `Person`. */
export function buildProfileStructuredData(lang: Lang) {
  const p = profile[lang]
  const url = `${site.url}${paths.profile[lang]}`
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": url,
        url,
        name: `${site.name} · ${p.subtitle}`,
        description: p.intro,
        inLanguage: htmlLang[lang],
        isPartOf: { "@id": websiteId },
        mainEntity: { ...author, jobTitle: p.subtitle },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      breadcrumb(lang, url, site.name),
    ],
  }
}
