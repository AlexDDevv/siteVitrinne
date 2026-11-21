# alexisdelporte.dev

Portfolio et CV d'Alexis Delporte, développeur full-stack React / TypeScript / NestJS
basé à Francheville, près de Lyon : projets, études de cas, parcours, CV et articles
techniques, en français et en anglais.

Le design suit la maquette Claude Design « Alexis Delporte, Landing » : palette
warm-dark, accent ambre, typographie IBM Plex.

## Stack

| Domaine        | Choix                                            |
| -------------- | ------------------------------------------------ |
| Framework      | Next.js 15 (App Router) · React 19               |
| Langage        | TypeScript (strict)                              |
| Styles         | Tailwind CSS v4 (design tokens dans `globals.css`) |
| Typographie    | IBM Plex Sans + IBM Plex Mono via `next/font`     |
| Qualité        | ESLint (`next/core-web-vitals`) + Prettier       |
| Déploiement    | Vercel                                            |

## Lancer le projet en local

```bash
npm install
cp .env.example .env.local   # puis renseigner les valeurs
npm run dev                  # http://localhost:3000
```

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
| `NEXT_PUBLIC_SITE_URL` | URL publique (metadata, canonical, sitemap, og:image)        | oui     |

## Structure

```
src/
├── app/
│   ├── (fr)/                    # Root layout FR (<html lang="fr-FR">)
│   │   ├── page.tsx             #   Accueil : projets, parcours, CV, contact
│   │   ├── projets/[slug]/      #   Études de cas FR
│   │   ├── articles/            #   Articles techniques FR
│   │   └── mentions-legales/
│   ├── (en)/en/                 # Root layout EN (<html lang="en-US">)
│   │   ├── page.tsx             #   Accueil EN
│   │   ├── projects/[slug]/     #   Études de cas EN
│   │   ├── articles/            #   Articles techniques EN
│   │   └── legal-notice/        #   Mentions légales EN
│   ├── global-not-found.tsx     # 404 commune aux deux root layouts
│   ├── opengraph-image.tsx      # og:image (une par page, via src/lib/og.tsx)
│   └── sitemap.ts / robots.ts   # sitemap avec hreflang FR / EN
├── content/                     # Source unique des contenus
│   ├── projects/*.ts            #   Une étude de cas par fichier, FR + EN
│   ├── profile.ts               #   Accueil : intro, expériences, formations, contact, CV
│   ├── articles.ts              #   Articles techniques FR + EN
│   └── i18n.ts                  #   Langues, chemins, libellés d'interface
├── components/
│   ├── home-page.tsx            # Gabarit de l'accueil (/ et /en)
│   ├── project-page.tsx         # Gabarit des études de cas
│   ├── project-card.tsx         # Carte projet (accueil, autres projets)
│   └── ui/                      # Primitives : section, button, tag, text-link,
│                                # status-badge, timeline, project-links,
│                                # gallery, lang-switcher, todo
├── assets/projets/              # Captures, optimisées par next/image
└── lib/                         # site, legal, metadata, og, structured-data
public/cv/                       # alexis-delporte-{fr,en}.pdf (URL stables)
```

Les marqueurs `[À COMPLÉTER : …]` dans les contenus sont mis en évidence à
l'écran : rien ne passe inaperçu une fois en ligne.

## Qualité vérifiée

Lighthouse sur le build de production :

| Catégorie      | Desktop | Mobile |
| -------------- | ------- | ------ |
| Performance    | 100     | 98     |
| Accessibilité  | 100     | 100    |
| Bonnes pratiques | 100   | 100    |
| SEO            | 100     | 100    |

### SEO

- Metadata complètes par page : title, description, canonical, hreflang FR / EN,
  Open Graph et Twitter Card.
- `og:image` générée à la volée par `ImageResponse` : rien à maintenir à la main.
- Données structurées Schema.org (`src/lib/structured-data.ts`) : `ProfilePage`,
  `Person`, `WebSite`, un `CreativeWork` par étude de cas et un `BlogPosting` par
  article.
- Les anciennes URL (page parcours, pages service) redirigent en 308 vers
  l'accueil de leur langue (`next.config.ts`).
- `sitemap.xml` et `robots.txt` générés, un seul `h1`, hiérarchie de titres linéaire.

### Accessibilité

- Chaque `<section>` est reliée à son `<h2>` par `aria-labelledby` : les repères
  de page sont nommés dans les lecteurs d'écran.
- Liens externes : `rel="noopener noreferrer"` et mention « (nouvel onglet) »
  réservée aux lecteurs d'écran.
- Navigation visible dès 320 px, contrastes AA vérifiés, focus visibles,
  `prefers-reduced-motion` respecté, lien d'évitement vers le contenu.
