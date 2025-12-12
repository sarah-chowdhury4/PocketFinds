"use client"

import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { Star, Trophy, MessageSquare, ThumbsUp, Settings, ChevronRight, Award } from "lucide-react"
import Link from "next/link"

const userBadges = [
  { id: "1", name: "Foodie", description: "Left 10+ reviews", icon: MessageSquare, earned: true },
  { id: "2", name: "Explorer", description: "Visited 20+ stalls", icon: Star, earned: true },
  { id: "3", name: "Trusted", description: "100+ trust points", icon: Trophy, earned: true },
  { id: "4", name: "Influencer", description: "50+ upvotes received", icon: ThumbsUp, earned: false },
  { id: "5", name: "Gourmet", description: "Reviewed 5+ categories", icon: Award, earned: false },
]

const recentActivity = [
  { type: "review", stall: "Tasty Bites", rating: 5, date: "2 days ago" },
  { type: "upvote", stall: "Mama's Kitchen", date: "3 days ago" },
  { type: "favorite", stall: "Chai Point", date: "1 week ago" },
]

export default function ProfilePage() {
  const { t } = useLanguage()
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const nextBadgeProgress = 65 // percentage to next badge

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 pb-20 md:pb-8">
          <div className="container px-4 py-6 max-w-4xl">
            {/* Profile Header */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar || "/avatar-profile.png"} />
                    <AvatarFallback className="text-2xl">
                      {user.first_name?.charAt(0) || ""}
                      {user.last_name?.charAt(0) || ""}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-2xl font-bold">
                      {user.first_name} {user.last_name}
                    </h1>
                    <p className="text-muted-foreground">{user.email}</p>

                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                        <Trophy className="h-3 w-3 mr-1" />
                        {user.trustPoints} {t("trustPoints")}
                      </Badge>
                      {user.badges?.map((badge, idx) => (
                        <Badge key={idx} variant="outline">{badge}</Badge>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" asChild>
                    <Link href="/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      {t("settings")}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <MessageSquare className="h-6 w-6 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">{t("reviews")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <ThumbsUp className="h-6 w-6 mx-auto text-accent mb-2" />
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Upvotes</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="h-6 w-6 mx-auto text-warning mb-2" />
                  <p className="text-2xl font-bold">{user.favorites?.length || 0}</p>
                  <p className="text-sm text-muted-foreground">Favorites</p>
                </CardContent>
              </Card>
            </div>

            {/* Badges */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Progress to next badge</span>
                    <span className="font-medium">{nextBadgeProgress}%</span>
                  </div>
                  <Progress value={nextBadgeProgress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {userBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`flex flex-col items-center p-3 rounded-lg border text-center transition-colors ${
                        badge.earned ? "bg-primary/5 border-primary/20" : "bg-muted/50 opacity-50"
                      }`}
                    >
                      <badge.icon
                        className={`h-8 w-8 mb-2 ${badge.earned ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <span className="text-sm font-medium">{badge.name}</span>
                      <span className="text-xs text-muted-foreground">{badge.description}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            activity.type === "review"
                              ? "bg-primary/10 text-primary"
                              : activity.type === "upvote"
                                ? "bg-accent/10 text-accent"
                                : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {activity.type === "review" && <MessageSquare className="h-4 w-4" />}
                          {activity.type === "upvote" && <ThumbsUp className="h-4 w-4" />}
                          {activity.type === "favorite" && <Star className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {activity.type === "review" && `Reviewed ${activity.stall}`}
                            {activity.type === "upvote" && `Upvoted a review at ${activity.stall}`}
                            {activity.type === "favorite" && `Added ${activity.stall} to favorites`}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
