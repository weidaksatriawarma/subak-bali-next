import { Geist_Mono, Inter } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://greenadvisor.vercel.app"),
  title: {
    default: "GreenAdvisor — Konsultan Sustainability AI untuk UMKM Indonesia",
    template: "%s | GreenAdvisor",
  },
  description:
    "GreenAdvisor membantu UMKM Indonesia menilai dampak lingkungan, mendapatkan skor sustainability, dan roadmap AI untuk bisnis yang lebih hijau.",
  keywords: [
    "sustainability",
    "UMKM",
    "Indonesia",
    "AI",
    "SDG",
    "keberlanjutan",
    "MSME",
    "green business",
  ],
  authors: [{ name: "Tim Subak Code" }],
  openGraph: {
    title: "GreenAdvisor — Konsultan Sustainability AI untuk UMKM Indonesia",
    description:
      "Membantu 65 juta UMKM Indonesia menilai, merencanakan, dan melacak strategi sustainability bisnis dengan AI.",
    siteName: "GreenAdvisor",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
