import type { Metadata } from "next"
import { ContactContent } from "./content"

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description:
    "Hubungi Tim Subak Code melalui WhatsApp, email, atau media sosial.",
}

export default function ContactPage() {
  return <ContactContent />
}
