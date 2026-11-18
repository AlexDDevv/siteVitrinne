import { PageShell } from "@/components/page-shell"
import { ProjectCard } from "@/components/project-card"
import { Contact } from "@/components/sections/contact"
import { StructuredData } from "@/components/structured-data"
import { ButtonLink } from "@/components/ui/button"
import { Body, CardGrid, Container, Eyebrow } from "@/components/ui/section"
import { TextLink } from "@/components/ui/text-link"
import { articles } from "@/content/articles"
import { home } from "@/content/home"
import { paths, ui, type Lang } from "@/content/i18n"
import { getProject } from "@/content/projects"
import { services, type Service, type ServiceSection } from "@/content/services"
import { serviceAlternates } from "@/lib/services"
import { buildServiceStructuredData } from "@/lib/structured-data"
import type { Project } from "@/types/project"

const sectionTitle =
  "text-[clamp(1.5rem,3vw,1.875rem)] leading-[1.2] font-semibold tracking-[-0.02em]"

/**
 * Page service : une intention de recherche, traitée en profondeur. Introduction
 * avec les faits clés, sections de contenu, études de cas en preuve, FAQ
 * (balisée en FAQPage) et formulaire de contact.
 */
export function ServicePage({ service, lang }: { service: Service; lang: Lang }) {
  const t = ui[lang]
  const c = service.content[lang]
  const contactId = home[lang].ids.contact
  const proof = service.projects
    .map((slug) => getProject(slug))
    .filter((project): project is Project => Boolean(project))
  const article = articles.find((a) => a.key === service.article)
  const others = services.filter((other) => other.key !== service.key)

  return (
    <>
      <StructuredData data={buildServiceStructuredData(service, lang)} />
      <PageShell lang={lang} alternates={serviceAlternates(service)} contactHref={`#${contactId}`}>
        <article aria-labelledby="service-title">
          <header>
            <Container className="grid gap-7 py-20 sm:py-24">
              <nav aria-label={lang === "fr" ? "Fil d'Ariane" : "Breadcrumb"}>
                <ol role="list" className="text-subtle flex gap-2 font-mono text-[13px]">
                  <li>
                    <TextLink href={paths.home[lang]} tone="subtle">
                      {t.home}
                    </TextLink>
                  </li>
                  <li aria-hidden>/</li>
                  <li aria-current="page">{c.shortName}</li>
                </ol>
              </nav>
              <Eyebrow>{c.eyebrow}</Eyebrow>
              <h1
                id="service-title"
                className="max-w-[22ch] text-[clamp(2.125rem,6vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-pretty"
              >
                {c.title}
              </h1>
              <p className="max-w-[48ch] text-[clamp(1.125rem,2.4vw,1.375rem)] leading-[1.55] text-pretty">
                {c.lead}
              </p>
              <dl className="grid gap-4 sm:grid-cols-3">
                {c.facts.map((fact) => (
                  <div key={fact.label} className="border-line-strong grid gap-1 border-l-2 pl-4">
                    <dt className="text-faint font-mono text-xs tracking-[0.14em] uppercase">
                      {fact.label}
                    </dt>
                    <dd className="text-accent font-mono text-[15px]">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-2">
                <ButtonLink href={`#${contactId}`}>{c.cta}</ButtonLink>
              </div>
            </Container>
          </header>

          {c.sections.map((section, i) => (
            <ContentSection key={section.id} section={section} alt={i % 2 === 0} />
          ))}

          <section aria-labelledby="proof-title" className="border-line border-t">
            <Container className="py-16 sm:py-20">
              <h2 id="proof-title" className={sectionTitle}>
                {c.proof.title}
              </h2>
              <p className="text-subtle mt-3.5 max-w-[52ch] text-base leading-relaxed">
                {c.proof.intro}
              </p>
              <CardGrid columns={2} className="mt-8">
                {proof.map((project) => (
                  <li key={project.slug} className="grid">
                    <ProjectCard project={project} lang={lang} />
                  </li>
                ))}
              </CardGrid>
              {article ? (
                <p className="text-subtle mt-8 text-[15.5px]">
                  {lang === "fr" ? "À lire : " : "Read: "}
                  <TextLink
                    href={paths.article(lang, article.content[lang].slug)}
                    arrow
                    className="font-medium"
                  >
                    {article.content[lang].title}
                  </TextLink>
                </p>
              ) : null}
            </Container>
          </section>

          <section aria-labelledby="service-faq-title" className="border-line bg-ink-alt border-t">
            <Container className="py-16 sm:py-20">
              <h2 id="service-faq-title" className={sectionTitle}>
                {c.faq.title}
              </h2>
              <ul role="list" className="mt-10 grid gap-x-11 gap-y-8 sm:grid-cols-2">
                {c.faq.items.map((item) => (
                  <li
                    key={item.question}
                    className="border-line-strong grid content-start gap-2.5 border-t pt-5"
                  >
                    <h3 className="text-[18px] font-semibold">{item.question}</h3>
                    {item.answer.map((paragraph) => (
                      <Body key={paragraph}>{paragraph}</Body>
                    ))}
                  </li>
                ))}
              </ul>
              {others.length > 0 ? (
                <p className="text-subtle mt-12 text-[15.5px]">
                  {t.relatedService}
                  {lang === "fr" ? " : " : ": "}
                  {others.map((other, i) => (
                    <span key={other.key}>
                      {i > 0 ? " · " : null}
                      <TextLink
                        href={paths.service(lang, other.content[lang].slug)}
                        className="font-medium"
                      >
                        {other.content[lang].shortName}
                      </TextLink>
                    </span>
                  ))}
                </p>
              ) : null}
            </Container>
          </section>
        </article>

        <Contact lang={lang} />
      </PageShell>
    </>
  )
}

function ContentSection({ section, alt }: { section: ServiceSection; alt: boolean }) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className={`border-line border-t ${alt ? "bg-ink-alt" : ""}`}
    >
      <Container className="grid gap-6 py-12 sm:py-16 md:grid-cols-[260px_1fr] md:gap-12">
        <h2 id={`${section.id}-title`} className={sectionTitle}>
          {section.title}
        </h2>
        <div className="grid max-w-[760px] min-w-0 gap-4">
          {section.paragraphs?.map((text) => (
            <p key={text} className="text-muted text-[16.5px] leading-[1.7]">
              {text}
            </p>
          ))}
          {section.bullets ? (
            <ul role="list" className="grid gap-3.5">
              {section.bullets.map((item) => (
                <li key={item} className="text-muted flex gap-3 text-[15.5px] leading-[1.7]">
                  <span aria-hidden className="text-accent mt-[0.1em] shrink-0 font-mono">
                    →
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
