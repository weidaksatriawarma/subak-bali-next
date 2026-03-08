"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Leaf, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSwitcher } from "./language-switcher"
import { useTranslation } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Auto-close mobile sheet on browser back/forward navigation
  useEffect(() => {
    const onPopState = () => setOpen(false)
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  const navLinks = [
    { label: t.navbar.howItWorks, href: "/#cara-kerja" },
    { label: t.navbar.faq, href: "/faq" },
    { label: t.navbar.about, href: "/about" },
    { label: t.navbar.guide, href: "/panduan" },
  ]

  function isActive(href: string) {
    if (href === "/" || href.startsWith("/#")) {
      return pathname === "/"
    }
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 border-b transition-[background-color,border-color] duration-300",
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="size-6 text-primary" />
          <span className="text-lg font-bold text-foreground">Subak Hijau</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "relative text-sm font-medium transition-colors",
                "after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200",
                "hover:text-foreground hover:after:scale-x-100",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
                isActive(link.href)
                  ? "text-foreground after:scale-x-100"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Separator orientation="vertical" className="mx-2 h-5" />
          <div className="flex items-center gap-1">
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
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-64 flex-col">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Leaf className="size-5 text-primary" />
                  Subak Hijau
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                      "hover:bg-muted hover:text-foreground",
                      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                      isActive(link.href)
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Separator className="mx-4" />
              <div className="flex flex-col gap-2 px-4">
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
              <SheetFooter className="mt-auto flex-row justify-center gap-1">
                <LanguageSwitcher />
                <ThemeToggle />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
