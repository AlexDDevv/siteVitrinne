import { ThemeToggle } from "@/components/theme-toggle"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/section"
import { navLinks } from "@/lib/site"

export function SiteHeader() {
  return (
    <header className="border-line-strong/70 bg-ink/85 sticky top-0 z-20 border-b backdrop-blur-md">
      <Container className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
        {/* Masqué sur les très petits écrans : le <h1> du hero, juste en dessous, porte déjà le nom. */}
        <a
          href="#top"
          className="text-subtle hidden font-mono text-[13px] tracking-[0.06em] min-[420px]:inline"
        >
          alexis<span className="text-accent">.</span>delporte
        </a>
        <nav aria-label="Navigation principale" className="flex items-center gap-3 sm:gap-[22px]">
          {/*
            Les ancres restent visibles en mobile, en typographie plus compacte :
            un menu masqué priverait les petits écrans de toute navigation.
          */}
          <ul role="list" className="flex items-center gap-3 text-[13px] sm:gap-[22px] sm:text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-subtle hover:text-cream transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink href="#contact" variant="pill" className="text-[13px] sm:text-sm">
            Contact
          </ButtonLink>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  )
}
