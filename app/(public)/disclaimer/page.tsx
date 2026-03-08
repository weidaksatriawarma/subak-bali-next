import type { Metadata } from "next"
import { DisclaimerContent } from "./content"

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Disclaimer GreenAdvisor — batasan tanggung jawab dan sifat konten AI.",
}

export default function DisclaimerPage() {
  return <DisclaimerContent />
}
