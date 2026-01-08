import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { DashboardSidebar } from "../components/dashboard/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Store, MapPin, Star, RefreshCw } from "lucide-react"
import { bookmarkAPI } from "../api/api"

export default function Bookmarks() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [bookmarks, setBookmarks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchBookmarks()
  }, [])

  const fetchBookmarks = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await bookmarkAPI.getBookmarks()
      // Backend returns { bookmarks: [ids], stalls: [stall objects with details] }
      const list = response.data?.stalls || response.data?.bookmarks || response.data || []
      setBookmarks(list)
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load bookmarks")
    } finally {
      setLoading(false)
    }
  }

  const filtered = bookmarks.filter((entry) => {
    const stall = entry.stall || entry
    const name = stall?.stall_name || ""
    const location = stall?.stall_location || ""
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading bookmarks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />

      <main className={sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-64"}>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-3xl font-bold">My Bookmarks</h1>
              <p className="text-muted-foreground">Saved stalls you want to revisit</p>
            </div>
            <Button variant="outline" size="sm" onClick={fetchBookmarks}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="py-4 text-red-700">{error}</CardContent>
            </Card>
          )}

          <div className="relative max-w-md">
            <Input
              type="text"
              placeholder="Search bookmarks by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-3"
            />
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((entry) => {
                const stall = entry.stall || entry
                return (
                  <Link key={stall._id} to={`/stall/${stall._id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                            <Store className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg truncate">{stall.stall_name}</CardTitle>
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{stall.stall_location}</span>
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {stall.offer && (
                          <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded text-sm">
                            <strong>Offer:</strong> {stall.offer}
                          </div>
                        )}
                        {stall.discount && (
                          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1.5 rounded text-sm">
                            <strong>Discount:</strong> {stall.discount}% off
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm text-muted-foreground">By {stall.owner_id?.first_name} {stall.owner_id?.last_name}</span>
                          {stall.avgRating !== undefined && (
                            <span className="flex items-center gap-1 text-sm">
                              <Star className="h-4 w-4 text-amber-500" />
                              {Number(stall.avgRating).toFixed(1)}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No bookmarked stalls yet.
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
