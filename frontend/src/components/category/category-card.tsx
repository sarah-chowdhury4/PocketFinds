"use client"

import type React from "react"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Coffee, Sandwich, IceCream, UtensilsCrossed, Pizza, Cookie, Salad, Soup } from "lucide-react"

interface CategoryCardProps {
  category: {
    id: string
    name: string
    namebn?: string
    icon: string
    count?: number
  }
  language?: "en" | "bn"
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  coffee: Coffee,
  sandwich: Sandwich,
  icecream: IceCream,
  utensils: UtensilsCrossed,
  pizza: Pizza,
  cookie: Cookie,
  salad: Salad,
  soup: Soup,
}

export function CategoryCard({ category, language = "en" }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || UtensilsCrossed

  return (
    <Link href={`/category/${category.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-all hover:border-primary/50 group">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium">{language === "bn" && category.namebn ? category.namebn : category.name}</h3>
          {category.count !== undefined && (
            <span className="text-sm text-muted-foreground mt-1">{category.count} stalls</span>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
