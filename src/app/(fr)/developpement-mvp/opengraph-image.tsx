import { getService } from "@/content/services"
import { serviceOgImage } from "@/lib/services"

export { ogSize as size } from "@/lib/og"
export const contentType = "image/png"
export const alt = getService("mvp").content.fr.og.subtitle

export default function OpengraphImage() {
  return serviceOgImage("mvp", "fr")
}
