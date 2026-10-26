import { TagList } from "@/components/ui/card"
import { Body, Section } from "@/components/ui/section"
import { TextLink } from "@/components/ui/text-link"
import { paths } from "@/content/i18n"

const atouts = [
  {
    title: "Des temps de chargement divisés par deux chez Likewatt",
    body: (
      <>
        Développeur full-stack chez Likewatt, éditeur SaaS. Refonte de l&apos;interface, migration
        Firebase → MongoDB, découpage en micro-services : temps de chargement{" "}
        <strong className="text-cream font-semibold">réduits de moitié</strong> pour plus de 2 000
        utilisateurs professionnels, dont des équipes de TotalEnergies, du Crédit Agricole et
        d&apos;Eiffage.
      </>
    ),
    link: { href: paths.project("fr", "likewatt"), label: "L'étude de cas Likewatt" },
  },
  {
    title: "Je construis Grindrise, mon propre produit",
    body: (
      <>
        Une application mobile de suivi sportif en React Native et NestJS, avec un modèle
        anti-triche arbitré par le serveur. Construire mon produit m&apos;oblige à penser engagement
        et rétention, pas seulement code.
      </>
    ),
    link: { href: paths.project("fr", "grindrise"), label: "L'étude de cas Grindrise" },
  },
  {
    title: "Un code qu'une équipe peut reprendre",
    body: (
      <>
        Code typé de bout en bout, tests sur la logique sensible, CI, revues de code, documentation.
        Diplômé Concepteur Développeur d&apos;Applications (RNCP niveau 6).
      </>
    ),
  },
  {
    title: "Stack moderne, outillage assumé",
    body: (
      <>
        React, Next.js, TypeScript, NestJS, React Native, PostgreSQL, MongoDB. J&apos;utilise des
        outils IA comme Claude Code pour livrer plus vite, avec une relecture systématique du code.
      </>
    ),
  },
]

export const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "NestJS",
  "React Native",
  "PostgreSQL",
  "MongoDB",
  "GraphQL",
  "Docker",
] as const

export function Approche() {
  return (
    <Section
      id="pourquoi"
      eyebrow="02 · Pourquoi travailler avec moi"
      title="Un profil produit, pas seulement une paire de mains"
    >
      <ul role="list" className="mt-11 grid gap-x-11 gap-y-6 sm:grid-cols-2">
        {atouts.map((atout, index) => (
          <li
            key={atout.title}
            className={`grid content-start gap-2.5 border-t pt-5 ${
              index === 0 ? "border-accent" : "border-line-strong"
            }`}
          >
            <h3 className="text-[18px] font-semibold">{atout.title}</h3>
            <Body>{atout.body}</Body>
            {atout.link ? (
              <p>
                <TextLink href={atout.link.href} arrow className="text-[15px] font-medium">
                  {atout.link.label}
                </TextLink>
              </p>
            ) : null}
          </li>
        ))}
      </ul>

      <TagList items={stack} label="Technologies que j'utilise" className="mt-10" />
    </Section>
  )
}
