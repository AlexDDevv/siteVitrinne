import { Section } from "@/components/ui/section"

const steps = [
  {
    title: "Premier contact",
    body: "Vous remplissez le formulaire, on échange sur votre besoin, par mail ou en visio : 30 minutes suffisent souvent.",
  },
  {
    title: "Proposition et devis",
    body: "Je vous écris ce qui sera fait, à quel prix et dans quel délai. Un devis clair, sans ligne obscure.",
  },
  {
    title: "Développement",
    body: "Je développe avec des points d'étape réguliers : vous voyez le site avancer, vous pouvez réagir avant la fin.",
  },
  {
    title: "Livraison",
    body: "Mise en ligne, prise en main ensemble, et l'option maintenance si vous préférez ne pas vous en occuper.",
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
              index === 0 ? "border-amber" : "border-line-input"
            }`}
          >
            <span
              aria-hidden
              className={`font-mono text-[13px] ${index === 0 ? "text-amber" : "text-subtle"}`}
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
