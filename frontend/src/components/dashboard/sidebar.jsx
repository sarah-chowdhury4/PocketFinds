import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"
import { useAuth } from "../../lib/auth-context"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { Avatar, AvatarFallback } from "../ui/avatar"
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
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  FileText,
  User,
  Home,
} from "lucide-react"

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
  { href: "/", icon: Home, label: "Home" },
  { href: "/dashboard", icon: LayoutDashboard, label: "My Stalls" },
  { href: "/dashboard/analytics", icon: TrendingUp, label: "Analytics" },
  { href: "/dashboard/menu", icon: UtensilsCrossed, label: "Menu Items" },
  { href: "/dashboard/reviews", icon: MessageSquare, label: "Reviews" },
  { href: "/profile", icon: User, label: "Profile" },
]

const customerNavItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/browse", icon: Store, label: "Browse Stalls" },
  { href: "/my-reviews", icon: MessageSquare, label: "My Reviews" },
  { href: "/profile", icon: User, label: "Profile" },
]

export function DashboardSidebar({ collapsed = false, onCollapse }) {
  const location = useLocation()
  const pathname = location.pathname
  const { user, logout } = useAuth()

  const isAdmin = user?.role === "admin"
  const isStallOwner = user?.role === "stall owner" || user?.type === "stall owner"
  const navItems = isAdmin ? adminNavItems : isStallOwner ? stallOwnerNavItems : customerNavItems

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-card transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className={cn("flex h-16 items-center border-b px-4", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed && (
            <Link to={isAdmin ? "/admin" : "/dashboard"} className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                {isAdmin ? (
                  <ShieldAlert className="h-5 w-5 text-primary-foreground" />
                ) : (
                  <Store className="h-5 w-5 text-primary-foreground" />
                )}
              </div>
              <div>
                <span className="font-semibold text-sm">PocketFinds</span>
                {isAdmin && (
                  <span className="block text-[10px] text-muted-foreground">Admin Panel</span>
                )}
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

          {onCollapse && collapsed && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 absolute right-[-16px] top-4 bg-card border rounded-full shadow-md" 
              onClick={() => onCollapse(false)}
            >
              <ChevronRight className="h-4 w-4" />
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
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    collapsed && "justify-center px-2"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className={cn("h-5 w-5", isActive && "text-primary-foreground")} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              )
            })}
          </nav>


        </ScrollArea>

        {/* User */}
        <div className={cn("border-t p-4", collapsed && "flex justify-center")}>
          {collapsed ? (
            <Button variant="ghost" size="icon" onClick={logout}>
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
              <div className="flex-1">
                <p className="text-sm font-medium truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
