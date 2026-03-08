"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="id">
      <body className="flex min-h-screen items-center justify-center bg-background p-4 font-sans text-foreground">
        <Card className="mx-auto max-w-md">
          <CardContent className="flex flex-col items-center gap-4 pt-6 text-center">
            <div className="text-4xl">&#x26A0;&#xFE0F;</div>
            <h1 className="text-xl font-bold">Terjadi Kesalahan</h1>
            <p className="text-sm text-muted-foreground">
              Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi.
            </p>
            <Button onClick={() => reset()}>Coba Lagi</Button>
          </CardContent>
        </Card>
      </body>
    </html>
  )
}
