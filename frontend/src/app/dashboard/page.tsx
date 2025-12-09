"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ChartCard } from "@/components/dashboard/chart-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import {
  Star,
  MessageSquare,
  TrendingUp,
  Eye,
  Bell,
  Menu,
  MapPin,
  Gift,
  Users,
  ThumbsUp,
  ArrowRight,
  Sparkles,
  Edit,
  Plus,
  Calendar,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

// Mock data
const stallData = {
  name: "Tasty Bites",
  location: "TSC Area, University of Dhaka",
  rating: 4.8,
  reviewCount: 248,
  views: 12453,
  isOpen: true,
  todayOrders: 45,
  weeklyRevenue: "৳24,500",
  monthlyGrowth: "+18.5%",
}

const stats = [
  {
    title: "Total Views",
    value: "12,453",
    change: "+24%",
    changeType: "positive" as const,
    icon: Eye,
    description: "This month",
  },
  {
    title: "Total Reviews",
    value: "248",
    change: "+12%",
    changeType: "positive" as const,
    icon: MessageSquare,
    description: "All time",
  },
  {
    title: "Avg Rating",
    value: "4.8",
    change: "+0.2",
    changeType: "positive" as const,
    icon: Star,
    description: "Out of 5",
  },
  {
    title: "Repeat Customers",
    value: "68%",
    change: "+5%",
    changeType: "positive" as const,
    icon: Users,
    description: "This month",
  },
]

const viewsData = [
  { day: "Mon", views: 450 },
  { day: "Tue", views: 620 },
  { day: "Wed", views: 580 },
  { day: "Thu", views: 720 },
  { day: "Fri", views: 890 },
  { day: "Sat", views: 1200 },
  { day: "Sun", views: 980 },
]

const revenueData = [
  { week: "Week 1", revenue: 18500 },
  { week: "Week 2", revenue: 22000 },
  { week: "Week 3", revenue: 19800 },
  { week: "Week 4", revenue: 24500 },
]

const topItems = [
  { id: "1", name: "Chicken Biryani", orders: 156, revenue: "৳7,800", trend: "up" },
  { id: "2", name: "Masala Tea", orders: 234, revenue: "৳5,850", trend: "up" },
  { id: "3", name: "Singara (5 pcs)", orders: 189, revenue: "৳2,835", trend: "down" },
  { id: "4", name: "Cold Coffee", orders: 98, revenue: "৳4,900", trend: "up" },
]

const recentReviews = [
  {
    id: "1",
    user: "Rahim A.",
    avatar: "RA",
    rating: 5,
    text: "Best biryani in the campus! The taste is amazing and portion size is generous.",
    time: "2 hours ago",
    helpful: 12,
  },
  {
    id: "2",
    user: "Fatima K.",
    avatar: "FK",
    rating: 4,
    text: "Good food and quick service. Would recommend the masala tea!",
    time: "5 hours ago",
    helpful: 8,
  },
  {
    id: "3",
    user: "Karim H.",
    avatar: "KH",
    rating: 5,
    text: "Been coming here for 2 years. Never disappointed!",
    time: "1 day ago",
    helpful: 24,
  },
]

const upcomingTasks = [
  { id: "1", task: "Restock ingredients", due: "Today", priority: "high" },
  { id: "2", task: "Update menu prices", due: "Tomorrow", priority: "medium" },
  { id: "3", task: "Respond to reviews", due: "This week", priority: "low" },
]

export default function StallOwnerDashboard() {
  const { user } = useAuth()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isStoreOpen, setIsStoreOpen] = useState(stallData.isOpen)

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
      </div>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 border-b bg-card/80 backdrop-blur-lg">
        <div className="flex h-full items-center justify-between px-4">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-semibold">Stall Dashboard</span>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className={cn("transition-all duration-300 pt-16 lg:pt-0", sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-64")}>
        <div className="p-6 lg:p-8">
          {/* Stall Header Card */}
          <Card className="mb-8 overflow-hidden premium-card">
            <div className="relative h-32 bg-gradient-to-r from-primary to-accent">
              <div className="absolute inset-0 bg-[url('/food-pattern.png')] opacity-10" />
            </div>
            <CardContent className="relative -mt-16 pb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative">
                  <div className="h-32 w-32 rounded-2xl border-4 border-background bg-muted overflow-hidden shadow-xl">
                    <Image src="/food-stall-logo.jpg" alt={stallData.name} fill className="object-cover" />
                  </div>
                  <div
                    className={cn(
                      "absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-background",
                      isStoreOpen ? "bg-success" : "bg-muted-foreground",
                    )}
                  />
                </div>
                <div className="flex-1 pt-4 md:pt-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold">{stallData.name}</h1>
                      <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{stallData.location}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="font-semibold">{stallData.rating}</span>
                          <span className="text-muted-foreground text-sm">({stallData.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Eye className="h-4 w-4" />
                          <span>{stallData.views.toLocaleString()} views</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Store Status</p>
                          <p className={cn("font-semibold", isStoreOpen ? "text-success" : "text-muted-foreground")}>
                            {isStoreOpen ? "Open" : "Closed"}
                          </p>
                        </div>
                        <Switch checked={isStoreOpen} onCheckedChange={setIsStoreOpen} />
                      </div>
                      <Button asChild>
                        <Link href="/dashboard/settings">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Stall
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Add Menu Item", icon: Plus, href: "/dashboard/menu", color: "bg-primary" },
              { label: "Create Promotion", icon: Gift, href: "/dashboard/promotions", color: "bg-accent" },
              { label: "View Analytics", icon: TrendingUp, href: "/dashboard/analytics", color: "bg-info" },
              { label: "Manage Reviews", icon: MessageSquare, href: "/dashboard/reviews", color: "bg-success" },
            ].map((action) => (
              <Link key={action.label} href={action.href}>
                <Card className="premium-card hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl text-white transition-transform group-hover:scale-110",
                        action.color,
                      )}
                    >
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-sm">{action.label}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            <ChartCard
              title="Daily Views"
              description="Stall page visits this week"
              data={viewsData}
              dataKey="views"
              xAxisKey="day"
            />
            <ChartCard
              title="Weekly Revenue"
              description="Estimated revenue this month"
              data={revenueData}
              type="bar"
              dataKey="revenue"
              xAxisKey="week"
              color="hsl(var(--accent))"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Top Selling Items */}
            <Card className="lg:col-span-2 premium-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Top Selling Items
                  </CardTitle>
                  <CardDescription>Best performers this month</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/menu">View Menu</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted font-bold text-lg">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.orders} orders</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{item.revenue}</p>
                        <div
                          className={cn(
                            "flex items-center justify-end gap-1 text-xs",
                            item.trend === "up" ? "text-success" : "text-destructive",
                          )}
                        >
                          {item.trend === "up" ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingUp className="h-3 w-3 rotate-180" />
                          )}
                          <span>{item.trend === "up" ? "+12%" : "-5%"}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tasks & Reminders */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  Tasks & Reminders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg border">
                      <div
                        className={cn(
                          "h-2 w-2 rounded-full",
                          task.priority === "high" && "bg-destructive",
                          task.priority === "medium" && "bg-warning",
                          task.priority === "low" && "bg-muted-foreground",
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{task.task}</p>
                        <p className="text-xs text-muted-foreground">{task.due}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reviews */}
          <Card className="mt-8 premium-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Recent Reviews
                </CardTitle>
                <CardDescription>What customers are saying</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/reviews">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {recentReviews.map((review) => (
                  <Card key={review.id} className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {review.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{review.user}</p>
                          <p className="text-xs text-muted-foreground">{review.time}</p>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn("h-3 w-3", i < review.rating ? "fill-primary text-primary" : "text-muted")}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{review.text}</p>
                      <div className="flex items-center gap-4 mt-3 pt-3 border-t">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {review.helpful}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          Reply
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
