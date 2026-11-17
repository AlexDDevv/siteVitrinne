import { ServicePage } from "@/components/service-page"
import { getService } from "@/content/services"
import { serviceMetadata } from "@/lib/services"

export const metadata = serviceMetadata("mvp", "fr")

export default function Page() {
  return <ServicePage service={getService("mvp")} lang="fr" />
}
