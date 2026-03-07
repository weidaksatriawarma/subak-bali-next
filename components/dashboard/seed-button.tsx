"use client"

import { useState } from "react"
import { Database, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function SeedButton() {
  const [loading, setLoading] = useState(false)

  if (process.env.NODE_ENV !== "development") return null

  async function handleSeed() {
    setLoading(true)
    try {
      const res = await fetch("/api/seed", { method: "POST" })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to seed data")
      }

      toast.success("Seed data berhasil!", {
        description: `${data.data.assessments} assessments, ${data.data.scores} scores, ${data.data.roadmap_items} roadmap items, ${data.data.chat_messages} chat messages`,
      })

      window.location.reload()
    } catch (error) {
      toast.error("Seed data gagal", {
        description:
          error instanceof Error ? error.message : "Terjadi kesalahan",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSeed}
      disabled={loading}
      className="gap-2"
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Database className="size-4" />
      )}
      Seed Demo Data
    </Button>
  )
}
