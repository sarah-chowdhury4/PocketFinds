"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface MenuItemCardProps {
  item: {
    id: string
    name: string
    price: number
    category: string
    image?: string
    description?: string
    isAvailable?: boolean
    count?: number
  }
  isFavorite?: boolean
  onFavoriteToggle?: () => void
  currency?: string
}

export function MenuItemCard({ item, isFavorite = false, onFavoriteToggle, currency = "৳" }: MenuItemCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", !item.isAvailable && "opacity-60")}>
      <div className="flex gap-4 p-4">
        <div className="relative h-24 w-24 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item.image || `/placeholder.svg?height=96&width=96&query=${encodeURIComponent(item.name)}`}
            alt={item.name}
            fill
            className="object-cover"
          />
          {!item.isAvailable && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <span className="text-xs font-medium text-destructive">Unavailable</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-medium line-clamp-1">{item.name}</h4>
              <Badge variant="outline" className="text-xs mt-1">
                {item.category}
              </Badge>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={onFavoriteToggle}>
              <Heart className={cn("h-4 w-4", isFavorite && "fill-primary text-primary")} />
            </Button>
          </div>

          {item.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>}

          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-lg text-primary">
              {currency}
              {item.price}
            </span>
            {item.count !== undefined && item.count > 0 && (
              <Badge variant="secondary" className="text-xs">
                {item.count} left
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
