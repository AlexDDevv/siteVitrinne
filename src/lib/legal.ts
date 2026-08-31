/**
 * Informations légales obligatoires (art. 6-III de la LCEN).
 *
 * Les valeurs à `null` s'affichent en évidence sur la page comme « à compléter » :
 * elles sont visibles en ligne tant qu'elles ne sont pas renseignées, pour qu'un
 * oubli se remarque immédiatement plutôt que de passer inaperçu.
 */
export const legal = {
  /** Numéro SIRET à 14 chiffres. Change si le siège est transféré. */
  siret: "92825974600016" as string | null,
  /** Adresse du siège social déclaré, la seule que la LCEN impose de publier. */
  address: "6 chemin du vallon du Roy, 13400 Aubagne, France" as string | null,
  /**
   * Commune depuis laquelle l'activité est réellement exercée, quand elle diffère
   * du siège déclaré. Évite qu'un prospect bute sur l'écart entre l'adresse
   * administrative et le « près de Lyon » affiché sur le reste du site.
   */
  workplace: "Écully (69130), métropole de Lyon" as string | null,
  /** Facultatif : la LCEN se contente d'un moyen de contact, et l'email suffit. */
  phone: null as string | null,
  /** Date de dernière révision du texte. */
  updatedAt: "2026-08-31",
} as const

/** Hébergeur du site. À revérifier sur vercel.com si Vercel déménage. */
export const host = {
  name: "Vercel Inc.",
  address: "340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis",
  url: "https://vercel.com",
} as const

/** Sous-traitant qui achemine les emails du formulaire. */
export const mailProcessor = {
  name: "Resend (Plus Five Five, Inc.)",
  region: "Union européenne (eu-west-1)",
  url: "https://resend.com/legal/privacy-policy",
} as const
