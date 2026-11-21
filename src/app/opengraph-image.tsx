import { renderOgImage } from "@/lib/og"
import { site } from "@/lib/site"

export const alt = `${site.name}, ${site.role.fr} · React, TypeScript, NestJS`
export { ogSize as size } from "@/lib/og"
export const contentType = "image/png"

export default function OpengraphImage() {
  return renderOgImage({
    kicker: "Portfolio",
    title: site.name,
    subtitle: `${site.role.fr} · React, TypeScript, NestJS`,
    footer: "Projets, expériences, formations et CV",
  })
}
