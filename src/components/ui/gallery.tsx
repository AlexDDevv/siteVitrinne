import Image from "next/image"
import { ui, type Lang } from "@/content/i18n"
import type { GalleryItem } from "@/types/project"

/**
 * Galerie de captures. Chaque vignette ouvre l'image en grand dans un
 * popover natif : pas de JavaScript, fermeture par Échap ou clic extérieur.
 */
export function Gallery({
  items,
  lang,
  idPrefix,
}: {
  items: GalleryItem[]
  lang: Lang
  idPrefix: string
}) {
  const t = ui[lang]
  return (
    <ul role="list" className="grid gap-6 sm:grid-cols-2">
      {items.map((item, i) => {
        const id = `${idPrefix}-${i}`
        const alt = item.description ? `${item.caption}. ${item.description}` : item.caption
        return (
          <li key={id}>
            <figure className="grid gap-3">
              <button
                type="button"
                popoverTarget={id}
                aria-label={t.enlarge(item.caption)}
                className="border-line-strong bg-surface shadow-card hover:border-line-hover hover:shadow-card-raised block cursor-zoom-in overflow-hidden rounded-xl border transition-[box-shadow,border-color]"
              >
                <Image
                  src={item.image}
                  alt={alt}
                  sizes="(max-width: 640px) 100vw, 420px"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              </button>
              <figcaption className="text-muted text-[14px] leading-[1.6]">
                <span className="text-cream font-medium">{item.caption}</span>
                {item.description ? ` · ${item.description}` : null}
              </figcaption>
            </figure>

            <div
              id={id}
              popover="auto"
              className="bg-ink/95 m-auto max-h-[94vh] w-[min(1400px,94vw)] overflow-auto rounded-xl p-0 backdrop:bg-black/70"
            >
              <button
                type="button"
                popoverTarget={id}
                popoverTargetAction="hide"
                aria-label={t.close}
                className="bg-surface border-line-strong text-cream hover:border-line-hover sticky top-3 float-right mr-3 grid size-9 cursor-pointer place-items-center rounded-full border text-xl leading-none"
              >
                ×
              </button>
              <Image src={item.image} alt={alt} sizes="94vw" className="h-auto w-full" />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
