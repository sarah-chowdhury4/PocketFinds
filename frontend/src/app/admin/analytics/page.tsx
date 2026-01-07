"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts"
import {
  Users,
  Store,
  MessageSquare,
  TrendingUp,
  Calendar,
  Download,
  ArrowUp,
  ArrowDown,
  Globe,
  Smartphone,
  Monitor,
} from "lucide-react"
import { cn } from "@/lib/utils"

const userGrowthData = [
  { month: "Jan", users: 4200, stalls: 32 },
  { month: "Feb", users: 5800, stalls: 38 },
  { month: "Mar", users: 7100, stalls: 42 },
  { month: "Apr", users: 8500, stalls: 48 },
  { month: "May", users: 9800, stalls: 52 },
  { month: "Jun", users: 11200, stalls: 58 },
  { month: "Jul", users: 12847, stalls: 64 },
]

const engagementData = [
  { day: "Mon", reviews: 120, views: 4500, searches: 890 },
  { day: "Tue", reviews: 180, views: 5200, searches: 1020 },
  { day: "Wed", reviews: 150, views: 4800, searches: 920 },
  { day: "Thu", reviews: 220, views: 6100, searches: 1180 },
  { day: "Fri", reviews: 280, views: 7200, searches: 1450 },
  { day: "Sat", reviews: 350, views: 9500, searches: 1820 },
  { day: "Sun", reviews: 310, views: 8800, searches: 1650 },
]

const categoryData = [
  { name: "Street Food", value: 35, color: "#ea580c" },
  { name: "Beverages", value: 25, color: "#14b8a6" },
  { name: "Snacks", value: 20, color: "#3b82f6" },
  { name: "Meals", value: 15, color: "#8b5cf6" },
  { name: "Desserts", value: 5, color: "#f59e0b" },
]

const topStallsData = [
  { name: "Tasty Bites", reviews: 248, rating: 4.8 },
  { name: "Mama's Kitchen", reviews: 186, rating: 4.7 },
  { name: "Chai Point", reviews: 165, rating: 4.6 },
  { name: "Biryani House", reviews: 142, rating: 4.5 },
  { name: "Sweet Corner", reviews: 128, rating: 4.4 },
]

const deviceData = [
  { name: "Mobile", value: 68, icon: Smartphone },
  { name: "Desktop", value: 28, icon: Monitor },
  { name: "Tablet", value: 4, icon: Monitor },
]

const kpiCards = [
  { title: "Total Users", value: "12,847", change: "+12.5%", trend: "up", icon: Users },
  { title: "Active Stalls", value: "248", change: "+8.2%", trend: "up", icon: Store },
  { title: "Total Reviews", value: "34,521", change: "+23.1%", trend: "up", icon: MessageSquare },
  { title: "Avg. Rating", value: "4.6", change: "+0.1", trend: "up", icon: TrendingUp },
]

export default function AdminAnalyticsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden lg:block">
        <DashboardSidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
      </div>

      <main className={cn("transition-all duration-300", sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-64")}>
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
              <p className="text-muted-foreground mt-1">Platform performance and insights</p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {kpiCards.map((kpi) => (
              <Card key={kpi.title} className="premium-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{kpi.title}</p>
                      <p className="text-3xl font-bold mt-1">{kpi.value}</p>
                      <div
                        className={cn(
                          "flex items-center gap-1 mt-2 text-sm",
                          kpi.trend === "up" ? "text-success" : "text-destructive",
                        )}
                      >
                        {kpi.trend === "up" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                        <span>{kpi.change}</span>
                        <span className="text-muted-foreground">vs last period</span>
                      </div>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <kpi.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Charts */}
          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            {/* User Growth */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>User & Stall Growth</CardTitle>
                <CardDescription>Monthly registration trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={userGrowthData}>
                    <defs>
                      <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="stallGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="users"
                      name="Users"
                      stroke="hsl(var(--primary))"
                      fill="url(#userGradient)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="stalls"
                      name="Stalls"
                      stroke="hsl(var(--accent))"
                      fill="url(#stallGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Engagement */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Weekly Engagement</CardTitle>
                <CardDescription>Reviews, views, and searches</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementData}>
                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="views"
                      name="Page Views"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="searches"
                      name="Searches"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="reviews"
                      name="Reviews"
                      stroke="hsl(var(--info))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Category Distribution */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Stall Categories</CardTitle>
                <CardDescription>Distribution by food type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {categoryData.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-sm text-muted-foreground">
                        {cat.name} ({cat.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Stalls */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Top Rated Stalls</CardTitle>
                <CardDescription>Highest performing stalls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topStallsData.map((stall, index) => (
                    <div key={stall.name} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{stall.name}</p>
                        <p className="text-xs text-muted-foreground">{stall.reviews} reviews</p>
                      </div>
                      <Badge variant="secondary">{stall.rating}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Stats */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Traffic by Device</CardTitle>
                <CardDescription>How users access PocketFinds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceData.map((device) => (
                    <div key={device.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <device.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{device.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{device.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${device.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-6 p-3 rounded-lg bg-muted/50">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Total Sessions</p>
                    <p className="text-xs text-muted-foreground">Last 7 days</p>
                  </div>
                  <span className="text-xl font-bold">48.2K</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
