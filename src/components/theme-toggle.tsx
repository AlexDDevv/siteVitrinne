"use client"

import { useEffect, useState } from "react"
import { THEME_KEY, type Theme } from "@/lib/theme"

/** Lit le thème effectivement appliqué : choix explicite, sinon préférence système. */
function readTheme(): Theme {
  const explicit = document.documentElement.dataset.theme
  if (explicit === "light" || explicit === "dark") return explicit
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
}

export function ThemeToggle() {
  // `null` tant que le composant n'est pas monté : le rendu serveur ne connaît
  // pas le thème, afficher une icône arbitraire provoquerait un saut visuel.
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    setTheme(readTheme())

    // Suit la préférence système tant qu'aucun choix explicite n'a été fait.
    const media = window.matchMedia("(prefers-color-scheme: light)")
    const onChange = () => {
      if (!document.documentElement.dataset.theme) setTheme(readTheme())
    }
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  function toggle() {
    const next: Theme = readTheme() === "dark" ? "light" : "dark"
    document.documentElement.dataset.theme = next
    setTheme(next)
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch {
      // Stockage indisponible : le choix ne survivra pas au rechargement.
    }
  }

  const label =
    theme === null
      ? "Changer de thème"
      : theme === "dark"
        ? "Activer le thème clair"
        : "Activer le thème sombre"

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="border-line-strong text-subtle hover:text-cream hover:border-line-hover grid size-9 shrink-0 place-items-center rounded-full border transition-colors"
    >
      {/* Les deux icônes sont rendues, seule celle du thème courant est visible :
          évite de dépendre de l'état avant l'hydratation. */}
      <SunIcon className={theme === "light" ? "hidden" : ""} />
      <MoonIcon className={theme === "light" ? "" : "hidden"} />
    </button>
  )
}

function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      className={`size-[18px] ${className}`}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
    </svg>
  )
}

function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-[18px] ${className}`}
    >
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
    </svg>
  )
}
