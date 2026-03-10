"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ClipboardList,
  MessageSquare,
  BarChart3,
  Map,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n/language-context"

export function BottomNav() {
  const pathname = usePathname()
  const { t } = useTranslation()
  const d = t.dashboard.sidebar.nav
  const bs = t.dashboard.bottomSheet

  const navItems = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: d.dashboard,
      exact: true,
    },
    {
      href: "/dashboard/assessment",
      icon: ClipboardList,
      label: d.assessment,
    },
    {
      href: "/dashboard/chat",
      icon: MessageSquare,
      label: d.aiConsultant,
    },
    {
      href: "/dashboard/score",
      icon: BarChart3,
      label: d.myScore,
    },
    {
      href: "/dashboard/roadmap",
      icon: Map,
      label: d.roadmap,
    },
  ]

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
      role="navigation"
      aria-label={bs.ariaLabel}
    >
      <div className="flex h-14 items-center justify-around">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-1 text-[10px]",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
