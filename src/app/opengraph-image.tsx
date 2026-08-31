import { ImageResponse } from "next/og"
import { site } from "@/lib/site"

export const alt = `${site.name}, ${site.role} à ${site.area}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
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
        <span style={{ color: "#A69E93" }}>Disponible pour de nouveaux projets</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: "-0.03em" }}>{site.name}</div>
        <div style={{ fontSize: 38, color: "#E8A34A" }}>{site.role}</div>
      </div>

      <div style={{ display: "flex", fontSize: 28, color: "#A69E93" }}>
        <span>{`${site.city}, près de ${site.area}. React · Next.js · TypeScript · NestJS`}</span>
      </div>
    </div>,
    size
  )
}
