"use client"

import Link from "next/link"
import Image from "next/image"
import { MessageCircle, Mail } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useTranslation } from "@/lib/i18n/language-context"
import { landingExtras } from "@/lib/i18n/content/landing-extras"

const CONTACT_ICONS: Record<string, React.ElementType> = {
  WhatsApp: MessageCircle,
  Email: Mail,
}

export function Footer() {
  const { locale } = useTranslation()
  const d = landingExtras[locale].footer

  return (
    <footer className="px-4 pt-16 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-3 flex items-center gap-2 text-foreground">
              <Image
                src="/images/logo/logo-subak-hijau.png"
                alt="Subak Hijau"
                width={20}
                height={20}
              />
              <span className="text-lg font-bold">Subak Hijau</span>
            </div>
            <p className="text-sm text-muted-foreground">{d.tagline}</p>
          </div>

          {/* Nav, Legal, Contact columns */}
          {d.columns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-3 text-sm font-semibold">{column.title}</h4>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => {
                  const Icon = CONTACT_ICONS[link.label]
                  return (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {Icon && <Icon className="size-4" />}
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center gap-2 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {d.copyright}
          </p>
          <p>{d.madeFor}</p>
        </div>
      </div>
    </footer>
  )
}
