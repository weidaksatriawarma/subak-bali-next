"use client"

import { useRef } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useTranslation } from "@/lib/i18n/language-context"

interface ChatInputProps {
  input: string
  onInputChange: (value: string) => void
  onSubmit: () => void
  isLoading: boolean
}

export function ChatInput({
  input,
  onInputChange,
  onSubmit,
  isLoading,
}: ChatInputProps) {
  const { t } = useTranslation()
  const ci = t.dashboard.chatInput
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleInput = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (input.trim()) {
        onSubmit()
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto"
        }
      }
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (input.trim()) {
          onSubmit()
          if (textareaRef.current) {
            textareaRef.current.style.height = "auto"
          }
        }
      }}
      className="flex items-end gap-2 rounded-xl border bg-card p-2 shadow-sm transition-shadow focus-within:shadow-md"
    >
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={ci.placeholder}
        disabled={isLoading}
        rows={1}
        className="max-h-24 min-h-[2.5rem] flex-1 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
      />
      <Button
        type="submit"
        size="icon"
        disabled={isLoading || !input.trim()}
        className="h-9 w-9 shrink-0 rounded-lg"
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">{ci.send}</span>
      </Button>
    </form>
  )
}
