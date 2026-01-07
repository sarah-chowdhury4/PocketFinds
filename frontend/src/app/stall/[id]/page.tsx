"use client"

import { useState } from "react"
import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { MenuItemCard } from "@/components/stall/menu-item-card"
import { ReviewCard } from "@/components/review/review-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/lib/language-context"
import { Star, MapPin, Clock, Heart, Bookmark, Share2, Navigation, Phone, ChevronLeft, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const mockStall = {
  id: "1",
  name: "Bhai Bhai Fuchka",
  location: "BRAC University Gate, Merul Badda, Dhaka",
  description:
    "Famous for authentic Dhakaia fuchka and chotpoti since 2015. We serve fresh, hygienic street food to BRAC University students and locals with love and traditional recipes.",
  image: "/placeholder.svg?height=400&width=800",
  rating: 4.8,
  reviewCount: 124,
  discount: 15,
  discountItems: "All fuchka items",
  offer: "Free borhani on orders above ৳150",
  isOpen: true,
  openingHours: "10:00 AM - 10:00 PM",
  phone: "+880 1712-345678",
  categories: ["Street Food", "Snacks", "Fuchka"],
}

const mockMenu = [
  {
    id: "1",
    name: "Fuchka (8 pcs)",
    price: 40,
    category: "Street Food",
    count: 50,
    isAvailable: true,
    description: "Crispy hollow puris filled with spiced mashed potato and tangy tamarind water",
  },
  {
    id: "2",
    name: "Chotpoti",
    price: 35,
    category: "Street Food",
    count: 30,
    isAvailable: true,
    description: "Spiced chickpeas with boiled potatoes, eggs, and tangy tamarind sauce",
  },
  {
    id: "3",
    name: "Doi Fuchka (8 pcs)",
    price: 50,
    category: "Street Food",
    count: 25,
    isAvailable: true,
    description: "Sweet yogurt-based fuchka with date tamarind chutney",
  },
  {
    id: "4",
    name: "Jhalmuri",
    price: 25,
    category: "Snacks",
    count: 100,
    isAvailable: true,
    description: "Spicy puffed rice mixed with chanachur, onions, and mustard oil",
  },
  {
    id: "5",
    name: "Aloo Kabli",
    price: 30,
    category: "Street Food",
    count: 0,
    isAvailable: false,
    description: "Tangy chickpea and potato salad with tamarind chutney",
  },
  {
    id: "6",
    name: "Borhani",
    price: 20,
    category: "Beverages",
    count: 40,
    isAvailable: true,
    description: "Traditional Bangladeshi yogurt drink with mint and spices",
  },
]

const mockReviews = [
  {
    id: "1",
    userId: "u1",
    userName: "Rahim Uddin",
    userBadge: "Foodie Expert",
    rating: 5,
    content:
      "Dhaka'r best fuchka! The tamarind water is perfectly tangy and the puris are always crispy. Must try their doi fuchka combo.",
    createdAt: "2024-01-15",
    upvotes: 23,
    downvotes: 2,
    userVote: null,
  },
  {
    id: "2",
    userId: "u2",
    userName: "Fatema Akter",
    userBadge: "Trusted Reviewer",
    rating: 4,
    content:
      "Great taste and reasonable prices. The chotpoti here reminds me of old Dhaka style. Sometimes crowded during lunch break but worth the wait.",
    createdAt: "2024-01-10",
    upvotes: 15,
    downvotes: 1,
    userVote: "up" as const,
  },
  {
    id: "3",
    userId: "u3",
    userName: "Karim Hassan",
    rating: 5,
    content:
      "Been a regular customer since my first semester at BRAC. Bhai always serves with a smile. The jhalmuri is addictive!",
    createdAt: "2024-01-05",
    upvotes: 8,
    downvotes: 0,
    userVote: null,
  },
]

const aiReviewSummary =
  "Customers love the authentic Dhakaia-style fuchka with perfectly balanced tangy tamarind water. The chotpoti is praised for its old Dhaka taste. Service is friendly with the owner personally attending to customers. Popular among BRAC students for affordable prices and consistent quality."

export default function StallPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const { t } = useLanguage()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [favoriteItems, setFavoriteItems] = useState<Set<string>>(new Set())
  const [newReview, setNewReview] = useState("")
  const [newRating, setNewRating] = useState(0)

  const user = {
    first_name: "Demo",
    last_name: "User",
    type: "customer",
    trustPoints: 150,
  }

  const toggleItemFavorite = (id: string) => {
    setFavoriteItems((prev) => {
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

      <main className="pb-20 md:pb-8">
        {/* Hero Image */}
        <div className="relative h-48 md:h-72 w-full">
          <Image src={mockStall.image || "/placeholder.svg"} alt={mockStall.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

          {/* Back Button */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm"
            asChild
          >
            <Link href="/">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="bg-background/80 backdrop-blur-sm"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={cn("h-5 w-5", isFavorite && "fill-primary text-primary")} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-background/80 backdrop-blur-sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-accent text-accent")} />
            </Button>
            <Button variant="secondary" size="icon" className="bg-background/80 backdrop-blur-sm">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            {mockStall.discount > 0 && (
              <Badge className="bg-primary text-primary-foreground">{mockStall.discount}% OFF</Badge>
            )}
            <Badge
              variant={mockStall.isOpen ? "default" : "destructive"}
              className={mockStall.isOpen ? "bg-success text-success-foreground" : ""}
            >
              <Clock className="h-3 w-3 mr-1" />
              {mockStall.isOpen ? t("openNow") : t("closed")}
            </Badge>
          </div>
        </div>

        {/* Stall Info */}
        <div className="container px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{mockStall.name}</h1>

              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{mockStall.location}</span>
              </div>

              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-bold text-lg">{mockStall.rating}</span>
                  <span className="text-muted-foreground">({mockStall.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {mockStall.categories.map((cat) => (
                  <Badge key={cat} variant="outline">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 md:flex-none bg-transparent">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button className="flex-1 md:flex-none">
                <Navigation className="h-4 w-4 mr-2" />
                {t("directions")}
              </Button>
            </div>
          </div>

          {/* Offers */}
          {(mockStall.offer || mockStall.discount > 0) && (
            <Card className="mt-6 bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Sparkles className="h-4 w-4" />
                  <span>Special Offers</span>
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  {mockStall.discount > 0 && (
                    <p>
                      {mockStall.discount}% off on {mockStall.discountItems}
                    </p>
                  )}
                  {mockStall.offer && <p>{mockStall.offer}</p>}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tabs */}
          <Tabs defaultValue="menu" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="menu">{t("menu")}</TabsTrigger>
              <TabsTrigger value="reviews">{t("reviews")}</TabsTrigger>
              <TabsTrigger value="about">{t("about")}</TabsTrigger>
            </TabsList>

            <TabsContent value="menu" className="mt-6">
              <div className="space-y-4">
                {mockMenu.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    isFavorite={favoriteItems.has(item.id)}
                    onFavoriteToggle={() => toggleItemFavorite(item.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              {/* AI Summary */}
              <Card className="mb-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    AI Review Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{aiReviewSummary}</p>
                </CardContent>
              </Card>

              {/* Write Review */}
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{t("writeReview")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button key={i} onClick={() => setNewRating(i + 1)} className="p-1">
                        <Star
                          className={cn(
                            "h-6 w-6 transition-colors",
                            i < newRating ? "fill-primary text-primary" : "text-muted-foreground hover:text-primary",
                          )}
                        />
                      </button>
                    ))}
                  </div>
                  <Textarea
                    placeholder="Share your experience..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className="min-h-24"
                  />
                  <Button className="mt-3" disabled={!newRating || !newReview.trim()}>
                    Submit Review
                  </Button>
                </CardContent>
              </Card>

              {/* Reviews List */}
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    onUpvote={() => {}}
                    onDownvote={() => {}}
                    onReport={() => {}}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">About</h3>
                    <p className="text-muted-foreground">{mockStall.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Opening Hours</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{mockStall.openingHours}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Contact</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{mockStall.phone}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Location</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{mockStall.location}</span>
                    </div>
                    <div className="mt-4 h-48 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=200&width=400"
                        alt="Map"
                        width={400}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
