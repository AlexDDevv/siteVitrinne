import type { ReactNode } from "react"
import { SiteFooter } from "@/components/site-footer"
import { LangSwitcher } from "@/components/ui/lang-switcher"
import { Container } from "@/components/ui/section"
import { TextLink } from "@/components/ui/text-link"
import { htmlLang, paths, type Lang } from "@/content/i18n"
import { host, legal } from "@/lib/legal"
import { site } from "@/lib/site"

function Article({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-line-strong grid gap-3 border-t pt-7">
      <h2 className="text-[19px] font-semibold">{title}</h2>
      <div className="text-muted grid gap-3 text-[15.5px] leading-[1.7]">{children}</div>
    </section>
  )
}

function Row({ label, children, lang }: { label: string; children: ReactNode; lang: Lang }) {
  return (
    <p>
      <span className="text-subtle">
        {label}
        {lang === "fr" ? " : " : ": "}
      </span>
      {children}
    </p>
  )
}

const email = <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>

/**
 * Mentions légales et politique de confidentialité. La version anglaise est une
 * traduction de courtoisie : la version française fait foi.
 */
export function LegalPage({ lang }: { lang: Lang }) {
  const fr = lang === "fr"
  const updatedAt = new Date(legal.updatedAt).toLocaleDateString(htmlLang[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <>
      <main id="main">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-[760px] gap-8">
            <header className="grid gap-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <TextLink href={paths.home[lang]} tone="subtle" className="font-mono text-[13px]">
                  <span aria-hidden>←</span> {fr ? "Retour à l'accueil" : "Back to home"}
                </TextLink>
                <LangSwitcher lang={lang} alternates={paths.legal} />
              </div>
              <h1 className="text-[clamp(1.875rem,4.4vw,2.5rem)] leading-[1.1] font-semibold tracking-tight">
                {fr ? "Mentions légales" : "Legal notice"}
              </h1>
              <p className="text-subtle text-[15.5px]">
                {fr ? "Dernière mise à jour : " : "Last updated: "}
                <time dateTime={legal.updatedAt}>{updatedAt}</time>
              </p>
              {fr ? null : (
                <p className="text-subtle text-[15.5px]">
                  This English version is provided for convenience. In case of discrepancy, the{" "}
                  <TextLink href={paths.legal.fr}>French version</TextLink> prevails.
                </p>
              )}
            </header>

            <Article title={fr ? "Éditeur du site" : "Website publisher"}>
              <Row
                lang={lang}
                label={fr ? "Responsable de la publication" : "Publication director"}
              >
                {site.name}
              </Row>
              <Row lang={lang} label="Email">
                {email}
              </Row>
              <p>
                {fr
                  ? "Site personnel, édité par une personne physique à titre non professionnel et sans finalité commerciale."
                  : "Personal website, published by an individual in a non-professional capacity and with no commercial purpose."}
              </p>
            </Article>

            <Article title={fr ? "Hébergement" : "Hosting"}>
              <Row lang={lang} label={fr ? "Hébergeur" : "Host"}>
                {host.name}
              </Row>
              <Row lang={lang} label={fr ? "Adresse" : "Address"}>
                {fr ? host.address : host.addressEn}
              </Row>
              <Row lang={lang} label={fr ? "Site" : "Website"}>
                <TextLink href={host.url} external lang={lang}>
                  {host.url.replace("https://", "")}
                </TextLink>
              </Row>
              <p>
                {fr
                  ? "Les pages sont servies depuis l'infrastructure européenne de l'hébergeur (région de Paris)."
                  : "Pages are served from the host's European infrastructure (Paris region)."}
              </p>
            </Article>

            <Article title={fr ? "Données personnelles" : "Personal data"}>
              <p>
                {fr
                  ? "Ce site ne comporte aucun formulaire et ne collecte aucune donnée personnelle. Si vous m'écrivez par email, votre adresse et votre message servent uniquement à vous répondre et ne sont transmis à personne."
                  : "This website has no form and collects no personal data. If you email me, your address and message are used only to reply to you and are never shared."}
              </p>
              <p>
                {fr
                  ? "Vous disposez d'un droit d'accès, de rectification et d'effacement sur ces échanges. Pour l'exercer, écrivez à "
                  : "You have the right to access, rectify and erase these exchanges. To exercise it, write to "}
                {email}
                {fr
                  ? ". Vous pouvez également introduire une réclamation auprès de la "
                  : ". You can also lodge a complaint with the "}
                <TextLink href="https://www.cnil.fr" external lang={lang}>
                  CNIL
                </TextLink>
                {fr ? "." : ", the French data protection authority."}
              </p>
            </Article>

            <Article title={fr ? "Cookies et mesure d'audience" : "Cookies and analytics"}>
              {fr ? (
                <p>
                  Ce site ne dépose <strong>aucun cookie</strong> et n&apos;utilise aucun traceur
                  publicitaire ni outil de mesure d&apos;audience. Aucun consentement n&apos;est
                  donc requis, et votre navigation n&apos;est pas suivie.
                </p>
              ) : (
                <p>
                  This website sets <strong>no cookies</strong> and uses no advertising trackers or
                  analytics tools. No consent is therefore required, and your browsing is not
                  tracked.
                </p>
              )}
            </Article>

            <Article title={fr ? "Propriété intellectuelle" : "Intellectual property"}>
              <p>
                {fr
                  ? `La structure du site, ses textes et ses éléments graphiques sont la propriété de ${site.name}, sauf mention contraire. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable est interdite.`
                  : `The structure of the website, its texts and its graphic elements are the property of ${site.name}, unless stated otherwise. Any full or partial reproduction or representation without prior written permission is prohibited.`}
              </p>
              <p>
                {fr
                  ? "Les noms et logos des sociétés citées appartiennent à leurs titulaires respectifs."
                  : "The names and logos of the companies mentioned belong to their respective owners."}
              </p>
            </Article>

            <Article title={fr ? "Responsabilité" : "Liability"}>
              <p>
                {fr
                  ? "Les informations publiées sont fournies à titre indicatif et peuvent évoluer."
                  : "The information published is provided for guidance and may change."}
              </p>
              <p>
                {fr
                  ? "Ce site renvoie vers des sites tiers dont le contenu n'engage que leurs éditeurs."
                  : "This website links to third-party websites whose content is the sole responsibility of their publishers."}
              </p>
            </Article>
          </div>
        </Container>
      </main>
      <SiteFooter lang={lang} />
    </>
  )
}
