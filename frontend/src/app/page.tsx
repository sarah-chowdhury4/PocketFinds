"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Sidebar } from "@/components/layout/sidebar"
import { StallCard } from "@/components/stall/stall-card"
import { CategoryCard } from "@/components/category/category-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { useStalls } from "@/hooks/useStalls"
import { Search, TrendingUp, MapPin, Sparkles, ChevronRight } from "lucide-react"

export default function HomePage() {
  const { t, language } = useLanguage()
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  
  // Fetch stalls from API
  const { stalls, isLoading } = useStalls(searchQuery, "rating")

  // Separate stalls into categories (trending, nearby, recommended)
  const trendingStalls = stalls.filter((s, i) => i < 4)
  const nearbyStalls = stalls.filter((s, i) => i >= 4 && i < 7)
  const recommendedStalls = stalls.filter((s, i) => i >= 7 && i < 10)

  // Transform API stall data to match component interface
  const transformStall = (stallData: any) => ({
    id: stallData._id,
    name: stallData.stall_name,
    location: stallData.stall_location,
    rating: stallData.rating,
    reviewCount: stallData.reviewCount,
    discount: stallData.discount,
    offer: stallData.offer,
    isOpen: stallData.isOpen,
    categories: ["Street Food", "Snacks"], // To be enhanced with actual categories
    image: stallData.image || "/placeholder.svg?height=200&width=300",
  })

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 pb-20 md:pb-8">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-8 md:py-12">
            <div className="container px-4">
              <div className="max-w-2xl">
                <Badge className="mb-4" variant="secondary">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Welcome back, {user?.first_name || "Guest"}!
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t("discoverStalls")}</h1>
                <p className="mt-3 text-muted-foreground text-lg">
                  Find the best food stalls near you. Discover authentic local food and hidden gems.
                </p>

                {/* Search Bar */}
                <div className="relative mt-6 max-w-lg">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search stalls..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-base"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Trending Stalls */}
          <section className="py-8 bg-muted/30">
            <div className="container px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {t("trendingStalls")}
                </h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/explore">
                    {t("viewAll")}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {isLoading ? (
                  Array(4).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-64" />
                  ))
                ) : trendingStalls.length > 0 ? (
                  trendingStalls.map((stall) => {
                    const transformed = transformStall(stall)
                    return (
                      <StallCard
                        key={stall._id}
                        stall={transformed}
                      />
                    )
                  })
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No stalls found. Try adjusting your search.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Nearby Stalls */}
          {nearbyStalls.length > 0 && (
            <section className="py-8">
              <div className="container px-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-accent" />
                    {t("nearbyStalls")}
                  </h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/map">
                      {t("viewAll")}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {nearbyStalls.map((stall) => {
                    const transformed = transformStall(stall)
                    return (
                      <StallCard
                        key={stall._id}
                        stall={transformed}
                      />
                    )
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Recommended Stalls */}
          {recommendedStalls.length > 0 && (
            <section className="py-8 bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="container px-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    {t("recommendedForYou")}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendedStalls.map((stall) => {
                    const transformed = transformStall(stall)
                    return (
                      <StallCard
                        key={stall._id}
                        stall={transformed}
                      />
                    )
                  })}
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
