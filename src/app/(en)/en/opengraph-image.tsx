import { home } from "@/content/home"
import { renderOgImage } from "@/lib/og"
import { site } from "@/lib/site"

export const alt = `${site.name}, ${home.en.role} React / TypeScript / NestJS`
export { ogSize as size } from "@/lib/og"
export const contentType = "image/png"

export default function OpengraphImage() {
  return renderOgImage({
    kicker: home.en.hero.available,
    title: site.name,
    subtitle: `${home.en.role} · React / TypeScript / NestJS`,
    footer: "MVP · Rebuild · Performance · Startups, product teams and agencies",
  })
}
