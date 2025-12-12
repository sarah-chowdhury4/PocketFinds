"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Sidebar } from "@/components/layout/sidebar"
import { StallCard } from "@/components/stall/stall-card"
import { MenuItemCard } from "@/components/stall/menu-item-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/language-context"
import { Heart } from "lucide-react"
import { dashboardAPI } from "@/lib/api"

export default function FavoritesPage() {
  const { t } = useLanguage()
  const [stalls, setStalls] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const res: any = await dashboardAPI.getCustomerFavorites()
        setStalls(res.data || [])
      } catch (e: any) {
        setError(e.message)
        setStalls([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />

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
                <TabsTrigger value="stalls">Stalls ({stalls.length})</TabsTrigger>
                <TabsTrigger value="items">Food Items (0)</TabsTrigger>
              </TabsList>

              <TabsContent value="stalls" className="mt-6">
                {error && <p className="text-red-500">{error}</p>}
                {loading ? (
                  <div className="text-center py-12">Loading...</div>
                ) : stalls.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stalls.map((s) => (
                      <StallCard
                        key={s._id}
                        stall={{
                          id: s._id,
                          name: s.stall_name,
                          location: s.stall_location,
                          rating: s.rating,
                          reviewCount: s.reviewCount,
                          discount: s.discount,
                          isOpen: s.isOpen,
                          categories: [],
                          image: s.image,
                        }}
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
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No favorite items yet</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
