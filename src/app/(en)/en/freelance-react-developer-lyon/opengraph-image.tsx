import { getService } from "@/content/services"
import { serviceOgImage } from "@/lib/services"

export { ogSize as size } from "@/lib/og"
export const contentType = "image/png"
export const alt = getService("react").content.en.og.subtitle

export default function OpengraphImage() {
  return serviceOgImage("react", "en")
}
