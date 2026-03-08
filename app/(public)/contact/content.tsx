"use client"

import { MessageCircle, Mail, Instagram, Linkedin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/language-context"
import { publicPagesContent } from "@/lib/i18n/content/public-pages"
import { FadeInUp } from "@/components/landing/motion-wrapper"

export function ContactContent() {
  const { locale } = useTranslation()
  const d = publicPagesContent[locale].contact

  return (
    <div className="mx-auto max-w-2xl px-4">
      <FadeInUp>
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {d.heading}
          </h1>
          <p className="text-lg text-muted-foreground">{d.description}</p>
        </div>
      </FadeInUp>

      <FadeInUp delay={0.1}>
        {/* WhatsApp CTA */}
        <Card className="mb-6 border-none bg-green-50 shadow-none dark:bg-green-950/30">
          <CardContent className="flex flex-col items-center gap-3 pt-2 text-center">
            <MessageCircle className="size-10 text-green-600" />
            <h2 className="text-xl font-semibold">{d.whatsapp.label}</h2>
            <p className="text-sm text-muted-foreground">
              {d.whatsapp.description}
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 size-4" />
                {d.whatsapp.cta}
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Email */}
        <Card className="mb-6 border-none bg-muted/50 shadow-none">
          <CardContent className="flex items-center gap-4 pt-2">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Mail className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{d.email.label}</h3>
              <a
                href={`mailto:${d.email.value}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {d.email.value}
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="mb-6 border-none bg-muted/50 shadow-none">
          <CardContent className="pt-2">
            <h3 className="mb-4 font-semibold">{d.social.title}</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com/greenadvisor.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Instagram className="size-5" />@{d.social.instagram}
              </a>
              <a
                href="https://linkedin.com/company/greenadvisor"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Linkedin className="size-5" />
                {d.social.linkedin}
              </a>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          {d.response}
        </p>
      </FadeInUp>
    </div>
  )
}
