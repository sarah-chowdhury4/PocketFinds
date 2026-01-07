import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { DashboardSidebar } from "../components/dashboard/sidebar"
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line
} from "recharts"
import { Eye, Star, MessageSquare, TrendingUp, ArrowUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { useAuth } from "../lib/auth-context"
import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export default function Analytics() {
  const { user } = useAuth()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [stalls, setStalls] = useState([])
  const [selectedStall, setSelectedStall] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stallData, setStallData] = useState(null)

  useEffect(() => {
    fetchStalls()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Only stall owners can access this page
  const isStallOwner = user?.role === 'stall owner' || user?.type === 'stall owner'
  if (!isStallOwner) {
    return <Navigate to="/dashboard" replace />
  }

  const fetchStalls = async () => {
    try {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }
      
      const res = await axios.get(`${API_BASE_URL}/api/dashboard/stall-owner`, { headers })
      const stalls = res.data.stalls || []
      setStalls(stalls)
      
      if (stalls.length > 0) {
        setSelectedStall(stalls[0])
        calculateAnalytics(stalls[0])
      }
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch stalls:', error)
      setLoading(false)
    }
  }

  const calculateAnalytics = async (stall) => {
    try {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }
      
      const res = await axios.get(`${API_BASE_URL}/api/stall/${stall._id}/analytics`, { headers })
      const data = res.data || {}
      
      setStallData({
        avgRating: data.avgRating || 0,
        totalReviews: data.totalReviews || 0,
        totalBookmarks: data.totalBookmarks || 0,
        bookmarksData: data.bookmarksData || [],
        ratingsData: data.ratingsData || []
      })
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
      // Set default data if fetch fails
      setStallData({
        avgRating: 0,
        totalReviews: 0,
        totalBookmarks: 0,
        bookmarksData: [],
        ratingsData: []
      })
    }
  }

  const handleStallChange = (stall) => {
    setSelectedStall(stall)
    calculateAnalytics(stall)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading analytics...</p>
      </div>
    )
  }

  if (!selectedStall || !stallData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">No stall data available</p>
      </div>
    )
  }

  const stats = [
    {
      title: "Total Bookmarks",
      value: stallData.totalBookmarks,
      change: "stable",
      icon: Eye,
      trend: "up"
    },
    {
      title: "Average Rating",
      value: stallData.avgRating,
      change: "stable",
      icon: Star,
      trend: "up"
    },
    {
      title: "Total Reviews",
      value: stallData.totalReviews,
      change: "stable",
      icon: MessageSquare,
      trend: "up"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />

      <main className={sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-64"}>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Stall Analytics</h1>
              <p className="text-muted-foreground">Track your stall's performance</p>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedStall?._id || ''}
                onChange={(e) => {
                  const stall = stalls.find(s => s._id === e.target.value)
                  if (stall) handleStallChange(stall)
                }}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                {stalls.map(stall => (
                  <option key={stall._id} value={stall._id}>
                    {stall.stall_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <ArrowUp className={`h-3 w-3 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`} />
                    <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                      {stat.change}
                    </span>
                    <span>from last period</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bookmarks Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Bookmarks</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={stallData.bookmarksData}>
                  <defs>
                    <linearGradient id="colorBookmarks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="bookmarks" 
                    stroke="#6366f1" 
                    fillOpacity={1} 
                    fill="url(#colorBookmarks)"
                    name="Total Bookmarks"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Ratings Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Average Rating Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={stallData.ratingsData}>
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="rating" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="Rating"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
