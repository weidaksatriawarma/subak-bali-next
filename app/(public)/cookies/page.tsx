import type { Metadata } from "next"
import { CookiesContent } from "./content"

export const metadata: Metadata = {
  title: "Kebijakan Cookie",
  description:
    "Kebijakan cookie GreenAdvisor — informasi tentang penggunaan cookie dan local storage.",
}

export default function CookiesPage() {
  return <CookiesContent />
}
