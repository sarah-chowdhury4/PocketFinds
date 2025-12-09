"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { Home, Compass, MapPin, Heart, Bookmark, User, Settings, TrendingUp, Grid3X3 } from "lucide-react"

interface SidebarProps {
  userType?: "customer" | "admin" | "stall owner"
}

export function Sidebar({ userType = "customer" }: SidebarProps) {
  const pathname = usePathname()
  const { t } = useLanguage()

  const customerNavItems = [
    { href: "/", icon: Home, label: "home" },
    { href: "/explore", icon: Compass, label: "explore" },
    { href: "/categories", icon: Grid3X3, label: "categories" },
    { href: "/trending", icon: TrendingUp, label: "trendingStalls" },
    { href: "/map", icon: MapPin, label: "map" },
    { href: "/favorites", icon: Heart, label: "favorites" },
    { href: "/bookmarks", icon: Bookmark, label: "myBookmarks" },
    { href: "/profile", icon: User, label: "profile" },
    { href: "/settings", icon: Settings, label: "settings" },
  ]

  const navItems = customerNavItems

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-sidebar h-[calc(100vh-4rem)] sticky top-16">
      <nav className="flex flex-col gap-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",
              )}
            >
              <item.icon className="h-5 w-5" />
              {t(item.label)}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
