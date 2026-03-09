"use client"

import { useState, useEffect, startTransition } from "react"
import Link from "next/link"
import { X, ArrowRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { Nudge } from "@/lib/nudges"

interface ActionNudgeProps {
  nudge: Nudge | null
}

const STORAGE_PREFIX = "subakhijau-nudge-dismissed-"

export function ActionNudge({ nudge }: ActionNudgeProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!nudge) return
    const dismissedAt = localStorage.getItem(STORAGE_PREFIX + nudge.id)
    if (dismissedAt) {
      const elapsed = Date.now() - parseInt(dismissedAt, 10)
      if (elapsed < 24 * 60 * 60 * 1000) return
    }
    startTransition(() => setVisible(true))
  }, [nudge])

  if (!nudge || !visible) return null

  function handleDismiss() {
    if (!nudge) return
    localStorage.setItem(STORAGE_PREFIX + nudge.id, String(Date.now()))
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3"
        >
          <span className="text-xl">{nudge.emoji}</span>
          <p className="flex-1 text-sm">{nudge.text}</p>
          {nudge.ctaHref && nudge.ctaLabel && (
            <Button asChild variant="ghost" size="sm">
              <Link href={nudge.ctaHref}>
                {nudge.ctaLabel}
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          )}
          <button
            onClick={handleDismiss}
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
