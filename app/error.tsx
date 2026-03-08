"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="mx-auto max-w-md">
        <CardContent className="flex flex-col items-center gap-4 pt-6 text-center">
          <div className="text-4xl">&#x26A0;&#xFE0F;</div>
          <h1 className="text-xl font-bold">Terjadi Kesalahan</h1>
          <p className="text-sm text-muted-foreground">
            Maaf, terjadi kesalahan saat memuat halaman. Silakan coba lagi atau
            kembali ke halaman utama.
          </p>
          <div className="flex gap-3">
            <Button onClick={() => reset()}>Coba Lagi</Button>
            <Button variant="outline" asChild>
              <Link href="/">Kembali</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
