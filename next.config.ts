import type { NextConfig } from "next"

/**
 * Anciennes URL du site : l'ancienne page parcours, devenue l'accueil, et les
 * pages service retirées. Redirections permanentes vers l'accueil de la langue,
 * pour que les liens déjà partagés et indexés ne mènent pas à une 404.
 */
const legacyRedirects = [
  ["/parcours", "/"],
  ["/developpement-mvp", "/"],
  ["/developpeur-nestjs-freelance", "/"],
  ["/developpeur-react-freelance-lyon", "/"],
  ["/sous-traitance-agence-web", "/"],
  ["/en/profile", "/en"],
  ["/en/mvp-development", "/en"],
  ["/en/freelance-nestjs-developer", "/en"],
  ["/en/freelance-react-developer-lyon", "/en"],
  ["/en/white-label-development-agencies", "/en"],
] as const

const nextConfig: NextConfig = {
  experimental: {
    // Deux root layouts (FR / EN) : la 404 globale porte son propre document HTML.
    globalNotFound: true,
  },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }))
  },
}

export default nextConfig
