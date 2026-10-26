import { renderOgImage } from "@/lib/og"
import { site } from "@/lib/site"

export const alt = `${site.name}, Full-stack developer · React, TypeScript, NestJS`
export { ogSize as size } from "@/lib/og"
export const contentType = "image/png"

export default function OpengraphImage() {
  return renderOgImage({
    kicker: "Profile",
    title: site.name,
    subtitle: "Full-stack developer · React, TypeScript, NestJS",
    footer: "Projects, experience, education and resume",
  })
}
