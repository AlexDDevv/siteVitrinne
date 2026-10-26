import type { ReactNode } from "react"
import { SiteFooter } from "@/components/site-footer"
import { LangSwitcher } from "@/components/ui/lang-switcher"
import { Container } from "@/components/ui/section"
import { TextLink } from "@/components/ui/text-link"
import { htmlLang, paths, type Lang } from "@/content/i18n"
import { host, legal, mailProcessor } from "@/lib/legal"
import { site } from "@/lib/site"

/** Signale une information légale encore absente, en évidence sur la page. */
function ToComplete({ label }: { label: string }) {
  return (
    <mark className="bg-amber/20 text-cream rounded px-1.5 py-0.5 font-mono text-[13px]">
      [À COMPLÉTER : {label}]
    </mark>
  )
}

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
        <Container className="grid max-w-190 gap-8 py-16 sm:py-20">
          <header className="grid gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <TextLink
                href={fr ? "/" : paths.profile.en}
                tone="subtle"
                className="font-mono text-[13px]"
              >
                <span aria-hidden>←</span> {fr ? "Retour à l'accueil" : "Back to profile"}
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
            <Row lang={lang} label={fr ? "Responsable de la publication" : "Publication director"}>
              {site.name}
            </Row>
            <Row lang={lang} label={fr ? "Statut" : "Legal status"}>
              {fr
                ? "Entrepreneur individuel (micro-entreprise)"
                : "Sole proprietor (French micro-entreprise)"}
            </Row>
            <Row lang={lang} label={fr ? "Adresse du siège social" : "Registered address"}>
              {legal.address ?? <ToComplete label="adresse du siège" />}
            </Row>
            {legal.workplace ? (
              <Row lang={lang} label={fr ? "Lieu d'exercice" : "Place of business"}>
                {fr ? legal.workplace : legal.workplaceEn}
              </Row>
            ) : null}
            <Row lang={lang} label={fr ? "SIRET" : "SIRET (French company number)"}>
              {legal.siret ?? <ToComplete label="numéro SIRET à 14 chiffres" />}
            </Row>
            <Row lang={lang} label="Email">
              {email}
            </Row>
            {legal.phone ? (
              <Row lang={lang} label={fr ? "Téléphone" : "Phone"}>
                <TextLink href={`tel:+33${legal.phone.slice(1)}`}>
                  {legal.phone.replace(/(\d{2})(?=\d)/g, "$1 ")}
                </TextLink>
              </Row>
            ) : null}
            <p>
              {fr
                ? "L'activité de développement web n'est pas une profession réglementée : elle n'est soumise ni à un ordre professionnel, ni à une autorisation d'exercice."
                : "Web development is not a regulated profession in France: it is not subject to a professional body or to a licence to practise."}
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
            {fr ? (
              <p>
                Le formulaire de contact recueille votre <strong>nom</strong>, votre{" "}
                <strong>adresse email</strong>, le <strong>type de projet</strong> et le{" "}
                <strong>message</strong> que vous rédigez. Aucune autre donnée n&apos;est collectée.
              </p>
            ) : (
              <p>
                The contact form collects your <strong>name</strong>, your{" "}
                <strong>email address</strong>, the <strong>project type</strong> and the{" "}
                <strong>message</strong> you write. No other data is collected.
              </p>
            )}
            <Row lang={lang} label={fr ? "Responsable du traitement" : "Data controller"}>
              {site.name}
            </Row>
            <Row lang={lang} label={fr ? "Finalité" : "Purpose"}>
              {fr
                ? "Répondre à votre demande et échanger sur votre projet"
                : "Replying to your request and discussing your project"}
            </Row>
            <Row lang={lang} label={fr ? "Base légale" : "Legal basis"}>
              {fr
                ? "Mesures précontractuelles prises à votre demande (art. 6.1.b du RGPD)"
                : "Pre-contractual steps taken at your request (Art. 6(1)(b) GDPR)"}
            </Row>
            <Row lang={lang} label={fr ? "Durée de conservation" : "Retention period"}>
              {fr
                ? "3 ans à compter de notre dernier échange, puis suppression"
                : "3 years from our last exchange, then deletion"}
            </Row>
            <Row lang={lang} label={fr ? "Destinataires" : "Recipients"}>
              {fr
                ? `${site.name} uniquement. Aucune donnée n'est vendue, louée ni transmise à des fins publicitaires.`
                : `${site.name} only. No data is sold, rented or shared for advertising purposes.`}
            </Row>
            <p>
              {fr
                ? `L'acheminement des emails est assuré par ${mailProcessor.name}, agissant comme sous-traitant. Le traitement est hébergé en ${mailProcessor.region}, sans transfert hors Union européenne. Voir sa `
                : `Emails are delivered by ${mailProcessor.name}, acting as a processor. Processing is hosted in the ${mailProcessor.regionEn}, with no transfer outside the European Union. See its `}
              <TextLink href={mailProcessor.url} external lang={lang}>
                {fr ? "politique de confidentialité" : "privacy policy"}
              </TextLink>
              .
            </p>
            <p>
              {fr
                ? "Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition, de limitation et de portabilité sur vos données. Pour les exercer, écrivez à "
                : "You have the right to access, rectify, erase, object to, restrict and port your data. To exercise these rights, write to "}
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
                publicitaire ni outil de mesure d&apos;audience. Aucun consentement n&apos;est donc
                requis, et votre navigation n&apos;est pas suivie.
              </p>
            ) : (
              <p>
                This website sets <strong>no cookies</strong> and uses no advertising trackers or
                analytics tools. No consent is therefore required, and your browsing is not tracked.
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
                ? "Les noms et logos des sociétés citées à titre de références appartiennent à leurs titulaires respectifs."
                : "The names and logos of the companies mentioned as references belong to their respective owners."}
            </p>
          </Article>

          <Article title={fr ? "Responsabilité" : "Liability"}>
            <p>
              {fr
                ? "Les informations publiées sont fournies à titre indicatif et peuvent évoluer. Les tarifs affichés sont indicatifs et ne constituent pas une offre contractuelle : seule une proposition signée engage les parties."
                : "The information published is provided for guidance and may change. The rates shown are indicative and do not constitute a contractual offer: only a signed proposal binds the parties."}
            </p>
            <p>
              {fr
                ? "Ce site renvoie vers des sites tiers dont le contenu n'engage que leurs éditeurs."
                : "This website links to third-party websites whose content is the sole responsibility of their publishers."}
            </p>
          </Article>
        </Container>
      </main>
      <SiteFooter lang={lang} />
    </>
  )
}
