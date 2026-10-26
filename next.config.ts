import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    // Deux root layouts (FR / EN) : la 404 globale porte son propre document HTML.
    globalNotFound: true,
  },
}

export default nextConfig
