"use client"

import { useId, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Body } from "@/components/ui/section"
import { collectFieldErrors, contactSchema, projectTypes } from "@/lib/validation"
import type { FieldErrors } from "@/types/contact"
import type { ContactResponse } from "@/types/contact"

type Status = "idle" | "submitting" | "sent" | "error"

export function ContactForm() {
  const formId = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>("idle")
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  const fieldId = (name: string) => `${formId}-${name}`

  /**
   * Amène le focus sur le premier champ invalide : sans cela, l'utilisateur au
   * clavier reste sur le bouton d'envoi sans savoir quoi corriger.
   */
  function focusFirstError(errors: FieldErrors) {
    const firstField = Object.keys(errors)[0]
    if (!firstField) return
    formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(firstField))}`)?.focus()
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData.entries())

    // Même schéma que l'API : les erreurs s'affichent sans aller-retour réseau.
    const parsed = contactSchema.safeParse(payload)
    if (!parsed.success) {
      const errors = collectFieldErrors(parsed.error)
      setFieldErrors(errors)
      setStatus("error")
      focusFirstError(errors)
      return
    }

    setFieldErrors({})
    setStatus("submitting")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      })
      const result: ContactResponse = await response.json()

      if (!result.ok) {
        const errors = result.fieldErrors ?? {}
        setFieldErrors(errors)
        setFormError(result.error)
        setStatus("error")
        focusFirstError(errors)
        return
      }

      setStatus("sent")
    } catch {
      setFormError("Impossible de joindre le serveur. Réessayez dans un instant.")
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <div className="grid gap-3 py-6" role="status">
        <p className="text-sage font-mono text-[13px]">Message envoyé</p>
        <h3 className="text-[22px] font-semibold">Merci, c&apos;est bien parti.</h3>
        <Body>
          Je reviens vers vous sous 24 h ouvrées. En attendant, vous pouvez aussi me joindre via
          Malt.
        </Body>
      </div>
    )
  }

  const errorCount = Object.keys(fieldErrors).length

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid gap-4">
      {/*
        Un seul résumé annoncé, plutôt qu'un role="alert" par champ : plusieurs
        alertes simultanées se chevauchent et deviennent inaudibles. Le détail de
        chaque champ reste annoncé au focus, via aria-describedby.
      */}
      <div role="alert" aria-live="assertive">
        {formError ? (
          <p className="text-amber-light text-sm leading-relaxed">{formError}</p>
        ) : errorCount > 0 ? (
          <p className="text-amber-light text-sm leading-relaxed">
            {errorCount === 1
              ? "Un champ est à corriger avant l'envoi."
              : `${errorCount} champs sont à corriger avant l'envoi.`}
          </p>
        ) : null}
      </div>

      <Field id={fieldId("name")} label="Nom" error={fieldErrors.name}>
        {(props) => (
          <input {...props} name="name" type="text" autoComplete="name" placeholder="Votre nom" />
        )}
      </Field>

      <Field id={fieldId("email")} label="Email" error={fieldErrors.email}>
        {(props) => (
          <input
            {...props}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="vous@exemple.fr"
          />
        )}
      </Field>

      <Field id={fieldId("projectType")} label="Type de projet" error={fieldErrors.projectType}>
        {(props) => (
          <select {...props} name="projectType" defaultValue={projectTypes[0].value}>
            {projectTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field id={fieldId("message")} label="Message" error={fieldErrors.message}>
        {(props) => (
          <textarea
            {...props}
            name="message"
            rows={5}
            placeholder="Votre activité, ce que vous aimeriez, votre échéance si vous en avez une."
            className={`${props.className} resize-y leading-[1.5]`}
          />
        )}
      </Field>

      {/* Honeypot : hors écran et retiré de l'ordre de tabulation, mais rempli par les bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={fieldId("company")}>Société</label>
        <input
          id={fieldId("company")}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Button type="submit" disabled={status === "submitting"} className="mt-1 w-full">
        {status === "submitting" ? "Envoi en cours…" : "Envoyer"}
      </Button>
    </form>
  )
}
