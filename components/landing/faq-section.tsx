"use client"

import { MessageSquare } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/language-context"
import { landingExtras } from "@/lib/i18n/content/landing-extras"
import { FadeInUp } from "@/components/landing/motion-wrapper"

export function FaqSection() {
  const { locale } = useTranslation()
  const d = landingExtras[locale].faq

  return (
    <section id="faq" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <FadeInUp>
          <h2 className="mb-2 text-center text-2xl font-bold tracking-tight sm:text-3xl">
            {d.heading}
          </h2>
          <p className="mb-10 text-center text-muted-foreground">
            {d.subheading}
          </p>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {d.items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <div className="mt-10 text-center">
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => {
                document
                  .querySelector<HTMLButtonElement>(
                    "[data-chat-widget-trigger]"
                  )
                  ?.click()
              }}
            >
              <MessageSquare className="size-4" />
              {d.bottomCta}
            </Button>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
