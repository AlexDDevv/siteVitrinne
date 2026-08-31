import { Container } from "@/components/ui/section"
import { TextLink } from "@/components/ui/text-link"
import { site, socialLinks } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-line bg-ink-alt border-t">
      <Container className="text-faint flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-8 text-sm">
        <p>
          {site.name} · {site.role} · {site.city} ({site.postalCode.slice(0, 2)})
        </p>
        <ul role="list" className="flex gap-5">
          {socialLinks.map((social) => (
            <li key={social.label}>
              <TextLink href={social.href} tone="subtle" external>
                {social.label}
              </TextLink>
            </li>
          ))}
        </ul>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <TextLink href="/mentions-legales" tone="subtle">
            Mentions légales
          </TextLink>
          <span aria-hidden>·</span>
          <span>Micro-entreprise. © {new Date().getFullYear()}</span>
        </p>
      </Container>
    </footer>
  )
}
