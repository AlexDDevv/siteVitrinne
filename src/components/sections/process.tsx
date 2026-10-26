import { Section } from "@/components/ui/section"

const steps = [
  {
    title: "Cadrage",
    body: "30 minutes en visio : le besoin, le contexte technique, les contraintes et l'échéance.",
  },
  {
    title: "Proposition écrite",
    body: "Périmètre, livrables, planning et prix. Par écrit, pour partir tous de la même base.",
  },
  {
    title: "Développement",
    body: "Dans votre repo ou un repo dédié. Pull requests, revues de code, CI. Des points réguliers et une communication écrite : Slack, Notion, tickets.",
  },
  {
    title: "Livraison",
    body: "Mise en production, documentation et passation à votre équipe.",
  },
]

export function Process() {
  return (
    <Section
      id="process"
      alt
      eyebrow="05 · Comment ça se passe"
      title="Quatre étapes, zéro surprise"
    >
      {/* <ol> plutôt qu'<ul> : l'ordre des étapes porte le sens. */}
      <ol className="mt-11 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={`grid content-start gap-3 border-t-2 pt-[18px] ${
              index === 0 ? "border-accent" : "border-line-input"
            }`}
          >
            <span
              aria-hidden
              className={`font-mono text-[13px] ${index === 0 ? "text-accent" : "text-subtle"}`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-[17.5px] font-semibold">{step.title}</h3>
            <p className="text-muted text-[15px] leading-[1.6]">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
