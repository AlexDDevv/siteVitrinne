import { z } from "zod"
import type { Lang } from "@/content/i18n"
import type { ContactInput, FieldErrors } from "@/types/contact"

/** Options du select « type de projet ». Les valeurs sont communes, seuls les libellés changent. */
export const projectTypes = [
  { value: "mvp", label: { fr: "MVP / nouveau produit", en: "MVP / new product" } },
  { value: "refonte", label: { fr: "Refonte / performance", en: "Rebuild / performance" } },
  { value: "agence", label: { fr: "Sous-traitance agence", en: "Agency subcontracting" } },
  { value: "renfort", label: { fr: "Renfort technique ponctuel", en: "Ad-hoc technical support" } },
  { value: "autre", label: { fr: "Autre", en: "Other" } },
] as const

const projectTypeValues = projectTypes.map((type) => type.value) as [string, ...string[]]

const messages = {
  fr: {
    nameMin: "Merci d'indiquer votre nom (2 caractères minimum).",
    nameMax: "Le nom ne peut pas dépasser 80 caractères.",
    emailMin: "Merci d'indiquer votre email.",
    emailFormat: "Cette adresse email ne semble pas valide.",
    emailMax: "L'adresse email ne peut pas dépasser 160 caractères.",
    projectType: "Merci de choisir un type de projet.",
    messageMin: "Décrivez votre projet en 20 caractères minimum.",
    messageMax: "Le message ne peut pas dépasser 4000 caractères.",
  },
  en: {
    nameMin: "Please enter your name (at least 2 characters).",
    nameMax: "Your name can't exceed 80 characters.",
    emailMin: "Please enter your email.",
    emailFormat: "This email address doesn't look valid.",
    emailMax: "Your email address can't exceed 160 characters.",
    projectType: "Please choose a project type.",
    messageMin: "Describe your project in at least 20 characters.",
    messageMax: "Your message can't exceed 4,000 characters.",
  },
} satisfies Record<Lang, Record<string, string>>

/** Schéma du formulaire, avec les messages d'erreur dans la langue de la page. */
export function contactSchema(lang: Lang) {
  const m = messages[lang]
  return z.object({
    name: z.string().trim().min(2, m.nameMin).max(80, m.nameMax),
    email: z.string().trim().min(1, m.emailMin).email(m.emailFormat).max(160, m.emailMax),
    projectType: z.enum(projectTypeValues, { message: m.projectType }),
    message: z.string().trim().min(20, m.messageMin).max(4000, m.messageMax),
    /**
     * Champ piège invisible : rempli uniquement par les bots. Volontairement sans
     * contrainte : c'est la route qui décide quoi en faire, pour répondre 200 sans
     * rien envoyer plutôt que de signaler au bot que le piège a fonctionné.
     */
    company: z.string().optional(),
  })
}

/** Libellé lisible d'un type de projet. L'email reçu reste en français. */
export function projectTypeLabel(value: string, lang: Lang = "fr"): string {
  return projectTypes.find((type) => type.value === value)?.label[lang] ?? value
}

/**
 * Aplatit les erreurs zod en un message par champ, au format attendu à la fois
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
