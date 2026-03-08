import type { Metadata } from "next"
import { TermsContent } from "./content"

export const metadata: Metadata = {
  title: "Syarat Layanan",
  description:
    "Syarat dan ketentuan penggunaan layanan GreenAdvisor untuk UMKM Indonesia.",
}

export default function TermsPage() {
  return <TermsContent />
}
