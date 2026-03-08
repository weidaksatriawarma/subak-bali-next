import type { Metadata } from "next"
import { AboutContent } from "./content"

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Tentang Subak Hijau — misi, visi, dan kontribusi kami untuk sustainability UMKM Indonesia.",
}

export default function AboutPage() {
  return <AboutContent />
}
