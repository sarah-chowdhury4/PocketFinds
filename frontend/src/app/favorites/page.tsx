"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Sidebar } from "@/components/layout/sidebar"
import { StallCard } from "@/components/stall/stall-card"
import { MenuItemCard } from "@/components/stall/menu-item-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/language-context"
import { Heart } from "lucide-react"

const favoriteStalls = [
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
    id: "3",
    name: "Chai Point",
    location: "Science Complex",
    rating: 4.5,
    reviewCount: 67,
    offer: "Buy 2 Get 1",
    isOpen: true,
    categories: ["Beverages", "Snacks"],
    image: "/tea-stall-chai.jpg",
  },
]

const favoriteItems = [
  {
    id: "1",
    name: "Singara",
    price: 15,
    category: "Snacks",
    count: 50,
    isAvailable: true,
    description: "Crispy triangular pastry",
  },
  {
    id: "3",
    name: "Masala Tea",
    price: 25,
    category: "Beverages",
    count: 100,
    isAvailable: true,
    description: "Aromatic tea with spices",
  },
  {
    id: "7",
    name: "Biriyani",
    price: 120,
    category: "Meals",
    count: 30,
    isAvailable: true,
    description: "Fragrant rice with spiced meat",
  },
]

export default function FavoritesPage() {
  const { t } = useLanguage()
  const [stallFavorites, setStallFavorites] = useState<Set<string>>(new Set(favoriteStalls.map((s) => s.id)))
  const [itemFavorites, setItemFavorites] = useState<Set<string>>(new Set(favoriteItems.map((i) => i.id)))

  const user = {
    first_name: "Demo",
    last_name: "User",
    type: "customer",
    trustPoints: 150,
  }

  const toggleStallFavorite = (id: string) => {
    setStallFavorites((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) newSet.delete(id)
      else newSet.add(id)
      return newSet
    })
  }

  const toggleItemFavorite = (id: string) => {
    setItemFavorites((prev) => {
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
            <div className="flex items-center gap-2 mb-6">
              <Heart className="h-6 w-6 text-primary fill-primary" />
              <h1 className="text-2xl font-bold">{t("myFavorites")}</h1>
            </div>

            <Tabs defaultValue="stalls">
              <TabsList>
                <TabsTrigger value="stalls">
                  Stalls ({favoriteStalls.filter((s) => stallFavorites.has(s.id)).length})
                </TabsTrigger>
                <TabsTrigger value="items">
                  Food Items ({favoriteItems.filter((i) => itemFavorites.has(i.id)).length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stalls" className="mt-6">
                {favoriteStalls.filter((s) => stallFavorites.has(s.id)).length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favoriteStalls
                      .filter((s) => stallFavorites.has(s.id))
                      .map((stall) => (
                        <StallCard
                          key={stall.id}
                          stall={stall}
                          isFavorite={true}
                          onFavoriteToggle={() => toggleStallFavorite(stall.id)}
                        />
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No favorite stalls yet</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="items" className="mt-6">
                {favoriteItems.filter((i) => itemFavorites.has(i.id)).length > 0 ? (
                  <div className="space-y-4 max-w-2xl">
                    {favoriteItems
                      .filter((i) => itemFavorites.has(i.id))
                      .map((item) => (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          isFavorite={true}
                          onFavoriteToggle={() => toggleItemFavorite(item.id)}
                        />
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No favorite items yet</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
