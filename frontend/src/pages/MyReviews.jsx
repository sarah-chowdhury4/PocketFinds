import { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { DashboardSidebar } from "../components/dashboard/sidebar"
import { useAuth } from "../lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Store, MapPin, Star, ThumbsUp, ThumbsDown, MessageSquare, ChevronRight, ChevronDown } from "lucide-react"
import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export default function MyReviews() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [expandedReview, setExpandedReview] = useState(null)

  const isCustomer = user?.type === 'customer' || user?.role === 'customer'

  useEffect(() => {
    if (isCustomer) {
      fetchMyReviews()
    }
  }, [isCustomer])

  const fetchMyReviews = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_BASE_URL}/api/reviews/my-reviews`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setReviews(response.data.reviews || [])
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load your reviews")
    } finally {
      setLoading(false)
    }
  }

  // Redirect non-customers
  if (!isCustomer) {
    return <Navigate to="/dashboard" replace />
  }

  // Group reviews by stall
  const reviewsByStall = reviews.reduce((acc, review) => {
    const stallId = review.stall_id?._id
    if (!stallId) return acc
    
    if (!acc[stallId]) {
      acc[stallId] = {
        stall: review.stall_id,
        reviews: []
      }
    }
    acc[stallId].reviews.push(review)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />

      <main className={sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-64"}>
        <div className="p-6 space-y-6 max-w-4xl">
          <div>
            <h1 className="text-3xl font-bold">My Reviews</h1>
            <p className="text-muted-foreground mt-2">
              View all the reviews you've left on stalls
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading your reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't left any reviews. Browse stalls and share your experience!
                  </p>
                  <Button onClick={() => navigate('/browse')}>
                    Browse Stalls
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {Object.values(reviewsByStall).map(({ stall, reviews: stallReviews }) => (
                <Card key={stall._id} className="overflow-hidden">
                  <CardHeader 
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setExpandedReview(
                      expandedReview === stall._id ? null : stall._id
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {stall.stall_image ? (
                          <img
                            src={`${API_BASE_URL}${stall.stall_image}`}
                            alt={stall.stall_name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <Store className="h-6 w-6 text-primary" />
                          </div>
                        )}
                        <div>
                          <CardTitle className="text-lg">{stall.stall_name}</CardTitle>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {stall.stall_location}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {stallReviews.length} review{stallReviews.length !== 1 ? 's' : ''}
                        </span>
                        {expandedReview === stall._id ? (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  {expandedReview === stall._id && (
                    <CardContent className="border-t bg-muted/20">
                      <div className="space-y-4 pt-4">
                        {stallReviews.map((review) => (
                          <div key={review._id} className="bg-background rounded-lg p-4 border">
                            {/* Rating and Date */}
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.ratings
                                          ? 'fill-yellow-400 text-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm font-medium">{review.ratings}/5</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {new Date(review.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>

                            {/* Review Text */}
                            <p className="text-sm mb-3">{review.review}</p>

                            {/* Vote Counts */}
                            <div className="flex items-center gap-4 pt-2 border-t">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <ThumbsUp className="h-4 w-4" />
                                <span>{review.upvote_count || 0} upvotes</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <ThumbsDown className="h-4 w-4" />
                                <span>{review.downvote_count || 0} downvotes</span>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* View Stall Button */}
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => navigate(`/stall/${stall._id}`)}
                        >
                          View Stall
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
