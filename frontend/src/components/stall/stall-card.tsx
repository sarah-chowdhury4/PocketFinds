"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Heart, Bookmark, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface StallCardProps {
  stall: {
    id: string
    name: string
    location: string
    image?: string
    rating?: number
    reviewCount?: number
    discount?: number
    offer?: string
    isOpen?: boolean
    categories?: string[]
  }
  isFavorite?: boolean
  isBookmarked?: boolean
  onFavoriteToggle?: () => void
  onBookmarkToggle?: () => void
  variant?: "default" | "compact" | "featured"
}

export function StallCard({
  stall,
  isFavorite = false,
  isBookmarked = false,
  onFavoriteToggle,
  onBookmarkToggle,
  variant = "default",
}: StallCardProps) {
  const { t } = useLanguage()

  if (variant === "compact") {
    return (
      <Link href={`/stall/${stall.id}`}>
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="flex gap-3 p-3">
            <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={stall.image || "/placeholder.svg?height=80&width=80&query=food stall"}
                alt={stall.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <h3 className="font-semibold truncate">{stall.name}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{stall.location}</span>
              </div>
              {stall.rating && (
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span className="text-sm font-medium">{stall.rating}</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </Link>
    )
  }

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all">
      <div className="relative aspect-[4/3]">
        <Image
          src={stall.image || "/placeholder.svg?height=200&width=300&query=food stall"}
          alt={stall.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />

        {/* Overlay actions */}
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 bg-background/80 backdrop-blur-sm"
            onClick={(e) => {
              e.preventDefault()
              onFavoriteToggle?.()
            }}
          >
            <Heart className={cn("h-4 w-4", isFavorite && "fill-primary text-primary")} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 bg-background/80 backdrop-blur-sm"
            onClick={(e) => {
              e.preventDefault()
              onBookmarkToggle?.()
            }}
          >
            <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-accent text-accent")} />
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute bottom-2 left-2 flex gap-1">
          {stall.discount && stall.discount > 0 && (
            <Badge className="bg-primary text-primary-foreground">
              {stall.discount}% {t("discount")}
            </Badge>
          )}
          {stall.offer && <Badge variant="secondary">{stall.offer}</Badge>}
        </div>
      </div>

      <CardContent className="p-4">
        <Link href={`/stall/${stall.id}`}>
          <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1">{stall.name}</h3>
        </Link>

        <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span className="truncate">{stall.location}</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            {stall.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-medium">{stall.rating}</span>
                {stall.reviewCount && <span className="text-sm text-muted-foreground">({stall.reviewCount})</span>}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span className={cn("text-sm font-medium", stall.isOpen ? "text-success" : "text-destructive")}>
              {stall.isOpen ? t("openNow") : t("closed")}
            </span>
          </div>
        </div>

        {stall.categories && stall.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {stall.categories.slice(0, 3).map((category) => (
              <Badge key={category} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
