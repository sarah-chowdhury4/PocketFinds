import { useState, useEffect, useCallback, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Star, MapPin, Store, ChevronRight, Search, ArrowLeft, Loader2 } from "lucide-react"
import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export default function Discover() {
  const [stalls, setStalls] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [stallRatings, setStallRatings] = useState({})
  const navigate = useNavigate()
  const observerRef = useRef(null)
  const loadingRef = useRef(null)

  // Fetch stalls with pagination
  const fetchStalls = useCallback(async (pageNum, reset = false) => {
    if (pageNum === 1) {
      setLoading(true)
    } else {
      setLoadingMore(true)
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/stall?page=${pageNum}&limit=12`)
      const newStalls = response.data.stalls || []
      const pagination = response.data.pagination

      if (reset) {
        setStalls(newStalls)
      } else {
        setStalls(prev => [...prev, ...newStalls])
      }
      
      setHasMore(pagination?.hasMore || false)
      setError("")
    } catch (err) {
      setError("Failed to load stalls")
      console.error('Failed to fetch stalls:', err)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    fetchStalls(1, true)
  }, [fetchStalls])

  // Infinite scroll observer
  useEffect(() => {
    if (loading || loadingMore || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          setPage(prev => prev + 1)
        }
      },
      { threshold: 0.1 }
    )

    if (loadingRef.current) {
      observer.observe(loadingRef.current)
    }

    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [loading, loadingMore, hasMore])

  // Load more when page changes
  useEffect(() => {
    if (page > 1) {
      fetchStalls(page, false)
    }
  }, [page, fetchStalls])

  // Fetch ratings for visible stalls
  useEffect(() => {
    const fetchRatings = async () => {
      const newRatings = { ...stallRatings }
      const stallsToFetch = stalls.filter(s => !stallRatings[s._id])

      for (const stall of stallsToFetch) {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/stall/${stall._id}`)
          newRatings[stall._id] = {
            avgRating: response.data.avgRating || 0,
            totalReviews: response.data.totalReviews || 0
          }
        } catch (err) {
          newRatings[stall._id] = { avgRating: 0, totalReviews: 0 }
        }
      }

      if (stallsToFetch.length > 0) {
        setStallRatings(newRatings)
      }
    }

    if (stalls.length > 0) {
      fetchRatings()
    }
  }, [stalls])

  // Filter stalls by search query
  const filteredStalls = stalls.filter(stall =>
    stall.stall_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stall.stall_location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Back & Logo */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Link 
                to="/" 
                className="flex items-center gap-2 text-xl font-bold text-primary hover:opacity-80 transition-opacity"
              >
                <Store className="h-6 w-6" />
                <span>PocketFinds</span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search stalls..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className="font-medium"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
                className="font-medium"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search */}
      <div className="md:hidden p-4 bg-white border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search stalls..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Discover Stalls</h1>
        <p className="text-muted-foreground">
          Browse all food stalls and find your next favorite spot
        </p>
      </div>

      {/* Stalls Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
              <p className="mt-4 text-muted-foreground">Loading stalls...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => { setPage(1); fetchStalls(1, true); }}>
              Try Again
            </Button>
          </div>
        ) : filteredStalls.length === 0 ? (
          <div className="text-center py-20">
            <Store className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              {searchQuery ? "No stalls match your search" : "No stalls available yet"}
            </p>
            {searchQuery && (
              <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredStalls.map((stall) => (
                <StallCard 
                  key={stall._id} 
                  stall={stall} 
                  rating={stallRatings[stall._id]}
                />
              ))}
            </div>

            {/* Infinite scroll trigger */}
            {hasMore && !searchQuery && (
              <div ref={loadingRef} className="flex justify-center py-8">
                {loadingMore && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Loading more stalls...</span>
                  </div>
                )}
              </div>
            )}

            {!hasMore && stalls.length > 0 && (
              <p className="text-center text-muted-foreground py-8">
                You've seen all {stalls.length} stalls!
              </p>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PocketFinds. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

// Stall Card Component
function StallCard({ stall, rating }) {
  const navigate = useNavigate()
  
  const imageUrl = stall.stall_image 
    ? `${API_BASE_URL}${stall.stall_image}`
    : null

  return (
    <Card className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/50">
      {/* Image Container */}
      <div className="relative h-48 bg-muted overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={stall.stall_name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <Store className="h-16 w-16 text-primary/40 transition-transform duration-300 group-hover:scale-110" />
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-md">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-semibold text-gray-900">
            {rating?.avgRating || '0.0'}
          </span>
        </div>

        {/* Discount Badge */}
        {stall.discount && stall.discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white rounded-full px-3 py-1 text-sm font-semibold shadow-md">
            {stall.discount}% OFF
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Stall Name */}
        <h3 className="font-semibold text-lg text-foreground mb-2 truncate group-hover:text-primary transition-colors">
          {stall.stall_name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm truncate">{stall.stall_location}</span>
        </div>

        {/* Reviews Count */}
        <p className="text-xs text-muted-foreground mb-4">
          {rating?.totalReviews || 0} {rating?.totalReviews === 1 ? 'review' : 'reviews'}
        </p>

        {/* View Stall Button */}
        <Button 
          className="w-full group/btn transition-all duration-300"
          onClick={() => navigate(`/stall/${stall._id}`)}
        >
          <span>View Stall</span>
          <ChevronRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  )
}
