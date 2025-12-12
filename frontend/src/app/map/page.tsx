"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { StallCard } from "@/components/stall/stall-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/lib/language-context"
import { Search, MapPin, List, MapIcon, Bookmark, X } from "lucide-react"
import { cn } from "@/lib/utils"

const stallLocations = [
  {
    id: "1",
    name: "Bhai Bhai Fuchka",
    location: "BRAC University Gate, Badda",
    rating: 4.8,
    isOpen: true,
    isBookmarked: true,
    x: 50,
    y: 30,
  },
  {
    id: "2",
    name: "Mama's Kacchi House",
    location: "Merul Badda, Near BRAC",
    rating: 4.6,
    isOpen: true,
    isBookmarked: false,
    x: 35,
    y: 45,
  },
  {
    id: "3",
    name: "Badda Cha Corner",
    location: "Natun Bazar, Badda",
    rating: 4.5,
    isOpen: true,
    isBookmarked: false,
    x: 65,
    y: 55,
  },
  {
    id: "4",
    name: "Mishti Hub",
    location: "BRAC University Road, Badda",
    rating: 4.7,
    isOpen: false,
    isBookmarked: true,
    x: 45,
    y: 40,
  },
  {
    id: "5",
    name: "Chotpoti Ghor",
    location: "Aftab Nagar, Near BRAC",
    rating: 4.4,
    isOpen: true,
    isBookmarked: false,
    x: 70,
    y: 35,
  },
  {
    id: "6",
    name: "Fresh Juice Bar",
    location: "Merul Badda Link Road",
    rating: 4.3,
    isOpen: true,
    isBookmarked: false,
    x: 30,
    y: 60,
  },
  {
    id: "7",
    name: "Royal Tehari House",
    location: "Badda Link Road",
    rating: 4.9,
    isOpen: true,
    isBookmarked: true,
    x: 55,
    y: 70,
  },
  {
    id: "8",
    name: "Jhalmuri Junction",
    location: "BRAC University Back Gate",
    rating: 4.2,
    isOpen: true,
    isBookmarked: false,
    x: 60,
    y: 25,
  },
]

export default function MapPage() {
  const { t } = useLanguage()
  const [selectedStall, setSelectedStall] = useState<(typeof stallLocations)[0] | null>(null)
  const [viewMode, setViewMode] = useState<"map" | "list">("map")
  const [searchQuery, setSearchQuery] = useState("")
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false)

  const user = {
    first_name: "Demo",
    last_name: "User",
    type: "customer",
    trustPoints: 150,
  }

  const filteredStalls = stallLocations.filter((stall) => {
    const matchesSearch =
      stall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stall.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBookmark = !showBookmarkedOnly || stall.isBookmarked
    return matchesSearch && matchesBookmark
  })

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />

      <main className="pb-20 md:pb-8">
        <div className="container px-4 py-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">{t("map")}</h1>

            <div className="flex items-center gap-2">
              <Button
                variant={showBookmarkedOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
              >
                <Bookmark className={cn("h-4 w-4 mr-1", showBookmarkedOnly && "fill-current")} />
                Bookmarked
              </Button>
              <div className="flex border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "map" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-none"
                  onClick={() => setViewMode("map")}
                >
                  <MapIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground mb-6">BRAC University, Badda Area</p>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search stalls near BRAC University..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {viewMode === "map" ? (
            <div className="relative">
              {/* Map Container */}
              <div className="relative h-[60vh] bg-muted rounded-xl overflow-hidden border">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url('/map-background.png')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                {/* Subtle dark overlay for readability */}
                <div className="absolute inset-0 bg-background/10" />

                {/* Map Grid Overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
                    backgroundSize: "50px 50px",
                  }}
                />

                {/* BRAC University Marker */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-5">
                  <div className="bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full border shadow-lg">
                    <span className="text-xs font-medium">BRAC University</span>
                  </div>
                </div>

                {/* Stall Markers */}
                {filteredStalls.map((stall) => (
                  <button
                    key={stall.id}
                    className={cn(
                      "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all z-10",
                      selectedStall?.id === stall.id && "z-20",
                    )}
                    style={{ left: `${stall.x}%`, top: `${stall.y}%` }}
                    onClick={() => setSelectedStall(stall)}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center h-10 w-10 rounded-full shadow-lg transition-transform hover:scale-110",
                        stall.isBookmarked
                          ? "bg-accent text-accent-foreground"
                          : stall.isOpen
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted-foreground text-background",
                        selectedStall?.id === stall.id && "ring-4 ring-primary/50 scale-110",
                      )}
                    >
                      <MapPin className="h-5 w-5" />
                    </div>
                    {stall.isBookmarked && (
                      <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                        <Bookmark className="h-2.5 w-2.5 text-primary-foreground fill-current" />
                      </div>
                    )}
                  </button>
                ))}

                {/* Legend */}
                <Card className="absolute bottom-4 left-4">
                  <CardContent className="p-3 flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <span>Open</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                      <span>Closed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full bg-accent" />
                      <span>Bookmarked</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Selected Stall Info */}
              {selectedStall && (
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{selectedStall.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {selectedStall.location}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant={selectedStall.isOpen ? "default" : "secondary"}
                            className={selectedStall.isOpen ? "bg-success text-success-foreground" : ""}
                          >
                            {selectedStall.isOpen ? t("openNow") : t("closed")}
                          </Badge>
                          <span className="text-sm font-medium">★ {selectedStall.rating}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedStall(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1" asChild>
                        <a href={`/stall/${selectedStall.id}`}>View Details</a>
                      </Button>
                      <Button variant="outline">{t("directions")}</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStalls.map((stall) => (
                <StallCard
                  key={stall.id}
                  stall={{
                    ...stall,
                    image: `/placeholder.svg?height=200&width=300&query=bangladeshi ${stall.name} food stall`,
                  }}
                  variant="compact"
                  isBookmarked={stall.isBookmarked}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
