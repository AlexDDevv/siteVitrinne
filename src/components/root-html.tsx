import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"
import type { ReactNode } from "react"
import { htmlLang, type Lang } from "@/content/i18n"
import { themeInitScript } from "@/lib/theme"
import "@/app/globals.css"

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
})

/**
 * Document HTML partagé par les deux root layouts (FR et EN). Chaque langue a
 * son propre root layout pour que `<html lang>` soit juste dès le rendu serveur.
 */
export function RootHtml({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html
      lang={htmlLang[lang]}
      className={`${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      {/* Composant de root layout : la règle ne reconnaît que les fichiers layout.tsx. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* Applique le thème avant la première peinture, pour éviter le flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-ink text-cream font-sans antialiased">{children}</body>
    </html>
  )
}
