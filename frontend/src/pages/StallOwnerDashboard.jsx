import { useState, useEffect } from "react"
import { DashboardSidebar } from "../components/dashboard/sidebar"
import { useAuth } from "../lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Store, Plus, Edit, Trash2, UtensilsCrossed, Eye, Star, MessageSquare, Bookmark, Upload, X, AlertTriangle } from "lucide-react"
import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export default function StallOwnerDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [stallsLoading, setStallsLoading] = useState(false)
  const [dashboardData, setDashboardData] = useState(null)
  const [myStalls, setMyStalls] = useState([])
  const [showStallForm, setShowStallForm] = useState(false)
  const [editingStall, setEditingStall] = useState(null)
  const [stallForm, setStallForm] = useState({
    stall_name: "",
    stall_location: "",
    discount: "",
    discount_items: "",
    offer: ""
  })
  const [stallImage, setStallImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isVerified, setIsVerified] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fetchDashboardData()
    fetchMyStalls()
    checkVerificationStatus()
  }, [])

  const checkVerificationStatus = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      // The profile endpoint returns { user: { verified_status, ... } }
      setIsVerified(response.data.user?.verified_status === true)
    } catch (error) {
      console.error('Failed to check verification status:', error)
    }
  }

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_BASE_URL}/api/dashboard/stall-owner`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setDashboardData(response.data)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMyStalls = async () => {
    try {
      setStallsLoading(true)
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_BASE_URL}/api/stall/my-stalls`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMyStalls(response.data.stalls || [])
    } catch (error) {
      console.error('Failed to fetch stalls:', error)
    } finally {
      setStallsLoading(false)
    }
  }

  const handleStallSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Check if verified before allowing stall creation
    if (!editingStall && !isVerified) {
      setError("Your account must be verified before you can create a stall. Please wait for admin approval.")
      return
    }

    try {
      const token = localStorage.getItem('token')
      
      // Use FormData to handle file upload
      const formData = new FormData()
      formData.append('stall_name', stallForm.stall_name)
      formData.append('stall_location', stallForm.stall_location)
      if (stallForm.discount) formData.append('discount', stallForm.discount)
      if (stallForm.discount_items) formData.append('discount_items', stallForm.discount_items)
      if (stallForm.offer) formData.append('offer', stallForm.offer)
      if (stallImage) {
        formData.append('stall_image', stallImage)
      }
      
      if (editingStall) {
        // Update existing stall
        await axios.put(
          `${API_BASE_URL}/api/stall/${editingStall._id}`,
          formData,
          { 
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            } 
          }
        )
        setSuccess("Stall updated successfully!")
      } else {
        // Create new stall
        await axios.post(
          `${API_BASE_URL}/api/stall/create`,
          formData,
          { 
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            } 
          }
        )
        setSuccess("Stall created successfully!")
      }

      setStallForm({ stall_name: "", stall_location: "", discount: "", discount_items: "", offer: "" })
      setStallImage(null)
      setImagePreview(null)
      setShowStallForm(false)
      setEditingStall(null)
      fetchMyStalls()
      fetchDashboardData()
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || "Failed to save stall")
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB")
        return
      }
      setStallImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const removeImage = () => {
    setStallImage(null)
    setImagePreview(null)
  }

  const handleEdit = (stall) => {
    setEditingStall(stall)
    setStallForm({
      stall_name: stall.stall_name || "",
      stall_location: stall.stall_location || "",
      discount: stall.discount || "",
      discount_items: stall.discount_items || "",
      offer: stall.offer || ""
    })
    // Show existing image if available
    if (stall.stall_image) {
      setImagePreview(`${API_BASE_URL}${stall.stall_image}`)
    } else {
      setImagePreview(null)
    }
    setStallImage(null)
    setShowStallForm(true)
    setError("")
    setSuccess("")
  }

  const handleDelete = async (stallId) => {
    if (!window.confirm("Are you sure you want to delete this stall?")) return

    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${API_BASE_URL}/api/stall/${stallId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSuccess("Stall deleted successfully!")
      fetchMyStalls()
      fetchDashboardData()
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete stall")
    }
  }

  const handleCancel = () => {
    setShowStallForm(false)
    setEditingStall(null)
    setStallForm({ stall_name: "", stall_location: "", discount: "", discount_items: "", offer: "" })
    setStallImage(null)
    setImagePreview(null)
    setError("")
    setSuccess("")
  }

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

  const stats = dashboardData?.stats || {}

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />

      <main className={sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-64"}>
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Stall Owner Dashboard</h1>
            <p className="text-muted-foreground">Manage your stalls and menu items</p>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reviews Received</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalReviews || 0}</div>
                <p className="text-xs text-muted-foreground">Across all stalls</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.avgRating || "0"}</div>
                <p className="text-xs text-muted-foreground">From {stats.totalReviews || 0} reviews</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bookmarks</CardTitle>
                <Bookmark className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalBookmarks || 0}</div>
                <p className="text-xs text-muted-foreground">Total favorites</p>
              </CardContent>
            </Card>
          </div>

          {/* Success/Error Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          {/* My Stalls Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5" />
                  My Stalls ({myStalls.length})
                </CardTitle>
                <Button onClick={() => { setShowStallForm(true); setEditingStall(null); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Stall
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Verification Warning */}
              {!isVerified && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Account Not Verified</p>
                    <p className="text-sm">Your account is pending verification. You cannot create new stalls until an admin approves your account.</p>
                  </div>
                </div>
              )}

              {/* Stall Form */}
              {showStallForm && (
                <form onSubmit={handleStallSubmit} className="border rounded-lg p-4 space-y-4 bg-muted/30">
                  <h3 className="font-semibold">{editingStall ? 'Edit Stall' : 'Create New Stall'}</h3>
                  
                  {/* Show verification warning in form for new stalls */}
                  {!editingStall && !isVerified && (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded text-sm">
                      <strong>Note:</strong> You must be verified to create a stall.
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Stall Name *</label>
                      <Input
                        value={stallForm.stall_name}
                        onChange={(e) => setStallForm({ ...stallForm, stall_name: e.target.value })}
                        placeholder="Enter stall name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location *</label>
                      <Input
                        value={stallForm.stall_location}
                        onChange={(e) => setStallForm({ ...stallForm, stall_location: e.target.value })}
                        placeholder="Enter location"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Discount (%)</label>
                      <Input
                        type="number"
                        value={stallForm.discount}
                        onChange={(e) => setStallForm({ ...stallForm, discount: e.target.value })}
                        placeholder="e.g., 10"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Discount Items</label>
                      <Input
                        value={stallForm.discount_items}
                        onChange={(e) => setStallForm({ ...stallForm, discount_items: e.target.value })}
                        placeholder="e.g., Selected items"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Special Offer</label>
                    <Input
                      value={stallForm.offer}
                      onChange={(e) => setStallForm({ ...stallForm, offer: e.target.value })}
                      placeholder="e.g., Buy 1 Get 1 Free"
                    />
                  </div>

                  {/* Image Upload Section */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Stall Picture (Optional)</label>
                    <div className="flex items-start gap-4">
                      {imagePreview ? (
                        <div className="relative">
                          <img 
                            src={imagePreview} 
                            alt="Stall preview" 
                            className="w-32 h-32 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary hover:bg-muted/50 transition-colors">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-xs text-muted-foreground text-center">Click to upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      )}
                      <div className="text-xs text-muted-foreground">
                        <p>Accepted formats: JPG, PNG, GIF, WebP</p>
                        <p>Max size: 5MB</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" disabled={!editingStall && !isVerified}>
                      {editingStall ? 'Update Stall' : 'Create Stall'}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </form>
              )}

              {/* Stalls List */}
              {stallsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
              ) : myStalls.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myStalls.map((stall) => (
                    <div key={stall._id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{stall.stall_name}</h3>
                          <p className="text-sm text-muted-foreground">{stall.stall_location}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(stall)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(stall._id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>

                      {stall.offer && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded text-sm mb-2">
                          <strong>Offer:</strong> {stall.offer}
                        </div>
                      )}

                      {stall.discount && (
                        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1.5 rounded text-sm">
                          <strong>Discount:</strong> {stall.discount}%
                          {stall.discount_items && ` on ${stall.discount_items}`}
                        </div>
                      )}

                      <div className="mt-3 pt-3 border-t flex justify-between text-xs text-muted-foreground">
                        <span>Created: {new Date(stall.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No stalls yet. Create your first stall to get started!
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          {dashboardData?.recentActivity && dashboardData.recentActivity.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Recent Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.recentActivity.slice(0, 5).map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
