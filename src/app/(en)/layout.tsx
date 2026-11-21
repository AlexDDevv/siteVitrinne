import type { Metadata } from "next"
import { RootHtml } from "@/components/root-html"
import { baseMetadata } from "@/lib/metadata"

export { viewport } from "@/lib/metadata"

/** Root layout anglais : accueil /en, études de cas et articles EN. */
export const metadata: Metadata = {
  ...baseMetadata,
  description:
    "Alexis Delporte, full-stack developer (React, TypeScript, NestJS) based near Lyon, France.",
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootHtml lang="en">{children}</RootHtml>
}
