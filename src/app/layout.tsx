import type { Metadata, Viewport } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"
import { site } from "@/lib/site"
import "./globals.css"

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Développeur web freelance à Lyon`,
    template: `%s | ${site.name}`,
  },
  description:
    "Développeur web full-stack freelance à Écully, près de Lyon. Sites vitrines, applications sur-mesure et maintenance en React, Next.js, TypeScript et NestJS.",
  keywords: [
    "développeur web freelance Lyon",
    "développeur freelance Écully",
    "développeur full-stack Lyon",
    "création site vitrine Lyon",
    "développeur React Next.js freelance",
    "application sur-mesure Lyon",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Développeur web freelance à Lyon`,
    description:
      "Sites vitrines, applications sur-mesure et maintenance web. Développeur full-stack freelance basé à Écully, près de Lyon.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Développeur web freelance à Lyon`,
    description:
      "Sites vitrines, applications sur-mesure et maintenance web. Développeur full-stack freelance près de Lyon.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

export const viewport: Viewport = {
  themeColor: "#14120F",
  colorScheme: "dark",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="bg-ink text-cream font-sans antialiased">{children}</body>
    </html>
  )
}
