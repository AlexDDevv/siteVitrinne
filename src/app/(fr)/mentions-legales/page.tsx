import type { Metadata } from "next"
import type { ReactNode } from "react"
import { SiteFooter } from "@/components/site-footer"
import { Container } from "@/components/ui/section"
import { TextLink } from "@/components/ui/text-link"
import { host, legal, mailProcessor } from "@/lib/legal"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales et politique de confidentialité du site de ${site.name}, développeur web freelance à ${site.city}.`,
  alternates: { canonical: "/mentions-legales" },
  openGraph: { title: `Mentions légales | ${site.name}`, url: "/mentions-legales" },
}

/** Signale une information légale encore absente, en évidence sur la page. */
function ToComplete({ label }: { label: string }) {
  return (
    <mark className="bg-amber/20 text-cream rounded px-1.5 py-0.5 font-mono text-[13px]">
      à compléter : {label}
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

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <p>
      <span className="text-subtle">{label} : </span>
      {children}
    </p>
  )
}

export default function MentionsLegales() {
  return (
    <>
      <main id="main">
        <Container className="grid max-w-190 gap-8 py-16 sm:py-20">
          <header className="grid gap-4">
            <TextLink href="/" tone="subtle" className="font-mono text-[13px]">
              <span aria-hidden>←</span> Retour à l&apos;accueil
            </TextLink>
            <h1 className="text-[clamp(1.875rem,4.4vw,2.5rem)] leading-[1.1] font-semibold tracking-tight">
              Mentions légales
            </h1>
            <p className="text-subtle text-[15.5px]">
              Dernière mise à jour :{" "}
              <time dateTime={legal.updatedAt}>
                {new Date(legal.updatedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </p>
          </header>

          <Article title="Éditeur du site">
            <Row label="Responsable de la publication">{site.name}</Row>
            <Row label="Statut">Entrepreneur individuel (micro-entreprise)</Row>
            <Row label="Adresse du siège social">
              {legal.address ?? <ToComplete label="adresse du siège" />}
            </Row>
            {legal.workplace ? <Row label="Lieu d'exercice">{legal.workplace}</Row> : null}
            <Row label="SIRET">
              {legal.siret ?? <ToComplete label="numéro SIRET à 14 chiffres" />}
            </Row>
            <Row label="Email">
              <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>
            </Row>
            {legal.phone ? (
              <Row label="Téléphone">
                <TextLink href={`tel:+33${legal.phone.slice(1)}`}>
                  {legal.phone.replace(/(\d{2})(?=\d)/g, "$1 ")}
                </TextLink>
              </Row>
            ) : null}
            <p>
              L&apos;activité de développement web n&apos;est pas une profession réglementée : elle
              n&apos;est soumise ni à un ordre professionnel, ni à une autorisation d&apos;exercice.
            </p>
          </Article>

          <Article title="Hébergement">
            <Row label="Hébergeur">{host.name}</Row>
            <Row label="Adresse">{host.address}</Row>
            <Row label="Site">
              <TextLink href={host.url} external>
                {host.url.replace("https://", "")}
              </TextLink>
            </Row>
            <p>
              Les pages sont servies depuis l&apos;infrastructure européenne de l&apos;hébergeur
              (région de Paris).
            </p>
          </Article>

          <Article title="Données personnelles">
            <p>
              Le formulaire de contact recueille votre <strong>nom</strong>, votre{" "}
              <strong>adresse email</strong>, le <strong>type de projet</strong> et le{" "}
              <strong>message</strong> que vous rédigez. Aucune autre donnée n&apos;est collectée.
            </p>
            <Row label="Responsable du traitement">{site.name}</Row>
            <Row label="Finalité">Répondre à votre demande et échanger sur votre projet</Row>
            <Row label="Base légale">
              Mesures précontractuelles prises à votre demande (art. 6.1.b du RGPD)
            </Row>
            <Row label="Durée de conservation">
              3 ans à compter de notre dernier échange, puis suppression
            </Row>
            <Row label="Destinataires">
              {site.name} uniquement. Aucune donnée n&apos;est vendue, louée ni transmise à des fins
              publicitaires.
            </Row>
            <p>
              L&apos;acheminement des emails est assuré par {mailProcessor.name}, agissant comme
              sous-traitant. Le traitement est hébergé en {mailProcessor.region}, sans transfert
              hors Union européenne. Voir sa{" "}
              <TextLink href={mailProcessor.url} external>
                politique de confidentialité
              </TextLink>
              .
            </p>
            <p>
              Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
              d&apos;opposition, de limitation et de portabilité sur vos données. Pour les exercer,
              écrivez à <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>. Vous pouvez
              également introduire une réclamation auprès de la{" "}
              <TextLink href="https://www.cnil.fr" external>
                CNIL
              </TextLink>
              .
            </p>
          </Article>

          <Article title="Cookies et mesure d'audience">
            <p>
              Ce site ne dépose <strong>aucun cookie</strong> et n&apos;utilise aucun traceur
              publicitaire ni outil de mesure d&apos;audience. Aucun consentement n&apos;est donc
              requis, et votre navigation n&apos;est pas suivie.
            </p>
          </Article>

          <Article title="Propriété intellectuelle">
            <p>
              La structure du site, ses textes et ses éléments graphiques sont la propriété de{" "}
              {site.name}, sauf mention contraire. Toute reproduction ou représentation, totale ou
              partielle, sans autorisation écrite préalable est interdite.
            </p>
            <p>
              Les noms et logos des sociétés citées à titre de références appartiennent à leurs
              titulaires respectifs.
            </p>
          </Article>

          <Article title="Responsabilité">
            <p>
              Les informations publiées sont fournies à titre indicatif et peuvent évoluer. Les
              tarifs affichés sont des fourchettes indicatives et ne constituent pas une offre
              contractuelle : seul un devis signé engage les parties.
            </p>
            <p>
              Ce site renvoie vers des sites tiers dont le contenu n&apos;engage que leurs éditeurs.
            </p>
          </Article>
        </Container>
      </main>
      <SiteFooter />
    </>
  )
}
