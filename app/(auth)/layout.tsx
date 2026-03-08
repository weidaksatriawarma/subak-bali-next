import { Leaf } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-[400px] space-y-6">
        <div className="flex items-center justify-center gap-2">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold tracking-tight">Subak Hijau</span>
        </div>
        {children}
      </div>
    </div>
  )
}
