"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="mx-auto max-w-md">
        <CardContent className="flex flex-col items-center gap-4 pt-6 text-center">
          <div className="text-4xl">&#x26A0;&#xFE0F;</div>
          <h1 className="text-xl font-bold">Terjadi Kesalahan</h1>
          <p className="text-sm text-muted-foreground">
            Maaf, terjadi kesalahan saat memuat halaman dashboard. Silakan coba
            lagi.
          </p>
          <div className="flex gap-3">
            <Button onClick={() => reset()}>Coba Lagi</Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Kembali ke Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
