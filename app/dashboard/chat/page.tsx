"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Leaf, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChatMessage } from "@/components/dashboard/chat-message"
import { ChatInput } from "@/components/dashboard/chat-input"

const SUGGESTED_PROMPTS = [
  "Bagaimana cara mengurangi limbah plastik?",
  "Tips hemat energi untuk UMKM",
  "Apa itu ekonomi sirkular?",
]

export default function ChatPage() {
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return
    sendMessage({ text: messageText })
    setInput("")
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex items-center gap-2 px-4 py-3">
        <Leaf className="h-5 w-5 text-green-600" />
        <h1 className="text-lg font-semibold">AI Consultant</h1>
      </div>
      <Separator />

      <div className="flex-1 overflow-y-auto p-4" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                Halo! Saya GreenAdvisor
              </h2>
              <p className="text-sm text-muted-foreground max-w-md">
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

      <Separator />
      <div className="p-4">
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
