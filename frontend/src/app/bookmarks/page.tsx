"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Sidebar } from "@/components/layout/sidebar"
import { StallCard } from "@/components/stall/stall-card"
import { useLanguage } from "@/lib/language-context"
import { Bookmark } from "lucide-react"

const bookmarkedStalls = [
  {
    id: "1",
    name: "Tasty Bites",
    location: "TSC Area",
    rating: 4.8,
    reviewCount: 124,
    discount: 15,
    isOpen: true,
    categories: ["Snacks", "Beverages"],
    image: "/food-stall-biryani.jpg",
  },
  {
    id: "4",
    name: "Sweet Corner",
    location: "Arts Building",
    rating: 4.7,
    reviewCount: 156,
    isOpen: false,
    categories: ["Desserts", "Sweets"],
    image: "/sweet-shop-mishti.jpg",
  },
  {
    id: "7",
    name: "Biriyani Palace",
    location: "Main Gate",
    rating: 4.9,
    reviewCount: 234,
    isOpen: true,
    categories: ["Meals", "Rice"],
    image: "/biryani-restaurant.png",
  },
]

export default function BookmarksPage() {
  const { t } = useLanguage()
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set(bookmarkedStalls.map((s) => s.id)))

  const user = {
    first_name: "Demo",
    last_name: "User",
    type: "customer",
    trustPoints: 150,
  }

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) newSet.delete(id)
      else newSet.add(id)
      return newSet
    })
  }

  const activeBookmarks = bookmarkedStalls.filter((s) => bookmarks.has(s.id))

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 pb-20 md:pb-8">
          <div className="container px-4 py-6">
            <div className="flex items-center gap-2 mb-6">
              <Bookmark className="h-6 w-6 text-accent fill-accent" />
              <h1 className="text-2xl font-bold">{t("myBookmarks")}</h1>
            </div>

            {activeBookmarks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeBookmarks.map((stall) => (
                  <StallCard
                    key={stall.id}
                    stall={stall}
                    isBookmarked={true}
                    onBookmarkToggle={() => toggleBookmark(stall.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No bookmarked stalls yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Bookmark stalls to visit them later and see them highlighted on the map
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
