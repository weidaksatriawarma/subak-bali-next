"use client"

import { useRef } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

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
      className="flex items-end gap-2"
    >
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Ketik pesan Anda..."
        disabled={isLoading}
        rows={1}
        className="max-h-24 min-h-[2.5rem] flex-1 resize-none"
      />
      <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
        <Send className="h-4 w-4" />
        <span className="sr-only">Kirim</span>
      </Button>
    </form>
  )
}
