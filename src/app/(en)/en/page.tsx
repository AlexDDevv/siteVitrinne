import { HomePage } from "@/components/home-page"
import { paths } from "@/content/i18n"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata = pageMetadata({
  lang: "en",
  title: `${site.name}, full-stack developer React / TypeScript / NestJS`,
  absoluteTitle: true,
  description:
    "Portfolio and resume of Alexis Delporte, full-stack developer working with React, TypeScript and NestJS, based near Lyon, France: projects, case studies, experience, education and technical articles.",
  keywords: [
    "full-stack developer",
    "React TypeScript developer",
    "NestJS developer",
    "developer portfolio",
    "full-stack developer resume",
    "full-stack developer Lyon",
  ],
  alternates: paths.home,
})

export default function Home() {
  return <HomePage lang="en" />
}
