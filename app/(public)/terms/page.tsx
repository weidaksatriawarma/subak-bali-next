import type { Metadata } from "next"
import { TermsContent } from "./content"

export const metadata: Metadata = {
  title: "Syarat Layanan",
  description:
    "Syarat dan ketentuan penggunaan layanan Subak Hijau untuk UMKM Indonesia.",
}

export default function TermsPage() {
  return <TermsContent />
}
