import { NextResponse } from "next/server"
import { Resend } from "resend"
import { collectFieldErrors, contactSchema, projectTypeLabel } from "@/lib/validation"
import type { ContactInput, ContactResponse } from "@/types/contact"

/** Échappe le contenu utilisateur avant de l'injecter dans l'email HTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function buildEmailHtml(data: ContactInput): string {
  const rows: Array<[string, string]> = [
    ["Nom", data.name],
    ["Email", data.email],
    ["Type de projet", projectTypeLabel(data.projectType)],
  ]

  return `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;line-height:1.6;color:#111827">
      <h2 style="margin:0 0 16px">Nouveau message depuis le site</h2>
      <table style="border-collapse:collapse;margin-bottom:20px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#6b7280">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`
          )
          .join("")}
      </table>
      <p style="margin:0 0 8px;color:#6b7280">Message</p>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(data.message)}</p>
    </div>
  `
}

export async function POST(request: Request): Promise<NextResponse<ContactResponse>> {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Certains champs sont invalides.",
        fieldErrors: collectFieldErrors(parsed.error),
      },
      { status: 400 }
    )
  }

  // Honeypot rempli : on répond 200 sans rien envoyer, pour ne pas informer le bot.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !to || !from) {
    console.error("[contact] Variables d'environnement Resend manquantes.")
    return NextResponse.json(
      { ok: false, error: "Le formulaire est momentanément indisponible. Écrivez-moi par email." },
      { status: 500 }
    )
  }

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: parsed.data.email,
      subject: `Nouveau contact de ${parsed.data.name} (${projectTypeLabel(parsed.data.projectType)})`,
      html: buildEmailHtml(parsed.data),
    })

    if (error) {
      console.error("[contact] Resend a renvoyé une erreur:", error)
      return NextResponse.json(
        { ok: false, error: "L'envoi a échoué. Réessayez ou écrivez-moi directement par email." },
        { status: 502 }
      )
    }
  } catch (error) {
    console.error("[contact] Envoi impossible:", error)
    return NextResponse.json(
      { ok: false, error: "L'envoi a échoué. Réessayez ou écrivez-moi directement par email." },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
