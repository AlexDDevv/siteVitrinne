import { ContactForm } from "@/components/contact-form"
import { Container, Eyebrow } from "@/components/ui/section"
import { TextLink } from "@/components/ui/text-link"
import { site, socialLinks } from "@/lib/site"

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-line-strong border-t">
      <Container className="grid items-start gap-12 py-20 sm:py-24 lg:grid-cols-2">
        <div className="grid content-start gap-4.5">
          <Eyebrow>06 · Contact</Eyebrow>
          <h2
            id="contact-title"
            className="text-[clamp(1.875rem,4.4vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.025em]"
          >
            Parlez-moi de votre projet
          </h2>
          <p className="text-muted max-w-[40ch] text-[17px] leading-relaxed">
            Deux lignes suffisent pour démarrer. Je réponds sous 24 h ouvrées, et le premier échange
            ne vous engage à rien.
          </p>
          <ul role="list" className="mt-2 grid gap-2.5 text-[15.5px]">
            <li>
              <TextLink href={site.links.malt} external arrow>
                Passer par mon profil Malt
              </TextLink>
            </li>
            {socialLinks
              .filter((social) => social.label !== "Malt")
              .map((social) => (
                <li key={social.label}>
                  <TextLink href={social.href} tone="subtle" external>
                    {social.label}
                  </TextLink>
                </li>
              ))}
          </ul>
        </div>

        <div className="bg-surface border-line-strong rounded-2xl border p-6 sm:p-7">
          <ContactForm />
        </div>
      </Container>
    </section>
  )
}
