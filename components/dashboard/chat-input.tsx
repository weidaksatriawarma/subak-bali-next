"use client"

import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (input.trim()) {
          onSubmit()
        }
      }}
      className="flex items-center gap-2"
    >
      <Input
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Ketik pesan Anda..."
        disabled={isLoading}
        className="flex-1"
      />
      <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
        <Send className="h-4 w-4" />
        <span className="sr-only">Kirim</span>
      </Button>
    </form>
  )
}
