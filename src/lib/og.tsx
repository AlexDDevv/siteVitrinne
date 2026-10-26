import { ImageResponse } from "next/og"

export const ogSize = { width: 1200, height: 630 }

/**
 * Image Open Graph aux couleurs du site : surtitre, titre, sous-titre et pied.
 * Partagée par l'accueil, /parcours et les études de cas.
 */
export function renderOgImage({
  kicker,
  title,
  subtitle,
  footer,
}: {
  kicker: string
  title: string
  subtitle: string
  footer: string
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#14120F",
        color: "#F2EDE6",
        padding: "72px 80px",
        borderBottom: "10px solid #E8A34A",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26 }}>
        <div style={{ width: 14, height: 14, borderRadius: 999, background: "#8FB08A" }} />
        <span style={{ color: "#A69E93" }}>{kicker}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: "-0.03em" }}>{title}</div>
        <div style={{ fontSize: 34, color: "#E8A34A", lineHeight: 1.3 }}>{subtitle}</div>
      </div>

      <div style={{ display: "flex", fontSize: 28, color: "#A69E93" }}>
        <span>{footer}</span>
      </div>
    </div>,
    ogSize
  )
}
