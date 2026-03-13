"use client"

import { AnimatePresence, motion } from "framer-motion"
import {
  getCelebrationContent,
  type CelebrationTrigger,
} from "@/lib/gamification/celebrations"
import { useTranslation } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"

export function CelebrationOverlay({
  trigger,
  onClose,
}: {
  trigger: CelebrationTrigger
  onClose: () => void
}) {
  const { t } = useTranslation()
  const g = t.dashboard.gamification
  const content = getCelebrationContent(trigger)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="w-full max-w-sm rounded-2xl bg-card p-8 text-center shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="animate-celebration-entrance text-7xl">
            {content.emoji}
          </div>
          <h2 className="mt-4 text-2xl font-bold">{content.title}</h2>
          <p className="mt-2 text-muted-foreground">{content.subtitle}</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" onClick={onClose}>
              {g.celebration.continueBtn}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
