import Image from "next/image"
import logo from "@/assets/logo.png"

/**
 * Logo « ad. » suivi du nom en monospace. Le carré garde son fond sombre dans
 * les deux thèmes, comme la favicon. Servi tel quel (256 px, `unoptimized`) :
 * net sur les écrans haute densité, sans la recompression de next/image.
 */
export function Logo({
  size = 36,
  priority = false,
  compact = false,
}: {
  size?: number
  /** Logo visible dès l'arrivée (en-tête) : chargé sans attendre. */
  priority?: boolean
  /** Masque le nom sous 1024 px : la navigation a besoin de la place. */
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
        unoptimized
        className="rounded-[22%]"
        style={{ width: size, height: size }}
      />
      <span
        className={`text-subtle font-mono text-[13px] tracking-[0.06em] ${compact ? "hidden lg:inline" : ""}`}
      >
        alexis<span className="text-accent">.</span>delporte
      </span>
    </span>
  )
}
