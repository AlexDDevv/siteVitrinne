import type { Metadata } from "next"
import { RootHtml } from "@/components/root-html"
import { Container } from "@/components/ui/section"
import { TextLink } from "@/components/ui/text-link"
import { paths } from "@/content/i18n"

export const metadata: Metadata = {
  title: "404 · Page introuvable",
  robots: { index: false },
}

/** 404 commune aux deux langues : sans root layout unique, Next la rend seule. */
export default function GlobalNotFound() {
  return (
    <RootHtml lang="fr">
      <main id="main">
        <Container className="grid min-h-[80vh] content-center gap-6 py-20">
          <p className="text-accent font-mono text-sm">404</p>
          <h1 className="text-[clamp(2rem,6vw,3.5rem)] leading-[1.1] font-semibold tracking-[-0.03em]">
            Cette page n&apos;existe pas ou a été déplacée.
          </h1>
          <p lang="en" className="text-subtle text-lg">
            This page doesn&apos;t exist or has moved.
          </p>
          <ul role="list" className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <TextLink href="/" arrow>
                Accueil
              </TextLink>
            </li>
            <li>
              <TextLink href={paths.profile.fr} arrow>
                Parcours
              </TextLink>
            </li>
            <li lang="en">
              <TextLink href={paths.home.en} arrow lang="en">
                Home (EN)
              </TextLink>
            </li>
          </ul>
        </Container>
      </main>
    </RootHtml>
  )
}
