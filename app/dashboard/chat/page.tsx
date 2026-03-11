"use client"

import {
  Suspense,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import type { UIMessage } from "ai"
import { toast } from "sonner"
import { Leaf, Loader2, History } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  ChatMessage,
  TypingIndicator,
} from "@/components/dashboard/chat-message"
import { ChatInput } from "@/components/dashboard/chat-input"
import { ChatHistory } from "@/components/dashboard/chat-history"
import { useTranslation } from "@/lib/i18n/language-context"
import type {
  ChatConversation,
  ChatMessage as DBChatMessage,
} from "@/types/database"

function dbToUIMessage(msg: DBChatMessage): UIMessage {
  return {
    id: msg.id,
    role: msg.role,
    parts: [{ type: "text", text: msg.content }],
  }
}

function ChatPanel({
  conversationId,
  initialMessages,
  onFirstMessage,
  initialPrompt,
  onInitialPromptConsumed,
}: {
  conversationId: string | null
  initialMessages: UIMessage[]
  onFirstMessage: (text: string) => Promise<string | null>
  initialPrompt?: string | null
  onInitialPromptConsumed?: () => void
}) {
  const [input, setInput] = useState("")
  const [activeConvId, setActiveConvId] = useState(conversationId)
  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { t } = useTranslation()
  const cp = t.dashboard.chatPage

  const activeConvIdRef = useRef(activeConvId)
  activeConvIdRef.current = activeConvId

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: () => ({ conversationId: activeConvIdRef.current }),
      }),
    []
  )

  const { messages, sendMessage, status } = useChat({
    transport,
    messages: initialMessages.length > 0 ? initialMessages : undefined,
    onError(error) {
      if (error.name === "AbortError") return
      toast.error(cp.aiUnavailable)
    },
  })

  const isLoading = status === "streaming" || status === "submitted"
  const hasAutoSent = useRef(false)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Defer URL update until streaming completes to avoid remounting mid-request
  useEffect(() => {
    if (status === "ready" && activeConvId && activeConvId !== conversationId) {
      router.replace(`/dashboard/chat?id=${activeConvId}`, { scroll: false })
    }
  }, [status, activeConvId, conversationId, router])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return
    setInput("")

    // If no conversation yet, create one first
    if (!activeConvId) {
      const newId = await onFirstMessage(messageText)
      if (newId) {
        setActiveConvId(newId)
        activeConvIdRef.current = newId
      }
    }

    sendMessage({ text: messageText })
  }

  useEffect(() => {
    if (initialPrompt && !hasAutoSent.current) {
      hasAutoSent.current = true
      handleSend(initialPrompt)
      onInitialPromptConsumed?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex h-full flex-col">
      <div
        className="flex-1 overflow-y-auto bg-muted/30 px-3 py-4 sm:px-6 sm:py-6"
        ref={scrollRef}
      >
        <div className="mx-auto max-w-2xl">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold tracking-tight">
                  {cp.greeting}
                </h2>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {cp.greetingDesc}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {cp.suggestedPrompts.map((prompt) => (
                  <Badge
                    key={prompt}
                    variant="outline"
                    className="cursor-pointer rounded-full px-4 py-2 text-sm transition-colors hover:border-primary/50 hover:bg-primary/5"
                    onClick={() => handleSend(prompt)}
                  >
                    {prompt}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-1">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>

          {status === "submitted" && (
            <div className="flex items-center gap-2.5 px-11 py-3 text-sm text-muted-foreground">
              <TypingIndicator />
              <span>{cp.typing}</span>
            </div>
          )}

          {status === "error" && (
            <div className="mx-auto my-4 max-w-md rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-center text-sm">
              <p className="font-medium text-destructive">{cp.errorTitle}</p>
              <p className="mt-1 text-muted-foreground">{cp.errorRetry}</p>
            </div>
          )}
        </div>
      </div>

      <div className="border-t bg-background p-3 sm:p-4">
        <div className="mx-auto max-w-2xl">
          <ChatInput
            input={input}
            onInputChange={setInput}
            onSubmit={() => handleSend()}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

function useChatData(conversationId: string | null) {
  const [conversations, setConversations] = useState<ChatConversation[]>([])
  const [initialMessages, setInitialMessages] = useState<UIMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [messagesLoading, setMessagesLoading] = useState(false)

  const fetchConversations = useCallback(async () => {
    const res = await fetch("/api/conversations")
    if (res.ok) {
      setConversations(await res.json())
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchConversations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!conversationId) {
      setInitialMessages([])
      return
    }

    let cancelled = false
    setMessagesLoading(true)

    fetch(`/api/conversations/${conversationId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.messages) {
          setInitialMessages(data.messages.map(dbToUIMessage))
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setMessagesLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [conversationId])

  return {
    conversations,
    setConversations,
    initialMessages,
    loading,
    messagesLoading,
    fetchConversations,
  }
}

function ChatPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const conversationId = searchParams.get("id")
  const [initialPrompt, setInitialPrompt] = useState<string | null>(
    () => searchParams.get("prompt")
  )
  const [sheetOpen, setSheetOpen] = useState(false)
  const { t } = useTranslation()
  const cp = t.dashboard.chatPage

  useEffect(() => {
    document.title = "AI Consultant | Subak Hijau"
    if (initialPrompt) {
      router.replace("/dashboard/chat", { scroll: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    conversations,
    setConversations,
    initialMessages,
    loading,
    messagesLoading,
  } = useChatData(conversationId)

  const handleNewChat = () => {
    router.push("/dashboard/chat")
    setSheetOpen(false)
  }

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/conversations/${id}`, { method: "DELETE" })
    if (!res.ok && res.status !== 204) {
      return
    }
    setConversations((prev) => prev.filter((c) => c.id !== id))
    if (conversationId === id) {
      router.push("/dashboard/chat")
    }
  }

  const handleFirstMessage = async (text: string): Promise<string | null> => {
    const title = text.length > 50 ? text.slice(0, 47) + "..." : text
    const res = await fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })

    if (!res.ok) return null

    const conv: ChatConversation = await res.json()
    setConversations((prev) => [conv, ...prev])
    return conv.id
  }

  const historyPanel = (
    <ChatHistory
      conversations={conversations}
      currentId={conversationId}
      onNewChat={handleNewChat}
      onDelete={handleDelete}
    />
  )

  if (loading) {
    return (
      <div className="-m-4 -mb-20 flex h-[calc(100dvh-7.5rem)] md:-m-6 md:h-[calc(100dvh-4rem)]">
        <div className="hidden w-64 border-r p-3 md:block">
          <Skeleton className="mb-3 h-9 w-full" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
        <div className="flex-1" />
      </div>
    )
  }

  return (
    <div className="-m-4 -mb-20 flex h-[calc(100dvh-7.5rem)] md:-m-6 md:h-[calc(100dvh-4rem)]">
      {/* Desktop history panel */}
      <div className="hidden w-64 border-r md:block">{historyPanel}</div>

      {/* Chat area */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header with history toggle */}
        <div className="flex items-center border-b px-3 py-2 md:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <History className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="border-b px-3 py-3">
                <SheetTitle>{cp.historyTitle}</SheetTitle>
              </SheetHeader>
              {historyPanel}
            </SheetContent>
          </Sheet>
          <span className="ml-2 text-sm font-medium text-muted-foreground">
            {cp.headerTitle}
          </span>
        </div>

        {/* Chat panel */}
        <div className="flex-1 overflow-hidden">
          {messagesLoading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <ChatPanel
              key={conversationId || "new"}
              conversationId={conversationId}
              initialMessages={initialMessages}
              onFirstMessage={handleFirstMessage}
              initialPrompt={initialPrompt}
              onInitialPromptConsumed={() => setInitialPrompt(null)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="-m-4 -mb-20 flex h-[calc(100dvh-7.5rem)] items-center justify-center md:-m-6 md:h-[calc(100dvh-4rem)]">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <ChatPageContent />
    </Suspense>
  )
}
