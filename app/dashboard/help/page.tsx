import type { Metadata } from "next"
import { HelpContent } from "./content"

export const metadata: Metadata = {
  title: "Help Center",
  description:
    "Subak Hijau Help Center — find answers to your questions about features and platform usage.",
}

export default function HelpPage() {
  return <HelpContent />
}
