import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Star, MapPin, Store, ChevronRight, Compass, LayoutDashboard, Moon, Sun } from "lucide-react"
import axios from "axios"
import { useAuth } from "../lib/auth-context"
import { useTheme } from "../lib/theme-context"

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export default function Home() {
  const [stalls, setStalls] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { user, token } = useAuth()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    fetchStalls()
  }, [])

  const fetchStalls = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/stall?limit=8`)
      setStalls(response.data.stalls || [])
    } catch (err) {
      setError("Failed to load stalls")
      console.error('Failed to fetch stalls:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch average rating for each stall
  const [stallRatings, setStallRatings] = useState({})

  useEffect(() => {
    const fetchRatings = async () => {
      const ratings = {}
      for (const stall of stalls) {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/stall/${stall._id}`)
          ratings[stall._id] = {
            avgRating: response.data.avgRating || 0,
            totalReviews: response.data.totalReviews || 0
          }
        } catch (err) {
          ratings[stall._id] = { avgRating: 0, totalReviews: 0 }
        }
      }
      setStallRatings(ratings)
    }

    if (stalls.length > 0) {
      fetchRatings()
    }
  }, [stalls])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <Link 
              to="/" 
              className="flex items-center gap-2 text-xl font-bold text-primary hover:opacity-80 transition-opacity"
            >
              <Store className="h-6 w-6" />
              <span>PocketFinds</span>
            </Link>

            {/* Nav Buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="font-medium"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/discover')}
                className="font-medium"
              >
                <Compass className="h-4 w-4 mr-2" />
                Discover
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/map')}
                className="font-medium"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Map
              </Button>
              {token ? (
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="font-medium"
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Discover Amazing Food Stalls
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find the best stalls in Pocket Gate!
        </p>
      </section>

      {/* Stalls Grid */}
      <main id="stalls-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-foreground">
            Featured Stalls
          </h2>
          <Button variant="outline" onClick={() => navigate('/discover')}>
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
            <Button onClick={fetchStalls} className="mt-4">
              Try Again
            </Button>
          </div>
        ) : stalls.length === 0 ? (
          <div className="text-center py-20">
            <Store className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No stalls available yet</p>
            <p className="text-muted-foreground">Check back soon for new food stalls!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {stalls.map((stall) => (
              <StallCard 
                key={stall._id} 
                stall={stall} 
                rating={stallRatings[stall._id]}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-foreground">
              <Store className="h-5 w-5 text-primary" />
              <span className="font-semibold">PocketFinds</span>
            </div>
            
            <div className="flex items-center gap-6">
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:text-foreground"
                onClick={() => {
                  // Scroll to about section or show modal
                  alert("PocketFinds - Your trusted food stall review platform. Discover, review, and share your favorite food stalls with the community!")
                }}
              >
                About
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PocketFinds. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Stall Card Component with animations
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
          <div className="absolute top-3 left-3 bg-red-500 text-white rounded-full px-3 py-1 text-sm font-semibold shadow-md animate-pulse">
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
          className="w-full group/btn transition-all duration-300 hover:gap-3"
          onClick={() => navigate(`/stall/${stall._id}`)}
        >
          <span>View Stall</span>
          <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  )
}
