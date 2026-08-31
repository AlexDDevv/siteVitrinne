# Site vitrine — Alexis Delporte

Landing page one-page du site vitrine freelance d'Alexis Delporte, développeur web
full-stack basé à Écully, près de Lyon.

Le design suit la maquette Claude Design « Alexis Delporte — Landing » : palette
warm-dark, accent ambre, typographie IBM Plex.

## Stack

| Domaine        | Choix                                            |
| -------------- | ------------------------------------------------ |
| Framework      | Next.js 15 (App Router) · React 19               |
| Langage        | TypeScript (strict)                              |
| Styles         | Tailwind CSS v4 (design tokens dans `globals.css`) |
| Typographie    | IBM Plex Sans + IBM Plex Mono via `next/font`     |
| Formulaire     | API Route + Resend, validation zod (client + serveur) |
| Qualité        | ESLint (`next/core-web-vitals`) + Prettier       |
| Déploiement    | Vercel                                            |

## Lancer le projet en local

```bash
npm install
cp .env.example .env.local   # puis renseigner les valeurs
npm run dev                  # http://localhost:3000
```

Sans `RESEND_API_KEY`, le site fonctionne : seul l'envoi du formulaire retourne une
erreur explicite côté utilisateur.

## Scripts

| Commande               | Rôle                                    |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Serveur de développement                |
| `npm run build`        | Build de production                     |
| `npm run start`        | Sert le build de production             |
| `npm run lint`         | ESLint                                  |
| `npm run lint:fix`     | ESLint avec corrections automatiques    |
| `npm run format`       | Prettier (écriture)                     |
| `npm run format:check` | Prettier (vérification seule)           |
| `npm run typecheck`    | `tsc --noEmit`                          |

## Variables d'environnement

Toutes documentées dans [`.env.example`](./.env.example).

| Variable               | Rôle                                                        | Requise |
| ---------------------- | ----------------------------------------------------------- | ------- |
| `RESEND_API_KEY`       | Clé API Resend pour l'envoi des emails                       | oui     |
| `CONTACT_FROM_EMAIL`   | Expéditeur — domaine vérifié dans Resend                     | oui     |
| `CONTACT_TO_EMAIL`     | Destinataire des messages du formulaire                      | oui     |
| `NEXT_PUBLIC_SITE_URL` | URL publique (metadata, canonical, sitemap, og:image)        | oui     |

## Structure

```
src/
├── app/
│   ├── api/contact/route.ts   # Envoi Resend + validation serveur + honeypot
│   ├── layout.tsx             # Metadata SEO, polices, tokens
│   ├── page.tsx               # Assemblage des sections
│   ├── opengraph-image.tsx    # og:image générée à la volée
│   ├── icon.svg               # Favicon
│   └── sitemap.ts / robots.ts
│   └── globals.css            # Design tokens issus de la maquette
├── components/
│   ├── sections/              # Une section de la page par fichier
│   ├── ui/                    # Primitives partagées, sans duplication :
│   │   ├── section.tsx        #   Section (aria-labelledby auto), Container,
│   │   │                      #   Eyebrow, Body, CardGrid
│   │   ├── button.tsx         #   Button / ButtonLink — variantes primary, outline, pill
│   │   ├── text-link.tsx      #   TextLink — tons accent/subtle, gestion des liens externes
│   │   ├── card.tsx           #   Card, Tag, TagList
│   │   └── field.tsx          #   Field — label, erreur et câblage ARIA d'un champ
│   ├── contact-form.tsx       # Formulaire client (états succès/erreur)
│   ├── structured-data.tsx    # Injection du graphe Schema.org
│   ├── site-header.tsx
│   └── site-footer.tsx
├── lib/                       # site.ts, validation.ts, projects.ts, pricing.ts,
│                              # structured-data.ts
└── types/
```

## Qualité vérifiée

Lighthouse sur le build de production :

| Catégorie      | Desktop | Mobile |
| -------------- | ------- | ------ |
| Performance    | 100     | 98     |
| Accessibilité  | 100     | 100    |
| Bonnes pratiques | 100   | 100    |
| SEO            | 100     | 100    |

### SEO

- Metadata complètes : title, description, mots-clés ciblés Lyon / Écully,
  canonical, Open Graph et Twitter Card.
- `og:image` générée à la volée par `ImageResponse` — rien à maintenir à la main.
- Données structurées Schema.org (`src/lib/structured-data.ts`) : `Person`,
  `ProfessionalService` avec `areaServed` Lyon / Écully / France et le catalogue
  d'offres chiffré, `WebSite`, et un `CreativeWork` par projet publié.
- `sitemap.xml` et `robots.txt` générés, un seul `h1`, hiérarchie de titres linéaire.

### Accessibilité

- Chaque `<section>` est reliée à son `<h2>` par `aria-labelledby` : les repères
  de page sont nommés dans les lecteurs d'écran.
- Formulaire : un résumé d'erreur unique en `role="alert"` (plusieurs alertes
  simultanées se chevauchent et deviennent inaudibles), détail par champ via
  `aria-describedby`, et focus déplacé sur le premier champ invalide.
- Liens externes : `rel="noopener noreferrer"` et mention « (nouvel onglet) »
  réservée aux lecteurs d'écran.
- Navigation visible dès 320 px, contrastes AA vérifiés, focus visibles,
  `prefers-reduced-motion` respecté, lien d'évitement vers le contenu.

## À compléter

- Capture d'écran de Nuit d'Encre dans `public/projets/`, puis renseigner le
  champ `image` dans `src/lib/projects.ts` (le placeholder rayé s'affiche tant
  qu'elle est absente).
