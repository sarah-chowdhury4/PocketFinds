import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { DashboardSidebar } from "../components/dashboard/sidebar"
import { useAuth } from "../lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Search, Bookmark, Star } from "lucide-react"
import axios from "axios"
import StallOwnerDashboard from "./StallOwnerDashboard"
import AdminDashboard from "./AdminDashboard"

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const isStallOwner = user?.role === 'stall owner' || user?.type === 'stall owner'
  const isAdmin = user?.role === 'admin' || user?.type === 'admin'

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${API_BASE_URL}/api/dashboard/customer`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setDashboardData(response.data)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user && !isStallOwner && !isAdmin) {
      fetchDashboardData()
    } else if (isStallOwner || isAdmin) {
      setLoading(false)
    }
  }, [user, isStallOwner, isAdmin])

  // Route admin to AdminDashboard
  if (isAdmin) {
    return <AdminDashboard />
  }

  // Route stall owner to StallOwnerDashboard
  if (isStallOwner) {
    return <StallOwnerDashboard />
  }

  const customerActions = [
    {
      title: "Browse Stalls",
      description: "Find food stalls around you",
      icon: Search,
      href: "/browse",
      color: "bg-blue-500"
    },
    {
      title: "My Bookmarks",
      description: "View your saved stalls",
      icon: Bookmark,
      href: "/bookmarks",
      color: "bg-green-500"
    },
    {
      title: "Top Rated",
      description: "Explore highest rated stalls",
      icon: Star,
      href: "/top-rated",
      color: "bg-orange-500"
    }
  ]

  const quickActions = customerActions

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />

      <main className={sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-64"}>
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {user?.first_name || user?.email?.split('@')[0] || 'User'}!
            </h1>
            <p className="text-muted-foreground">
              Discover amazing food stalls around you
            </p>
          </div>

          {/* Quick Stats - Customer Dashboard */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Bookmarked Stalls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.stats?.bookmarkedStalls || 0}</div>
                <p className="text-xs text-muted-foreground">Your saved favorites</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Recent Visits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.stats?.recentVisits || 0}</div>
                <p className="text-xs text-muted-foreground">Reviewed recently</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Stalls Available
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.stats?.stallsNearby || 0}</div>
                <p className="text-xs text-muted-foreground">Total stalls</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Reviews Given
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.stats?.reviewsGiven || 0}</div>
                <p className="text-xs text-muted-foreground">Help others decide</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <Link key={action.title} to={action.href}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {dashboardData?.recentActivity?.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-2 h-2 ${
                        index === 0 ? 'bg-blue-500' : 
                        index === 1 ? 'bg-green-500' : 
                        'bg-purple-500'
                      } rounded-full mr-3`}></div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No recent activity</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
