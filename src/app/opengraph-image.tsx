import { renderOgImage } from "@/lib/og"
import { site } from "@/lib/site"

export const alt = `${site.name}, ${site.role} React / TypeScript / NestJS`
export { ogSize as size } from "@/lib/og"
export const contentType = "image/png"

export default function OpengraphImage() {
  return renderOgImage({
    kicker: "Disponible pour de nouveaux projets",
    title: site.name,
    subtitle: `${site.role} · React / TypeScript / NestJS`,
    footer: "MVP · Refonte · Performance · Startups, équipes produit et agences",
  })
}
