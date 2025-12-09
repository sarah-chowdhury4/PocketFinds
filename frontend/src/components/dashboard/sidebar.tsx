"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  Store,
  Users,
  MessageSquare,
  Flag,
  BarChart3,
  Settings,
  LogOut,
  UtensilsCrossed,
  Gift,
  Bell,
  ShieldAlert,
  ChevronLeft,
  TrendingUp,
  FileText,
  HelpCircle,
  CreditCard,
} from "lucide-react"

interface SidebarProps {
  collapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
}

const adminNavItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/stalls", icon: Store, label: "Stalls" },
  { href: "/admin/reviews", icon: MessageSquare, label: "Reviews" },
  { href: "/admin/flagged", icon: Flag, label: "Flagged Content" },
  { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/admin/reports", icon: FileText, label: "Reports" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
]

const stallOwnerNavItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/menu", icon: UtensilsCrossed, label: "Menu" },
  { href: "/dashboard/orders", icon: CreditCard, label: "Orders" },
  { href: "/dashboard/reviews", icon: MessageSquare, label: "Reviews" },
  { href: "/dashboard/promotions", icon: Gift, label: "Promotions" },
  { href: "/dashboard/analytics", icon: TrendingUp, label: "Analytics" },
  { href: "/dashboard/notifications", icon: Bell, label: "Notifications" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
]

export function DashboardSidebar({ collapsed = false, onCollapse }: SidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const isAdmin = user?.role === "admin"
  const navItems = isAdmin ? adminNavItems : stallOwnerNavItems

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-card transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64",
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className={cn("flex h-16 items-center border-b px-4", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed && (
            <Link href={isAdmin ? "/admin" : "/dashboard"} className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                {isAdmin ? (
                  <ShieldAlert className="h-5 w-5 text-primary-foreground" />
                ) : (
                  <Store className="h-5 w-5 text-primary-foreground" />
                )}
              </div>
              <div>
                <span className="font-semibold text-sm">PocketFinds</span>
                <span className="block text-[10px] text-muted-foreground">
                  {isAdmin ? "Admin Panel" : "Stall Dashboard"}
                </span>
              </div>
            </Link>
          )}
          {collapsed && (
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              {isAdmin ? (
                <ShieldAlert className="h-5 w-5 text-primary-foreground" />
              ) : (
                <Store className="h-5 w-5 text-primary-foreground" />
              )}
            </div>
          )}
          {onCollapse && !collapsed && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onCollapse(true)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    collapsed && "justify-center px-2",
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-primary-foreground")} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              )
            })}
          </nav>

          {/* Help Section */}
          {!collapsed && (
            <div className="mt-6 rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <HelpCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Need Help?</p>
                  <p className="text-xs text-muted-foreground">Check our guides</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                View Documentation
              </Button>
            </div>
          )}
        </ScrollArea>

        {/* User Section */}
        <div className={cn("border-t p-4", collapsed && "flex justify-center")}>
          {collapsed ? (
            <Button variant="ghost" size="icon" onClick={logout} title="Logout">
              <LogOut className="h-5 w-5" />
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
