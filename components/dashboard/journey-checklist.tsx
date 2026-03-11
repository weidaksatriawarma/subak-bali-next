"use client"

import { useState, useEffect, startTransition } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, Circle, ChevronUp, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/language-context"

interface JourneyChecklistProps {
  hasAssessment: boolean
  hasScore: boolean
  hasRoadmap: boolean
  hasCertificate: boolean
}

const DISMISSED_KEY = "subakhijau-journey-dismissed"

export function JourneyChecklist({
  hasAssessment,
  hasScore,
  hasRoadmap,
  hasCertificate,
}: JourneyChecklistProps) {
  const { t } = useTranslation()
  const jc = t.dashboard.journeyChecklist
  const [expanded, setExpanded] = useState(false)
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(DISMISSED_KEY)
    startTransition(() => setDismissed(stored === "true"))
  }, [])

  const steps = [
    { label: jc.completeProfile, done: true, href: "/dashboard/settings" },
    {
      label: jc.fillAssessment,
      done: hasAssessment,
      href: "/dashboard/assessment",
    },
    { label: jc.viewScore, done: hasScore, href: "/dashboard/score" },
    { label: jc.createRoadmap, done: hasRoadmap, href: "/dashboard/roadmap" },
    {
      label: jc.getCertificate,
      done: hasCertificate,
      href: "/dashboard/certificate",
    },
  ]

  const completedCount = steps.filter((s) => s.done).length
  const allDone = completedCount === steps.length

  if (dismissed || allDone) return null

  return (
    <div className="fixed right-4 bottom-36 z-40 md:bottom-24">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-2 w-72 rounded-xl border bg-background p-4 shadow-lg"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">{jc.title}</h3>
              <button
                onClick={() => {
                  localStorage.setItem(DISMISSED_KEY, "true")
                  setDismissed(true)
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  {step.done ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                  ) : (
                    <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  {step.done ? (
                    <span className="text-sm text-muted-foreground line-through">
                      {step.label}
                    </span>
                  ) : (
                    <Link
                      href={step.href}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {step.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setExpanded(!expanded)}
        size="sm"
        className="rounded-full shadow-lg"
      >
        <span className="mr-1">
          {jc.stepCount} {completedCount}/5
        </span>
        <ChevronUp
          className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </Button>
    </div>
  )
}
