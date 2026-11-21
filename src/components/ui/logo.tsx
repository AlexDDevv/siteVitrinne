import Image from "next/image"
import logo from "@/assets/logo.png"

/**
 * Logo « ad. » suivi du nom en monospace. Le carré garde son fond sombre dans
 * les deux thèmes : c'est la même image que la favicon.
 */
export function Logo({
  size = 28,
  priority = false,
  compact = false,
}: {
  size?: number
  /** Logo visible dès l'arrivée (en-tête) : chargé sans attendre. */
  priority?: boolean
  /** Masque le nom sous 640 px, pour garder l'en-tête mobile sur une ligne. */
  compact?: boolean
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src={logo}
        alt=""
        width={size}
        height={size}
        priority={priority}
        className="rounded-md"
        style={{ width: size, height: size }}
      />
      <span
        className={`text-subtle font-mono text-[13px] tracking-[0.06em] ${compact ? "hidden sm:inline" : ""}`}
      >
        alexis<span className="text-accent">.</span>delporte
      </span>
    </span>
  )
}
