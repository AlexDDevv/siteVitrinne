import { ProfilePage } from "@/components/profile-page"
import { paths } from "@/content/i18n"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  lang: "fr",
  title: "Parcours et projets",
  description:
    "Alexis Delporte, développeur full-stack (React, TypeScript, NestJS) basé à Écully, près de Lyon. Projets, expériences, formations, CV et contact.",
  alternates: paths.profile,
})

export default function Page() {
  return <ProfilePage lang="fr" />
}
