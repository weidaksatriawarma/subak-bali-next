"use client"

import type { UIMessage } from "ai"
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
        "flex items-start gap-3 py-3",
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
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        {message.parts?.map((part, i) => {
          if (part.type === "text") {
            return (
              <span key={i} className="whitespace-pre-wrap">
                {part.text}
              </span>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
