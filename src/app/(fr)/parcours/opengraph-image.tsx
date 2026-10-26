import { renderOgImage } from "@/lib/og"
import { site } from "@/lib/site"

export const alt = `${site.name}, Développeur full-stack · React, TypeScript, NestJS`
export { ogSize as size } from "@/lib/og"
export const contentType = "image/png"

export default function OpengraphImage() {
  return renderOgImage({
    kicker: "Parcours",
    title: site.name,
    subtitle: "Développeur full-stack · React, TypeScript, NestJS",
    footer: "Projets, expériences, formations et CV",
  })
}
