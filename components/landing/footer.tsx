"use client"

import { Leaf } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useTranslation } from "@/lib/i18n/language-context"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="px-4 pb-8 sm:px-6 lg:px-8">
      <Separator className="mb-8" />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2 text-foreground">
          <Leaf className="size-5 text-primary" />
          <span className="text-lg font-bold">GreenAdvisor</span>
        </div>
        <p>{t.footer.madeFor}</p>
        <p>{t.footer.team}</p>
        <p>
          &copy; {new Date().getFullYear()} GreenAdvisor. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
