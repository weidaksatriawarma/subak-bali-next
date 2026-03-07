"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Leaf, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSwitcher } from "./language-switcher"
import { useTranslation } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navLink = (
    <a
      href="#cara-kerja"
      onClick={() => setOpen(false)}
      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      {t.navbar.howItWorks}
    </a>
  )

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-background/80 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="size-6 text-primary" />
          <span className="text-lg font-bold text-foreground">
            GreenAdvisor
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-2 md:flex">
          {navLink}
          <div className="ml-2 flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild className="ml-1">
              <Link href="/login">{t.navbar.login}</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">{t.navbar.register}</Link>
            </Button>
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Leaf className="size-5 text-primary" />
                  GreenAdvisor
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-4">
                {navLink}
                <Button
                  variant="outline"
                  asChild
                  onClick={() => setOpen(false)}
                >
                  <Link href="/login">{t.navbar.login}</Link>
                </Button>
                <Button asChild onClick={() => setOpen(false)}>
                  <Link href="/register">{t.navbar.register}</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
