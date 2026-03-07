"use client"

import Link from "next/link"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import type { ChatConversation } from "@/types/database"

function formatRelativeDate(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "Baru saja"
  if (diffMins < 60) return `${diffMins} menit lalu`
  if (diffHours < 24) return `${diffHours} jam lalu`
  if (diffDays < 7) return `${diffDays} hari lalu`
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" })
}

interface ChatHistoryProps {
  conversations: ChatConversation[]
  currentId: string | null
  onNewChat: () => void
  onDelete: (id: string) => void
  className?: string
}

export function ChatHistory({
  conversations,
  currentId,
  onNewChat,
  onDelete,
  className,
}: ChatHistoryProps) {
  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="p-3">
        <Button onClick={onNewChat} className="w-full" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Percakapan Baru
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1 px-3 pb-3">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={cn(
                "group flex items-center rounded-md hover:bg-accent",
                currentId === conv.id && "bg-accent"
              )}
            >
              <Link
                href={`/dashboard/chat?id=${conv.id}`}
                className="min-w-0 flex-1 px-3 py-2"
              >
                <p className="truncate text-sm font-medium">{conv.title}</p>
                <p className="text-xs text-muted-foreground">
                  {formatRelativeDate(conv.updated_at)}
                </p>
              </Link>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-1 h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Hapus percakapan?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Percakapan ini akan dihapus secara permanen dan tidak dapat
                      dikembalikan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(conv.id)}>
                      Hapus
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}

          {conversations.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              Belum ada percakapan
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
