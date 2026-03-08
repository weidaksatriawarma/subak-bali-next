import type { Metadata } from "next"
import { PrivacyContent } from "./content"

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi Subak Hijau — bagaimana kami melindungi data pribadi Anda sesuai UU PDP No. 27/2022.",
}

export default function PrivacyPage() {
  return <PrivacyContent />
}
