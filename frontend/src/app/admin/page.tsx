"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ChartCard } from "@/components/dashboard/chart-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Users,
  Store,
  MessageSquare,
  Flag,
  Search,
  MoreHorizontal,
  Eye,
  Ban,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Bell,
  Menu,
  Activity,
  ShieldCheck,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data
const stats = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Users,
    description: "vs last month",
  },
  {
    title: "Active Stalls",
    value: "248",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: Store,
    description: "vs last month",
  },
  {
    title: "Total Reviews",
    value: "34,521",
    change: "+23.1%",
    changeType: "positive" as const,
    icon: MessageSquare,
    description: "vs last month",
  },
  {
    title: "Flagged Content",
    value: "23",
    change: "-5.4%",
    changeType: "negative" as const,
    icon: Flag,
    description: "vs last month",
  },
]

const userGrowthData = [
  { month: "Jan", users: 4000 },
  { month: "Feb", users: 5200 },
  { month: "Mar", users: 6100 },
  { month: "Apr", users: 7800 },
  { month: "May", users: 9200 },
  { month: "Jun", users: 10500 },
  { month: "Jul", users: 12847 },
]

const reviewsData = [
  { day: "Mon", reviews: 120 },
  { day: "Tue", reviews: 180 },
  { day: "Wed", reviews: 150 },
  { day: "Thu", reviews: 220 },
  { day: "Fri", reviews: 280 },
  { day: "Sat", reviews: 350 },
  { day: "Sun", reviews: 310 },
]

const recentUsers = [
  {
    id: "1",
    name: "Rahim Ahmed",
    email: "rahim@example.com",
    role: "student",
    status: "active",
    joined: "2 hours ago",
    avatar: "RA",
  },
  {
    id: "2",
    name: "Fatima Khan",
    email: "fatima@example.com",
    role: "stall_owner",
    status: "active",
    joined: "5 hours ago",
    avatar: "FK",
  },
  {
    id: "3",
    name: "Karim Hassan",
    email: "karim@example.com",
    role: "student",
    status: "suspended",
    joined: "1 day ago",
    avatar: "KH",
  },
  {
    id: "4",
    name: "Ayesha Begum",
    email: "ayesha@example.com",
    role: "student",
    status: "active",
    joined: "2 days ago",
    avatar: "AB",
  },
  {
    id: "5",
    name: "Nasir Rahman",
    email: "nasir@example.com",
    role: "stall_owner",
    status: "pending",
    joined: "3 days ago",
    avatar: "NR",
  },
]

const pendingStalls = [
  { id: "1", name: "Mama's Kitchen", owner: "Nasir Rahman", location: "TSC Area", submitted: "2 hours ago" },
  { id: "2", name: "Chai Corner", owner: "Salma Khatun", location: "Arts Building", submitted: "5 hours ago" },
  { id: "3", name: "Biryani House", owner: "Abdul Karim", location: "Science Complex", submitted: "1 day ago" },
]

const flaggedContent = [
  {
    id: "1",
    type: "review",
    user: "Anonymous",
    content: "This place is terrible...",
    reason: "Hate speech",
    severity: "high",
  },
  { id: "2", type: "review", user: "User123", content: "They should be...", reason: "Violence", severity: "critical" },
  { id: "3", type: "comment", user: "FoodLover", content: "Never eat here...", reason: "Spam", severity: "medium" },
]

const recentActivity = [
  { id: "1", action: "New user registered", user: "Rahim Ahmed", time: "2 minutes ago", icon: Users },
  {
    id: "2",
    action: "Stall approved",
    user: "Admin",
    target: "Tasty Bites",
    time: "15 minutes ago",
    icon: CheckCircle,
  },
  { id: "3", action: "Review flagged", user: "System", target: "AI Detection", time: "1 hour ago", icon: Flag },
  { id: "4", action: "User suspended", user: "Admin", target: "Karim Hassan", time: "2 hours ago", icon: Ban },
]

export default function AdminDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
          <span className="font-semibold">Admin Dashboard</span>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className={cn("transition-all duration-300 pt-16 lg:pt-0", sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-64")}>
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with PocketFinds.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-9 w-64 bg-muted/50" />
              </div>
              <Button variant="outline" size="icon" className="relative bg-transparent">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>
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
              title="User Growth"
              description="Monthly user registrations"
              data={userGrowthData}
              dataKey="users"
              xAxisKey="month"
            />
            <ChartCard
              title="Reviews This Week"
              description="Daily review submissions"
              data={reviewsData}
              type="bar"
              dataKey="reviews"
              xAxisKey="day"
              color="hsl(var(--accent))"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Recent Users */}
            <Card className="lg:col-span-2 premium-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Users</CardTitle>
                  <CardDescription>Latest user registrations</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/users">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[320px]">
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
                              {user.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={user.role === "stall_owner" ? "default" : "secondary"} className="text-xs">
                            {user.role === "stall_owner" ? "Stall Owner" : "Student"}
                          </Badge>
                          <Badge
                            variant={
                              user.status === "active"
                                ? "default"
                                : user.status === "suspended"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className={cn("text-xs", user.status === "active" && "bg-success text-success-foreground")}
                          >
                            {user.status}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Ban className="h-4 w-4 mr-2" />
                                {user.status === "suspended" ? "Unsuspend" : "Suspend"}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[320px]">
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted flex-shrink-0">
                          <activity.icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">
                            <span className="font-medium">{activity.action}</span>
                            {activity.target && <span className="text-muted-foreground"> - {activity.target}</span>}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Clock className="h-3 w-3" />
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid gap-6 lg:grid-cols-2 mt-8">
            {/* Pending Approvals */}
            <Card className="premium-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-warning" />
                    Pending Approvals
                  </CardTitle>
                  <CardDescription>{pendingStalls.length} stalls awaiting approval</CardDescription>
                </div>
                <Button size="sm">Review All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingStalls.map((stall) => (
                    <div key={stall.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                          <Store className="h-5 w-5 text-warning" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{stall.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {stall.owner} • {stall.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 bg-transparent">
                          <Eye className="h-3 w-3 mr-1" />
                          Review
                        </Button>
                        <Button size="sm" className="h-8 bg-success hover:bg-success/90">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Flagged Content */}
            <Card className="premium-card border-destructive/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Flagged Content
                  </CardTitle>
                  <CardDescription>Requires immediate attention</CardDescription>
                </div>
                <Button variant="destructive" size="sm" asChild>
                  <Link href="/admin/flagged">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {flaggedContent.map((item) => (
                    <div key={item.id} className="p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {item.type}
                            </Badge>
                            <Badge
                              variant="destructive"
                              className={cn(
                                "text-xs",
                                item.severity === "critical" && "bg-red-600",
                                item.severity === "high" && "bg-orange-600",
                                item.severity === "medium" && "bg-yellow-600",
                              )}
                            >
                              {item.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">"{item.content}"</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            By {item.user} • Reason: {item.reason}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
