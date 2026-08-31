import type { Metadata } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"
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
  title: "Alexis Delporte",
  description: "Développeur web full-stack freelance",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="bg-ink text-cream font-sans antialiased">{children}</body>
    </html>
  )
}
