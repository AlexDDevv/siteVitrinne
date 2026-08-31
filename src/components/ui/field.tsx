import type { ReactNode } from "react"

const controlClass =
  "bg-ink border-line-input text-cream placeholder:text-faint w-full rounded-lg border px-3.5 py-3 text-[15.5px]"

type FieldProps = {
  id: string
  label: string
  /** Message d'erreur affiché sous le champ et relié via `aria-describedby`. */
  error?: string
  /**
   * Reçoit les attributs à poser sur le contrôle : classes, `aria-invalid` et
   * `aria-describedby` sont calculés ici pour que chaque champ reste cohérent.
   */
  children: (props: {
    id: string
    className: string
    "aria-invalid": boolean
    "aria-describedby": string | undefined
  }) => ReactNode
}

/**
 * Enveloppe un contrôle de formulaire : label lié, message d'erreur et câblage
 * ARIA. Centralisé pour qu'un champ ne puisse pas être ajouté sans son erreur
 * annoncée aux lecteurs d'écran.
 */
export function Field({ id, label, error, children }: FieldProps) {
  const errorId = `${id}-error`

  return (
    <div className="grid gap-[7px]">
      <label htmlFor={id} className="text-subtle text-sm">
        {label}
      </label>
      {children({
        id,
        className: controlClass,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
      })}
      {error ? (
        <span id={errorId} className="text-error text-[13.5px]">
          {error}
        </span>
      ) : null}
    </div>
  )
}
