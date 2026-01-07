"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Sidebar } from "@/components/layout/sidebar"
import { StallCard } from "@/components/stall/stall-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/lib/language-context"
import { Search, SlidersHorizontal, X } from "lucide-react"

const allStalls = [
  {
    id: "1",
    name: "Bhai Bhai Fuchka",
    location: "BRAC University Gate, Badda",
    rating: 4.8,
    reviewCount: 124,
    discount: 15,
    isOpen: true,
    categories: ["Street Food", "Snacks"],
    image: "/bangladeshi-fuchka-pani-puri-street-food.jpg",
  },
  {
    id: "2",
    name: "Mama's Kacchi House",
    location: "Merul Badda, Near BRAC",
    rating: 4.6,
    reviewCount: 89,
    isOpen: true,
    categories: ["Meals", "Kacchi"],
    image: "/bangladeshi-kacchi-biryani-mutton.jpg",
  },
  {
    id: "3",
    name: "Badda Cha Corner",
    location: "Natun Bazar, Badda",
    rating: 4.5,
    reviewCount: 67,
    offer: "Buy 2 Get 1",
    isOpen: true,
    categories: ["Beverages", "Snacks"],
    image: "/bangladeshi-7-layer-tea-doodh-cha.jpg",
  },
  {
    id: "4",
    name: "Mishti Hub",
    location: "BRAC University Road, Badda",
    rating: 4.7,
    reviewCount: 156,
    isOpen: false,
    categories: ["Desserts", "Mishti"],
    image: "/bangladeshi-mishti-doi-roshogolla-sweets.jpg",
  },
  {
    id: "5",
    name: "Chotpoti Ghor",
    location: "Aftab Nagar, Near BRAC",
    rating: 4.4,
    reviewCount: 45,
    isOpen: true,
    categories: ["Street Food"],
    image: "/bangladeshi-chotpoti-chickpea-street-food.jpg",
  },
  {
    id: "6",
    name: "Fresh Juice Bar",
    location: "Merul Badda Link Road",
    rating: 4.3,
    reviewCount: 78,
    discount: 10,
    isOpen: true,
    categories: ["Beverages"],
    image: "/bangladesh-fresh-mango-lassi-borhani.jpg",
  },
  {
    id: "7",
    name: "Royal Tehari House",
    location: "Badda Link Road",
    rating: 4.9,
    reviewCount: 234,
    isOpen: true,
    categories: ["Meals", "Tehari"],
    image: "/bangladeshi-tehari-beef-rice-old-dhaka.jpg",
  },
  {
    id: "8",
    name: "Morog Pulao Corner",
    location: "DIT Road, Badda",
    rating: 4.5,
    reviewCount: 98,
    discount: 20,
    isOpen: true,
    categories: ["Meals", "Rice"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "9",
    name: "Jhalmuri Junction",
    location: "BRAC University Back Gate",
    rating: 4.2,
    reviewCount: 67,
    isOpen: true,
    categories: ["Street Food", "Snacks"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "10",
    name: "Paratha Ghor",
    location: "Shahjadpur, Near Badda",
    rating: 4.6,
    reviewCount: 112,
    isOpen: true,
    categories: ["Meals", "Breakfast"],
    image: "/placeholder.svg?height=200&width=300",
  },
]

const allCategories = [
  "All",
  "Street Food",
  "Beverages",
  "Meals",
  "Desserts",
  "Snacks",
  "Kacchi",
  "Tehari",
  "Mishti",
  "Breakfast",
]

export default function ExplorePage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("rating")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())

  const user = {
    first_name: "Demo",
    last_name: "User",
    type: "customer",
    trustPoints: 150,
  }

  const filteredStalls = allStalls
    .filter((stall) => {
      const matchesSearch =
        stall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.location.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || stall.categories.includes(selectedCategory)
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0)
      if (sortBy === "reviews") return (b.reviewCount || 0) - (a.reviewCount || 0)
      return 0
    })

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) newSet.delete(id)
      else newSet.add(id)
      return newSet
    })
  }

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) newSet.delete(id)
      else newSet.add(id)
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 pb-20 md:pb-8">
          <div className="container px-4 py-6">
            <h1 className="text-2xl font-bold mb-2">{t("explore")}</h1>
            <p className="text-muted-foreground mb-6">Food stalls near BRAC University, Badda</p>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {allCategories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground mb-4">{filteredStalls.length} stalls found</p>

            {/* Stalls Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredStalls.map((stall) => (
                <StallCard
                  key={stall.id}
                  stall={stall}
                  isFavorite={favorites.has(stall.id)}
                  isBookmarked={bookmarks.has(stall.id)}
                  onFavoriteToggle={() => toggleFavorite(stall.id)}
                  onBookmarkToggle={() => toggleBookmark(stall.id)}
                />
              ))}
            </div>

            {filteredStalls.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No stalls found matching your criteria</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
