import { paths } from "@/content/i18n"
import { offres } from "@/lib/offres"
import { projects } from "@/content/projects"
import { site } from "@/lib/site"

const personId = `${site.url}/#person`
const businessId = `${site.url}/#business`

/**
 * Graphe Schema.org du site : identité, activité et catalogue d'offres.
 * Pas de prix : chaque mission fait l'objet d'une proposition écrite.
 */
export function buildStructuredData() {
  const sameAs = [site.links.malt, site.links.linkedin, site.links.github]

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        jobTitle: site.role,
        email: `mailto:${site.email}`,
        url: site.url,
        sameAs,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          postalCode: site.postalCode,
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
          "Développement full-stack",
          "Développement de MVP",
          "Performance web",
        ],
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name: "Concepteur Développeur d'Applications",
          credentialCategory: "RNCP niveau 6",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": businessId,
        name: `${site.name}, ${site.role}`,
        description:
          "MVP, refonte et performance d'applications web, sous-traitance pour agences et renfort technique, par un développeur full-stack freelance React / TypeScript / NestJS basé près de Lyon.",
        url: site.url,
        image: `${site.url}/opengraph-image`,
        email: `mailto:${site.email}`,
        founder: { "@id": personId },
        sameAs,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          postalCode: site.postalCode,
          addressRegion: site.region,
          addressCountry: site.country,
        },
        areaServed: [
          { "@type": "City", name: site.area },
          { "@type": "City", name: site.city },
          { "@type": "Country", name: "France" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Prestations",
          itemListElement: offres.map((offre) => ({
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
        inLanguage: "fr-FR",
        publisher: { "@id": personId },
      },
      ...projects.map((project) => ({
        "@type": "CreativeWork",
        name: project.content.fr.title,
        description: project.content.fr.summary,
        url: `${site.url}${paths.project("fr", project.slug)}`,
        author: { "@id": personId },
        keywords: project.stack.join(", "),
        ...(project.repo ? { codeRepository: project.repo } : {}),
      })),
    ],
  }
}
