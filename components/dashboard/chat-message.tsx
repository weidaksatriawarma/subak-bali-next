"use client"

import type { UIMessage } from "ai"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { User, Leaf } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: UIMessage
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex items-start gap-2 py-3 sm:gap-3",
        isUser && "flex-row-reverse"
      )}
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback
          className={cn(
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
          )}
        >
          {isUser ? <User className="h-4 w-4" /> : <Leaf className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "max-w-[90%] rounded-2xl px-3 py-2 text-sm sm:max-w-[80%] sm:px-4 sm:py-2.5",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        {message.parts?.map((part, i) => {
          if (part.type === "text") {
            if (isUser) {
              return (
                <span key={i} className="whitespace-pre-wrap">
                  {part.text}
                </span>
              )
            }
            return (
              <div
                key={i}
                className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {part.text}
                </ReactMarkdown>
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
