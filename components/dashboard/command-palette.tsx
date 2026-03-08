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
        label: "Dashboard",
        icon: LayoutDashboard,
        action: () => navigate("/dashboard"),
        keywords: "beranda home",
      },
      {
        id: "assessment",
        label: "Assessment",
        icon: ClipboardList,
        action: () => navigate("/dashboard/assessment"),
        keywords: "penilaian evaluasi",
      },
      {
        id: "score",
        label: "Skor Saya",
        icon: BarChart3,
        action: () => navigate("/dashboard/score"),
        keywords: "nilai score",
      },
      {
        id: "carbon",
        label: "Jejak Karbon",
        icon: Footprints,
        action: () => navigate("/dashboard/carbon"),
        keywords: "carbon footprint emisi",
      },
      {
        id: "compliance",
        label: "Kepatuhan Regulasi",
        icon: Shield,
        action: () => navigate("/dashboard/compliance"),
        keywords: "pojk regulasi peraturan",
      },
      {
        id: "simulator",
        label: "Simulator Aksi",
        icon: SlidersHorizontal,
        action: () => navigate("/dashboard/simulator"),
        keywords: "simulasi what-if",
      },
      {
        id: "sdg",
        label: "Dampak SDG",
        icon: Globe,
        action: () => navigate("/dashboard/sdg"),
        keywords: "sustainable development goals",
      },
      {
        id: "roadmap",
        label: "Roadmap",
        icon: Map,
        action: () => navigate("/dashboard/roadmap"),
        keywords: "rencana plan langkah",
      },
      {
        id: "report",
        label: "Laporan",
        icon: FileText,
        action: () => navigate("/dashboard/score/report"),
        keywords: "pdf download cetak",
      },
      {
        id: "chat",
        label: "AI Konsultan",
        icon: MessageSquare,
        action: () => navigate("/dashboard/chat"),
        keywords: "chat percakapan tanya",
      },
      {
        id: "progress",
        label: "Progres",
        icon: TrendingUp,
        action: () => navigate("/dashboard/progress"),
        keywords: "perkembangan tracking",
      },
      {
        id: "help",
        label: "Bantuan",
        icon: HelpCircle,
        action: () => navigate("/dashboard/help"),
        keywords: "faq panduan",
      },
      {
        id: "settings",
        label: "Pengaturan",
        icon: Settings,
        action: () => navigate("/dashboard/settings"),
        keywords: "profil akun",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const themeActions: CommandAction[] = useMemo(
    () => [
      {
        id: "toggle-theme",
        label:
          resolvedTheme === "dark"
            ? "Beralih ke Mode Terang"
            : "Beralih ke Mode Gelap",
        icon: resolvedTheme === "dark" ? Sun : Moon,
        action: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark")
          setOpen(false)
        },
        keywords: "tema dark light mode",
      },
    ],
    [resolvedTheme, setTheme]
  )

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Ketik perintah atau cari..." />
      <CommandList>
        <CommandEmpty>Tidak ditemukan.</CommandEmpty>
        <CommandGroup heading="Navigasi">
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
        <CommandGroup heading="Aksi">
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
