import type { Metadata } from "next"
import { HelpContent } from "./content"

export const metadata: Metadata = {
  title: "Pusat Bantuan",
  description:
    "Pusat bantuan GreenAdvisor — temukan jawaban untuk pertanyaan Anda tentang fitur dan penggunaan platform.",
}

export default function HelpPage() {
  return <HelpContent />
}
