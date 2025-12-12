"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from "@/lib/language-context"
import { useTheme } from "next-themes"
import { useAuth } from "@/lib/auth-context"
import { authAPI } from "@/lib/api"
import { Bell, Globe, Moon, Sun, Shield, Trash2, Camera, User } from "lucide-react"
import { toast } from "sonner"

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const { user, updateProfile } = useAuth()
  const [notifications, setNotifications] = useState({
    discounts: true,
    reviews: true,
    trending: false,
    email: true,
  })
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar || null)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64String = reader.result as string
        setAvatarPreview(base64String)
        
        // Update avatar on server
        setIsUpdating(true)
        try {
          await authAPI.updateProfile({ avatar: base64String })
          updateProfile({ avatar: base64String })
          toast.success("Profile picture updated!")
        } catch (error: any) {
          toast.error(error.message || "Failed to update profile picture")
          setAvatarPreview(user?.avatar || null)
        } finally {
          setIsUpdating(false)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveAvatar = async () => {
    setIsUpdating(true)
    try {
      await authAPI.updateProfile({ avatar: null })
      updateProfile({ avatar: null })
      setAvatarPreview(null)
      toast.success("Profile picture removed")
    } catch (error: any) {
      toast.error(error.message || "Failed to remove profile picture")
    } finally {
      setIsUpdating(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 pb-20 md:pb-8">
          <div className="container px-4 py-6 max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">{t("settings")}</h1>

            {/* Profile Picture */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Picture
                </CardTitle>
                <CardDescription>Update your profile photo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={avatarPreview || "/diverse-avatars.png"} />
                    <AvatarFallback>
                      {user.first_name?.charAt(0) || ""}{user.last_name?.charAt(0) || ""}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <Input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                      disabled={isUpdating}
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById("avatar-upload")?.click()}
                      disabled={isUpdating}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      {isUpdating ? "Updating..." : "Change Photo"}
                    </Button>
                    {avatarPreview && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveAvatar}
                        disabled={isUpdating}
                      >
                        Remove Photo
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5" />
                  Appearance
                </CardTitle>
                <CardDescription>Customize how PocketFinds looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Theme</Label>
                    <p className="text-sm text-muted-foreground">Select your preferred theme</p>
                  </div>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4" />
                          Light
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="h-4 w-4" />
                          Dark
                        </div>
                      </SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Language */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Language
                </CardTitle>
                <CardDescription>Choose your preferred language</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Display Language</Label>
                    <p className="text-sm text-muted-foreground">Select English or Bangla</p>
                  </div>
                  <Select value={language} onValueChange={(value: "en" | "bn") => setLanguage(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="bn">বাংলা</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  {t("notifications")}
                </CardTitle>
                <CardDescription>Manage your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Discount Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified about discounts and offers</p>
                  </div>
                  <Switch
                    checked={notifications.discounts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, discounts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Review Updates</Label>
                    <p className="text-sm text-muted-foreground">Notifications about your reviews</p>
                  </div>
                  <Switch
                    checked={notifications.reviews}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, reviews: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Trending Stalls</Label>
                    <p className="text-sm text-muted-foreground">Get updates about trending stalls</p>
                  </div>
                  <Switch
                    checked={notifications.trending}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, trending: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email updates</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Download My Data
                </Button>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Trash2 className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
