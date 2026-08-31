import { z } from "zod"
import type { ContactInput, FieldErrors } from "@/types/contact"

/** Options du select « type de projet ». Partagées entre le formulaire et la validation. */
export const projectTypes = [
  { value: "site-vitrine", label: "Site vitrine" },
  { value: "application", label: "Application sur-mesure" },
  { value: "maintenance", label: "Maintenance & évolution" },
  { value: "autre", label: "Autre / je ne sais pas encore" },
] as const

const projectTypeValues = projectTypes.map((type) => type.value) as [string, ...string[]]

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Merci d'indiquer votre nom (2 caractères minimum).")
    .max(80, "Le nom ne peut pas dépasser 80 caractères."),
  email: z
    .string()
    .trim()
    .min(1, "Merci d'indiquer votre email.")
    .email("Cette adresse email ne semble pas valide.")
    .max(160, "L'adresse email ne peut pas dépasser 160 caractères."),
  projectType: z.enum(projectTypeValues, {
    message: "Merci de choisir un type de projet.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Décrivez votre projet en 20 caractères minimum.")
    .max(4000, "Le message ne peut pas dépasser 4000 caractères."),
  /**
   * Champ piège invisible : rempli uniquement par les bots. Volontairement sans
   * contrainte — c'est la route qui décide quoi en faire, pour répondre 200 sans
   * rien envoyer plutôt que de signaler au bot que le piège a fonctionné.
   */
  company: z.string().optional(),
})

/** Libellé lisible d'un type de projet, pour l'email envoyé. */
export function projectTypeLabel(value: string): string {
  return projectTypes.find((type) => type.value === value)?.label ?? value
}

/**
 * Aplatit les erreurs zod en un message par champ — le format attendu à la fois
 * par le formulaire et par la réponse de l'API.
 */
export function collectFieldErrors(error: z.ZodError): FieldErrors {
  const fieldErrors: FieldErrors = {}
  for (const issue of error.issues) {
    const field = issue.path[0] as keyof ContactInput | undefined
    if (field && !fieldErrors[field]) fieldErrors[field] = issue.message
  }
  return fieldErrors
}
