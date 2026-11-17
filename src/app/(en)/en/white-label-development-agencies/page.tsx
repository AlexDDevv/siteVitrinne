import { ServicePage } from "@/components/service-page"
import { getService } from "@/content/services"
import { serviceMetadata } from "@/lib/services"

export const metadata = serviceMetadata("agences", "en")

export default function Page() {
  return <ServicePage service={getService("agences")} lang="en" />
}
