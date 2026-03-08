import type { Metadata } from "next"
import { AboutContent } from "./content"

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Tentang GreenAdvisor dan Tim Subak Code — misi, visi, dan kontribusi SDG kami.",
}

export default function AboutPage() {
  return <AboutContent />
}
