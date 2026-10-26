import { ui, type Lang } from "@/content/i18n"
import type { ProjectStatus } from "@/types/project"

/**
 * Badge de statut d'un projet. « En cours » reprend le point vert du hero,
 * « Terminé » reste neutre.
 */
export function StatusBadge({ status, lang }: { status: ProjectStatus; lang: Lang }) {
  const inProgress = status === "in-progress"
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-xs ${
        inProgress ? "border-sage/40 text-sage" : "border-line-strong text-subtle"
      }`}
    >
      <span
        aria-hidden
        className={`inline-block size-1.5 rounded-full ${inProgress ? "bg-sage" : "bg-faint"}`}
      />
      {ui[lang].status[status]}
    </span>
  )
}
