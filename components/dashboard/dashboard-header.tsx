"use client"

import Image from "next/image"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { NotificationBell } from "@/components/dashboard/notification-bell"

export function DashboardHeader() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <header
      className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4"
      aria-label="Dashboard navigation header"
    >
      <SidebarTrigger className="-ml-1" />
      <div
        role="separator"
        aria-orientation="vertical"
        className="mr-2 h-4 w-px shrink-0 bg-border md:hidden"
      />
      <div className="flex items-center gap-2 md:hidden">
        <Image
          src="/images/logo/logo-subak-hijau.png"
          alt="Subak Hijau"
          width={28}
          height={28}
          className="rounded-md"
        />
        <span className="text-sm font-semibold">Subak Hijau</span>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <NotificationBell />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          aria-label={
            resolvedTheme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
        >
          <Sun className="size-4 scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute size-4 scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
        </Button>
      </div>
    </header>
  )
}
