import { articles } from "@/content/articles"
import { paths, type Lang } from "@/content/i18n"
import { cvPaths, profile } from "@/content/profile"
import { projects } from "@/content/projects"
import { site } from "@/lib/site"

/** Généré au build : un fichier statique, servi comme public/llms.txt. */
export const dynamic = "force-static"

const heading = {
  fr: {
    projects: "Projets et études de cas",
    articles: "Articles",
    links: "Liens",
    colon: " : ",
    home: "Portfolio, expériences et formations",
    cv: "CV (PDF)",
  },
  en: {
    projects: "Projects and case studies (English)",
    articles: "Articles (English)",
    links: "Links (English)",
    colon: ": ",
    home: "Portfolio, experience and education",
    cv: "Resume (PDF)",
  },
} satisfies Record<Lang, unknown>

/**
 * Une langue du site, résumée en sections `##` : le format llms.txt n'admet
 * qu'un seul titre `#`, d'où le suffixe « (English) » sur les sections anglaises.
 */
function section(lang: Lang) {
  const t = heading[lang]
  return [
    `## ${t.projects}`,
    ...projects.map(
      (project) =>
        `- [${project.content[lang].title}](${site.url}${paths.project(lang, project.slug)})${t.colon}${project.content[lang].summary}`
    ),
    "",
    `## ${t.articles}`,
    ...articles.map((article) => {
      const ac = article.content[lang]
      return `- [${ac.title}](${site.url}${paths.article(lang, ac.slug)})${t.colon}${ac.description}`
    }),
    "",
    `## ${t.links}`,
    `- [${t.home}](${site.url}${paths.home[lang]})`,
    `- [${t.cv}](${site.url}${cvPaths[lang]})`,
  ]
}

export function GET() {
  const body = [
    `# ${site.name}`,
    "",
    `> ${profile.fr.intro}`,
    "",
    `> ${profile.en.intro}`,
    "",
    `- Email${heading.fr.colon}${site.email}`,
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
