import { Container } from "@/components/ui/section"
import { TextLink } from "@/components/ui/text-link"
import { home } from "@/content/home"
import { paths, ui, type Lang } from "@/content/i18n"
import { site, socialLinks } from "@/lib/site"

export function SiteFooter({ lang = "fr" }: { lang?: Lang }) {
  return (
    <footer className="border-line bg-ink-alt border-t">
      <Container className="text-faint flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-8 text-sm">
        <p>
          {site.name} · {home[lang].role} · {site.city} ({site.postalCode.slice(0, 2)})
        </p>
        <ul role="list" className="flex gap-5">
          {socialLinks.map((social) => (
            <li key={social.label}>
              <TextLink href={social.href} tone="subtle" external lang={lang}>
                {social.label}
              </TextLink>
            </li>
          ))}
        </ul>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <TextLink href={paths.legal[lang]} tone="subtle">
            {ui[lang].legal}
          </TextLink>
          <span aria-hidden>·</span>
          <span>Alexis Delporte. © {new Date().getFullYear()}</span>
        </p>
      </Container>
    </footer>
  )
}
