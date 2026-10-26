"use client"

import { useId, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Body } from "@/components/ui/section"
import type { Lang } from "@/content/i18n"
import { collectFieldErrors, contactSchema, projectTypes } from "@/lib/validation"
import type { FieldErrors } from "@/types/contact"
import type { ContactResponse } from "@/types/contact"

type Status = "idle" | "submitting" | "sent" | "error"

const copy = {
  fr: {
    name: "Nom",
    namePlaceholder: "Votre nom",
    email: "Email",
    emailPlaceholder: "vous@exemple.fr",
    projectType: "Type de projet",
    message: "Message",
    messagePlaceholder: "Le contexte, la stack, le périmètre, l'échéance si vous en avez une.",
    honeypot: "Société",
    submit: "Envoyer",
    submitting: "Envoi en cours…",
    network: "Impossible de joindre le serveur. Réessayez dans un instant.",
    oneError: "Un champ est à corriger avant l'envoi.",
    manyErrors: (count: number) => `${count} champs sont à corriger avant l'envoi.`,
    sentKicker: "Message envoyé",
    sentTitle: "Merci, c'est bien parti.",
    sentBody: "Je reviens vers vous par email. Vous pouvez aussi me joindre via Malt.",
  },
  en: {
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@example.com",
    projectType: "Project type",
    message: "Message",
    messagePlaceholder: "Context, stack, scope, deadline if you have one.",
    honeypot: "Company",
    submit: "Send",
    submitting: "Sending…",
    network: "Can't reach the server. Please try again in a moment.",
    oneError: "One field needs fixing before sending.",
    manyErrors: (count: number) => `${count} fields need fixing before sending.`,
    sentKicker: "Message sent",
    sentTitle: "Thanks, it's on its way.",
    sentBody: "I'll get back to you by email. You can also reach me on Malt.",
  },
}

export function ContactForm({ lang = "fr" }: { lang?: Lang }) {
  const t = copy[lang]
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
    const parsed = contactSchema(lang).safeParse(payload)
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
        // La langue choisit les messages renvoyés par l'API ; elle n'est pas un champ du formulaire.
        body: JSON.stringify({ ...parsed.data, lang }),
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
      setFormError(t.network)
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <div className="grid gap-3 py-6" role="status">
        <p className="text-sage font-mono text-[13px]">{t.sentKicker}</p>
        <h3 className="text-[22px] font-semibold">{t.sentTitle}</h3>
        <Body>{t.sentBody}</Body>
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
          <p className="text-error text-sm leading-relaxed">{formError}</p>
        ) : errorCount > 0 ? (
          <p className="text-error text-sm leading-relaxed">
            {errorCount === 1 ? t.oneError : t.manyErrors(errorCount)}
          </p>
        ) : null}
      </div>

      <Field id={fieldId("name")} label={t.name} error={fieldErrors.name}>
        {(props) => (
          <input
            {...props}
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t.namePlaceholder}
          />
        )}
      </Field>

      <Field id={fieldId("email")} label={t.email} error={fieldErrors.email}>
        {(props) => (
          <input
            {...props}
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t.emailPlaceholder}
          />
        )}
      </Field>

      <Field id={fieldId("projectType")} label={t.projectType} error={fieldErrors.projectType}>
        {(props) => (
          <select {...props} name="projectType" defaultValue={projectTypes[0].value}>
            {projectTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label[lang]}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field id={fieldId("message")} label={t.message} error={fieldErrors.message}>
        {(props) => (
          <textarea
            {...props}
            name="message"
            rows={5}
            placeholder={t.messagePlaceholder}
            className={`${props.className} resize-y leading-[1.5]`}
          />
        )}
      </Field>

      {/* Honeypot : hors écran et retiré de l'ordre de tabulation, mais rempli par les bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={fieldId("company")}>{t.honeypot}</label>
        <input
          id={fieldId("company")}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Button type="submit" disabled={status === "submitting"} className="mt-1 w-full">
        {status === "submitting" ? t.submitting : t.submit}
      </Button>
    </form>
  )
}
