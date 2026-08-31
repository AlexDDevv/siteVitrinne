import { pricing } from "@/lib/pricing"
import { projects } from "@/lib/projects"
import { site } from "@/lib/site"

const personId = `${site.url}/#person`
const businessId = `${site.url}/#business`

/**
 * Graphe Schema.org du site : identité, activité locale et catalogue d'offres.
 * Donne à Google de quoi comprendre « développeur web freelance à Lyon / Écully »
 * autrement qu'en devinant depuis le texte de la page.
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
          "PostgreSQL",
          "GraphQL",
          "Développement web full-stack",
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
        name: `${site.name} — ${site.role}`,
        description:
          "Création de sites vitrines, d'applications web sur-mesure et maintenance, par un développeur full-stack freelance basé à Écully, près de Lyon.",
        url: site.url,
        image: `${site.url}/opengraph-image`,
        email: `mailto:${site.email}`,
        founder: { "@id": personId },
        priceRange: "€€",
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
          itemListElement: pricing.map((tier) => ({
            "@type": "Offer",
            name: tier.title,
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "EUR",
              minPrice: tier.amount.min,
              ...(tier.amount.max ? { maxPrice: tier.amount.max } : {}),
              ...(tier.amount.unit ? { unitCode: tier.amount.unit } : {}),
            },
            itemOffered: { "@type": "Service", name: tier.title, serviceType: tier.title },
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
      ...projects
        .filter((project) => project.links.length > 0)
        .map((project) => ({
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: project.links[0].href,
          author: { "@id": personId },
          keywords: project.stack.join(", "),
        })),
    ],
  }
}
