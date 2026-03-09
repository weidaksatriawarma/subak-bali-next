"use client"

import Link from "next/link"
import { MessageCircle, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"

interface AskAiCardProps {
  title: string
  description: string
  prompt: string
  buttonLabel?: string
  className?: string
}

export function AskAiCard({
  title,
  description,
  prompt,
  buttonLabel,
  className,
}: AskAiCardProps) {
  const { locale } = useTranslation()
  const label = buttonLabel ?? (locale === "id" ? "Tanya AI" : "Ask AI")
  const href = prompt
    ? `/dashboard/chat?prompt=${encodeURIComponent(prompt)}`
    : "/dashboard/chat"

  return (
    <Card className={cn("border-primary/20 bg-primary/5", className)}>
      <CardContent className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <MessageCircle className="size-6 text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-medium">{title}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        </div>
        <Button asChild className="shrink-0 gap-1.5">
          <Link href={href}>
            {label}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
