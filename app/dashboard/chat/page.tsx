"use client"

import { Suspense, useState, useRef, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import type { UIMessage } from "ai"
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
import { ChatMessage } from "@/components/dashboard/chat-message"
import { ChatInput } from "@/components/dashboard/chat-input"
import { ChatHistory } from "@/components/dashboard/chat-history"
import type { ChatConversation, ChatMessage as DBChatMessage } from "@/types/database"

const SUGGESTED_PROMPTS = [
  "Bagaimana cara mengurangi limbah plastik?",
  "Tips hemat energi untuk UMKM",
  "Apa itu ekonomi sirkular?",
]

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
}: {
  conversationId: string | null
  initialMessages: UIMessage[]
  onFirstMessage: (text: string) => Promise<string | null>
}) {
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const pendingConvIdRef = useRef<string | null>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { conversationId: pendingConvIdRef.current || conversationId },
    }),
    messages: initialMessages.length > 0 ? initialMessages : undefined,
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Keep pendingConvIdRef in sync with conversationId prop
  useEffect(() => {
    if (conversationId) {
      pendingConvIdRef.current = conversationId
    }
  }, [conversationId])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return
    setInput("")

    // If no conversation yet, create one first
    if (!conversationId && !pendingConvIdRef.current) {
      const newId = await onFirstMessage(messageText)
      if (newId) {
        pendingConvIdRef.current = newId
      }
    }

    sendMessage({ text: messageText })
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-2 sm:p-4" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Halo! Saya GreenAdvisor</h2>
              <p className="max-w-md text-sm text-muted-foreground">
                Konsultan sustainability AI Anda. Tanyakan apa saja tentang
                praktik bisnis berkelanjutan.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <Badge
                  key={prompt}
                  variant="outline"
                  className="cursor-pointer px-3 py-1.5 text-sm hover:bg-accent"
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
          <div className="flex items-center gap-2 py-3 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>GreenAdvisor sedang mengetik...</span>
          </div>
        )}
      </div>

      <div className="border-t p-2 sm:p-4">
        <ChatInput
          input={input}
          onInputChange={setInput}
          onSubmit={() => handleSend()}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

function ChatPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const conversationId = searchParams.get("id")

  const [conversations, setConversations] = useState<ChatConversation[]>([])
  const [initialMessages, setInitialMessages] = useState<UIMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [messagesLoading, setMessagesLoading] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  const fetchConversations = useCallback(async () => {
    const res = await fetch("/api/conversations")
    if (res.ok) {
      const data = await res.json()
      setConversations(data)
    }
    setLoading(false)
  }, [])

  // Fetch conversations on mount
  useEffect(() => {
    fetchConversations()
  }, [fetchConversations])

  // Fetch messages when conversationId changes
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
        if (cancelled) return
        if (data?.messages) {
          setInitialMessages(data.messages.map(dbToUIMessage))
        }
        setMessagesLoading(false)
      })
      .catch(() => {
        if (!cancelled) setMessagesLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [conversationId])

  const handleNewChat = () => {
    router.push("/dashboard/chat")
    setSheetOpen(false)
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/conversations/${id}`, { method: "DELETE" })
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
    router.replace(`/dashboard/chat?id=${conv.id}`, { scroll: false })
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
      <div className="-m-4 flex h-[calc(100vh-4rem)] md:-m-6">
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
    <div className="-m-4 flex h-[calc(100vh-4rem)] md:-m-6">
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
                <SheetTitle>Riwayat Chat</SheetTitle>
              </SheetHeader>
              {historyPanel}
            </SheetContent>
          </Sheet>
          <span className="ml-2 text-sm font-medium text-muted-foreground">
            GreenAdvisor Chat
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
        <div className="-m-4 flex h-[calc(100vh-4rem)] items-center justify-center md:-m-6">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <ChatPageContent />
    </Suspense>
  )
}
