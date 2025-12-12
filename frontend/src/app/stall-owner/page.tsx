"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { useMyStall } from "@/hooks/useStalls"
import {
  Store,
  UtensilsCrossed,
  Star,
  MessageSquare,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Percent,
  Gift,
  Clock,
  MapPin,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function StallOwnerDashboardPage() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const { stall, isLoading: stallLoading } = useMyStall()
  const [isAddItemOpen, setIsAddItemOpen] = useState(false)
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "",
    count: "",
  })
  const [menuItems, setMenuItems] = useState(placeholderMenuItems)
  const [isOpen, setIsOpen] = useState(true)

  const handleAddItem = () => {
    // TODO: Add API call to create item
    console.log("Adding item:", newItem)
    setIsAddItemOpen(false)
    setNewItem({ name: "", price: "", category: "", count: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={ownerUser} />

      <div className="flex">
        {/* Stall Owner Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-sidebar h-[calc(100vh-4rem)] sticky top-16">
          <div className="p-4 border-b">
            <h2 className="font-semibold flex items-center gap-2">
              <Store className="h-5 w-5 text-primary" />
              {t("myStall")}
            </h2>
          </div>
          <nav className="flex flex-col gap-1 p-4">
            {stallOwnerNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  item.href === "/stall-owner"
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {/* Stall Header */}
          {stallLoading ? (
            <Skeleton className="h-40 rounded-lg mb-6" />
          ) : !stall ? (
            <Card className="mb-6">
              <CardContent className="p-6">
                <p className="text-muted-foreground">No stall found. Please create a stall first.</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative h-32 w-32 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={stall.image || "/placeholder.svg?height=128&width=128"} alt={stall.stall_name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-2xl font-bold">{stall.stall_name}</h1>
                        <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{stall.stall_location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Store Status</span>
                          <Switch checked={isOpen} onCheckedChange={(checked) => {
                            setIsOpen(checked)
                            // TODO: Add API call to update status
                          }} />
                          <Badge
                            variant={isOpen ? "default" : "secondary"}
                            className={isOpen ? "bg-success text-success-foreground" : ""}
                          >
                            {isOpen ? t("openNow") : t("closed")}
                          </Badge>
                        </div>
                        <Button variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                      </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{stall.rating || 0} ({stall.reviewCount || 0} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Star className="h-4 w-4 text-primary" />
                  <span className="text-xs">{t("rating")}</span>
                </div>
                <p className="text-2xl font-bold">{stallData.rating}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-xs">{t("reviews")}</span>
                </div>
                <p className="text-2xl font-bold">{stallData.reviewCount}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <UtensilsCrossed className="h-4 w-4" />
                  <span className="text-xs">Menu Items</span>
                </div>
                <p className="text-2xl font-bold">{menuItems.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-success mb-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs">This Month</span>
                </div>
                <p className="text-2xl font-bold text-success">+23%</p>
              </CardContent>
            </Card>
          </div>

          {/* Offers Section */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Discounts & Offers
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Offers
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <Percent className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{stallData.discount}% Discount</p>
                    <p className="text-sm text-muted-foreground">On {stallData.discountItems}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
                  <Gift className="h-8 w-8 text-accent" />
                  <div>
                    <p className="font-medium">Special Offer</p>
                    <p className="text-sm text-muted-foreground">{stallData.offer}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="menu" className="space-y-6">
            <TabsList>
              <TabsTrigger value="menu">{t("menu")}</TabsTrigger>
              <TabsTrigger value="reviews">{t("reviews")}</TabsTrigger>
            </TabsList>

            <TabsContent value="menu">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{t("editMenu")}</CardTitle>
                    <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          {t("addItem")}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{t("addItem")}</DialogTitle>
                          <DialogDescription>Add a new item to your menu</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Item Name</Label>
                            <Input
                              id="name"
                              value={newItem.name}
                              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                              placeholder="e.g., Singara"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="price">Price (৳)</Label>
                              <Input
                                id="price"
                                type="number"
                                value={newItem.price}
                                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                placeholder="15"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="count">Stock Count</Label>
                              <Input
                                id="count"
                                type="number"
                                value={newItem.count}
                                onChange={(e) => setNewItem({ ...newItem, count: e.target.value })}
                                placeholder="50"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                              value={newItem.category}
                              onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Snacks">Snacks</SelectItem>
                                <SelectItem value="Beverages">Beverages</SelectItem>
                                <SelectItem value="Meals">Meals</SelectItem>
                                <SelectItem value="Street Food">Street Food</SelectItem>
                                <SelectItem value="Desserts">Desserts</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddItemOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddItem}>Add Item</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {menuItems.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-lg border",
                          !item.isAvailable && "opacity-60 bg-muted/50",
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                            <UtensilsCrossed className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <div className="flex items-center gap-2 text-sm">
                              <Badge variant="outline">{item.category}</Badge>
                              <span className="text-muted-foreground">
                                {item.count > 0 ? `${item.count} in stock` : "Out of stock"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-lg">৳{item.price}</span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Reviews</CardTitle>
                  <CardDescription>See what customers are saying about your stall</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {placeholderReviews.map((review) => (
                      <div key={review.id} className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{review.user}</span>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-4 w-4",
                                  i < review.rating ? "fill-primary text-primary" : "text-muted-foreground",
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.content}</p>
                        <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
