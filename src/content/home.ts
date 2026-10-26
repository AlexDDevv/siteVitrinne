import type { Lang } from "@/content/i18n"

/**
 * Textes de l'accueil freelance, en français et en anglais. Les sections ne
 * portent que la mise en page : tout le contenu vit ici, pour que les deux
 * langues restent alignées.
 */

export type Offer = { slug: string; title: string; description: string }

export type PricingTier = {
  title: string
  price: string
  features: string[]
  /** Badge de mise en avant ; sa présence bascule la carte en style accentué. */
  highlight?: string
}

type Atout = {
  title: string
  body: string
  /** Passage du corps mis en gras. */
  strong?: string
  /** Étude de cas liée. */
  caseStudy?: string
  linkLabel?: string
}

type HomeContent = {
  /** Ancres des sections : la nav et les CTA en dépendent. */
  ids: {
    offer: string
    why: string
    projects: string
    rates: string
    process: string
    contact: string
  }
  role: string
  hero: {
    available: string
    /** Métier et ville, affichés dans la h1 sous le nom. */
    headline: (role: string, area: string) => string
    lead: string
    /** Phrase produit, avec le lien Grindrise entre les deux morceaux. */
    productBefore: string
    productAfter: string
    location: (city: string, area: string) => string
    cta: string
    malt: string
  }
  offer: { eyebrow: string; title: string; items: Offer[] }
  why: { eyebrow: string; title: string; items: Atout[]; stack: string[]; stackLabel: string }
  projects: { eyebrow: string; title: string; intro: string; highlights: string }
  rates: { eyebrow: string; title: string; intro: string; priceLabel: string; tiers: PricingTier[] }
  process: { eyebrow: string; title: string; steps: { title: string; body: string }[] }
  contact: {
    eyebrow: string
    title: string
    intro: string
    booking: string
    malt: string
  }
}

const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "NestJS",
  "React Native",
  "PostgreSQL",
  "MongoDB",
  "GraphQL",
  "Docker",
]

export const home: Record<Lang, HomeContent> = {
  fr: {
    ids: {
      offer: "offre",
      why: "pourquoi",
      projects: "projets",
      rates: "tarifs",
      process: "process",
      contact: "contact",
    },
    role: "Développeur full-stack freelance",
    hero: {
      available: "Disponible pour de nouveaux projets",
      headline: (role, area) => `${role} à ${area}`,
      lead: "J'aide les startups, les équipes produit et les agences à livrer, refondre et accélérer leurs applications web.",
      productBefore: "Je développe aussi mes propres produits, comme ",
      productAfter: ". Je pense produit, pas seulement code.",
      location: (city, area) =>
        `Basé à ${city}, près de ${area}. Missions à distance partout en France.`,
      cta: "Parlons de votre projet",
      malt: "Voir mon profil Malt",
    },
    offer: {
      eyebrow: "01 · Ce que je propose",
      title: "Quatre façons de travailler ensemble",
      items: [
        {
          slug: "mvp",
          title: "MVP & produit sur-mesure",
          description:
            "D'une idée ou d'une maquette à une V1 en production : front, API, base de données, auth, paiement. Sur une base de code qu'une équipe pourra reprendre.",
        },
        {
          slug: "refonte",
          title: "Refonte & performance",
          description:
            "Reprise de code existant, modernisation, migrations, découpage en services, temps de chargement. C'est ce que je fais chez Likewatt : des temps de chargement réduits de moitié.",
        },
        {
          slug: "agences",
          title: "Agences",
          description:
            "Sous-traitance technique en marque blanche. Je travaille dans vos conventions et avec vos outils.",
        },
        {
          slug: "renfort",
          title: "Renfort technique ponctuel",
          description:
            "Une fonctionnalité à livrer, un audit de code, une revue d'architecture. Une intervention courte, avec un livrable clair.",
        },
      ],
    },
    why: {
      eyebrow: "02 · Pourquoi travailler avec moi",
      title: "Un profil produit, pas seulement une paire de mains",
      items: [
        {
          title: "Des temps de chargement divisés par deux chez Likewatt",
          body: "Développeur full-stack chez Likewatt, éditeur SaaS. Refonte de l'interface, migration Firebase → MongoDB, découpage en micro-services : temps de chargement réduits de moitié pour plus de 2 000 utilisateurs professionnels, dont des équipes de TotalEnergies, du Crédit Agricole et d'Eiffage.",
          strong: "réduits de moitié",
          caseStudy: "likewatt",
          linkLabel: "L'étude de cas Likewatt",
        },
        {
          title: "Je construis Grindrise, mon propre produit",
          body: "Une application mobile de suivi sportif en React Native et NestJS, avec un modèle anti-triche arbitré par le serveur. Construire mon produit m'oblige à penser engagement et rétention, pas seulement code.",
          caseStudy: "grindrise",
          linkLabel: "L'étude de cas Grindrise",
        },
        {
          title: "Un code qu'une équipe peut reprendre",
          body: "Code typé de bout en bout, tests sur la logique sensible, CI, revues de code, documentation. Diplômé Concepteur Développeur d'Applications (RNCP niveau 6).",
        },
        {
          title: "Stack moderne, outillage assumé",
          body: "React, Next.js, TypeScript, NestJS, React Native, PostgreSQL, MongoDB. J'utilise des outils IA comme Claude Code pour livrer plus vite, avec une relecture systématique du code.",
        },
      ],
      stack,
      stackLabel: "Technologies que j'utilise",
    },
    projects: {
      eyebrow: "03 · Projets",
      title: "Trois études de cas, du contexte au résultat",
      intro:
        "Un logiciel en production chez Likewatt, une plateforme en ligne, une application mobile en cours. Chacune détaille le problème, les choix techniques et le résultat.",
      highlights: "Ce que ça montre",
    },
    rates: {
      eyebrow: "04 · Tarifs",
      title: "Une proposition écrite, après un premier échange",
      intro:
        "Pas de grille figée : après un premier échange sur votre besoin, vous recevez une proposition écrite avec le périmètre, les livrables, le planning et le prix.",
      priceLabel: "Tarif : ",
      tiers: [
        {
          title: "Mission au temps passé",
          price: "450 € / jour",
          features: [
            "Refonte, performance, renfort technique",
            "Facturation au temps passé",
            "Périmètre ajustable en cours de mission",
          ],
        },
        {
          title: "MVP",
          price: "à partir de 6 000 €",
          highlight: "SUR PROPOSITION",
          features: [
            "Front, API, base de données, auth, paiement",
            "Périmètre, livrables et planning fixés par écrit",
            "Code documenté, prêt à être repris par une équipe",
          ],
        },
        {
          title: "Agences",
          price: "Forfait ou TJM",
          features: [
            "Selon votre fonctionnement",
            "Sous-traitance en marque blanche",
            "Vos conventions, vos outils",
          ],
        },
      ],
    },
    process: {
      eyebrow: "05 · Comment ça se passe",
      title: "Quatre étapes, zéro surprise",
      steps: [
        {
          title: "Cadrage",
          body: "30 minutes en visio : le besoin, le contexte technique, les contraintes et l'échéance.",
        },
        {
          title: "Proposition écrite",
          body: "Périmètre, livrables, planning et prix. Par écrit, pour partir tous de la même base.",
        },
        {
          title: "Développement",
          body: "Dans votre repo ou un repo dédié. Pull requests, revues de code, CI. Des points réguliers et une communication écrite : Slack, Notion, tickets.",
        },
        {
          title: "Livraison",
          body: "Mise en production, documentation et passation à votre équipe.",
        },
      ],
    },
    contact: {
      eyebrow: "06 · Contact",
      title: "Parlons de votre projet",
      intro:
        "Le contexte, la stack, l'échéance : quelques lignes suffisent pour démarrer. Le premier échange ne vous engage à rien.",
      booking: "Réserver un appel de 20 min",
      malt: "Passer par mon profil Malt",
    },
  },
  en: {
    ids: {
      offer: "offer",
      why: "why",
      projects: "projects",
      rates: "rates",
      process: "process",
      contact: "contact",
    },
    role: "Freelance full-stack developer",
    hero: {
      available: "Available for new projects",
      headline: (role, area) => `${role} in ${area}`,
      lead: "I help startups, product teams and agencies ship, rebuild and speed up their web applications.",
      productBefore: "I also build my own products, like ",
      productAfter: ". I think product, not just code.",
      location: (city, area) =>
        `Based in ${city}, near ${area}, France. Remote work anywhere in France.`,
      cta: "Let's talk about your project",
      malt: "See my Malt profile",
    },
    offer: {
      eyebrow: "01 · What I offer",
      title: "Four ways to work together",
      items: [
        {
          slug: "mvp",
          title: "MVP & custom product",
          description:
            "From an idea or a mockup to a V1 in production: front end, API, database, auth, payments. On a codebase a team can take over.",
        },
        {
          slug: "rebuild",
          title: "Rebuild & performance",
          description:
            "Taking over existing code, modernization, migrations, splitting into services, load times. That's what I do at Likewatt: load times cut in half.",
        },
        {
          slug: "agencies",
          title: "Agencies",
          description:
            "White-label technical subcontracting. I work within your conventions and with your tools.",
        },
        {
          slug: "support",
          title: "Ad-hoc technical support",
          description:
            "A feature to ship, a code audit, an architecture review. A short engagement with a clear deliverable.",
        },
      ],
    },
    why: {
      eyebrow: "02 · Why work with me",
      title: "A product mindset, not just an extra pair of hands",
      items: [
        {
          title: "Load times cut in half at Likewatt",
          body: "Full-stack developer at Likewatt, a SaaS vendor. Interface redesign, Firebase → MongoDB migration, split into microservices: load times cut in half for more than 2,000 professional users, including teams at TotalEnergies, Crédit Agricole and Eiffage.",
          strong: "cut in half",
          caseStudy: "likewatt",
          linkLabel: "The Likewatt case study",
        },
        {
          title: "I'm building Grindrise, my own product",
          body: "A mobile fitness tracker built with React Native and NestJS, with an anti-cheat model enforced by the server. Building my own product makes me think about engagement and retention, not just code.",
          caseStudy: "grindrise",
          linkLabel: "The Grindrise case study",
        },
        {
          title: "Code a team can take over",
          body: "End-to-end typed code, tests on sensitive logic, CI, code reviews, documentation. Holder of the French Application Designer-Developer degree (RNCP level 6).",
        },
        {
          title: "Modern stack, AI-assisted tooling",
          body: "React, Next.js, TypeScript, NestJS, React Native, PostgreSQL, MongoDB. I use AI tools like Claude Code to ship faster, with systematic code review.",
        },
      ],
      stack,
      stackLabel: "Technologies I use",
    },
    projects: {
      eyebrow: "03 · Projects",
      title: "Three case studies, from context to result",
      intro:
        "Software in production at Likewatt, a live platform, a mobile app in progress. Each one covers the problem, the technical choices and the result.",
      highlights: "What it shows",
    },
    rates: {
      eyebrow: "04 · Rates",
      title: "A written proposal, after a first conversation",
      intro:
        "No fixed price list: after a first conversation about your needs, you get a written proposal with the scope, deliverables, schedule and price.",
      priceLabel: "Rate: ",
      tiers: [
        {
          title: "Time-based engagement",
          price: "€450 / day",
          features: [
            "Rebuilds, performance, technical support",
            "Billed on time spent",
            "Scope adjustable during the engagement",
          ],
        },
        {
          title: "MVP",
          price: "from €6,000",
          highlight: "ON PROPOSAL",
          features: [
            "Front end, API, database, auth, payments",
            "Scope, deliverables and schedule agreed in writing",
            "Documented code, ready for a team to take over",
          ],
        },
        {
          title: "Agencies",
          price: "Fixed price or day rate",
          features: [
            "Depending on how you work",
            "White-label subcontracting",
            "Your conventions, your tools",
          ],
        },
      ],
    },
    process: {
      eyebrow: "05 · How it works",
      title: "Four steps, no surprises",
      steps: [
        {
          title: "Scoping",
          body: "A 30-minute video call: the need, the technical context, the constraints and the deadline.",
        },
        {
          title: "Written proposal",
          body: "Scope, deliverables, schedule and price. In writing, so everyone starts from the same baseline.",
        },
        {
          title: "Development",
          body: "In your repo or a dedicated one. Pull requests, code reviews, CI. Regular check-ins and written communication: Slack, Notion, tickets.",
        },
        {
          title: "Delivery",
          body: "Production release, documentation and handover to your team.",
        },
      ],
    },
    contact: {
      eyebrow: "06 · Contact",
      title: "Let's talk about your project",
      intro:
        "Context, stack, deadline: a few lines are enough to get started. The first conversation doesn't commit you to anything.",
      booking: "Book a 20-min call",
      malt: "Reach me through Malt",
    },
  },
}
