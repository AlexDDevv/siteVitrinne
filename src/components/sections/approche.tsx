import { TagList } from "@/components/ui/card"
import { Body, Section } from "@/components/ui/section"

const atouts = [
  {
    title: "Full-stack en poste chez Likewatt",
    body: (
      <>
        Éditeur de logiciel SaaS, où j&apos;ai contribué à réduire de{" "}
        <strong className="text-cream font-semibold">80 % les temps de chargement</strong> pour plus
        de 2 000 utilisateurs professionnels — des équipes de TotalEnergies, Crédit Agricole ou
        Eiffage.
      </>
    ),
  },
  {
    title: "Créateur d'un SaaS en parallèle",
    body: (
      <>
        Je développe ma propre application de tracking sportif. Résultat : je ne pense pas
        «&nbsp;site&nbsp;», je pense produit — expérience utilisateur, rétention, ce qui fait
        revenir les gens sur le long terme.
      </>
    ),
  },
  {
    title: "Concepteur Développeur d'Applications",
    body: (
      <>
        Diplôme RNCP niveau 6 : conception, développement, mise en production. Le cadre
        méthodologique derrière le code.
      </>
    ),
  },
  {
    title: "Stack moderne, outillage assumé",
    body: (
      <>
        React, Next.js, TypeScript, NestJS, PostgreSQL. J&apos;utilise aussi des outils IA comme
        Claude Code pour livrer plus vite, sans rien lâcher sur la qualité ni sur la relecture du
        code.
      </>
    ),
  },
]

export const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "NestJS",
  "PostgreSQL",
  "GraphQL",
  "Docker",
  "Stripe",
] as const

export function Approche() {
  return (
    <Section
      id="pourquoi"
      eyebrow="02 — Pourquoi travailler avec moi"
      title="Un profil produit, pas seulement une paire de mains"
    >
      <ul role="list" className="mt-11 grid gap-x-11 gap-y-6 sm:grid-cols-2">
        {atouts.map((atout, index) => (
          <li
            key={atout.title}
            className={`grid content-start gap-2.5 border-t pt-5 ${
              index === 0 ? "border-amber" : "border-line-strong"
            }`}
          >
            <h3 className="text-[18px] font-semibold">{atout.title}</h3>
            <Body>{atout.body}</Body>
          </li>
        ))}
      </ul>

      <TagList items={stack} label="Technologies que j'utilise" className="mt-10" />
    </Section>
  )
}
