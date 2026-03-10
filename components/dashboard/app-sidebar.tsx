"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Award,
  BarChart3,
  ChevronRight,
  ClipboardList,
  FileText,
  Footprints,
  Globe,
  HelpCircle,
  LayoutDashboard,
  Leaf,
  LogOut,
  Map,
  MessageSquare,
  MoreVertical,
  Settings,
  Shield,
  SlidersHorizontal,
  TrendingUp,
  Trophy,
} from "lucide-react"

import type { LucideIcon } from "lucide-react"
import type { Profile } from "@/types/database"
import { useTranslation } from "@/lib/i18n/language-context"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
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

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  exact?: boolean
  tourId?: string
  children?: NavItem[]
}

interface NavGroup {
  label: string
  items: NavItem[]
}

interface AppSidebarProps {
  profile: Profile
}

export function AppSidebar({ profile }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslation()
  const d = t.dashboard.sidebar

  const navGroups: NavGroup[] = [
    {
      label: d.groups.main,
      items: [
        {
          title: d.nav.dashboard,
          href: "/dashboard",
          icon: LayoutDashboard,
          exact: true,
        },
        {
          title: d.nav.assessment,
          href: "/dashboard/assessment",
          icon: ClipboardList,
          tourId: "assessment-link",
        },
      ],
    },
    {
      label: d.groups.analysis,
      items: [
        {
          title: d.nav.myScore,
          href: "/dashboard/score",
          icon: BarChart3,
          exact: true,
          children: [
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
            {
              title: d.nav.simulator,
              href: "/dashboard/simulator",
              icon: SlidersHorizontal,
            },
            {
              title: d.nav.sdgImpact,
              href: "/dashboard/sdg",
              icon: Globe,
            },
          ],
        },
        { title: d.nav.roadmap, href: "/dashboard/roadmap", icon: Map },
      ],
    },
    {
      label: d.groups.results,
      items: [
        {
          title: d.nav.certificate,
          href: "/dashboard/certificate",
          icon: Award,
          children: [
            {
              title: d.nav.achievementCard,
              href: "/dashboard/achievement",
              icon: Trophy,
            },
            {
              title: d.nav.report,
              href: "/dashboard/score/report",
              icon: FileText,
            },
          ],
        },
        {
          title: d.nav.aiConsultant,
          href: "/dashboard/chat",
          icon: MessageSquare,
          tourId: "chat-link",
        },
        {
          title: d.nav.progress,
          href: "/dashboard/progress",
          icon: TrendingUp,
        },
      ],
    },
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

  function isActive(item: NavItem) {
    if (item.href.includes("#")) return false
    if (item.exact) return pathname === item.href
    return pathname === item.href
  }

  function isChildActive(item: NavItem) {
    return (
      item.children?.some((child) => pathname.startsWith(child.href)) ?? false
    )
  }

  return (
    <Sidebar collapsible="icon" aria-label={d.ariaLabel}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Leaf className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Subak Hijau</span>
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
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) =>
                  item.children ? (
                    <Collapsible
                      key={item.href}
                      asChild
                      defaultOpen={isActive(item) || isChildActive(item)}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            isActive={isActive(item) || isChildActive(item)}
                            tooltip={item.title}
                          >
                            <item.icon />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.children.map((child) => (
                              <SidebarMenuSubItem key={child.href}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(child.href)}
                                >
                                  <Link href={child.href}>
                                    <child.icon />
                                    <span>{child.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item)}
                        tooltip={item.title}
                      >
                        <Link
                          href={item.href}
                          data-tour={item.tourId}
                          aria-current={isActive(item) ? "page" : undefined}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
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
                      {t.dashboard.common.industryLabels[profile.industry] ??
                        profile.industry}
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
                  <Link href="/dashboard/help">
                    <HelpCircle />
                    {d.nav.help}
                  </Link>
                </DropdownMenuItem>
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
