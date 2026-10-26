import { PageShell } from "@/components/page-shell"
import { ProjectCard } from "@/components/project-card"
import { StructuredData } from "@/components/structured-data"
import { CardGrid, Container, Section } from "@/components/ui/section"
import { TextLink } from "@/components/ui/text-link"
import { Timeline } from "@/components/ui/timeline"
import { paths, ui, type Lang } from "@/content/i18n"
import { contactItems, cvPaths, profile, type TimelineItem } from "@/content/profile"
import { getProject, projects } from "@/content/projects"
import { site } from "@/lib/site"
import { buildProfileStructuredData } from "@/lib/structured-data"

/**
 * Page profil / candidature (/parcours, /en/profile). Contenu repris du
 * portfolio : aucun tarif, aucune offre, aucun CTA commercial.
 */
export function ProfilePage({ lang }: { lang: Lang }) {
  const t = ui[lang]
  const p = profile[lang]
  const personal = projects.filter((project) => project.kind === "personal")
  const anchors = lang === "fr" ? fr : en

  const toEntries = (items: TimelineItem[]) =>
    items.map((item) => ({
      ...item,
      extra: item.caseStudy ? (
        <TextLink
          href={paths.project(lang, item.caseStudy)}
          arrow
          className="mt-1 text-[15px] font-medium"
        >
          {t.caseStudy} {getProject(item.caseStudy)?.content[lang].title}
        </TextLink>
      ) : undefined,
    }))

  return (
    <>
      <StructuredData data={buildProfileStructuredData(lang)} />
      <PageShell lang={lang} alternates={paths.profile} contactHref={`#${anchors.contact}`}>
        <section id="top" aria-labelledby="profile-title">
          <Container className="grid gap-6 py-20 sm:py-24">
            <h1
              id="profile-title"
              className="text-[clamp(2.375rem,7vw,4.25rem)] leading-[1.03] font-semibold tracking-[-0.03em]"
            >
              {site.name}
            </h1>
            <p className="text-accent font-mono text-[clamp(0.875rem,2vw,1.0625rem)] tracking-[0.02em]">
              {p.subtitle}
            </p>
            <p className="text-subtle text-base">{p.location}</p>
            <p className="max-w-[44ch] text-[clamp(1.1875rem,2.6vw,1.5rem)] leading-[1.5] text-pretty">
              {p.intro}
            </p>
            <ContactLinks lang={lang} className="mt-2" />
          </Container>
        </section>

        <Section id={anchors.projects} alt eyebrow="01" title={t.projects}>
          <CardGrid columns={2} className="mt-10">
            {personal.map((project) => (
              <li key={project.slug} className="grid">
                <ProjectCard project={project} lang={lang} />
              </li>
            ))}
          </CardGrid>
        </Section>

        <Section id={anchors.experience} eyebrow="02" title={t.experience}>
          <div className="mt-10 max-w-[720px]">
            <Timeline items={toEntries(p.experiences)} />
          </div>
        </Section>

        <Section id={anchors.education} alt eyebrow="03" title={t.education}>
          <div className="mt-10 grid max-w-[720px] gap-10">
            <Timeline items={toEntries(p.education)} />
            <p>
              <TextLink href={cvPaths[lang]} arrow className="text-base font-medium">
                {t.fullCv}
              </TextLink>
            </p>
          </div>
        </Section>

        <Section id={anchors.contact} eyebrow="04" title={t.contact}>
          <ContactLinks lang={lang} detailed className="mt-10" />
        </Section>
      </PageShell>
    </>
  )
}

/** Ancres de section : en français sur /parcours, en anglais sur /en/profile (cf. navLinks). */
const fr = {
  projects: "projets",
  experience: "experiences",
  education: "formations",
  contact: "contact",
}
const en = {
  projects: "projects",
  experience: "experience",
  education: "education",
  contact: "contact",
}

/**
 * Canaux de contact direct. Compact sous l'en-tête ; `detailed` affiche aussi
 * la valeur (adresse, numéro) dans la section Contact.
 */
function ContactLinks({
  lang,
  detailed = false,
  className = "",
}: {
  lang: Lang
  detailed?: boolean
  className?: string
}) {
  const items = contactItems(lang)

  if (!detailed) {
    return (
      <ul role="list" className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}>
        {items.map((item) => (
          <li key={item.label}>
            <TextLink
              href={item.href}
              external={item.external}
              lang={lang}
              className="text-[15px] font-medium"
            >
              {item.label}
            </TextLink>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul role="list" className={`grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="bg-surface border-line-strong shadow-card hover:border-line-hover hover:shadow-card-raised group grid gap-1.5 rounded-xl border p-5 transition-[box-shadow,border-color]"
          >
            <span className="text-faint font-mono text-xs tracking-[0.14em] uppercase">
              {item.label}
            </span>
            <span className="text-accent group-hover:text-accent-hover text-base font-medium break-all transition-colors">
              {item.value}
              {item.external ? <span className="sr-only"> {ui[lang].newTab}</span> : null}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
