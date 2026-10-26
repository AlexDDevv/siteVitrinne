import activity from "@/assets/projets/nuit-d-encre/activity.png"
import admin from "@/assets/projets/nuit-d-encre/admin.png"
import authorDetails from "@/assets/projets/nuit-d-encre/authorDetails.png"
import bookDetails from "@/assets/projets/nuit-d-encre/bookDetails.png"
import books from "@/assets/projets/nuit-d-encre/books.png"
import profil1 from "@/assets/projets/nuit-d-encre/profil_1.png"
import profil2 from "@/assets/projets/nuit-d-encre/profil_2.png"
import profil3 from "@/assets/projets/nuit-d-encre/profil_3.png"
import userLibrary from "@/assets/projets/nuit-d-encre/userLibrary.png"
import type { Project } from "@/types/project"

/** Contenu repris de la page projet du portfolio (source de vérité). */
export const nuitDEncre: Project = {
  slug: "nuit-d-encre",
  kind: "personal",
  status: "done",
  stack: [
    "React 19",
    "TypeScript",
    "Vite",
    "Tailwind CSS 4",
    "Apollo Client",
    "GraphQL",
    "Apollo Server 4",
    "TypeGraphQL",
    "TypeORM",
    "PostgreSQL 15",
    "Vitest",
    "Jest",
    "Docker",
    "pnpm",
    "GitHub Actions",
    "CapRover",
    "nginx",
    "Cloudinary",
  ],
  updatedAt: "2026-10-26",
  repo: "https://github.com/AlexDDevv/Nuit-d-Encre",
  demo: "https://nuitdencre.fr/",
  content: {
    fr: {
      title: "Nuit d'Encre",
      summary:
        "Plateforme sociale de lecture full-stack : bibliothèque personnelle, critiques, fil d'activité et gamification, portée par une API GraphQL typée de bout en bout.",
      dates: "2024 → 2026",
      context: [
        "Nuit d'Encre est une bibliothèque sociale en ligne. Chaque lecteur tient sa bibliothèque, suit ses lectures, publie des critiques et suit d'autres lecteurs, dans une direction artistique nocturne assumée.",
        "Le projet a démarré fin 2024. Il est déployé sur nuitdencre.fr.",
      ],
      problem: [
        "Amener le projet au niveau production : sécurité, RGPD, tests, CI et déploiement. L'objectif : une application crédible, pas un simple CRUD.",
        "Avec les problèmes classiques d'une API GraphQL et de ses données : requêtes N+1, calculs à centraliser, règles métier à garantir même en cas de requêtes concurrentes.",
      ],
      work: [
        "Recherche hybride de livres qui combine la base interne, Google Books et Open Library, avec import d'un ouvrage externe via une page de prévisualisation par ISBN et création automatique de la fiche auteur.",
        "Bibliothèque personnelle avec statuts de lecture, progression, notes et livres favoris, filtrable par statut, format et langue.",
        "Couche sociale complète : critiques (une par livre et par lecteur), commentaires, votes « utile », recommandations, abonnements entre lecteurs et fil d'activité des personnes suivies.",
        "Gamification : XP à chaque action, niveaux, titres débloqués par paliers, et signalement des fiches incomplètes récompensées quand un lecteur les complète.",
        "Panel d'administration avec dashboard analytique et gestion des utilisateurs, livres, auteurs, catégories, critiques et bannières contextuelles publiées sur le site.",
        "Compte sécurisé et conforme RGPD : connexion par e-mail/mot de passe ou Google, réglages de confidentialité, export des données personnelles et suppression du compte.",
      ],
      technical: [
        {
          label: "Frontend",
          value:
            "SPA React 19 + Vite 5 en TypeScript 5.9 strict (noUnusedLocals/Parameters), React Router 7 avec lazy loading de toutes les pages sauf l'accueil (15 routes lazy, skeleton dédié par page) et découpage manuel du bundle en chunks vendor (react-vendor, apollo, ui-vendor, icons) pour optimiser le cache navigateur. Apollo Client 3.14 comme unique couche de données, avec une stratégie de cache hybride : cache-and-network / cache-first par défaut, network-only explicite pour les vues critiques (whoami, bannières, favoris) et refetchQueries après mutation. Logique de fetch encapsulée dans un hook par domaine, logique métier pure isolée dans lib/ (statistiques de profil, mappings de filtres, formatage). Seul état global : un AuthContext hydraté par la query WHOAMI. UI en Tailwind CSS 4 + CVA + tailwind-merge, primitives Radix UI, React Hook Form (règles de mot de passe alignées sur le backend), Motion, Sonner, react-helmet-async, auth Google via @react-oauth/google limitée aux écrans d'authentification. Polices auto-hébergées.",
        },
        {
          label: "Backend",
          value:
            "API GraphQL Apollo Server 4 + TypeGraphQL 2 (rc) : 18 resolvers organisés par domaine, 13 entités TypeORM 0.3 servant à la fois de modèle de base et de types GraphQL. Champs calculés côté serveur via FieldResolvers (note moyenne, nombre de critiques, présence en bibliothèque…) batchés par des DataLoaders instanciés par requête pour éliminer les N+1. Autorisation par @Authorized() et un customAuthChecker lisant un JWT en cookie HTTP-only signé (SameSite=Strict). Hachage Argon2, politique de mot de passe imposée aussi au changement de mot de passe, OAuth Google (google-auth-library), validation class-validator, rate limiter maison en fenêtre fixe sur login, inscription, auth Google et import de livres. Uploads Cloudinary signés côté serveur, aucune clé exposée au navigateur.",
        },
        {
          label: "Données & intégrations externes",
          value:
            "PostgreSQL 15 avec PK UUID (gen_random_uuid()), URLs de la forme /<uuid>-<slug>. Schéma versionné par migrations TypeORM (synchronize: false), rejouées au boot avec seed idempotent de l'admin et des titres de gamification. Contraintes métier garanties en base (une critique par utilisateur et par livre, unicité du nom d'auteur). Services Google Books API et Open Library interrogés en parallèle (Promise.allSettled) avec dédoublonnage par ISBN-13.",
        },
        {
          label: "Gamification",
          value:
            "Service d'attribution d'XP transactionnel : la mise à jour de l'XP et son journal d'audit (UserActions) sont écrits dans une même transaction. Chaque gain porte une clé stable (id du livre, ISBN, auteur ou couple critique/votant), et un index unique partiel PostgreSQL sur (utilisateur, type, xpKey) garantit en base qu'une action n'est créditée qu'une fois par cible. La violation d'unicité (code 23505) est interceptée pour gérer les requêtes concurrentes. Retirer puis remettre une recommandation ne rapporte donc rien, alors que recommander un autre livre crédite normalement. Niveaux dérivés du total d'XP, titres débloqués par paliers, bonus pour les critiques de plus de 200 caractères.",
        },
        {
          label: "Tests & qualité",
          value:
            "Stratégie de tests ciblée sur la logique sensible plutôt que sur une couverture exhaustive. Backend : 20 fichiers Jest couvrant l'authentification (connexion, session JWT, changement de mot de passe, OAuth Google), le contrôle d'accès GraphQL, les règles d'autorisation, l'XP (y compris la déduplication par cible), le RGPD (export et effacement), le rate limiter et les resolvers de mutations (critiques, votes, commentaires, recommandations, bibliothèque, abonnements, favoris). Ces tests appellent directement les méthodes des resolvers avec des factories (makeUser, makeContext, stubPersistence) et des statiques TypeORM mockés via jest.spyOn, sans base de données ; nombre de workers plafonné pour maîtriser la mémoire de ts-jest. Frontend : 7 fichiers Vitest sur la logique pure (agrégation et libellés du journal d'activité avec horloge figée via vi.setSystemTime, libellés de filtres envoyés au serveur, helpers d'affichage, politique de mot de passe, export JSON, liens du fil d'activité, validation de formulaire). ESLint 9 à zéro warning sur les deux workspaces, Prettier avec tri des classes Tailwind, commits conventionnels.",
        },
        {
          label: "Infrastructure & DevOps",
          value:
            "Monorepo pnpm workspace (app/frontend, app/backend). Développement sous Docker Compose (front, back, PostgreSQL 15 avec healthcheck, réseaux séparés, hot reload), proxy Vite /api. Images Node 24 Alpine, builds de production multi-stage, frontend servi par nginx-unprivileged. Production sur CapRover en trois apps : PostgreSQL, backend Node, frontend nginx servant la SPA et proxifiant /api sur le réseau interne (même origine, cookie SameSite=Strict préservé), avec un environnement de staging. CI GitHub Actions en deux jobs parallèles (lint, tests, build Vite côté front ; lint, typecheck, tests côté back) : étapes ordonnées de la moins coûteuse à la plus coûteuse, jeton en lecture seule, timeout par job, annulation des runs obsolètes. Branche master protégée par un ruleset GitHub (checks CI requis, force push interdit) : un commit n'y arrive qu'après validation sur la branche test.",
        },
      ],
      result: [
        "Une application full-stack typée de bout en bout, de la base de données au déploiement, menée sur près de deux ans. Elle est en ligne sur nuitdencre.fr.",
        "Les problèmes classiques du GraphQL et des données sont traités à la racine : DataLoaders par requête contre les N+1, calculs centralisés côté serveur, contraintes métier garanties en base, attribution d'XP transactionnelle et idempotente.",
        "Les tests ciblent ce qui coûte cher en cas de bug : autorisations, XP, RGPD, logique d'affichage dérivée. La logique pure est isolée pour être testée sans infrastructure lourde.",
        "Une CI stricte, une branche protégée et une infrastructure de production documentée complètent l'ensemble.",
      ],
      gallery: [
        {
          image: books,
          caption: "Fig. 1 : Recherche de livres",
          description:
            "Page catalogue avec recherche hybride combinant base interne, Google Books API et Open Library, avec complétion progressive des fiches importées.",
        },
        {
          image: bookDetails,
          caption: "Fig. 2 : Fiche d'un livre",
          description:
            "Détail d'un ouvrage : notes moyennes calculées côté serveur, critiques (une par utilisateur, bonus XP si détaillée), recommandations et votes.",
        },
        {
          image: authorDetails,
          caption: "Fig. 3 : Fiche auteur",
          description:
            "Présentation et bibliographie de l'auteur, alimentée automatiquement lors de l'import d'un livre.",
        },
        {
          image: userLibrary,
          caption: "Fig. 4 : Bibliothèque personnelle",
          description:
            "Suivi de lecture par statut ('Vos rayons'), avec filtres par format, langue et statut.",
        },
        {
          image: profil1,
          caption: "Fig. 5 : Profil utilisateur",
          description: "Page profil : statistiques de lecture, progression XP, badges débloqués.",
        },
        { image: profil2, caption: "Fig. 6 : Profil utilisateur" },
        { image: profil3, caption: "Fig. 7 : Profil utilisateur" },
        {
          image: activity,
          caption: "Fig. 8 : Fil d'activité social",
          description:
            "Activité des lecteurs suivis : abonnements, critiques publiées, recommandations.",
        },
        {
          image: admin,
          caption: "Fig. 9 : Panel admin",
          description:
            "Back-office : 7 onglets (utilisateurs, livres, auteurs, catégories, critiques, bannières) et dashboard analytique.",
        },
      ],
    },
    en: {
      title: "Nuit d'Encre",
      summary:
        "Full-stack social reading platform: personal library, reviews, activity feed and gamification, powered by an end-to-end typed GraphQL API.",
      dates: "2024 → 2026",
      context: [
        "Nuit d'Encre is an online social library. Each reader keeps a personal library, tracks their reading, publishes reviews and follows other readers, all within a distinctive nocturnal art direction.",
        "The project started in late 2024. It is deployed at nuitdencre.fr.",
      ],
      problem: [
        "Bringing the project to production level: security, GDPR, testing, CI and deployment. The goal: a credible application, not a simple CRUD app.",
        "Along with the classic problems of a GraphQL API and its data: N+1 queries, calculations to centralize, business rules to guarantee even under concurrent requests.",
      ],
      work: [
        "Hybrid book search combining the internal database, Google Books and Open Library, with import of external titles through an ISBN-based preview page and automatic creation of the author page.",
        "Personal library with reading statuses, progress, ratings and favorite books, filterable by status, format and language.",
        'Complete social layer: reviews (one per book per reader), comments, "helpful" votes, recommendations, follows between readers and an activity feed of followed users.',
        "Gamification: XP for every action, levels, titles unlocked at thresholds, and flagging of incomplete book pages, with rewards for readers who complete them.",
        "Admin panel with an analytics dashboard and management of users, books, authors, categories, reviews and contextual site banners.",
        "Secure, GDPR-compliant accounts: email/password or Google sign-in, privacy settings, personal data export and account deletion.",
      ],
      technical: [
        {
          label: "Frontend",
          value:
            "React 19 + Vite 5 SPA in strict TypeScript 5.9 (noUnusedLocals/Parameters), React Router 7 with every page except the home page lazy-loaded (15 lazy routes, each with a dedicated skeleton) and manual bundle splitting into vendor chunks (react-vendor, apollo, ui-vendor, icons) for better browser caching. Apollo Client 3.14 is the only data layer, with a hybrid caching strategy: cache-and-network / cache-first by default, explicit network-only for freshness-critical views (whoami, banners, favorites) and refetchQueries after mutations. Fetch logic is encapsulated in one hook per domain, and pure business logic is isolated in lib/ (profile statistics, filter mappings, formatting). The only global state is an AuthContext hydrated by the WHOAMI query. UI built with Tailwind CSS 4 + CVA + tailwind-merge, Radix UI primitives, React Hook Form (password rules aligned with the backend), Motion, Sonner, react-helmet-async, and Google sign-in via @react-oauth/google scoped to the authentication screens. Self-hosted fonts.",
        },
        {
          label: "Backend",
          value:
            "Apollo Server 4 + TypeGraphQL 2 (rc) GraphQL API: 18 resolvers organized by domain, 13 TypeORM 0.3 entities serving as both database model and GraphQL types. Server-side computed fields via FieldResolvers (average rating, review count, library presence…) batched through per-request DataLoaders to eliminate N+1 queries. Authorization through @Authorized() and a customAuthChecker reading a signed JWT stored in an HTTP-only cookie (SameSite=Strict). Argon2 hashing, a password policy also enforced on password changes, Google OAuth (google-auth-library), class-validator validation, and a custom fixed-window rate limiter on login, sign-up, Google auth and book import. Server-signed Cloudinary uploads, with no key exposed to the browser.",
        },
        {
          label: "Data & external integrations",
          value:
            "PostgreSQL 15 with UUID primary keys (gen_random_uuid()) and /<uuid>-<slug> URLs. Schema versioned through TypeORM migrations (synchronize: false), replayed at boot along with idempotent seeding of the admin account and gamification titles. Business constraints enforced at the database level (one review per user per book, unique author full name). Google Books API and Open Library services queried in parallel (Promise.allSettled) with ISBN-13 deduplication.",
        },
        {
          label: "Gamification",
          value:
            "Transactional XP service: the XP update and its audit log (UserActions) are written in the same transaction. Each gain carries a stable key (book id, ISBN, author or review/voter pair), and a partial PostgreSQL unique index on (user, type, xpKey) guarantees at the database level that an action is credited only once per target. The unique violation (code 23505) is caught to handle concurrent requests. Removing and re-adding a recommendation therefore earns nothing, while recommending another book is credited normally. Levels derived from total XP, titles unlocked at thresholds, and a bonus for reviews over 200 characters.",
        },
        {
          label: "Testing & quality",
          value:
            "A testing strategy targeting sensitive logic rather than exhaustive coverage. Backend: 20 Jest files covering authentication (login, JWT session, password change, Google OAuth), GraphQL access control, authorization rules, XP (including per-target deduplication), GDPR (export and erasure), the rate limiter and mutation resolvers (reviews, votes, comments, recommendations, library, follows, favorites). These tests call resolver methods directly with factories (makeUser, makeContext, stubPersistence) and TypeORM statics mocked via jest.spyOn, with no database; worker count is capped to keep ts-jest memory in check. Frontend: 7 Vitest files on pure logic (activity log aggregation and labels with a frozen clock via vi.setSystemTime, filter labels sent to the server, display helpers, password policy, JSON export, activity feed links, form validation). Zero-warning ESLint 9 on both workspaces, Prettier with Tailwind class sorting, conventional commits.",
        },
        {
          label: "Infrastructure & DevOps",
          value:
            "pnpm workspace monorepo (app/frontend, app/backend). Development on Docker Compose (front, back, PostgreSQL 15 with healthcheck, isolated networks, hot reload) with a Vite /api proxy. Node 24 Alpine images, multi-stage production builds, frontend served by nginx-unprivileged. Production on CapRover as three apps: PostgreSQL, a Node backend, and an nginx frontend serving the SPA and proxying /api over the internal network (same origin, preserving the SameSite=Strict cookie), plus a staging environment. GitHub Actions CI with two parallel jobs (lint, tests and Vite build on the frontend; lint, typecheck and tests on the backend): steps ordered from cheapest to most expensive, read-only token, per-job timeout, cancellation of stale runs. The master branch is protected by a GitHub ruleset (required CI checks, no force push), so a commit only lands there after passing on the test branch.",
        },
      ],
      result: [
        "An end-to-end typed full-stack application, from database to deployment, built over nearly two years. It is live at nuitdencre.fr.",
        "Classic GraphQL and data problems are handled at the root: per-request DataLoaders against N+1 queries, calculations centralized on the server, business constraints enforced in the database, transactional and idempotent XP granting.",
        "Tests target what is costly when broken: authorization, XP, GDPR, derived display logic. Pure logic is isolated so it can be tested without heavy infrastructure.",
        "A strict CI, a protected branch and a documented production infrastructure complete the picture.",
      ],
      gallery: [
        {
          image: books,
          caption: "Fig. 1: Book search",
          description:
            "Catalog page with hybrid search combining the internal database, Google Books API and Open Library, with progressive completion of imported book pages.",
        },
        {
          image: bookDetails,
          caption: "Fig. 2: Book page",
          description:
            "Book detail: server-computed average ratings, reviews (one per user, XP bonus for detailed ones), recommendations and votes.",
        },
        {
          image: authorDetails,
          caption: "Fig. 3: Author page",
          description:
            "Author presentation and bibliography, populated automatically when a book is imported.",
        },
        {
          image: userLibrary,
          caption: "Fig. 4: Personal library",
          description:
            "Reading tracking by status ('Your shelves'), with filters by format, language and status.",
        },
        {
          image: profil1,
          caption: "Fig. 5: User profile",
          description: "Profile page: reading statistics, XP progression, unlocked badges.",
        },
        { image: profil2, caption: "Fig. 6: User profile" },
        { image: profil3, caption: "Fig. 7: User profile" },
        {
          image: activity,
          caption: "Fig. 8: Social activity feed",
          description: "Activity of followed readers: follows, published reviews, recommendations.",
        },
        {
          image: admin,
          caption: "Fig. 9: Admin panel",
          description:
            "Back office: 7 tabs (users, books, authors, categories, reviews, banners) and an analytics dashboard.",
        },
      ],
    },
  },
}
