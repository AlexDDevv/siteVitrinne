import type { z } from "zod"
import type { contactSchema, projectTypes } from "@/lib/validation"

export type ProjectType = (typeof projectTypes)[number]["value"]

export type ContactInput = z.infer<typeof contactSchema>

/** Un message d'erreur par champ du formulaire. */
export type FieldErrors = Partial<Record<keyof ContactInput, string>>

/** Réponse renvoyée par POST /api/contact. */
export type ContactResponse = { ok: true } | { ok: false; error: string; fieldErrors?: FieldErrors }
