import { Geist_Mono, Inter } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { CookieConsent } from "@/components/cookie-consent"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://subakhijau.app"),
  title: {
    default: "Subak Hijau — Konsultan Sustainability AI untuk UMKM Indonesia",
    template: "%s | Subak Hijau",
  },
  description:
    "Subak Hijau membantu UMKM Indonesia menilai dampak lingkungan, mendapatkan skor sustainability, dan roadmap AI untuk bisnis yang lebih hijau.",
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
    title: "Subak Hijau — Konsultan Sustainability AI untuk UMKM Indonesia",
    description:
      "Membantu 65 juta UMKM Indonesia menilai, merencanakan, dan melacak strategi sustainability bisnis dengan AI.",
    siteName: "Subak Hijau",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subak Hijau — Konsultan Sustainability AI untuk UMKM Indonesia",
    description:
      "Membantu 65 juta UMKM Indonesia menilai, merencanakan, dan melacak strategi sustainability bisnis dengan AI.",
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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#16a34a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Subak Hijau" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Subak Hijau",
              url: "https://subakhijau.app",
              description:
                "AI-powered sustainability consultant for Indonesian MSMEs",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "IDR",
              },
              creator: {
                "@type": "Organization",
                name: "Tim Subak Code",
                url: "https://subakhijau.app/about",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Subak Hijau",
              url: "https://subakhijau.app",
              logo: "https://subakhijau.app/icons/icon-512x512.png",
              description:
                "Konsultan sustainability AI untuk UMKM Indonesia yang lebih hijau.",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "hello@subakhijau.app",
                availableLanguage: ["Indonesian", "English"],
              },
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <TooltipProvider>
              {children}
              <Toaster />
              <CookieConsent />
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
