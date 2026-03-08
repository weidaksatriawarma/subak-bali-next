import type { Metadata } from "next"
import { TutorialContent } from "./content"

export const metadata: Metadata = {
  title: "Panduan Pengguna",
  description:
    "Panduan lengkap cara menggunakan Subak Hijau — platform konsultan sustainability AI untuk UMKM Indonesia.",
}

export default function PanduanPage() {
  return <TutorialContent />
}
