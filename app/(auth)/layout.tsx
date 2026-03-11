import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { LanguageSwitcher } from "@/components/landing/language-switcher"
import { ThemeToggle } from "@/components/landing/theme-toggle"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-svh items-center justify-center bg-muted/40 p-4">
      <Link
        href="/"
        className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Beranda
      </Link>

      <div className="absolute top-4 right-4 flex items-center gap-1">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      <div className="w-full max-w-[400px] space-y-6">
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/images/logo/logo-subak-hijau.png"
            alt="Subak Hijau"
            width={32}
            height={32}
          />
          <span className="text-2xl font-bold tracking-tight">Subak Hijau</span>
        </div>
        {children}
      </div>
    </div>
  )
}
