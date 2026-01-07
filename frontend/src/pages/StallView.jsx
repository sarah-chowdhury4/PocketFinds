import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { DashboardSidebar } from "../components/dashboard/sidebar"
import { useAuth } from "../lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Store, MapPin, Star, ThumbsUp, ThumbsDown, MessageSquare, UtensilsCrossed, Flag, X } from "lucide-react"
import axios from "axios"
import { bookmarkAPI } from "../api/api"

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export default function StallView() {
  const { stallId } = useParams()
  const { user } = useAuth()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stallData, setStallData] = useState(null)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewForm, setReviewForm] = useState({ review: "", ratings: 5 })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [bookmarkLoading, setBookmarkLoading] = useState(false)
  const [myVotes, setMyVotes] = useState({})
  const [showReportModal, setShowReportModal] = useState(null)
  const [reportReason, setReportReason] = useState("")
  const [reportSubmitting, setReportSubmitting] = useState(false)

  const isCustomer = user?.type === 'customer' || user?.role === 'customer'
  const isStallOwner = user?.type === 'stall owner' || user?.role === 'stall owner'

  const checkBookmarked = useCallback(async () => {
    try {
      const resp = await bookmarkAPI.getBookmarks()
      const list = resp.data?.bookmarks || resp.data?.stalls || resp.data || []
      const ids = Array.isArray(list)
        ? list.map((b) => (b.stall ? b.stall._id || b.stall : b._id || b))
        : []
      setIsBookmarked(ids.includes(stallId))
    } catch (e) {
      // ignore silently
    }
  }, [stallId])

  const fetchStallDetails = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/stall/${stallId}`)
      setStallData(response.data)
    } catch (error) {
      setError("Failed to load stall details")
      console.error('Failed to fetch stall:', error)
    } finally {
      setLoading(false)
    }
  }, [stallId])

  const fetchMyVotes = useCallback(async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token || !stallData?.reviews) return

      const reviewIds = stallData.reviews.map(r => r._id)
      const response = await axios.post(
        `${API_BASE_URL}/api/reviews/my-votes`,
        { reviewIds },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMyVotes(response.data.votes || {})
    } catch (err) {
      console.error('Failed to fetch vote status:', err)
    }
  }, [stallData?.reviews])

  useEffect(() => {
    fetchStallDetails()
    checkBookmarked()
  }, [stallId, fetchStallDetails, checkBookmarked])

  // Fetch user's vote status when reviews are loaded
  useEffect(() => {
    if (user && isCustomer && stallData?.reviews?.length > 0) {
      fetchMyVotes()
    }
  }, [user, isCustomer, stallData?.reviews, fetchMyVotes])

  const toggleBookmark = async () => {
    try {
      setBookmarkLoading(true)
      setError("")
      if (isBookmarked) {
        await bookmarkAPI.removeBookmark(stallId)
        setIsBookmarked(false)
      } else {
        await bookmarkAPI.addBookmark(stallId)
        setIsBookmarked(true)
      }
    } catch (e) {
      const message = e?.response?.data?.message || "Failed to update bookmark"
      setError(message)
    } finally {
      setBookmarkLoading(false)
    }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")
    setSuccess("")

    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `${API_BASE_URL}/api/reviews`,
        {
          stall_id: stallId,
          review: reviewForm.review,
          ratings: reviewForm.ratings
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      setSuccess("Review submitted successfully!")
      setReviewForm({ review: "", ratings: 5 })
      setShowReviewForm(false)
      
      // Refresh stall data to show new review
      fetchStallDetails()
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit review")
    } finally {
      setSubmitting(false)
    }
  }

  const handleVote = async (reviewId, voteType) => {
    if (!user) {
      setError("Please log in to vote on reviews")
      return
    }
    if (isStallOwner) {
      setError("Stall owners cannot vote on reviews")
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `${API_BASE_URL}/api/reviews/${reviewId}/${voteType}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      // Update local state with new vote counts
      setStallData(prev => ({
        ...prev,
        reviews: prev.reviews.map(r => 
          r._id === reviewId 
            ? { 
                ...r, 
                upvote_count: response.data.upvote_count ?? r.upvote_count,
                downvote_count: response.data.downvote_count ?? r.downvote_count
              }
            : r
        )
      }))


      // Update vote status based on action (toggle behavior)
      const action = response.data.action
      setMyVotes(prev => {
        const currentVote = prev[reviewId] || {}
        if (voteType === 'upvote') {
          return {
            ...prev,
            [reviewId]: {
              ...currentVote,
              upvoted: action === 'added',
              downvoted: false
            }
          }
        } else {
          return {
            ...prev,
            [reviewId]: {
              ...currentVote,
              upvoted: false,
              downvoted: action === 'added'
            }
          }
        }
      })
    } catch (err) {
      setError(err.response?.data?.error || `Failed to ${voteType}`)
    }
  }

  const handleReport = async (reviewId) => {
    if (!reportReason.trim()) {
      setError("Please provide a reason for reporting")
      return
    }

    setReportSubmitting(true)
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `${API_BASE_URL}/api/reviews/${reviewId}/report`,
        { reason: reportReason },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      setMyVotes(prev => ({
        ...prev,
        [reviewId]: { ...prev[reviewId], reported: true }
      }))
      setShowReportModal(null)
      setReportReason("")
      setSuccess("Review reported successfully")
    } catch (err) {
      setError(err.response?.data?.error || "Failed to report review")
    } finally {
      setReportSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading stall...</p>
        </div>
      </div>
    )
  }

  if (!stallData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              {error || "Stall not found"}
            </p>
            <Button 
              className="w-full mt-4" 
              variant="outline"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { stall, menuItems, reviews, avgRating, totalReviews } = stallData

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />

      <main className={sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-64"}>
        <div className="p-6 space-y-6 max-w-6xl">
          {error && !showReviewForm && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          {/* Stall Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                    <Store className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{stall.stall_name}</CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {stall.stall_location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {avgRating} ({totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                {isCustomer && (
                  <Button onClick={toggleBookmark} disabled={bookmarkLoading}>
                    {bookmarkLoading
                      ? 'Saving...'
                      : isBookmarked
                        ? 'Remove Bookmark'
                        : 'Save to Bookmarks'}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {stall.offer && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded mb-4">
                  <strong>Special Offer:</strong> {stall.offer}
                </div>
              )}
              {stall.discount && (
                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded">
                  <strong>Discount:</strong> {stall.discount}% off
                  {stall.discount_items && ` on ${stall.discount_items}`}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Menu Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UtensilsCrossed className="h-5 w-5" />
                Menu
              </CardTitle>
            </CardHeader>
            <CardContent>
              {menuItems && menuItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {menuItems.map((item) => (
                    <div key={item._id} className="border rounded-lg p-4">
                      <h3 className="font-semibold">{item.item_name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.item_description}</p>
                      <p className="text-lg font-bold text-primary mt-2">৳{item.item_price}</p>
                      {item.item_discount > 0 && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {item.item_discount}% off
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No menu items available</p>
              )}
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Reviews ({totalReviews})
                </CardTitle>
                {isCustomer && (
                  <Button onClick={() => setShowReviewForm(!showReviewForm)}>
                    {showReviewForm ? 'Cancel' : 'Write Review'}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Review Form */}
              {showReviewForm && isCustomer && (
                <form onSubmit={handleReviewSubmit} className="border rounded-lg p-4 space-y-4">
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
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, ratings: rating })}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              rating <= reviewForm.ratings
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Review</label>
                    <textarea
                      value={reviewForm.review}
                      onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                      className="w-full min-h-[100px] px-3 py-2 border rounded-lg resize-none"
                      placeholder="Share your experience..."
                      required
                    />
                  </div>

                  <Button type="submit" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </form>
              )}

              {/* Reviews List */}
              {reviews && reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => {
                    const voteStatus = myVotes[review._id] || {}
                    return (
                      <div key={review._id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">
                              {review.customer_id?.first_name} {review.customer_id?.last_name}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
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
                              <span className="text-xs text-muted-foreground">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm mb-3">{review.review}</p>

                        {/* Vote and Report Buttons */}
                        <div className="flex items-center gap-4">
                          {/* Always show vote counts */}
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            {user && isCustomer ? (
                              <button
                                onClick={() => handleVote(review._id, 'upvote')}
                                className={`flex items-center gap-1 transition-colors hover:text-green-600 ${
                                  voteStatus.upvoted 
                                    ? 'text-green-600' 
                                    : ''
                                }`}
                              >
                                <ThumbsUp className={`h-4 w-4 ${voteStatus.upvoted ? 'fill-current' : ''}`} />
                              </button>
                            ) : (
                              <ThumbsUp className="h-4 w-4" />
                            )}
                            <span>{review.upvote_count || 0}</span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            {user && isCustomer ? (
                              <button
                                onClick={() => handleVote(review._id, 'downvote')}
                                className={`flex items-center gap-1 transition-colors hover:text-red-600 ${
                                  voteStatus.downvoted 
                                    ? 'text-red-600' 
                                    : ''
                                }`}
                              >
                                <ThumbsDown className={`h-4 w-4 ${voteStatus.downvoted ? 'fill-current' : ''}`} />
                              </button>
                            ) : (
                              <ThumbsDown className="h-4 w-4" />
                            )}
                            <span>{review.downvote_count || 0}</span>
                          </div>

                          {/* Report button - only for logged in customers */}
                          {user && isCustomer && !voteStatus.reported && (
                            <button
                              onClick={() => setShowReportModal(review._id)}
                              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-orange-600 transition-colors ml-auto"
                            >
                              <Flag className="h-4 w-4" />
                              <span>Report</span>
                            </button>
                          )}
                          {voteStatus.reported && (
                            <span className="text-xs text-orange-600 ml-auto">Reported</span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No reviews yet. Be the first to review!
                </p>
              )}
            </CardContent>
          </Card>

          {/* Report Modal */}
          {showReportModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="w-full max-w-md mx-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Report Review</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => {
                      setShowReportModal(null)
                      setReportReason("")
                    }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Reason for reporting</label>
                    <textarea
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="w-full min-h-[100px] px-3 py-2 border rounded-lg resize-none mt-1"
                      placeholder="Please explain why you're reporting this review..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleReport(showReportModal)}
                      disabled={reportSubmitting}
                      variant="destructive"
                    >
                      {reportSubmitting ? 'Submitting...' : 'Submit Report'}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowReportModal(null)
                        setReportReason("")
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
