"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  ClipboardList,
  Footprints,
  LayoutDashboard,
  Leaf,
  LogOut,
  Map,
  MessageSquare,
  HelpCircle,
  MoreVertical,
  Settings,
  Shield,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react"

import type { Profile } from "@/types/database"
import { useTranslation } from "@/lib/i18n/language-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface AppSidebarProps {
  profile: Profile
}

export function AppSidebar({ profile }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslation()
  const d = t.dashboard.sidebar

  const navItems = [
    { title: d.nav.dashboard, href: "/dashboard", icon: LayoutDashboard },
    {
      title: d.nav.assessment,
      href: "/dashboard/assessment",
      icon: ClipboardList,
    },
    { title: d.nav.myScore, href: "/dashboard/score", icon: BarChart3 },
    {
      title: d.nav.simulator,
      href: "/dashboard/simulator",
      icon: SlidersHorizontal,
    },
    {
      title: d.nav.carbonFootprint,
      href: "/dashboard/carbon",
      icon: Footprints,
    },
    {
      title: d.nav.compliance,
      href: "/dashboard/compliance",
      icon: Shield,
    },
    { title: d.nav.roadmap, href: "/dashboard/roadmap", icon: Map },
    {
      title: d.nav.aiConsultant,
      href: "/dashboard/chat",
      icon: MessageSquare,
    },
    { title: d.nav.progress, href: "/dashboard/progress", icon: TrendingUp },
    { title: d.nav.help, href: "/dashboard/help", icon: HelpCircle },
    { title: d.nav.settings, href: "/dashboard/settings", icon: Settings },
  ]

  const initials = profile.business_name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Leaf className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">GreenAdvisor</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {d.subtitle}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
                >
                  <Avatar size="sm">
                    {profile.avatar_url && (
                      <AvatarImage
                        src={profile.avatar_url}
                        alt={profile.business_name}
                      />
                    )}
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {profile.business_name}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {profile.industry}
                    </span>
                  </div>
                  <MoreVertical className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Settings />
                    {d.settings}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut />
                  {d.signOut}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
