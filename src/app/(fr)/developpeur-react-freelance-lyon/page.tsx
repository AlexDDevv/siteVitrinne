import { ServicePage } from "@/components/service-page"
import { getService } from "@/content/services"
import { serviceMetadata } from "@/lib/services"

export const metadata = serviceMetadata("react", "fr")

export default function Page() {
  return <ServicePage service={getService("react")} lang="fr" />
}
