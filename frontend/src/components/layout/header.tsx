"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Sun,
  Moon,
  Bell,
  Menu,
  Globe,
  User,
  Heart,
  Bookmark,
  Settings,
  LogOut,
  Store,
  LayoutDashboard,
  Shield,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  const getDashboardLink = () => {
    if (!user) return null
    if (user.role === "admin") return "/admin"
    if (user.role === "stall_owner") return "/dashboard"
    return null
  }

  const dashboardLink = getDashboardLink()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Store className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden font-bold text-xl sm:inline-block">PocketFinds</span>
        </Link>

        {/* Search - Desktop */}
        <div className="hidden flex-1 max-w-md md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {dashboardLink && (
            <Button variant="outline" size="sm" asChild className="hidden sm:flex gap-2 bg-transparent">
              <Link href={dashboardLink}>
                {user?.role === "admin" ? <Shield className="h-4 w-4" /> : <LayoutDashboard className="h-4 w-4" />}
                {user?.role === "admin" ? "Admin Panel" : "Dashboard"}
              </Link>
            </Button>
          )}

          {/* Language Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                <span className={language === "en" ? "font-bold" : ""}>English</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("bn")}>
                <span className={language === "bn" ? "font-bold" : ""}>বাংলা</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Notifications */}
          {user && (
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                3
              </span>
            </Button>
          )}

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/diverse-avatars.png" alt={user.firstName} />
                    <AvatarFallback>
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/diverse-avatars.png" alt={user.firstName} />
                    <AvatarFallback>
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {user.firstName} {user.lastName}
                    </span>
                    <Badge variant="secondary" className="w-fit text-xs capitalize">
                      {user.role.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
                <DropdownMenuSeparator />

                {dashboardLink && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href={dashboardLink}>
                        {user.role === "admin" ? (
                          <Shield className="mr-2 h-4 w-4" />
                        ) : (
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                        )}
                        {user.role === "admin" ? "Admin Dashboard" : "My Dashboard"}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}

                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    {t("profile")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/favorites">
                    <Heart className="mr-2 h-4 w-4" />
                    {t("myFavorites")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bookmarks">
                    <Bookmark className="mr-2 h-4 w-4" />
                    {t("myBookmarks")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    {t("settings")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">{t("signIn")}</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">{t("signUp")}</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <nav className="flex flex-col gap-4 mt-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder={t("searchPlaceholder")} className="pl-9" />
                </div>
                <Link href="/" className="flex items-center gap-2 py-2 text-lg font-medium">
                  {t("home")}
                </Link>
                <Link href="/explore" className="flex items-center gap-2 py-2 text-lg font-medium">
                  {t("explore")}
                </Link>
                <Link href="/map" className="flex items-center gap-2 py-2 text-lg font-medium">
                  {t("map")}
                </Link>

                {dashboardLink && (
                  <Link href={dashboardLink} className="flex items-center gap-2 py-2 text-lg font-medium text-primary">
                    {user?.role === "admin" ? <Shield className="h-5 w-5" /> : <LayoutDashboard className="h-5 w-5" />}
                    {user?.role === "admin" ? "Admin Dashboard" : "My Dashboard"}
                  </Link>
                )}

                {!user && (
                  <>
                    <Button asChild className="mt-4">
                      <Link href="/login">{t("signIn")}</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/signup">{t("signUp")}</Link>
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
