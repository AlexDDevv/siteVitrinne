import type { FaqItem } from "@/content/home"
import type { Lang } from "@/content/i18n"

/**
 * Pages service : une page par intention de recherche (« freelance NestJS »,
 * « développement MVP »), là où l'accueil couvre toute l'offre. Chaque page
 * porte sa requête dans le title, la h1, le contenu et sa propre FAQ.
 */

export type ServiceKey = "nestjs" | "mvp" | "react" | "agences"

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
  /** Article technique lié (clé de l'article). */
  article?: string
  content: Record<Lang, ServiceContent>
}

const nestjs: Service = {
  key: "nestjs",
  updatedAt: "2026-11-18",
  article: "anti-triche-serveur",
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

const react: Service = {
  key: "react",
  updatedAt: "2026-11-17",
  projects: ["likewatt", "nuit-d-encre"],
  content: {
    fr: {
      slug: "developpeur-react-freelance-lyon",
      metaTitle: "Développeur React freelance à Lyon | Alexis Delporte",
      metaDescription:
        "Développeur React freelance à Lyon (Francheville) : applications React et Next.js, refonte d'interface, migration de code legacy, performance. 450 € / jour, missions à distance depuis la métropole de Lyon.",
      eyebrow: "Service · Front-end React",
      title: "Développeur React freelance à Lyon, pour vos applications web",
      lead: "Je développe, refonds et accélère des applications React et Next.js pour les startups, les éditeurs SaaS et les agences de la région lyonnaise et d'ailleurs. Des interfaces rapides, un code typé en TypeScript, et une base qu'une équipe peut reprendre.",
      facts: [
        { label: "Tarif", value: "450 € / jour" },
        { label: "Stack", value: "React · Next.js · TypeScript" },
        { label: "Lieu", value: "Francheville, métropole de Lyon" },
      ],
      cta: "Parler de votre projet React",
      sections: [
        {
          id: "missions",
          title: "Ce que je fais en React",
          bullets: [
            "Développement d'applications web en React et Next.js : tableaux de bord, outils métier, plateformes SaaS, sites rapides et bien référencés.",
            "Refonte d'interface : de la maquette à l'intégration, avec un design system cohérent et accessible.",
            "Migration de code legacy : composants de classe vers les hooks, montée de version de React, passage à TanStack Query ou à Next.js.",
            "Performance : temps de chargement, découpage du bundle, cache des données, rendu côté serveur.",
            "Gestion des données côté front : TanStack Query, Apollo Client, Zustand, formulaires avec React Hook Form.",
            "Mobile en React Native quand le produit en a besoin, avec le même socle TypeScript.",
          ],
        },
        {
          id: "likewatt",
          title: "Une refonte React qui a divisé les temps de chargement par deux",
          paragraphs: [
            "Chez Likewatt, éditeur SaaS basé à Villeurbanne, j'ai migré une application legacy écrite en composants de classe React vers React 18, TanStack Router et TanStack Query, puis refondu l'interface et l'expérience utilisateur, de la maquette à l'intégration.",
            "Avec la migration de la base de données et le découpage en micro-services, le résultat est net : des temps de chargement réduits de moitié pour plus de 2 000 utilisateurs professionnels, dont des équipes de TotalEnergies, du Crédit Agricole et d'Eiffage.",
          ],
        },
        {
          id: "lyon",
          title: "Un freelance React basé à Lyon",
          paragraphs: [
            "Je suis basé à Francheville, dans la métropole de Lyon. Pour une entreprise lyonnaise, c'est un interlocuteur qui connaît l'écosystème local et qui travaille dans le même fuseau horaire, avec les mêmes habitudes.",
            "La plupart de mes missions se font à distance, avec des points réguliers et une communication écrite (Slack, Notion, tickets). Je travaille aussi pour des entreprises partout en France.",
          ],
        },
        {
          id: "full-stack",
          title: "Full-stack, pas seulement front",
          paragraphs: [
            "Je travaille aussi côté back-end, en NestJS, PostgreSQL et MongoDB. Une fonctionnalité peut donc être livrée de bout en bout, de l'API à l'écran, sans attendre une autre équipe.",
            "Sur Nuit d'Encre, une plateforme de lecture en ligne, j'ai construit seul le front React 19 et l'API GraphQL typée de bout en bout, jusqu'au déploiement.",
          ],
        },
      ],
      proof: {
        title: "Des projets React concrets",
        intro:
          "Un logiciel SaaS en production et une plateforme en ligne, tous deux construits en React et TypeScript.",
      },
      faq: {
        title: "Questions fréquentes sur une mission React",
        items: [
          {
            question: "Quel est le tarif d'un développeur React freelance à Lyon ?",
            answer: [
              "Mon tarif est de 450 € par jour pour une mission au temps passé.",
              "Pour un périmètre bien défini, comme une refonte ou un MVP, je propose aussi un prix fixe, par écrit, après un premier échange.",
            ],
          },
          {
            question: "Pouvez-vous reprendre une application React existante ?",
            answer: [
              "Oui, c'est ce que j'ai fait chez Likewatt, avec une application legacy en composants de classe.",
              "Je commence par lire le code, puis je propose une migration progressive : on modernise écran par écran, sans arrêter les livraisons.",
            ],
          },
          {
            question: "React ou Next.js ?",
            answer: [
              "Next.js dès que le référencement ou le temps de premier affichage comptent : site vitrine, plateforme publique, e-commerce.",
              "Une application React classique suffit pour un outil interne ou un tableau de bord derrière une connexion.",
            ],
          },
          {
            question: "Travaillez-vous sur site à Lyon ?",
            answer: [
              "Je travaille principalement à distance, depuis Francheville, dans la métropole de Lyon.",
              "Le format de la mission se décide ensemble lors du premier échange.",
            ],
          },
          {
            question: "Faites-vous aussi le back-end ?",
            answer: [
              "Oui, je suis développeur full-stack : NestJS, PostgreSQL, MongoDB et GraphQL côté serveur.",
            ],
          },
        ],
      },
      shortName: "Développeur React freelance à Lyon",
      serviceType: "Développement front-end React",
      og: {
        kicker: "Service · Front-end React",
        subtitle: "Développeur React freelance à Lyon · React, Next.js, TypeScript",
        footer: "450 € / jour · Francheville, métropole de Lyon",
      },
    },
    en: {
      slug: "freelance-react-developer-lyon",
      metaTitle: "Freelance React Developer in Lyon, France | Alexis Delporte",
      metaDescription:
        "Freelance React developer in Lyon, France: React and Next.js applications, interface redesigns, legacy code migration, performance. €450 / day, remote engagements from the Lyon area.",
      eyebrow: "Service · React front end",
      title: "Freelance React developer in Lyon, for your web applications",
      lead: "I build, redesign and speed up React and Next.js applications for startups, SaaS vendors and agencies in the Lyon area and beyond. Fast interfaces, typed TypeScript code, and a codebase a team can take over.",
      facts: [
        { label: "Rate", value: "€450 / day" },
        { label: "Stack", value: "React · Next.js · TypeScript" },
        { label: "Location", value: "Francheville, Lyon metropolitan area" },
      ],
      cta: "Talk about your React project",
      sections: [
        {
          id: "missions",
          title: "What I do with React",
          bullets: [
            "Web applications in React and Next.js: dashboards, business tools, SaaS platforms, fast and search-friendly websites.",
            "Interface redesigns: from mockup to implementation, with a consistent and accessible design system.",
            "Legacy code migration: class components to hooks, React upgrades, moving to TanStack Query or Next.js.",
            "Performance: load times, bundle splitting, data caching, server-side rendering.",
            "Front-end data handling: TanStack Query, Apollo Client, Zustand, forms with React Hook Form.",
            "Mobile with React Native when the product needs it, on the same TypeScript foundation.",
          ],
        },
        {
          id: "likewatt",
          title: "A React rebuild that cut load times in half",
          paragraphs: [
            "At Likewatt, a SaaS vendor based in Villeurbanne, I migrated a legacy application written with React class components to React 18, TanStack Router and TanStack Query, then redesigned the interface and user experience, from mockup to implementation.",
            "Together with the database migration and the split into microservices, the result is clear: load times cut in half for more than 2,000 professional users, including teams at TotalEnergies, Crédit Agricole and Eiffage.",
          ],
        },
        {
          id: "lyon",
          title: "A freelance React developer based in Lyon",
          paragraphs: [
            "I am based in Francheville, in the Lyon metropolitan area. For a company in Lyon, that means a contact who knows the local ecosystem and works in the same time zone.",
            "Most of my engagements are remote, with regular check-ins and written communication (Slack, Notion, tickets). I also work with companies across France.",
          ],
        },
        {
          id: "full-stack",
          title: "Full-stack, not just front end",
          paragraphs: [
            "I also work on the back end, with NestJS, PostgreSQL and MongoDB. A feature can be shipped end to end, from the API to the screen, without waiting on another team.",
            "On Nuit d'Encre, an online reading platform, I built the React 19 front end and the end-to-end typed GraphQL API on my own, all the way to deployment.",
          ],
        },
      ],
      proof: {
        title: "Real React projects",
        intro:
          "SaaS software in production and a live platform, both built with React and TypeScript.",
      },
      faq: {
        title: "Frequently asked questions about a React engagement",
        items: [
          {
            question: "What is the rate of a freelance React developer in Lyon?",
            answer: [
              "My rate is €450 per day for a time-based engagement.",
              "For a well-defined scope, such as a redesign or an MVP, I also offer a fixed price, in writing, after a first conversation.",
            ],
          },
          {
            question: "Can you take over an existing React application?",
            answer: [
              "Yes, that is what I did at Likewatt, with a legacy application built on class components.",
              "I start by reading the code, then suggest an incremental migration: we modernize screen by screen, without stopping releases.",
            ],
          },
          {
            question: "React or Next.js?",
            answer: [
              "Next.js whenever SEO or first-load time matters: marketing site, public platform, e-commerce.",
              "A plain React application is enough for an internal tool or a dashboard behind a login.",
            ],
          },
          {
            question: "Do you work on site in Lyon?",
            answer: [
              "I mainly work remotely, from Francheville, in the Lyon metropolitan area.",
              "We decide on the format of the engagement together during the first conversation.",
            ],
          },
          {
            question: "Do you also handle the back end?",
            answer: [
              "Yes, I am a full-stack developer: NestJS, PostgreSQL, MongoDB and GraphQL on the server side.",
            ],
          },
        ],
      },
      shortName: "Freelance React developer in Lyon",
      serviceType: "React front-end development",
      og: {
        kicker: "Service · React front end",
        subtitle: "Freelance React developer in Lyon · React, Next.js, TypeScript",
        footer: "€450 / day · Lyon, France",
      },
    },
  },
}

const agences: Service = {
  key: "agences",
  updatedAt: "2026-11-17",
  projects: ["likewatt", "grindrise"],
  content: {
    fr: {
      slug: "sous-traitance-agence-web",
      metaTitle: "Sous-traitance développement web en marque blanche | Alexis Delporte",
      metaDescription:
        "Développeur full-stack freelance en sous-traitance pour agences web : marque blanche, vos conventions et vos outils. React, Next.js, NestJS. Au forfait ou au TJM (450 € / jour).",
      eyebrow: "Service · Agences",
      title: "Sous-traitance de développement web en marque blanche pour les agences",
      lead: "Votre agence a signé un projet et manque de bras, ou d'un profil full-stack pour la partie applicative ? Je développe en marque blanche, dans vos conventions et avec vos outils. Votre client ne voit que votre agence.",
      facts: [
        { label: "Tarif", value: "Forfait ou 450 € / jour" },
        { label: "Stack", value: "React · Next.js · NestJS" },
        { label: "Format", value: "Marque blanche, à distance" },
      ],
      cta: "Parler de votre projet client",
      sections: [
        {
          id: "cas",
          title: "Quand faire appel à moi",
          bullets: [
            "Un pic de charge : plusieurs projets signés en même temps, et pas assez de développeurs en interne.",
            "Une partie applicative : espace client, back-office, API, application métier derrière le site que vous concevez.",
            "Un profil manquant : votre équipe fait du front ou du CMS, et le projet demande un vrai back-end.",
            "Une reprise : un projet client existant à maintenir, faire évoluer ou remettre d'aplomb.",
            "Une application mobile en React Native, à côté du site web.",
          ],
        },
        {
          id: "marque-blanche",
          title: "Comment se passe la marque blanche",
          paragraphs: [
            "Vous restez l'interlocuteur de votre client : je ne le contacte pas sans votre accord, et le travail est livré sous le nom de votre agence.",
            "Je m'intègre à votre fonctionnement : votre repo, vos conventions de code, vos outils de gestion de projet (Slack, Notion, Jira, tickets) et votre process de revue. Si vous n'avez pas de conventions établies, je vous propose les miennes : code typé en TypeScript, pull requests, revues de code, CI et documentation.",
          ],
        },
        {
          id: "tarifs",
          title: "Au forfait ou au TJM",
          paragraphs: [
            "Deux formats, selon votre façon de vendre à vos clients. Au forfait, pour un périmètre défini : le prix, les livrables et le planning sont fixés par écrit, ce qui vous permet de construire votre propre devis en toute sécurité.",
            "Au temps passé, à 450 € par jour, pour un renfort sur la durée ou un périmètre qui évolue.",
          ],
        },
        {
          id: "qualite",
          title: "Un code que votre équipe peut maintenir",
          paragraphs: [
            "Un projet sous-traité ne doit pas devenir une boîte noire. Le code est typé, testé sur la logique sensible et documenté, et la livraison comprend une passation à votre équipe.",
            "C'est la même exigence que sur mes propres produits et chez Likewatt, où la refonte sur laquelle j'ai travaillé a divisé par deux les temps de chargement pour plus de 2 000 utilisateurs professionnels.",
          ],
        },
      ],
      proof: {
        title: "Ce que je livre",
        intro:
          "Un logiciel SaaS en production et une application mobile en développement actif : le niveau d'exigence que vous retrouverez sur vos projets clients.",
      },
      faq: {
        title: "Questions fréquentes des agences",
        items: [
          {
            question: "Travaillez-vous en marque blanche ?",
            answer: [
              "Oui, je fais de la sous-traitance technique en marque blanche pour les agences.",
              "Vous restez l'interlocuteur de votre client, et le travail est livré sous le nom de votre agence.",
            ],
          },
          {
            question: "Quel est votre tarif pour une agence ?",
            answer: [
              "Au forfait pour un périmètre défini, ou au temps passé à 450 € par jour, selon votre fonctionnement.",
              "Le forfait est fixé par écrit avant le début du développement.",
            ],
          },
          {
            question: "Pouvez-vous travailler avec nos outils et nos conventions ?",
            answer: [
              "Oui : votre repo, vos conventions de code, vos outils de gestion de projet et votre process de revue.",
            ],
          },
          {
            question: "Quelles technologies maîtrisez-vous ?",
            answer: [
              "React, Next.js et TypeScript côté front, NestJS, PostgreSQL et MongoDB côté back-end, React Native pour le mobile.",
            ],
          },
          {
            question: "Qui est propriétaire du code ?",
            answer: [
              "Votre agence, ou votre client selon votre contrat : les droits sur le code développé vous sont cédés à la fin de la mission, une fois la facture réglée.",
            ],
          },
        ],
      },
      shortName: "Sous-traitance pour agences",
      serviceType: "Sous-traitance de développement web",
      og: {
        kicker: "Service · Agences",
        subtitle: "Sous-traitance de développement web en marque blanche",
        footer: "Forfait ou 450 € / jour · React, Next.js, NestJS",
      },
    },
    en: {
      slug: "white-label-development-agencies",
      metaTitle: "White-Label Web Development for Agencies | Alexis Delporte",
      metaDescription:
        "Freelance full-stack developer for web agencies: white-label subcontracting, your conventions and your tools. React, Next.js, NestJS. Fixed price or €450 / day.",
      eyebrow: "Service · Agencies",
      title: "White-label web development subcontracting for agencies",
      lead: "Your agency has signed a project and is short on hands, or needs a full-stack profile for the application side? I build under your brand, within your conventions and with your tools. Your client only sees your agency.",
      facts: [
        { label: "Rate", value: "Fixed price or €450 / day" },
        { label: "Stack", value: "React · Next.js · NestJS" },
        { label: "Format", value: "White label, remote" },
      ],
      cta: "Talk about your client project",
      sections: [
        {
          id: "cases",
          title: "When to bring me in",
          bullets: [
            "A workload peak: several projects signed at once, and not enough in-house developers.",
            "An application layer: customer portal, back office, API, business app behind the website you design.",
            "A missing profile: your team does front end or CMS work, and the project needs a real back end.",
            "A takeover: an existing client project to maintain, evolve or get back on track.",
            "A React Native mobile app alongside the website.",
          ],
        },
        {
          id: "white-label",
          title: "How white label works",
          paragraphs: [
            "You remain your client's contact: I do not reach out to them without your agreement, and the work is delivered under your agency's name.",
            "I fit into how you work: your repo, your code conventions, your project tools (Slack, Notion, Jira, tickets) and your review process. If you have no established conventions, I bring mine: typed TypeScript code, pull requests, code reviews, CI and documentation.",
          ],
        },
        {
          id: "pricing",
          title: "Fixed price or day rate",
          paragraphs: [
            "Two formats, depending on how you sell to your clients. Fixed price, for a defined scope: price, deliverables and schedule are set in writing, so you can build your own quote safely.",
            "Time-based, at €450 per day, for ongoing support or a scope that evolves.",
          ],
        },
        {
          id: "quality",
          title: "Code your team can maintain",
          paragraphs: [
            "A subcontracted project should not become a black box. The code is typed, tested on sensitive logic and documented, and delivery includes a handover to your team.",
            "It is the same standard as on my own products and at Likewatt, where the rebuild I worked on cut load times in half for more than 2,000 professional users.",
          ],
        },
      ],
      proof: {
        title: "What I deliver",
        intro:
          "SaaS software in production and a mobile app in active development: the standard you will get on your client projects.",
      },
      faq: {
        title: "Frequently asked questions from agencies",
        items: [
          {
            question: "Do you work white label?",
            answer: [
              "Yes, I do white-label technical subcontracting for agencies.",
              "You remain your client's contact, and the work is delivered under your agency's name.",
            ],
          },
          {
            question: "What are your rates for agencies?",
            answer: [
              "Fixed price for a defined scope, or time-based at €450 per day, depending on how you work.",
              "The fixed price is set in writing before development begins.",
            ],
          },
          {
            question: "Can you work with our tools and conventions?",
            answer: [
              "Yes: your repo, your code conventions, your project management tools and your review process.",
            ],
          },
          {
            question: "Which technologies do you work with?",
            answer: [
              "React, Next.js and TypeScript on the front end, NestJS, PostgreSQL and MongoDB on the back end, React Native for mobile.",
            ],
          },
          {
            question: "Who owns the code?",
            answer: [
              "Your agency, or your client depending on your contract: the rights to the code developed are transferred to you at the end of the engagement, once the invoice is paid.",
            ],
          },
        ],
      },
      shortName: "White-label for agencies",
      serviceType: "White-label web development subcontracting",
      og: {
        kicker: "Service · Agencies",
        subtitle: "White-label web development subcontracting",
        footer: "Fixed price or €450 / day · React, Next.js, NestJS",
      },
    },
  },
}

/** Pages service, dans l'ordre d'affichage (pied de page, llms.txt, sitemap). */
export const services: Service[] = [mvp, react, nestjs, agences]

export function getService(key: ServiceKey): Service {
  const service = services.find((s) => s.key === key)
  if (!service) throw new Error(`Service inconnu : ${key}`)
  return service
}
