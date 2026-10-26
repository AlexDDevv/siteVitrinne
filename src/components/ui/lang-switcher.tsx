import { languages, ui, type Alternates, type Lang } from "@/content/i18n"

/** Sélecteur FR · EN vers l'équivalent de la page courante. */
export function LangSwitcher({ lang, alternates }: { lang: Lang; alternates: Alternates }) {
  return (
    <ul
      role="list"
      aria-label={ui[lang].langSwitch}
      className="flex items-center gap-1.5 font-mono text-xs"
    >
      {languages.map((code, i) => (
        <li key={code} className="flex items-center gap-1.5">
          {i > 0 ? (
            <span aria-hidden className="text-faint">
              ·
            </span>
          ) : null}
          {code === lang ? (
            <span aria-current="page" className="text-cream">
              {code.toUpperCase()}
            </span>
          ) : (
            <a
              href={alternates[code]}
              hrefLang={code}
              lang={code}
              className="text-subtle hover:text-accent transition-colors"
            >
              {code.toUpperCase()}
            </a>
          )}
        </li>
      ))}
    </ul>
  )
}
