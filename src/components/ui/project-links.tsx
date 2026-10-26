import { TextLink } from "@/components/ui/text-link"
import { ui, type Lang } from "@/content/i18n"

/**
 * Liens Code / Démo d'un projet. Une URL vide ou absente masque le lien ;
 * sans aucun lien, rien n'est rendu.
 */
export function ProjectLinks({
  repo,
  demo,
  lang,
  className = "",
}: {
  repo?: string
  demo?: string
  lang: Lang
  className?: string
}) {
  const t = ui[lang]
  const links: { href: string; label: string }[] = []
  if (repo) links.push({ href: repo, label: t.code })
  if (demo) links.push({ href: demo, label: t.demo })

  if (links.length === 0) return null

  return (
    <ul role="list" className={`flex flex-wrap gap-x-5 gap-y-2 ${className}`}>
      {links.map((link) => (
        <li key={link.label}>
          <TextLink href={link.href} external arrow lang={lang} className="text-[15px] font-medium">
            {link.label}
          </TextLink>
        </li>
      ))}
    </ul>
  )
}
