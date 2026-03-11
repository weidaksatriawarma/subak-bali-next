"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { MessageCircle, X, ArrowRight, Sparkles, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface AiChatWidgetProps {
  variant: "dashboard" | "homepage"
}

const DASHBOARD_SUGGESTIONS: Record<string, { id: string[]; en: string[] }> = {
  "/dashboard/score": {
    id: [
      "Cara meningkatkan skor energi",
      "Jelaskan benchmark industri saya",
      "Kategori mana yang harus diprioritaskan?",
    ],
    en: [
      "How to improve my energy score",
      "Explain my industry benchmark",
      "Which category should I prioritize?",
    ],
  },
  "/dashboard/carbon": {
    id: [
      "Strategi kurangi emisi CO₂",
      "Apa itu Scope 1, 2, 3?",
      "Cara menghitung jejak karbon",
    ],
    en: [
      "Strategies to reduce CO₂ emissions",
      "What are Scope 1, 2, 3?",
      "How to calculate carbon footprint",
    ],
  },
  "/dashboard/compliance": {
    id: [
      "Regulasi apa yang berlaku untuk bisnis saya?",
      "Cara memenuhi kepatuhan regulasi",
      "Apa itu POJK sustainability?",
    ],
    en: [
      "What regulations apply to my business?",
      "How to achieve regulatory compliance",
      "What is POJK sustainability?",
    ],
  },
  "/dashboard/roadmap": {
    id: [
      "Langkah mana yang paling berdampak?",
      "Cara menyelesaikan roadmap lebih cepat",
      "Prioritaskan langkah saya",
    ],
    en: [
      "Which step has the most impact?",
      "How to complete the roadmap faster",
      "Prioritize my steps",
    ],
  },
  "/dashboard": {
    id: [
      "Apa yang harus saya lakukan pertama?",
      "Jelaskan skor saya",
      "Tips memulai sustainability",
    ],
    en: [
      "What should I do first?",
      "Explain my score",
      "Tips to start sustainability",
    ],
  },
}

const DEFAULT_SUGGESTIONS = {
  id: [
    "Tips sustainability untuk UMKM",
    "Apa itu ekonomi sirkular?",
    "Cara memulai bisnis hijau",
  ],
  en: [
    "Sustainability tips for MSMEs",
    "What is circular economy?",
    "How to start a green business",
  ],
}

const HOMEPAGE_ITEMS = {
  id: [
    {
      question: "Apa itu Subak Hijau?",
      answer:
        "Subak Hijau adalah konsultan sustainability berbasis AI untuk UMKM Indonesia. Gratis, cepat, dan personal.",
    },
    {
      question: "Fitur apa saja yang tersedia?",
      answer:
        "Assessment AI, skor sustainability, roadmap personal, kalkulator karbon, kepatuhan regulasi, dan AI chat consultant.",
    },
    {
      question: "Bagaimana cara memulai?",
      answer:
        "Daftar gratis, isi profil bisnis, lalu dapatkan skor dan roadmap sustainability dari AI.",
    },
  ],
  en: [
    {
      question: "What is Subak Hijau?",
      answer:
        "Subak Hijau is an AI-powered sustainability consultant for Indonesian MSMEs. Free, fast, and personalized.",
    },
    {
      question: "What features are available?",
      answer:
        "AI assessment, sustainability score, personal roadmap, carbon calculator, regulatory compliance, and AI chat consultant.",
    },
    {
      question: "How do I get started?",
      answer:
        "Register for free, fill in your business profile, then get your sustainability score and roadmap from AI.",
    },
  ],
}

export function AiChatWidget({ variant }: AiChatWidgetProps) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [expandedItem, setExpandedItem] = useState<number | null>(null)
  const [hasShownPulse, setHasShownPulse] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const panelRef = useRef<HTMLDivElement>(null)

  // Read sessionStorage after hydration to avoid SSR mismatch
  useEffect(() => {
    if (!sessionStorage.getItem(`subakhijau-widget-seen-${variant}`)) {
      setHasShownPulse(true)
    }
  }, [variant])

  // Write to sessionStorage when pulse is shown
  useEffect(() => {
    if (!hasShownPulse) return
    sessionStorage.setItem(`subakhijau-widget-seen-${variant}`, "1")
  }, [hasShownPulse, variant])

  // Determine locale from pathname or default to "id"
  const locale =
    pathname.startsWith("/en") || pathname.includes("/en/") ? "en" : "id"

  const suggestions =
    variant === "dashboard"
      ? ((DASHBOARD_SUGGESTIONS[pathname] ?? DEFAULT_SUGGESTIONS)[locale] ??
        DEFAULT_SUGGESTIONS[locale])
      : []

  const handleSend = () => {
    if (!inputValue.trim()) return
    router.push(
      `/dashboard/chat?prompt=${encodeURIComponent(inputValue.trim())}`
    )
    setInputValue("")
    setOpen(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    router.push(`/dashboard/chat?prompt=${encodeURIComponent(suggestion)}`)
    setOpen(false)
  }

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  // Stop pulse animation after 3 seconds
  useEffect(() => {
    if (!hasShownPulse) return
    const timer = setTimeout(() => setHasShownPulse(false), 3000)
    return () => clearTimeout(timer)
  }, [hasShownPulse])

  // Hide on chat page for dashboard variant (after all hooks)
  if (variant === "dashboard" && pathname === "/dashboard/chat") return null

  const homepageItems =
    HOMEPAGE_ITEMS[locale as "id" | "en"] ?? HOMEPAGE_ITEMS.id

  return (
    <div className="fixed right-4 bottom-20 z-50 md:bottom-6" ref={panelRef}>
      {/* Panel */}
      {open && (
        <Card className="absolute right-0 bottom-16 w-[calc(100vw-2rem)] max-w-sm overflow-hidden shadow-xl sm:w-96">
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-primary/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <span className="text-sm font-semibold">
                {variant === "dashboard"
                  ? locale === "id"
                    ? "AI Consultant"
                    : "AI Consultant"
                  : locale === "id"
                    ? "Kenali Subak Hijau"
                    : "Discover Subak Hijau"}
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md p-1 hover:bg-muted"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-80 overflow-y-auto p-4">
            {variant === "dashboard" ? (
              <>
                <p className="mb-3 text-xs font-medium text-muted-foreground">
                  {locale === "id"
                    ? "Saran pertanyaan:"
                    : "Suggested questions:"}
                </p>
                <div className="space-y-2">
                  {suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex w-full items-center gap-2 rounded-lg border bg-background px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted"
                    >
                      <MessageCircle className="size-3.5 shrink-0 text-primary" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>

                {/* Mini input */}
                <div className="mt-4 flex gap-2">
                  <Input
                    placeholder={
                      locale === "id"
                        ? "Ketik pertanyaan..."
                        : "Type a question..."
                    }
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="text-sm"
                  />
                  <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                  >
                    <Send className="size-4" />
                  </Button>
                </div>

                {/* Open full chat */}
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="mt-3 w-full gap-1.5"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/dashboard/chat">
                    {locale === "id" ? "Buka Chat Lengkap" : "Open Full Chat"}
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  {homepageItems.map((item, i) => (
                    <div key={i}>
                      <button
                        onClick={() =>
                          setExpandedItem(expandedItem === i ? null : i)
                        }
                        className="flex w-full items-center gap-2 rounded-lg border bg-background px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-muted"
                      >
                        <MessageCircle className="size-3.5 shrink-0 text-primary" />
                        <span>{item.question}</span>
                      </button>
                      {expandedItem === i && (
                        <p className="mt-1.5 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                          {item.answer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button asChild className="mt-4 w-full gap-1.5">
                  <Link href="/register">
                    {locale === "id" ? "Coba Gratis" : "Try for Free"}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </Card>
      )}

      {/* FAB Button */}
      <button
        data-chat-widget-trigger=""
        onClick={() => setOpen(!open)}
        className={cn(
          "flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl",
          open && "rotate-0",
          hasShownPulse && !open && "animate-pulse"
        )}
        aria-label={open ? "Close AI chat" : "Open AI chat"}
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </div>
  )
}
