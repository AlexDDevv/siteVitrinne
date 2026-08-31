import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Alexis Delporte",
  description: "Développeur web full-stack freelance",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  )
}
