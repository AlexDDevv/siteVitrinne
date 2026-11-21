import { articles, type Article } from "@/content/articles"
import { htmlLang, paths, ui, type Lang } from "@/content/i18n"
import { profile, profileUpdatedAt } from "@/content/profile"
import { projects } from "@/content/projects"
import { site } from "@/lib/site"
import type { Project } from "@/types/project"

const personId = `${site.url}/#person`
const websiteId = `${site.url}/#website`

const copy = {
  fr: {
    knowsAbout: ["Développement full-stack", "Architecture d'API", "Performance web"],
    credential: "Concepteur Développeur d'Applications",
    credentialCategory: "RNCP niveau 6",
  },
  en: {
    knowsAbout: ["Full-stack development", "API architecture", "Web performance"],
    credential: "Application Designer-Developer",
    credentialCategory: "RNCP level 6 (France)",
  },
} satisfies Record<Lang, unknown>

/**
 * Graphe Schema.org de l'accueil, dans la langue de la page : une page profil
 * dont le sujet est le `Person`, le site, et un `CreativeWork` par projet.
 */
export function buildHomeStructuredData(lang: Lang) {
  const p = profile[lang]
  const t = copy[lang]
  const url = `${site.url}${lang === "fr" ? "" : paths.home.en}`

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url,
        name: `${site.name} · ${p.subtitle}`,
        description: p.intro,
        inLanguage: htmlLang[lang],
        dateModified: profileUpdatedAt,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        jobTitle: site.role[lang],
        email: `mailto:${site.email}`,
        url,
        image: `${site.url}/opengraph-image`,
        sameAs: [site.links.linkedin, site.links.github],
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressRegion: site.region,
          addressCountry: site.country,
        },
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
        "@type": "WebSite",
        "@id": websiteId,
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
        image: `${site.url}/opengraph-image`,
        inLanguage: htmlLang[lang],
        dateModified: project.updatedAt,
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

/** Graphe d'un article : le BlogPosting et son fil d'Ariane (Accueil › Articles › article). */
export function buildArticleStructuredData(article: Article, lang: Lang) {
  const c = article.content[lang]
  const url = `${site.url}${paths.article(lang, c.slug)}`
  const listUrl = `${site.url}${paths.articles[lang]}`
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: c.title,
        description: c.description,
        url,
        mainEntityOfPage: url,
        image: `${site.url}/opengraph-image`,
        inLanguage: htmlLang[lang],
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        author,
        publisher: { "@id": personId },
        isPartOf: { "@id": websiteId },
        keywords: c.keywords.join(", "),
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: ui[lang].home,
            item: `${site.url}${paths.home[lang]}`,
          },
          { "@type": "ListItem", position: 2, name: ui[lang].articles, item: listUrl },
          { "@type": "ListItem", position: 3, name: c.title, item: url },
        ],
      },
    ],
  }
}

/** Graphe de la liste des articles. */
export function buildArticlesIndexStructuredData(lang: Lang) {
  const url = `${site.url}${paths.articles[lang]}`
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${url}#blog`,
        url,
        name: `${ui[lang].articles} · ${site.name}`,
        inLanguage: htmlLang[lang],
        publisher: { "@id": personId },
        isPartOf: { "@id": websiteId },
        blogPost: articles.map((article) => ({
          "@id": `${site.url}${paths.article(lang, article.content[lang].slug)}#article`,
        })),
      },
      breadcrumb(lang, url, ui[lang].articles),
    ],
  }
}
