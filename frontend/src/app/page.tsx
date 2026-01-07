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
import { useLanguage } from "@/lib/language-context"
import { Search, TrendingUp, MapPin, Sparkles, ChevronRight } from "lucide-react"

const trendingStalls = [
  {
    id: "1",
    name: "Bhai Bhai Fuchka",
    location: "BRAC University Gate, Badda",
    rating: 4.8,
    reviewCount: 124,
    discount: 15,
    isOpen: true,
    categories: ["Street Food", "Snacks"],
    image: "/bangladeshi-fuchka-street-food-stall.jpg",
  },
  {
    id: "2",
    name: "Mama's Kacchi House",
    location: "Merul Badda, Near BRAC",
    rating: 4.6,
    reviewCount: 89,
    isOpen: true,
    categories: ["Meals", "Kacchi"],
    image: "/bangladeshi-kacchi-biryani-restaurant.jpg",
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
    image: "/bangladeshi-tea-stall-with-layered-cha.jpg",
  },
  {
    id: "4",
    name: "Mishti Hub",
    location: "BRAC University Road, Badda",
    rating: 4.7,
    reviewCount: 156,
    isOpen: false,
    categories: ["Desserts", "Mishti"],
    image: "/bangladeshi-mishti-sweets-roshogolla.jpg",
  },
]

const nearbyStalls = [
  {
    id: "5",
    name: "Chotpoti Ghor",
    location: "Aftab Nagar, Near BRAC",
    rating: 4.4,
    reviewCount: 45,
    isOpen: true,
    categories: ["Street Food"],
    image: "/bangladeshi-chotpoti-street-food.jpg",
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
    image: "/fresh-juice-bar-bangladesh-mango-lassi.jpg",
  },
]

const categories = [
  { id: "snacks", name: "Snacks", namebn: "স্ন্যাকস", icon: "cookie", count: 24 },
  { id: "beverages", name: "Beverages", namebn: "পানীয়", icon: "coffee", count: 18 },
  { id: "meals", name: "Meals", namebn: "খাবার", icon: "utensils", count: 32 },
  { id: "desserts", name: "Desserts", namebn: "মিষ্টি", icon: "icecream", count: 15 },
  { id: "streetfood", name: "Street Food", namebn: "স্ট্রিট ফুড", icon: "pizza", count: 28 },
  { id: "healthy", name: "Healthy", namebn: "স্বাস্থ্যকর", icon: "salad", count: 12 },
]

const recommendedStalls = [
  {
    id: "7",
    name: "Royal Tehari House",
    location: "Badda Link Road",
    rating: 4.9,
    reviewCount: 234,
    isOpen: true,
    categories: ["Meals", "Tehari"],
    image: "/bangladeshi-tehari-beef-rice-dish.jpg",
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
    image: "/bangladeshi-morog-polao-chicken-rice.jpg",
  },
]

export default function HomePage() {
  const { t, language } = useLanguage()
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")

  const user = {
    first_name: "Demo",
    last_name: "User",
    type: "customer",
    trustPoints: 150,
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

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
                  {t("welcomeBack")}, {user.first_name}!
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">{t("discoverStalls")}</h1>
                <p className="mt-3 text-muted-foreground text-lg">
                  Find the best food stalls near BRAC University, Badda. Discover authentic Bangladeshi street food and
                  local favorites.
                </p>

                {/* Search Bar */}
                <div className="relative mt-6 max-w-lg">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder={t("searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-base"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="py-8">
            <div className="container px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">{t("categories")}</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/categories">
                    {t("viewAll")}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} language={language} />
                ))}
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
                  <Link href="/trending">
                    {t("viewAll")}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {trendingStalls.map((stall) => (
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
            </div>
          </section>

          {/* Nearby Stalls */}
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
                {nearbyStalls.map((stall) => (
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
            </div>
          </section>

          {/* AI Recommended */}
          <section className="py-8 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="container px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  {t("recommendedForYou")}
                </h2>
                <Badge variant="outline" className="text-xs">
                  AI Powered
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedStalls.map((stall) => (
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
            </div>
          </section>
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
