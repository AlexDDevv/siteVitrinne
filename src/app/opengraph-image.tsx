import { renderOgImage } from "@/lib/og"
import { site } from "@/lib/site"

export const alt = `${site.name}, ${site.role} à ${site.area}`
export { ogSize as size } from "@/lib/og"
export const contentType = "image/png"

export default function OpengraphImage() {
  return renderOgImage({
    kicker: "Disponible pour de nouveaux projets",
    title: site.name,
    subtitle: site.role,
    footer: `${site.city}, près de ${site.area}. React · Next.js · TypeScript · NestJS`,
  })
}
