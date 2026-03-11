import { Geist_Mono, Inter } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { CookieConsent } from "@/components/cookie-consent"
import { ServiceWorkerRegister } from "@/components/service-worker-register"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://subakhijau.app"),
  title: {
    default: "Subak Hijau — AI Sustainability Consultant for Indonesian MSMEs",
    template: "%s | Subak Hijau",
  },
  description:
    "Subak Hijau helps Indonesian MSMEs assess environmental impact, get sustainability scores, and AI roadmaps for a greener business.",
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
    title: "Subak Hijau — AI Sustainability Consultant for Indonesian MSMEs",
    description:
      "Helping 65 million Indonesian MSMEs assess, plan, and track business sustainability strategies with AI.",
    siteName: "Subak Hijau",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subak Hijau — AI Sustainability Consultant for Indonesian MSMEs",
    description:
      "Helping 65 million Indonesian MSMEs assess, plan, and track business sustainability strategies with AI.",
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
      lang="en"
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
        <link rel="apple-touch-icon" href="/icons/icon-180x180.png" />
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
                "AI sustainability consultant for greener Indonesian MSMEs.",
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
      <body suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg focus:ring-2 focus:ring-ring"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <LanguageProvider>
            <TooltipProvider>
              {children}
              <Toaster />
              <CookieConsent />
              <ServiceWorkerRegister />
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
