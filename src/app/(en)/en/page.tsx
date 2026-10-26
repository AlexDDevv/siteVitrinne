import { HomePage } from "@/components/home-page"
import { paths } from "@/content/i18n"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata = pageMetadata({
  lang: "en",
  title: `${site.name}, freelance full-stack developer React / NestJS`,
  absoluteTitle: true,
  description:
    "Freelance full-stack developer working with React, TypeScript and NestJS. MVPs, rebuilds and performance work on web applications for startups, product teams and agencies. Based near Lyon, France, working remotely.",
  keywords: [
    "freelance full-stack developer",
    "freelance React TypeScript developer",
    "freelance NestJS developer",
    "MVP development",
    "web application rebuild",
    "web application performance",
    "white-label development for agencies",
    "freelance developer France",
  ],
  alternates: paths.home,
})

export default function Home() {
  return <HomePage lang="en" />
}
