import type { Project } from "@/types/project"

/** Contenu repris de la page projet du portfolio (source de vérité). */
export const grindrise: Project = {
  slug: "grindrise",
  kind: "personal",
  status: "in-progress",
  stack: [
    "React Native",
    "Expo",
    "TypeScript",
    "Zustand",
    "NestJS",
    "Supabase",
    "PostgreSQL",
    "Redis",
    "BullMQ",
    "Docker",
    "CapRover",
    "Jest",
  ],
  updatedAt: "2026-10-26",
  repo: "https://github.com/AlexDDevv/GrindRise",
  // [À COMPLÉTER : lien store / démo]. Vide : le lien Démo est masqué.
  demo: "",
  content: {
    fr: {
      title: "Grindrise",
      summary:
        "Application mobile de suivi sportif qui transforme chaque séance en progression RPG (classes, XP, niveaux, récit à débloquer), avec un modèle anti-triche entièrement arbitré par le serveur.",
      highlights: [
        "Le mobile en plus du web : React Native et Expo.",
        "Une logique serveur robuste : anti-triche arbitré par l'API, jobs en file d'attente avec BullMQ et Redis.",
        "Une réflexion produit : engagement, régularité, rétention.",
      ],
      dates: "2026 → en cours",
      context: [
        "Grindrise est une application mobile de suivi sportif : course, musculation et autres sports d'endurance. Elle ajoute une couche de gamification RPG pour entretenir la régularité.",
        "Le joueur choisit une classe, gagne de l'XP à chaque séance, monte de niveau et débloque des fragments de récit.",
      ],
      problem: [
        "Rendre cette progression crédible. Toute métrique saisie par l'utilisateur est falsifiable.",
        "Le serveur doit donc être seul à attribuer l'XP, selon un barème pensé pour que tricher rapporte peu.",
      ],
      work: [
        "Onboarding guidé en plusieurs étapes (bienvenue, choix du sport, choix de la classe) puis connexion sans mot de passe par code à usage unique reçu par email. Le brouillon est conservé si l'utilisateur quitte l'app pour aller chercher son code.",
        "Enregistrement de séances par sport avec calcul d'XP côté serveur : 60 XP de présence et jusqu'à 40 XP d'effort sur une courbe concave. Des garde-fous anti-triche s'appliquent (deux séances créditées par jour, 30 minutes minimum entre deux, 7 jours d'antériorité maximum). Une animation annonce le palier franchi.",
        "Suivi de musculation exercice par exercice et série par série, avec un catalogue filtrable par groupe musculaire. L'utilisateur peut créer ses propres exercices, suivre des statistiques de séance en direct et consulter un récapitulatif final.",
        "Programmes d'entraînement personnalisés, organisés en jours types avec exercices réordonnables par glisser-déposer. Une séance peut être démarrée directement depuis un jour type.",
        "Streak calculé en jours locaux selon le fuseau horaire du joueur, avec des bonus fixes aux paliers (3, 7, 14, 30 jours, puis tous les 30 jours).",
        "Système narratif en cours de construction : le mécanisme de déblocage (trame principale liée au niveau global, trames annexes par sport) est en place côté serveur, le contenu et le codex restent à intégrer. Des emails de passage de niveau sont envoyés, avec un désabonnement en un clic.",
      ],
      technical: [
        {
          label: "Mobile",
          value:
            "Expo SDK 57 (workflow managed, sans dossiers natifs), React Native 0.86, React 19.2 et TypeScript 6.0. Navigation avec React Navigation 7 : une pile d'onboarding, trois onglets et des piles imbriquées. État global avec Zustand 5. Le brouillon d'onboarding est persisté dans AsyncStorage via le middleware `persist`, et la séance de musculation en cours vit dans un store qui délègue chaque action à des fonctions pures testées. Le code est organisé par feature (auth, onboarding, strength, programs, narrative, progression…). Le design system « Braise & parchemin » est fait de tokens centralisés (couleurs, typo, espacements, effets) : aucune valeur en dur hors de `theme/`. Composants SVG sur mesure avec react-native-svg (médaillon de niveau, hexagones, surfaces à coins coupés). Une liste réordonnable par glisser-déposer est écrite sans dépendance native (PanResponder + Animated) : un seul responder au niveau de la liste, poignée dédiée, défilement automatique aux bords et ressorts exécutés en natif.",
        },
        {
          label: "Backend",
          value:
            "API NestJS 11 en modular monolith : modules étanches (workouts, gamification, narrative, programs, exercises, notifications, entitlements) qui ne communiquent que par leurs services exportés. Un guard global vérifie localement les JWT Supabase contre le JWKS public avec `jose`, sans aller-retour réseau. Les algorithmes sont en liste blanche (ES256/RS256) pour fermer l'attaque par confusion d'algorithme, et les routes publiques passent par un décorateur `@Public`. Les DTO sont validés avec class-validator, y compris des validateurs de cohérence sur mesure. La configuration est validée au démarrage : l'API refuse de démarrer si une variable manque. Les règles d'XP, de streak et de déblocage narratif sont isolées en fonctions pures, testables sans base.",
        },
        {
          label: "Base de données",
          value:
            "Supabase (PostgreSQL 17, Auth) avec 16 tables et une Row Level Security deny-by-default. Le client mobile lit en direct avec la clé `anon`, mais toute écriture sensible passe par l'API (clé `service_role`). Une séance et son XP sont écrites dans une même transaction via une fonction RPC Postgres (`log_workout_with_xp`). La table `xp_events` est append-only, garantie par un trigger. La courbe de niveaux est stockée en base, si bien qu'un rééquilibrage est rétroactif (`recomputeProgress`) sans réécrire l'historique. Les migrations SQL sont versionnées et les types TypeScript générés depuis le schéma, puis partagés entre l'API et le mobile.",
        },
        {
          label: "Messagerie & notifications",
          value:
            "Producteur BullMQ sur Redis (ioredis) pour les emails de passage de niveau, consommés par un worker déployé séparément. Le producteur est réglé pour échouer vite (pas de file hors ligne, une seule tentative) afin de ne jamais ralentir une requête utilisateur. Les liens de désabonnement sont signés en HMAC-SHA256 avec comparaison à temps constant et une portée versionnée dans le message signé. Ils fonctionnent sans session. Connexion par code OTP à usage unique envoyé par email (relais SMTP Brevo branché sur Supabase Auth, gabarits sur mesure).",
        },
        {
          label: "Infrastructure",
          value:
            "Image Docker multi-stage (node:22-alpine) : compilation, dépendances de production seules, puis image d'exécution. L'image tourne en utilisateur non-root, avec tini comme PID 1 pour un arrêt propre sur SIGTERM et un HEALTHCHECK sur `/health`. Déploiement sur un VPS OVH via CapRover, avec deux environnements isolés (production et test : projets Supabase, instances Redis et workers distincts). Builds mobiles cloud via EAS Build avec trois profils (development, preview, production). Le monorepo pnpm n'utilise volontairement pas de workspace, parce que les toolchains Metro et Nest CLI sont disjointes.",
        },
        {
          label: "Qualité & tests",
          value:
            "Environ 450 cas de test au total, avec Jest partout. Côté API, tests unitaires des règles métier et des services, plus des tests e2e avec Supertest et un serveur JWKS simulé. Côté mobile, jest-expo sur la logique pure (état de séance, durée, statistiques, construction du payload). Les migrations et les policies RLS sont testées dans un Postgres embarqué (PGlite en WASM), sans Docker. Ces tests vérifient notamment qu'un client ne peut pas s'attribuer d'XP. ESLint et Prettier complètent l'outillage, et l'historique suit les Conventional Commits.",
        },
      ],
      result: [
        "Le projet est en développement actif. La boucle séance → XP → niveau fonctionne de bout en bout. L'historique, les analytics de progression et le premier build mobile publié restent à venir.",
        "Le système complet (mobile, API, base, infrastructure) part d'un modèle de menace : le client n'écrit jamais d'XP, la RLS est testée automatiquement et le barème est conçu pour que tricher rapporte peu.",
        "La logique métier est isolée en fonctions pures, testées cas limite par cas limite. Les écritures sensibles passent par des transactions atomiques. Les compromis sont documentés dans le code (vérification JWT locale contre révocation immédiate, geste en thread JS contre dépendance native). Le déploiement est conteneurisé et durci, sur deux environnements isolés.",
        "Les choix produit sont visibles : pas de bonus d'effort en musculation (le tonnage est trop facile à gonfler), streak calé sur le fuseau local du joueur.",
      ],
      gallery: [],
    },
    en: {
      title: "Grindrise",
      summary:
        "Mobile fitness tracker that turns every workout into RPG progression (classes, XP, levels, unlockable story), backed by an anti-cheat model enforced entirely server-side.",
      highlights: [
        "Mobile on top of web: React Native and Expo.",
        "Robust server logic: anti-cheat enforced by the API, queued jobs with BullMQ and Redis.",
        "Product thinking: engagement, consistency, retention.",
      ],
      dates: "2026 → ongoing",
      context: [
        "Grindrise is a mobile fitness tracker for running, strength training and other endurance sports. It adds an RPG gamification layer to keep users consistent.",
        "Players pick a class, earn XP with every workout, level up and unlock story fragments.",
      ],
      problem: [
        "Making that progression credible. Any user-entered metric can be faked.",
        "So only the server awards XP, using a scoring model designed so that cheating pays very little.",
      ],
      work: [
        "Guided multi-step onboarding (welcome, sport choice, class choice) followed by passwordless sign-in with a one-time code sent by email. The draft is kept if the user leaves the app to fetch their code.",
        "Per-sport workout logging with server-side XP: 60 XP for showing up and up to 40 XP for effort on a concave curve. Anti-cheat guardrails apply (two credited workouts per day, at least 30 minutes apart, backfill limited to 7 days). An animation announces each level milestone.",
        "Strength tracking exercise by exercise and set by set, with a catalog filterable by muscle group. Users can create their own exercises, follow live session stats and review a final summary.",
        "Custom training programs organized into template days with drag-and-drop reorderable exercises. A workout can be started directly from a template day.",
        "Streak counted in local days based on the player's time zone, with fixed bonuses at milestones (3, 7, 14, 30 days, then every 30 days).",
        "Narrative system under construction: the unlock mechanism (main storyline tied to overall level, side storylines per sport) is in place on the server, while the story content and codex are still to come. Level-up emails are sent, with one-click unsubscribe.",
      ],
      technical: [
        {
          label: "Mobile",
          value:
            'Expo SDK 57 (managed workflow, no native folders), React Native 0.86, React 19.2 and TypeScript 6.0. Navigation with React Navigation 7: an onboarding stack, three tabs and nested stacks. Global state with Zustand 5. The onboarding draft is persisted to AsyncStorage through the `persist` middleware, and the in-progress strength session lives in a store that delegates every action to tested pure functions. The code is organized by feature (auth, onboarding, strength, programs, narrative, progression…). The "Ember & parchment" design system is built from centralized tokens (colors, typography, spacing, effects): no hard-coded values outside `theme/`. Custom SVG components with react-native-svg (level medallion, hexagons, cut-corner surfaces). A drag-and-drop reorderable list is written with no native dependency (PanResponder + Animated): a single list-level responder, a dedicated handle, edge auto-scroll and springs running on the native driver.',
        },
        {
          label: "Backend",
          value:
            "NestJS 11 API built as a modular monolith: isolated modules (workouts, gamification, narrative, programs, exercises, notifications, entitlements) that only communicate through their exported services. A global guard verifies Supabase JWTs locally against the public JWKS with `jose`, with no network round-trip. Algorithms are allow-listed (ES256/RS256) to close algorithm-confusion attacks, and public routes use a `@Public` decorator. DTOs are validated with class-validator, including custom coherence validators. Configuration is validated at startup: the API refuses to boot if a variable is missing. XP, streak and narrative unlock rules are isolated as pure functions, testable without a database.",
        },
        {
          label: "Database",
          value:
            "Supabase (PostgreSQL 17, Auth) with 16 tables and deny-by-default Row Level Security. The mobile client reads directly with the `anon` key, but every sensitive write goes through the API (`service_role` key). A workout and its XP are written in a single transaction through a Postgres RPC function (`log_workout_with_xp`). The `xp_events` table is append-only, enforced by a trigger. The level curve is stored in the database, so rebalancing is retroactive (`recomputeProgress`) without rewriting history. SQL migrations are versioned, and TypeScript types are generated from the schema and shared between the API and the mobile app.",
        },
        {
          label: "Messaging & notifications",
          value:
            "BullMQ producer on Redis (ioredis) for level-up emails, consumed by a separately deployed worker. The producer is tuned to fail fast (no offline queue, single retry) so it never slows down a user request. Unsubscribe links are signed with HMAC-SHA256, checked with constant-time comparison and carry a versioned scope in the signed message. They work without a session. Sign-in uses a one-time code sent by email (Brevo SMTP relay wired into Supabase Auth, custom templates).",
        },
        {
          label: "Infrastructure",
          value:
            "Multi-stage Docker image (node:22-alpine): build, production-only dependencies, then runtime image. The image runs as a non-root user, with tini as PID 1 for graceful SIGTERM shutdown and a HEALTHCHECK on `/health`. Deployed to an OVH VPS through CapRover, with two isolated environments (production and test: separate Supabase projects, Redis instances and workers). Cloud mobile builds through EAS Build with three profiles (development, preview, production). The pnpm monorepo deliberately has no workspace, because the Metro and Nest CLI toolchains are disjoint.",
        },
        {
          label: "Quality & testing",
          value:
            "About 450 test cases in total, with Jest throughout. On the API side, unit tests for business rules and services, plus e2e tests with Supertest and a mock JWKS server. On the mobile side, jest-expo on pure logic (session state, duration, stats, payload building). Migrations and RLS policies are tested in an embedded Postgres (PGlite in WASM), with no Docker. These tests check in particular that a client cannot grant itself XP. ESLint and Prettier round out the tooling, and the history follows Conventional Commits.",
        },
      ],
      result: [
        "The project is under active development. The workout → XP → level loop works end to end. History, progression analytics and the first published mobile build are still to come.",
        "The complete system (mobile, API, database, infrastructure) starts from a threat model: the client never writes XP, RLS is tested automatically and the scoring model is designed so that cheating pays very little.",
        "Business logic is isolated in pure functions, tested edge case by edge case. Sensitive writes go through atomic transactions. Trade-offs are documented in the code (local JWT verification versus immediate revocation, JS-thread gestures versus a native dependency). Deployment is containerized and hardened, across two isolated environments.",
        "Product decisions are visible: no effort bonus for strength training (tonnage is too easy to inflate), streaks computed in the player's local time zone.",
      ],
      gallery: [],
    },
  },
}
