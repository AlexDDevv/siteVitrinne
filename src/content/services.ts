import type { FaqItem } from "@/content/home"
import type { Lang } from "@/content/i18n"

/**
 * Pages service : une page par intention de recherche (« freelance NestJS »,
 * « développement MVP »), là où l'accueil couvre toute l'offre. Chaque page
 * porte sa requête dans le title, la h1, le contenu et sa propre FAQ.
 */

export type ServiceKey = "nestjs" | "mvp"

export type ServiceSection = {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

export type ServiceContent = {
  /** Segment d'URL, sans le préfixe de langue. */
  slug: string
  /** Title complet, sans suffixe de marque ajouté. */
  metaTitle: string
  metaDescription: string
  eyebrow: string
  /** h1 : la requête visée, formulée pour un humain. */
  title: string
  lead: string
  /** Faits clés affichés sous l'introduction (prix, délai, stack…). */
  facts: { label: string; value: string }[]
  cta: string
  sections: ServiceSection[]
  proof: { title: string; intro: string }
  faq: { title: string; items: FaqItem[] }
  /** Nom court, pour le fil d'Ariane, le pied de page et les liens croisés. */
  shortName: string
  /** Type de service Schema.org. */
  serviceType: string
  og: { kicker: string; subtitle: string; footer: string }
}

export type Service = {
  key: ServiceKey
  /** Dernière révision du contenu (AAAA-MM-JJ) : sitemap et JSON-LD. */
  updatedAt: string
  /** Études de cas citées en preuve, dans l'ordre d'affichage. */
  projects: string[]
  content: Record<Lang, ServiceContent>
}

const nestjs: Service = {
  key: "nestjs",
  updatedAt: "2026-11-17",
  projects: ["grindrise", "likewatt"],
  content: {
    fr: {
      slug: "developpeur-nestjs-freelance",
      metaTitle: "Développeur NestJS freelance près de Lyon | Alexis Delporte",
      metaDescription:
        "Développeur NestJS freelance près de Lyon : conception d'API REST et GraphQL, architecture modulaire, auth, files de jobs, tests. 450 € / jour, missions à distance partout en France.",
      eyebrow: "Service · Back-end NestJS",
      title: "Développeur NestJS freelance pour vos API et votre back-end TypeScript",
      lead: "Je conçois et fais évoluer des API NestJS robustes, testées et lisibles : une architecture modulaire qu'une équipe peut reprendre, une sécurité pensée dès le départ, et un back-end qui tient la charge.",
      facts: [
        { label: "Tarif", value: "450 € / jour" },
        { label: "Stack", value: "NestJS · TypeScript · PostgreSQL · MongoDB" },
        { label: "Lieu", value: "Près de Lyon, à distance partout en France" },
      ],
      cta: "Parler de votre back-end",
      sections: [
        {
          id: "missions",
          title: "Ce que je fais en NestJS",
          bullets: [
            "Création d'une API NestJS de zéro : modules, contrôleurs, services, DTO validés, configuration vérifiée au démarrage.",
            "Reprise d'un back-end existant : audit du code, refactorisation progressive, ajout de tests, montée de version de NestJS.",
            "Découpage d'un monolithe en modules étanches ou en micro-services, sans tout réécrire d'un coup.",
            "Authentification et autorisation : JWT, guards, rôles, intégration de Supabase Auth ou d'un fournisseur existant.",
            "Traitements asynchrones : files de jobs avec BullMQ et Redis, emails, tâches planifiées, workers déployés à part.",
            "Bases de données : PostgreSQL ou MongoDB, migrations versionnées, transactions, types partagés avec le front.",
          ],
        },
        {
          id: "approche",
          title: "Une architecture qu'une équipe peut reprendre",
          paragraphs: [
            "NestJS donne un cadre, mais il ne suffit pas : un back-end reste maintenable si ses modules ne communiquent que par leurs services exportés, si la logique métier est isolée en fonctions pures et si chaque règle sensible est couverte par un test.",
            "C'est ce que j'applique sur Grindrise, mon propre produit : une API NestJS 11 en modular monolith, un guard global qui vérifie les JWT localement contre le JWKS public, des algorithmes en liste blanche, des DTO validés avec class-validator et environ 450 cas de test, dont des tests e2e avec Supertest.",
            "Chez Likewatt, éditeur SaaS utilisé par plus de 2 000 professionnels, j'ai participé à la migration de Firebase vers MongoDB et au découpage de l'application en micro-services, avec NestJS côté back-end. Résultat : des temps de chargement réduits de moitié.",
          ],
        },
        {
          id: "full-stack",
          title: "Full-stack quand il le faut",
          paragraphs: [
            "Je ne suis pas qu'un développeur back-end : je travaille aussi en React, Next.js et React Native. Concrètement, je peux livrer une fonctionnalité de bout en bout, de la table PostgreSQL à l'écran, ou partager les types TypeScript entre l'API et le front pour que les deux restent alignés.",
            "Si votre équipe front est déjà en place, je m'intègre dans vos conventions : votre repo, vos pull requests, votre CI, vos outils.",
          ],
        },
        {
          id: "deroulement",
          title: "Comment se passe une mission",
          bullets: [
            "Cadrage de 30 minutes en visio : le besoin, l'existant technique, les contraintes et l'échéance.",
            "Proposition écrite : périmètre, livrables, planning et prix.",
            "Développement dans votre repo ou un repo dédié, avec pull requests, revues de code et CI.",
            "Livraison avec documentation et passation à votre équipe.",
          ],
        },
      ],
      proof: {
        title: "Des projets NestJS concrets",
        intro:
          "Deux études de cas où NestJS porte le back-end : mon propre produit et un logiciel SaaS en production.",
      },
      faq: {
        title: "Questions fréquentes sur une mission NestJS",
        items: [
          {
            question: "Combien coûte un développeur NestJS freelance ?",
            answer: [
              "Mon tarif est de 450 € par jour pour une mission au temps passé.",
              "Pour un périmètre bien défini, comme une API complète ou une migration, je peux aussi proposer un prix fixe, par écrit, après un premier échange.",
            ],
          },
          {
            question: "Pouvez-vous reprendre une API NestJS existante ?",
            answer: [
              "Oui, la reprise de code existant fait partie de mes missions courantes.",
              "Je commence par lire le code et les tests, puis je propose des améliorations progressives : tests sur la logique sensible, découpage en modules, montée de version, sans bloquer les livraisons en cours.",
            ],
          },
          {
            question: "REST ou GraphQL avec NestJS ?",
            answer: [
              "Les deux : NestJS gère très bien REST comme GraphQL, et le choix dépend de vos clients.",
              "REST reste le plus simple pour une API publique ou mobile. GraphQL est intéressant quand plusieurs écrans ont besoin de données très différentes, comme sur Nuit d'Encre, que j'ai construit avec une API GraphQL typée de bout en bout.",
            ],
          },
          {
            question: "Travaillez-vous en micro-services ?",
            answer: [
              "Oui, mais seulement quand c'est justifié.",
              "Un modular monolith bien découpé suffit à la plupart des produits et reste plus simple à déployer. Chez Likewatt, le découpage en micro-services répondait à un vrai besoin de performance et d'évolution.",
            ],
          },
          {
            question: "Travaillez-vous à distance ?",
            answer: [
              "Oui, je travaille à distance partout en France, depuis Francheville, près de Lyon.",
              "Des points réguliers et une communication écrite (Slack, Notion, tickets) rythment la mission.",
            ],
          },
        ],
      },
      shortName: "Développeur NestJS freelance",
      serviceType: "Développement back-end NestJS",
      og: {
        kicker: "Service · Back-end NestJS",
        subtitle: "Développeur NestJS freelance · API et back-end TypeScript",
        footer: "450 € / jour · Près de Lyon, à distance",
      },
    },
    en: {
      slug: "freelance-nestjs-developer",
      metaTitle: "Freelance NestJS Developer in France | Alexis Delporte",
      metaDescription:
        "Freelance NestJS developer based near Lyon, France: REST and GraphQL APIs, modular architecture, auth, job queues, tests. €450 / day, remote engagements.",
      eyebrow: "Service · NestJS back end",
      title: "Freelance NestJS developer for your APIs and TypeScript back end",
      lead: "I design and evolve robust, tested and readable NestJS APIs: a modular architecture a team can take over, security built in from day one, and a back end that holds up under load.",
      facts: [
        { label: "Rate", value: "€450 / day" },
        { label: "Stack", value: "NestJS · TypeScript · PostgreSQL · MongoDB" },
        { label: "Location", value: "Near Lyon, France · remote" },
      ],
      cta: "Talk about your back end",
      sections: [
        {
          id: "missions",
          title: "What I do with NestJS",
          bullets: [
            "Building a NestJS API from scratch: modules, controllers, services, validated DTOs, configuration checked at startup.",
            "Taking over an existing back end: code audit, incremental refactoring, added tests, NestJS upgrades.",
            "Splitting a monolith into isolated modules or microservices, without rewriting everything at once.",
            "Authentication and authorization: JWT, guards, roles, Supabase Auth or an existing provider.",
            "Async processing: job queues with BullMQ and Redis, emails, scheduled tasks, separately deployed workers.",
            "Databases: PostgreSQL or MongoDB, versioned migrations, transactions, types shared with the front end.",
          ],
        },
        {
          id: "approach",
          title: "An architecture a team can take over",
          paragraphs: [
            "NestJS provides structure, but that is not enough on its own: a back end stays maintainable when its modules only talk through their exported services, when business logic is isolated in pure functions and when every sensitive rule is covered by a test.",
            "That is what I apply on Grindrise, my own product: a NestJS 11 API built as a modular monolith, a global guard that verifies JWTs locally against the public JWKS, allow-listed algorithms, DTOs validated with class-validator and around 450 test cases, including e2e tests with Supertest.",
            "At Likewatt, a SaaS vendor used by more than 2,000 professionals, I worked on the Firebase to MongoDB migration and on splitting the application into microservices, with NestJS on the back end. The result: load times cut in half.",
          ],
        },
        {
          id: "full-stack",
          title: "Full-stack when needed",
          paragraphs: [
            "I am not only a back-end developer: I also work with React, Next.js and React Native. In practice, I can ship a feature end to end, from the PostgreSQL table to the screen, or share TypeScript types between the API and the front end so both stay aligned.",
            "If your front-end team is already in place, I work within your conventions: your repo, your pull requests, your CI, your tools.",
          ],
        },
        {
          id: "process",
          title: "How an engagement works",
          bullets: [
            "A 30-minute video call: your needs, the existing stack, constraints and deadline.",
            "A written proposal: scope, deliverables, schedule and price.",
            "Development in your repo or a dedicated one, with pull requests, code reviews and CI.",
            "Delivery with documentation and handover to your team.",
          ],
        },
      ],
      proof: {
        title: "Real NestJS projects",
        intro:
          "Two case studies where NestJS powers the back end: my own product and SaaS software in production.",
      },
      faq: {
        title: "Frequently asked questions about a NestJS engagement",
        items: [
          {
            question: "How much does a freelance NestJS developer cost?",
            answer: [
              "My rate is €450 per day for a time-based engagement.",
              "For a well-defined scope, such as a complete API or a migration, I can also offer a fixed price, in writing, after a first conversation.",
            ],
          },
          {
            question: "Can you take over an existing NestJS API?",
            answer: [
              "Yes, taking over existing code is part of my regular work.",
              "I start by reading the code and the tests, then suggest incremental improvements: tests on sensitive logic, module boundaries, version upgrades, without blocking ongoing releases.",
            ],
          },
          {
            question: "REST or GraphQL with NestJS?",
            answer: [
              "Both: NestJS handles REST and GraphQL very well, and the choice depends on your clients.",
              "REST is the simplest for a public or mobile API. GraphQL pays off when several screens need very different data, as on Nuit d'Encre, which I built with an end-to-end typed GraphQL API.",
            ],
          },
          {
            question: "Do you work with microservices?",
            answer: [
              "Yes, but only when it is justified.",
              "A well-structured modular monolith is enough for most products and is simpler to deploy. At Likewatt, splitting into microservices answered a real need for performance and evolution.",
            ],
          },
          {
            question: "Do you work remotely?",
            answer: [
              "Yes, I work remotely from Francheville, near Lyon, France.",
              "Regular check-ins and written communication (Slack, Notion, tickets) keep the engagement on track.",
            ],
          },
        ],
      },
      shortName: "Freelance NestJS developer",
      serviceType: "NestJS back-end development",
      og: {
        kicker: "Service · NestJS back end",
        subtitle: "Freelance NestJS developer · APIs and TypeScript back end",
        footer: "€450 / day · Near Lyon, France · remote",
      },
    },
  },
}

const mvp: Service = {
  key: "mvp",
  updatedAt: "2026-11-17",
  projects: ["nuit-d-encre", "grindrise"],
  content: {
    fr: {
      slug: "developpement-mvp",
      metaTitle: "Développement de MVP : prix, délais, méthode | Alexis Delporte",
      metaDescription:
        "Développement de MVP web pour startups et porteurs de projet : à partir de 6 000 €, livré en 4 à 8 semaines. Front, API, base de données, auth et paiement, sur un code qu'une équipe peut reprendre.",
      eyebrow: "Service · Développement de MVP",
      title: "Développement de MVP pour startups, de l'idée à la V1 en production",
      lead: "Vous avez une idée, une maquette ou un cahier des charges. Je développe votre MVP web en 4 à 8 semaines, avec le front, l'API, la base de données, l'authentification et le paiement, sur une base de code qu'une équipe pourra reprendre.",
      facts: [
        { label: "Prix", value: "À partir de 6 000 €" },
        { label: "Délai", value: "4 à 8 semaines" },
        { label: "Stack", value: "Next.js · NestJS · PostgreSQL" },
      ],
      cta: "Parler de votre MVP",
      sections: [
        {
          id: "contenu",
          title: "Ce que comprend votre MVP",
          bullets: [
            "Le front : une application web responsive en React et Next.js, rapide et bien référencée.",
            "L'API : un back-end TypeScript en NestJS, avec la logique métier testée.",
            "La base de données : PostgreSQL, avec des migrations versionnées.",
            "L'authentification : comptes utilisateurs, connexion par email ou sans mot de passe, rôles.",
            "Le paiement : abonnement ou paiement unique, selon votre modèle.",
            "La mise en production : déploiement, environnements de test et de production, documentation.",
          ],
        },
        {
          id: "prix",
          title: "Combien coûte un MVP ?",
          paragraphs: [
            "Un MVP démarre à partir de 6 000 €. Le prix final dépend du périmètre, et il est fixé par écrit avant le début du développement : pas de surprise en cours de route.",
            "Ce qui fait varier le prix : le nombre d'écrans et de parcours, le nombre de rôles (utilisateur, administrateur, partenaire), les intégrations avec des services tiers, et le besoin d'une application mobile en plus du web.",
            "Mon conseil : un MVP doit tester une seule hypothèse. Mieux vaut une V1 étroite livrée en 5 semaines qu'une V1 complète livrée en 5 mois. Je vous aide à trier ce qui doit être dans la première version et ce qui peut attendre.",
          ],
        },
        {
          id: "delais",
          title: "En combien de temps ?",
          paragraphs: [
            "Un MVP se livre généralement en 4 à 8 semaines, selon le périmètre. Le planning est fixé par écrit dans la proposition, avec des étapes intermédiaires.",
            "Vous voyez le produit avancer chaque semaine sur un environnement de test, ce qui permet de corriger le tir tôt plutôt qu'à la livraison.",
          ],
        },
        {
          id: "code",
          title: "Un MVP qui ne sera pas à réécrire",
          paragraphs: [
            "Beaucoup de MVP sont jetés au moment de lever des fonds ou de recruter une équipe, parce que le code ne tient pas. Je fais l'inverse : code typé de bout en bout en TypeScript, tests sur la logique sensible, CI, documentation.",
            "Le code vous appartient : il vit dans votre repo, et les droits vous sont cédés à la fin de la mission. Votre future équipe technique part d'une base saine, pas d'une dette à rembourser.",
          ],
        },
        {
          id: "deroulement",
          title: "Les étapes",
          bullets: [
            "Cadrage de 30 minutes en visio : votre idée, vos utilisateurs, l'hypothèse à tester et l'échéance.",
            "Proposition écrite : périmètre, écrans, livrables, planning et prix.",
            "Développement avec une démo chaque semaine sur un environnement de test.",
            "Mise en production, documentation et passation.",
          ],
        },
      ],
      proof: {
        title: "Des produits menés de bout en bout",
        intro:
          "Une plateforme en ligne et une application mobile que j'ai construites seul, de la base de données au déploiement.",
      },
      faq: {
        title: "Questions fréquentes sur le développement d'un MVP",
        items: [
          {
            question: "Quel est le prix d'un MVP ?",
            answer: [
              "Un MVP démarre à partir de 6 000 €, sur proposition écrite.",
              "Il couvre le front, l'API, la base de données, l'authentification et le paiement. Le prix final dépend du nombre d'écrans, de rôles et d'intégrations.",
            ],
          },
          {
            question: "Combien de temps faut-il pour développer un MVP ?",
            answer: [
              "Un MVP se livre généralement en 4 à 8 semaines.",
              "Le délai exact est fixé par écrit dans la proposition, avec le planning et des démos hebdomadaires.",
            ],
          },
          {
            question: "Faut-il une maquette avant de commencer ?",
            answer: [
              "Non, une idée claire et quelques exemples suffisent pour démarrer.",
              "Si vous avez déjà une maquette Figma, je la reprends. Sinon, je conçois des écrans simples et efficaces pendant le cadrage.",
            ],
          },
          {
            question: "Mon MVP pourra-t-il être repris par une équipe ?",
            answer: [
              "Oui, c'est l'objectif dès le départ.",
              "Le code est typé en TypeScript, testé sur la logique sensible, documenté et livré dans votre repo, avec une passation à votre équipe.",
            ],
          },
          {
            question: "Pouvez-vous développer un MVP mobile ?",
            answer: [
              "Oui, en React Native, comme pour Grindrise, mon application de suivi sportif.",
              "Pour tester une idée rapidement, je recommande souvent de commencer par le web, moins cher et plus rapide à faire évoluer, puis d'ajouter le mobile.",
            ],
          },
          {
            question: "À qui appartient le code du MVP ?",
            answer: [
              "À vous : les droits sur le code développé pour vous vous sont cédés à la fin de la mission, une fois la facture réglée.",
            ],
          },
        ],
      },
      shortName: "Développement de MVP",
      serviceType: "Développement de MVP",
      og: {
        kicker: "Service · Développement de MVP",
        subtitle: "De l'idée à la V1 en production, en 4 à 8 semaines",
        footer: "À partir de 6 000 € · Next.js · NestJS · PostgreSQL",
      },
    },
    en: {
      slug: "mvp-development",
      metaTitle: "MVP Development for Startups: Price & Timeline | Alexis Delporte",
      metaDescription:
        "Web MVP development for startups and founders: from €6,000, delivered in 4 to 8 weeks. Front end, API, database, auth and payments, on a codebase a team can take over.",
      eyebrow: "Service · MVP development",
      title: "MVP development for startups, from idea to V1 in production",
      lead: "You have an idea, a mockup or a spec. I build your web MVP in 4 to 8 weeks, with the front end, API, database, authentication and payments, on a codebase a team can take over.",
      facts: [
        { label: "Price", value: "From €6,000" },
        { label: "Timeline", value: "4 to 8 weeks" },
        { label: "Stack", value: "Next.js · NestJS · PostgreSQL" },
      ],
      cta: "Talk about your MVP",
      sections: [
        {
          id: "scope",
          title: "What your MVP includes",
          bullets: [
            "The front end: a responsive web app in React and Next.js, fast and search-friendly.",
            "The API: a TypeScript back end in NestJS, with tested business logic.",
            "The database: PostgreSQL, with versioned migrations.",
            "Authentication: user accounts, email or passwordless sign-in, roles.",
            "Payments: subscription or one-off payment, depending on your model.",
            "Going live: deployment, test and production environments, documentation.",
          ],
        },
        {
          id: "price",
          title: "How much does an MVP cost?",
          paragraphs: [
            "An MVP starts at €6,000. The final price depends on the scope, and it is set in writing before development begins: no surprises along the way.",
            "What drives the price: the number of screens and user flows, the number of roles (user, admin, partner), integrations with third-party services, and whether you need a mobile app on top of the web app.",
            "My advice: an MVP should test a single hypothesis. A narrow V1 shipped in 5 weeks beats a complete V1 shipped in 5 months. I help you sort what belongs in the first version and what can wait.",
          ],
        },
        {
          id: "timeline",
          title: "How long does it take?",
          paragraphs: [
            "An MVP is usually delivered in 4 to 8 weeks, depending on the scope. The schedule is set in writing in the proposal, with intermediate milestones.",
            "You see the product progress every week on a test environment, so we can adjust early rather than at delivery.",
          ],
        },
        {
          id: "code",
          title: "An MVP you won't have to rewrite",
          paragraphs: [
            "Many MVPs get thrown away when it is time to raise funds or hire a team, because the code does not hold up. I do the opposite: end-to-end typed TypeScript, tests on sensitive logic, CI, documentation.",
            "The code is yours: it lives in your repo, and the rights are transferred to you at the end of the engagement. Your future tech team starts from a healthy base, not from debt to pay back.",
          ],
        },
        {
          id: "steps",
          title: "The steps",
          bullets: [
            "A 30-minute video call: your idea, your users, the hypothesis to test and the deadline.",
            "A written proposal: scope, screens, deliverables, schedule and price.",
            "Development with a demo every week on a test environment.",
            "Going live, documentation and handover.",
          ],
        },
      ],
      proof: {
        title: "Products built end to end",
        intro:
          "A live platform and a mobile app I built on my own, from the database to deployment.",
      },
      faq: {
        title: "Frequently asked questions about MVP development",
        items: [
          {
            question: "How much does an MVP cost?",
            answer: [
              "An MVP starts at €6,000, based on a written proposal.",
              "It covers the front end, API, database, authentication and payments. The final price depends on the number of screens, roles and integrations.",
            ],
          },
          {
            question: "How long does it take to build an MVP?",
            answer: [
              "An MVP is usually delivered in 4 to 8 weeks.",
              "The exact timeline is set in writing in the proposal, with the schedule and weekly demos.",
            ],
          },
          {
            question: "Do I need a mockup before we start?",
            answer: [
              "No, a clear idea and a few examples are enough to get started.",
              "If you already have a Figma mockup, I build from it. Otherwise, I design simple, effective screens during scoping.",
            ],
          },
          {
            question: "Can a team take over my MVP?",
            answer: [
              "Yes, that is the goal from day one.",
              "The code is typed in TypeScript, tested on sensitive logic, documented and delivered in your repo, with a handover to your team.",
            ],
          },
          {
            question: "Can you build a mobile MVP?",
            answer: [
              "Yes, with React Native, as for Grindrise, my fitness tracking app.",
              "To test an idea quickly, I often recommend starting with the web, which is cheaper and faster to iterate on, then adding mobile.",
            ],
          },
          {
            question: "Who owns the MVP code?",
            answer: [
              "You do: the rights to the code developed for you are transferred to you at the end of the engagement, once the invoice is paid.",
            ],
          },
        ],
      },
      shortName: "MVP development",
      serviceType: "MVP development",
      og: {
        kicker: "Service · MVP development",
        subtitle: "From idea to V1 in production, in 4 to 8 weeks",
        footer: "From €6,000 · Next.js · NestJS · PostgreSQL",
      },
    },
  },
}

/** Pages service, dans l'ordre d'affichage (pied de page, llms.txt, sitemap). */
export const services: Service[] = [mvp, nestjs]

export function getService(key: ServiceKey): Service {
  const service = services.find((s) => s.key === key)
  if (!service) throw new Error(`Service inconnu : ${key}`)
  return service
}
