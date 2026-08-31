import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/section"
import { site } from "@/lib/site"

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title">
      <Container className="grid gap-7 py-20 sm:py-24">
        <p className="text-sage flex items-center gap-2.5 font-mono text-[13px]">
          <span aria-hidden className="bg-sage inline-block size-2 rounded-full" />
          Disponible pour de nouveaux projets
        </p>

        <h1
          id="hero-title"
          className="max-w-[16ch] text-[clamp(2.375rem,7vw,4.25rem)] leading-[1.03] font-semibold tracking-[-0.03em] text-pretty"
        >
          {site.name}
        </h1>

        <p className="text-amber font-mono text-[clamp(0.875rem,2vw,1.0625rem)] tracking-[0.02em]">
          {site.role}
        </p>

        <p className="max-w-[34ch] text-[clamp(1.1875rem,2.6vw,1.625rem)] leading-[1.45] text-pretty">
          Je construis des sites et des applications web sur-mesure. Et comme je développe aussi mon
          propre SaaS, je réfléchis à votre produit, pas seulement à son code.
        </p>

        <p className="text-subtle max-w-[46ch] text-base leading-relaxed">
          Basé à {site.city}, près de {site.area}. Disponible à distance partout en France.
        </p>

        {/* w-fit + auto-cols-fr : les deux boutons adoptent la largeur du plus large,
            sans que la grille s'étire sur toute la colonne. Empilés en mobile. */}
        <div className="mt-2 grid gap-3 sm:w-fit sm:auto-cols-fr sm:grid-flow-col">
          <ButtonLink href="#contact">Discutons de votre projet</ButtonLink>
          <ButtonLink href={site.links.malt} variant="outline" external arrow>
            Voir mon profil Malt
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
