"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { Home, Compass, MapPin, Heart, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const navItems = [
    { href: "/", icon: Home, label: "home" },
    { href: "/explore", icon: Compass, label: "explore" },
    { href: "/map", icon: MapPin, label: "map" },
    { href: "/favorites", icon: Heart, label: "favorites" },
    { href: "/profile", icon: User, label: "profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-full h-full transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{t(item.label)}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
