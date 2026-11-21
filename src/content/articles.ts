import type { Lang } from "@/content/i18n"

/**
 * Articles techniques. Chaque article existe en français et en anglais, et
 * s'appuie uniquement sur des faits vérifiables (études de cas, code public).
 * Dans le texte, `code` entre backticks est rendu en police monospace.
 */

export type ArticleBlock =
  | { type: "h2"; id: string; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }

export type ArticleContent = {
  /** Segment d'URL, sans le préfixe /articles. */
  slug: string
  title: string
  /** Title complet, sans suffixe de marque ajouté. */
  metaTitle: string
  description: string
  /** Chapeau affiché sous le titre. */
  lead: string
  /** Mots-clés de l'article (JSON-LD). */
  keywords: string[]
  /** Résumé en points clés, en tête d'article : la partie que citent les moteurs IA. */
  takeaways: string[]
  blocks: ArticleBlock[]
}

export type Article = {
  key: string
  /** AAAA-MM-JJ */
  publishedAt: string
  updatedAt: string
  /** Étude de cas liée. */
  project?: string
  readingMinutes: number
  content: Record<Lang, ArticleContent>
}

const antiCheat: Article = {
  key: "anti-triche-serveur",
  publishedAt: "2026-11-18",
  updatedAt: "2026-11-18",
  project: "grindrise",
  readingMinutes: 7,
  content: {
    fr: {
      slug: "anti-triche-serveur-nestjs-supabase",
      title:
        "Anti-triche côté serveur : rendre une progression infalsifiable avec NestJS et Supabase",
      metaTitle: "Anti-triche côté serveur avec NestJS et Supabase | Alexis Delporte",
      description:
        "Comment Grindrise empêche de tricher sur l'XP : le client n'écrit jamais de points, RLS deny-by-default, transaction atomique, journal append-only et un barème où tricher rapporte peu.",
      lead: "Dans une application de suivi sportif gamifiée, toute métrique saisie par l'utilisateur est falsifiable. Voici comment j'ai conçu Grindrise pour que la progression reste crédible : quatre couches de défense, du barème jusqu'aux tests.",
      keywords: [
        "anti-triche",
        "NestJS",
        "Supabase",
        "Row Level Security",
        "PostgreSQL",
        "gamification",
        "sécurité API",
      ],
      takeaways: [
        "Le client n'écrit jamais d'XP : il lit en direct avec la clé `anon`, mais toute écriture sensible passe par l'API NestJS.",
        "La séance et son XP sont écrites dans une seule transaction Postgres, et le journal `xp_events` est append-only, garanti par un trigger.",
        "Le barème est conçu pour que tricher rapporte peu : 60 XP de présence, jusqu'à 40 XP d'effort sur une courbe concave, deux séances créditées par jour au maximum.",
        "Les policies RLS sont testées automatiquement dans un Postgres embarqué (PGlite) : un test vérifie qu'un client ne peut pas s'attribuer d'XP.",
      ],
      blocks: [
        {
          type: "h2",
          id: "probleme",
          text: "Le problème : tout ce que le client envoie est falsifiable",
        },
        {
          type: "p",
          text: "Grindrise transforme chaque séance de sport en progression RPG : le joueur choisit une classe, gagne de l'XP, monte de niveau et débloque des fragments de récit. Tout le jeu repose sur une promesse : un niveau élevé signifie qu'on s'est entraîné.",
        },
        {
          type: "p",
          text: "Or une application mobile ne contrôle rien de ce que l'utilisateur saisit. Une durée, une distance, un tonnage : tout peut être gonflé, et une requête HTTP peut être rejouée ou forgée sans passer par l'application. La question n'est donc pas « comment empêcher la triche », impossible côté client, mais « comment faire en sorte qu'elle ne rapporte presque rien ».",
        },
        { type: "h2", id: "ecritures", text: "Couche 1 : le client n'écrit jamais d'XP" },
        {
          type: "p",
          text: "La base est sur Supabase (PostgreSQL 17), avec une Row Level Security en deny-by-default : sans policy explicite, aucune ligne n'est lisible ni modifiable. Le client mobile lit directement en base avec la clé `anon`, ce qui garde l'application rapide. En revanche, toute écriture sensible passe par l'API NestJS, qui seule détient la clé `service_role`.",
        },
        {
          type: "p",
          text: "Concrètement, l'application envoie « j'ai fait 45 minutes de course », jamais « ajoute-moi 80 XP ». C'est le serveur qui calcule les points, à partir de règles que le client ne peut pas modifier.",
        },
        {
          type: "h2",
          id: "transaction",
          text: "Couche 2 : une transaction atomique et un journal append-only",
        },
        {
          type: "p",
          text: "Une séance et l'XP qu'elle rapporte sont écrites dans une même transaction, via une fonction RPC Postgres (`log_workout_with_xp`). Impossible d'obtenir une séance sans son XP, ou de l'XP sans séance, même si une requête échoue au milieu.",
        },
        {
          type: "p",
          text: "Chaque gain d'XP est un événement dans la table `xp_events`, append-only : un trigger interdit toute modification ou suppression. L'historique est donc un journal fiable, et le niveau se recalcule à partir de lui.",
        },
        {
          type: "p",
          text: "Autre avantage : la courbe de niveaux est stockée en base. Si je rééquilibre le jeu, un recalcul (`recomputeProgress`) applique la nouvelle courbe à tous les joueurs, sans réécrire une seule ligne d'historique.",
        },
        { type: "h2", id: "bareme", text: "Couche 3 : un barème où tricher rapporte peu" },
        {
          type: "p",
          text: "La sécurité technique ne suffit pas : un utilisateur peut toujours déclarer une fausse séance par l'application elle-même. Le barème est donc pensé pour limiter le gain de la triche.",
        },
        {
          type: "ul",
          items: [
            "60 XP de présence par séance : la régularité compte plus que la performance.",
            "Jusqu'à 40 XP d'effort sur une courbe concave : doubler la durée déclarée ne double pas les points.",
            "Deux séances créditées par jour au maximum, avec au moins 30 minutes d'écart.",
            "Une antériorité limitée à 7 jours : impossible de remplir rétroactivement un mois entier.",
            "Pas de bonus d'effort en musculation : le tonnage est trop facile à gonfler.",
          ],
        },
        {
          type: "p",
          text: "Résultat : le meilleur moyen de progresser vite reste de s'entraîner régulièrement. Un tricheur gagne un peu plus, mais jamais assez pour que ça vaille l'effort.",
        },
        {
          type: "h2",
          id: "authentification",
          text: "Couche 4 : une authentification vérifiée sans aller-retour réseau",
        },
        {
          type: "p",
          text: "Un guard NestJS global vérifie chaque JWT Supabase localement, contre le JWKS public, avec la bibliothèque `jose`. Pas d'appel réseau à chaque requête, donc pas de latence ajoutée. Les algorithmes acceptés sont en liste blanche (ES256 et RS256), ce qui ferme l'attaque par confusion d'algorithme. Les routes publiques sont déclarées explicitement avec un décorateur `@Public` : par défaut, tout est protégé.",
        },
        {
          type: "p",
          text: "Ce choix a un coût, documenté dans le code : une vérification locale ne voit pas une révocation immédiate. Le jeton reste valide jusqu'à son expiration. Pour une application de sport, c'est un compromis acceptable.",
        },
        { type: "h2", id: "tests", text: "Tester la sécurité, pas seulement la logique" },
        {
          type: "p",
          text: "Une policy RLS mal écrite ne casse rien de visible : elle laisse simplement passer ce qu'elle devrait bloquer. Les migrations et les policies sont donc testées dans un Postgres embarqué, PGlite en WebAssembly, sans Docker. Ces tests vérifient notamment qu'un client authentifié ne peut pas s'attribuer d'XP.",
        },
        {
          type: "p",
          text: "Les règles d'XP, de streak et de déblocage narratif sont isolées en fonctions pures, testées cas limite par cas limite. Côté API, des tests e2e avec Supertest tournent contre un serveur JWKS simulé. Au total, le projet compte environ 450 cas de test.",
        },
        { type: "h2", id: "lecons", text: "Ce que j'en retiens pour d'autres produits" },
        {
          type: "ul",
          items: [
            "Partir d'un modèle de menace : lister ce qu'un utilisateur malveillant peut envoyer avant d'écrire la première route.",
            "Lire en direct, écrire par l'API : on garde la rapidité de Supabase sans exposer les écritures sensibles.",
            "Rendre la triche peu rentable plutôt qu'impossible : le design du barème est une mesure de sécurité.",
            "Tester les permissions comme du code métier : une RLS non testée est une RLS qu'on suppose correcte.",
          ],
        },
        {
          type: "p",
          text: "Ces principes valent bien au-delà du jeu : programme de fidélité, parrainage, quotas d'utilisation, crédits. Dès qu'une action de l'utilisateur rapporte quelque chose, le serveur doit en être le seul arbitre.",
        },
      ],
    },
    en: {
      slug: "server-side-anti-cheat-nestjs-supabase",
      title: "Server-side anti-cheat: making progression tamper-proof with NestJS and Supabase",
      metaTitle: "Server-Side Anti-Cheat with NestJS and Supabase | Alexis Delporte",
      description:
        "How Grindrise prevents XP cheating: the client never writes points, deny-by-default RLS, an atomic transaction, an append-only log and a scoring model where cheating pays little.",
      lead: "In a gamified fitness app, any user-entered metric can be faked. Here is how I designed Grindrise so progression stays credible: four layers of defense, from the scoring model to the tests.",
      keywords: [
        "anti-cheat",
        "NestJS",
        "Supabase",
        "Row Level Security",
        "PostgreSQL",
        "gamification",
        "API security",
      ],
      takeaways: [
        "The client never writes XP: it reads directly with the `anon` key, but every sensitive write goes through the NestJS API.",
        "A workout and its XP are written in a single Postgres transaction, and the `xp_events` log is append-only, enforced by a trigger.",
        "The scoring model is designed so cheating pays little: 60 XP for showing up, up to 40 XP for effort on a concave curve, at most two credited workouts per day.",
        "RLS policies are tested automatically in an embedded Postgres (PGlite): one test checks that a client cannot grant itself XP.",
      ],
      blocks: [
        {
          type: "h2",
          id: "problem",
          text: "The problem: everything the client sends can be faked",
        },
        {
          type: "p",
          text: "Grindrise turns every workout into RPG progression: players pick a class, earn XP, level up and unlock story fragments. The whole game rests on one promise: a high level means you actually trained.",
        },
        {
          type: "p",
          text: 'But a mobile app controls nothing the user enters. Duration, distance, tonnage: everything can be inflated, and an HTTP request can be replayed or forged without going through the app. So the question is not "how do we prevent cheating", which is impossible on the client, but "how do we make it pay almost nothing".',
        },
        { type: "h2", id: "writes", text: "Layer 1: the client never writes XP" },
        {
          type: "p",
          text: "The database runs on Supabase (PostgreSQL 17), with deny-by-default Row Level Security: without an explicit policy, no row can be read or changed. The mobile client reads directly from the database with the `anon` key, which keeps the app fast. Every sensitive write, however, goes through the NestJS API, which alone holds the `service_role` key.",
        },
        {
          type: "p",
          text: 'In practice, the app sends "I ran for 45 minutes", never "give me 80 XP". The server computes the points, using rules the client cannot change.',
        },
        {
          type: "h2",
          id: "transaction",
          text: "Layer 2: an atomic transaction and an append-only log",
        },
        {
          type: "p",
          text: "A workout and the XP it earns are written in the same transaction, through a Postgres RPC function (`log_workout_with_xp`). You cannot end up with a workout without its XP, or XP without a workout, even if a request fails halfway.",
        },
        {
          type: "p",
          text: "Every XP gain is an event in the `xp_events` table, which is append-only: a trigger forbids any update or delete. The history is therefore a reliable log, and the level is recomputed from it.",
        },
        {
          type: "p",
          text: "Another benefit: the level curve is stored in the database. If I rebalance the game, a recompute (`recomputeProgress`) applies the new curve to every player without rewriting a single history row.",
        },
        { type: "h2", id: "scoring", text: "Layer 3: a scoring model where cheating pays little" },
        {
          type: "p",
          text: "Technical security is not enough: a user can always log a fake workout through the app itself. So the scoring model is designed to limit what cheating earns.",
        },
        {
          type: "ul",
          items: [
            "60 XP per workout for showing up: consistency matters more than performance.",
            "Up to 40 XP for effort on a concave curve: doubling the declared duration does not double the points.",
            "At most two credited workouts per day, at least 30 minutes apart.",
            "Backfill limited to 7 days: you cannot retroactively fill in a whole month.",
            "No effort bonus for strength training: tonnage is too easy to inflate.",
          ],
        },
        {
          type: "p",
          text: "The result: the best way to progress fast is still to train regularly. A cheater earns a little more, but never enough to be worth the effort.",
        },
        {
          type: "h2",
          id: "authentication",
          text: "Layer 4: authentication verified with no network round-trip",
        },
        {
          type: "p",
          text: "A global NestJS guard verifies every Supabase JWT locally, against the public JWKS, with the `jose` library. No network call per request, so no added latency. Accepted algorithms are allow-listed (ES256 and RS256), which closes algorithm-confusion attacks. Public routes are declared explicitly with a `@Public` decorator: everything is protected by default.",
        },
        {
          type: "p",
          text: "This choice has a cost, documented in the code: local verification cannot see an immediate revocation. The token stays valid until it expires. For a fitness app, that is an acceptable trade-off.",
        },
        { type: "h2", id: "tests", text: "Testing security, not just logic" },
        {
          type: "p",
          text: "A badly written RLS policy breaks nothing visible: it simply lets through what it should block. Migrations and policies are therefore tested in an embedded Postgres, PGlite in WebAssembly, with no Docker. These tests check in particular that an authenticated client cannot grant itself XP.",
        },
        {
          type: "p",
          text: "XP, streak and narrative unlock rules are isolated as pure functions, tested edge case by edge case. On the API side, e2e tests with Supertest run against a mock JWKS server. In total, the project has about 450 test cases.",
        },
        { type: "h2", id: "lessons", text: "What I take away for other products" },
        {
          type: "ul",
          items: [
            "Start from a threat model: list what a malicious user can send before writing the first route.",
            "Read directly, write through the API: you keep Supabase's speed without exposing sensitive writes.",
            "Make cheating unprofitable rather than impossible: scoring design is a security measure.",
            "Test permissions like business logic: untested RLS is RLS you assume is correct.",
          ],
        },
        {
          type: "p",
          text: "These principles go well beyond games: loyalty programs, referrals, usage quotas, credits. As soon as a user action earns something, the server must be its only referee.",
        },
      ],
    },
  },
}

/** Articles, du plus récent au plus ancien. */
export const articles: Article[] = [antiCheat]

export function getArticle(lang: Lang, slug: string): Article | undefined {
  return articles.find((article) => article.content[lang].slug === slug)
}

/** Textes de la page liste des articles. */
export const articlesIndex = {
  fr: {
    title: "Articles",
    metaTitle: "Articles techniques : React, NestJS, architecture | Alexis Delporte",
    description:
      "Retours d'expérience techniques d'Alexis Delporte, développeur full-stack : architecture NestJS, sécurité, React, PostgreSQL.",
    lead: "Des retours d'expérience tirés de mes projets : les choix techniques, les compromis et ce que j'en retiens.",
    read: "Lire l'article",
    minutes: (n: number) => `${n} min de lecture`,
    published: "Publié le",
    updated: "Mis à jour le",
    takeaways: "En bref",
    caseStudy: "L'étude de cas complète",
    back: "Tous les articles",
  },
  en: {
    title: "Articles",
    metaTitle: "Technical Articles: React, NestJS, Architecture | Alexis Delporte",
    description:
      "Technical write-ups by Alexis Delporte, full-stack developer: NestJS architecture, security, React, PostgreSQL.",
    lead: "Write-ups drawn from my projects: the technical choices, the trade-offs and what I take away from them.",
    read: "Read the article",
    minutes: (n: number) => `${n} min read`,
    published: "Published on",
    updated: "Updated on",
    takeaways: "Key takeaways",
    caseStudy: "The full case study",
    back: "All articles",
  },
} satisfies Record<Lang, unknown>
