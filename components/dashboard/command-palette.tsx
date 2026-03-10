"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  ClipboardList,
  Footprints,
  Globe,
  HelpCircle,
  LayoutDashboard,
  Map,
  MessageSquare,
  Moon,
  Settings,
  Shield,
  SlidersHorizontal,
  Sun,
  TrendingUp,
  FileText,
} from "lucide-react"
import { useTheme } from "next-themes"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { useTranslation } from "@/lib/i18n/language-context"

interface CommandAction {
  id: string
  label: string
  icon: React.ElementType
  action: () => void
  keywords?: string
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const { t } = useTranslation()
  const nav = t.dashboard.sidebar.nav
  const cp = t.dashboard.commandPalette

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const navigate = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  const navItems: CommandAction[] = useMemo(
    () => [
      {
        id: "dashboard",
        label: nav.dashboard,
        icon: LayoutDashboard,
        action: () => navigate("/dashboard"),
        keywords: "beranda home",
      },
      {
        id: "assessment",
        label: nav.assessment,
        icon: ClipboardList,
        action: () => navigate("/dashboard/assessment"),
        keywords: "penilaian evaluasi",
      },
      {
        id: "score",
        label: nav.myScore,
        icon: BarChart3,
        action: () => navigate("/dashboard/score"),
        keywords: "nilai score skor",
      },
      {
        id: "carbon",
        label: nav.carbonFootprint,
        icon: Footprints,
        action: () => navigate("/dashboard/carbon"),
        keywords: "carbon footprint emisi jejak karbon",
      },
      {
        id: "compliance",
        label: nav.compliance,
        icon: Shield,
        action: () => navigate("/dashboard/compliance"),
        keywords: "pojk regulasi peraturan kepatuhan",
      },
      {
        id: "simulator",
        label: nav.simulator,
        icon: SlidersHorizontal,
        action: () => navigate("/dashboard/simulator"),
        keywords: "simulasi what-if aksi",
      },
      {
        id: "sdg",
        label: nav.sdgImpact,
        icon: Globe,
        action: () => navigate("/dashboard/sdg"),
        keywords: "sustainable development goals dampak",
      },
      {
        id: "roadmap",
        label: nav.roadmap,
        icon: Map,
        action: () => navigate("/dashboard/roadmap"),
        keywords: "rencana plan langkah",
      },
      {
        id: "report",
        label: nav.report,
        icon: FileText,
        action: () => navigate("/dashboard/score/report"),
        keywords: "pdf download cetak laporan",
      },
      {
        id: "chat",
        label: nav.aiConsultant,
        icon: MessageSquare,
        action: () => navigate("/dashboard/chat"),
        keywords: "chat percakapan tanya konsultan",
      },
      {
        id: "progress",
        label: nav.progress,
        icon: TrendingUp,
        action: () => navigate("/dashboard/progress"),
        keywords: "perkembangan tracking progres",
      },
      {
        id: "help",
        label: nav.help,
        icon: HelpCircle,
        action: () => navigate("/dashboard/help"),
        keywords: "faq panduan bantuan",
      },
      {
        id: "settings",
        label: nav.settings,
        icon: Settings,
        action: () => navigate("/dashboard/settings"),
        keywords: "profil akun pengaturan",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nav]
  )

  const themeActions: CommandAction[] = useMemo(
    () => [
      {
        id: "toggle-theme",
        label: resolvedTheme === "dark" ? cp.switchToLight : cp.switchToDark,
        icon: resolvedTheme === "dark" ? Sun : Moon,
        action: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark")
          setOpen(false)
        },
        keywords: "tema dark light mode",
      },
    ],
    [resolvedTheme, setTheme, cp]
  )

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder={cp.searchPlaceholder} />
      <CommandList>
        <CommandEmpty>{cp.noResults}</CommandEmpty>
        <CommandGroup heading={cp.navigation}>
          {navItems.map((item) => (
            <CommandItem
              key={item.id}
              onSelect={item.action}
              keywords={item.keywords ? [item.keywords] : undefined}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={cp.actions}>
          {themeActions.map((item) => (
            <CommandItem key={item.id} onSelect={item.action}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
