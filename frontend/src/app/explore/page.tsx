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
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/lib/language-context"
import { useStalls } from "@/hooks/useStalls"
import { Search, SlidersHorizontal, X } from "lucide-react"

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

  // Fetch stalls from API
  const { stalls, isLoading, error } = useStalls(searchQuery, sortBy)

  // Transform API data to match component interface
  const transformStall = (stallData: any) => ({
    id: stallData._id,
    name: stallData.stall_name,
    location: stallData.stall_location,
    rating: stallData.rating || 0,
    reviewCount: stallData.reviewCount || 0,
    discount: stallData.discount,
    offer: stallData.offer,
    isOpen: stallData.isOpen !== undefined ? stallData.isOpen : true,
    categories: ["Street Food", "Snacks"],
    image: stallData.image || "/placeholder.svg?height=200&width=300",
  })

  const displayStalls = stalls.map(transformStall)

  const filteredStalls = displayStalls
    .filter((stall) => {
      const matchesSearch =
        stall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.location.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || stall.categories.includes(selectedCategory)
      return matchesSearch && matchesCategory
    })

  return (
    <div className="min-h-screen bg-background">
      <Header user={{ first_name: "User" }} />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 pb-20 md:pb-8">
          <div className="container px-4 py-6">
            <h1 className="text-2xl font-bold mb-2">{t("explore")}</h1>
            <p className="text-muted-foreground mb-6">Browse all available food stalls</p>

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
                  <SelectItem value="name">Alphabetical</SelectItem>
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

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array(8).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-64 rounded-lg" />
                ))}
              </div>
            ) : (
              <>
                {/* Results Count */}
                <p className="text-sm text-muted-foreground mb-4">{filteredStalls.length} stalls found</p>

                {/* Stalls Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredStalls.map((stall) => (
                    <StallCard
                      key={stall.id}
                      stall={stall}
                    />
                  ))}
                </div>

                {filteredStalls.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No stalls found matching your criteria</p>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
