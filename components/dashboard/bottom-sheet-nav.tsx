"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ClipboardList,
  MessageSquare,
  BarChart3,
  MoreHorizontal,
  Map,
  Footprints,
  ShieldCheck,
  FlaskConical,
  Globe,
  Award,
  Trophy,
  FileText,
  TrendingUp,
  HelpCircle,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n/language-context"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface NavItem {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  exact?: boolean
}

function isActive(pathname: string, href: string, exact?: boolean) {
  return exact ? pathname === href : pathname.startsWith(href)
}

export function BottomSheetNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const nav = t.dashboard.sidebar.nav
  const bs = t.dashboard.bottomSheet

  const mainItems: NavItem[] = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: nav.dashboard,
      exact: true,
    },
    {
      href: "/dashboard/assessment",
      icon: ClipboardList,
      label: nav.assessment,
    },
    {
      href: "/dashboard/chat",
      icon: MessageSquare,
      label: nav.aiConsultant,
    },
    {
      href: "/dashboard/score",
      icon: BarChart3,
      label: nav.myScore,
    },
  ]

  const moreItems: NavItem[] = [
    { href: "/dashboard/roadmap", icon: Map, label: nav.roadmap },
    {
      href: "/dashboard/carbon-footprint",
      icon: Footprints,
      label: nav.carbonFootprint,
    },
    {
      href: "/dashboard/compliance",
      icon: ShieldCheck,
      label: nav.compliance,
    },
    {
      href: "/dashboard/simulator",
      icon: FlaskConical,
      label: nav.simulator,
    },
    { href: "/dashboard/sdg-impact", icon: Globe, label: nav.sdgImpact },
    {
      href: "/dashboard/certificate",
      icon: Award,
      label: nav.certificate,
    },
    {
      href: "/dashboard/achievements",
      icon: Trophy,
      label: nav.achievementCard,
    },
    { href: "/dashboard/report", icon: FileText, label: nav.report },
    { href: "/dashboard/progress", icon: TrendingUp, label: nav.progress },
    { href: "/dashboard/help", icon: HelpCircle, label: nav.help },
    { href: "/dashboard/settings", icon: Settings, label: nav.settings },
  ]

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
        role="navigation"
        aria-label={bs.ariaLabel}
      >
        <div className="flex h-14 items-center justify-around">
          {mainItems.map((item) => {
            const active = isActive(pathname, item.href, item.exact)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-2 py-1 text-[10px]",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
          <button
            onClick={() => setOpen(true)}
            className={cn(
              "flex flex-col items-center gap-0.5 px-2 py-1 text-[10px]",
              "text-muted-foreground hover:text-foreground"
            )}
          >
            <MoreHorizontal className="h-5 w-5" />
            <span>{bs.more}</span>
          </button>
        </div>
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl px-4 pt-4 pb-8">
          <SheetHeader className="px-0">
            <SheetTitle>{bs.moreMenu}</SheetTitle>
          </SheetHeader>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {moreItems.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-lg p-2 text-center text-[11px]",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="leading-tight">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
