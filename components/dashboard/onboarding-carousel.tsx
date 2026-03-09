"use client"

import { useState, useEffect, useCallback, startTransition } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Leaf, ClipboardList, BarChart3, Map, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const STORAGE_KEY = "subakhijau-onboarding-carousel-done"

interface Slide {
  title: string
  description: string
  icon: React.ReactNode
}

const slides: Slide[] = [
  {
    title: "Apa itu Subak Hijau?",
    description:
      "Platform AI yang membantu UMKM Indonesia mengukur dan meningkatkan sustainability bisnis mereka.",
    icon: <Leaf className="h-16 w-16 text-primary" />,
  },
  {
    title: "Cara Kerjanya",
    description:
      "Isi assessment tentang bisnis Anda, dapatkan skor dari AI, lalu ikuti roadmap yang dipersonalisasi.",
    icon: (
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <ClipboardList className="h-6 w-6 text-primary" />
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <BarChart3 className="h-6 w-6 text-primary" />
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Map className="h-6 w-6 text-primary" />
        </div>
      </div>
    ),
  },
  {
    title: "Mulai Sekarang",
    description:
      "Siap meningkatkan sustainability bisnis Anda? Mari mulai dengan assessment pertama!",
    icon: <div className="text-6xl">{"\u{1F33F}"}</div>,
  },
]

export function OnboardingCarousel() {
  const [current, setCurrent] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const done = localStorage.getItem(STORAGE_KEY)
    if (!done) startTransition(() => setShow(true))
  }, [])

  const handleDismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "true")
    setShow(false)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-2xl border bg-background p-8 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6">{slides[current].icon}</div>
            <h2 className="mb-2 text-xl font-bold">{slides[current].title}</h2>
            <p className="text-sm text-muted-foreground">
              {slides[current].description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        <div className="mt-6 flex gap-2">
          {current < slides.length - 1 ? (
            <>
              <Button
                variant="ghost"
                className="flex-1"
                onClick={handleDismiss}
              >
                Lewati
              </Button>
              <Button
                className="flex-1"
                onClick={() => setCurrent(current + 1)}
              >
                Lanjut
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button className="w-full" onClick={handleDismiss}>
              Mulai Sekarang
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
