import { ProfilePage } from "@/components/profile-page"
import { paths } from "@/content/i18n"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  lang: "en",
  title: "Profile and projects",
  description:
    "Alexis Delporte, full-stack developer (React, TypeScript, NestJS) based near Lyon, France. Projects, experience, education, resume and contact.",
  alternates: paths.profile,
})

export default function Page() {
  return <ProfilePage lang="en" />
}
