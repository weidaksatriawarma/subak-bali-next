import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="mx-auto max-w-md">
        <CardContent className="flex flex-col items-center gap-4 pt-6 text-center">
          <div className="text-6xl font-bold text-muted-foreground">404</div>
          <h1 className="text-xl font-bold">Halaman Tidak Ditemukan</h1>
          <p className="text-sm text-muted-foreground">
            Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
          </p>
          <Button asChild>
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
