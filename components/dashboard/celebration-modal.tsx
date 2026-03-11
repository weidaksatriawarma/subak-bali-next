"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  getCelebrationContent,
  type CelebrationTrigger,
} from "@/lib/gamification/celebrations"
import { useTranslation } from "@/lib/i18n/language-context"
import { useNotifications } from "@/hooks/use-notifications"
import { createAchievementNotification } from "@/lib/notifications"
import { Button } from "@/components/ui/button"

interface CelebrationContextType {
  triggerCelebration: (trigger: CelebrationTrigger) => void
}

const CelebrationContext = createContext<CelebrationContextType>({
  triggerCelebration: () => {},
})

export function useCelebration() {
  return useContext(CelebrationContext)
}

async function fireConfetti() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
  if (prefersReducedMotion) return

  const confetti = (await import("canvas-confetti")).default

  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 10000,
  }
  confetti({ ...defaults, particleCount: 50, origin: { x: 0.1, y: 0.6 } })
  confetti({ ...defaults, particleCount: 50, origin: { x: 0.9, y: 0.6 } })

  setTimeout(() => {
    confetti({ ...defaults, particleCount: 30, origin: { x: 0.3, y: 0.5 } })
    confetti({ ...defaults, particleCount: 30, origin: { x: 0.7, y: 0.5 } })
  }, 300)
}

export function CelebrationProvider({ children }: { children: ReactNode }) {
  const [activeTrigger, setActiveTrigger] = useState<CelebrationTrigger | null>(
    null
  )
  const firedRef = useRef(false)
  const { t } = useTranslation()
  const g = t.dashboard.gamification
  const { addNotification } = useNotifications()

  const triggerCelebration = useCallback(
    (trigger: CelebrationTrigger) => {
      setActiveTrigger(trigger)
      firedRef.current = false

      const content = getCelebrationContent(trigger)
      addNotification(
        createAchievementNotification(content.title, content.subtitle)
      )
    },
    [addNotification]
  )

  useEffect(() => {
    if (activeTrigger && !firedRef.current) {
      firedRef.current = true
      fireConfetti()
    }
  }, [activeTrigger])

  const content = activeTrigger ? getCelebrationContent(activeTrigger) : null

  return (
    <CelebrationContext.Provider value={{ triggerCelebration }}>
      {children}
      <AnimatePresence>
        {content && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
            onClick={() => setActiveTrigger(null)}
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
                <Button
                  variant="outline"
                  onClick={() => setActiveTrigger(null)}
                >
                  {g.celebration.continueBtn}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </CelebrationContext.Provider>
  )
}
