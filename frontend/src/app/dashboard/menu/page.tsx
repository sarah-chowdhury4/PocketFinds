"use client"

import { useState } from "react"
import Image from "next/image"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Search, Plus, Edit, Trash2, ImagePlus, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const categories = ["All", "Street Food", "Beverages", "Snacks", "Meals", "Desserts"]

const menuItems = [
  {
    id: "1",
    name: "Kacchi Biryani",
    description: "Aromatic rice layered with tender mutton and special spices",
    price: 180,
    category: "Meals",
    image: "/placeholder.svg?height=200&width=300",
    isAvailable: true,
    isPopular: true,
    stock: 25,
    sales: 156,
  },
  {
    id: "2",
    name: "Doodh Cha",
    description: "Creamy Bangladeshi milk tea with cardamom",
    price: 20,
    category: "Beverages",
    image: "/placeholder.svg?height=200&width=300",
    isAvailable: true,
    isPopular: true,
    stock: 100,
    sales: 234,
  },
  {
    id: "3",
    name: "Singara (5 pcs)",
    description: "Crispy triangular pastry filled with spiced potatoes and peas",
    price: 25,
    category: "Snacks",
    image: "/placeholder.svg?height=200&width=300",
    isAvailable: true,
    isPopular: false,
    stock: 50,
    sales: 189,
  },
  {
    id: "4",
    name: "Fuchka (8 pcs)",
    description: "Crispy puris with tangy tamarind water",
    price: 40,
    category: "Street Food",
    image: "/bangladeshi-fuchka-pani-puri-street-food.jpg",
    isAvailable: false,
    isPopular: true,
    stock: 0,
    sales: 145,
  },
  {
    id: "5",
    name: "Borhani",
    description: "Traditional spiced yogurt drink",
    price: 25,
    category: "Beverages",
    image: "/placeholder.svg?height=200&width=300",
    isAvailable: true,
    isPopular: false,
    stock: 30,
    sales: 98,
  },
  {
    id: "6",
    name: "Chotpoti",
    description: "Spicy chickpea dish with tamarind and eggs",
    price: 35,
    category: "Street Food",
    image: "/bangladeshi-chotpoti-chickpea-street-food.jpg",
    isAvailable: true,
    isPopular: false,
    stock: 40,
    sales: 87,
  },
  {
    id: "7",
    name: "Beef Tehari",
    description: "Old Dhaka style spiced rice with tender beef",
    price: 120,
    category: "Meals",
    image: "/placeholder.svg?height=200&width=300",
    isAvailable: true,
    isPopular: true,
    stock: 35,
    sales: 167,
  },
  {
    id: "8",
    name: "Mishti Doi",
    description: "Sweet fermented yogurt - traditional Bengali dessert",
    price: 40,
    category: "Desserts",
    image: "/placeholder.svg?height=200&width=300",
    isAvailable: true,
    isPopular: false,
    stock: 20,
    sales: 78,
  },
]

export default function MenuManagementPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<(typeof menuItems)[0] | null>(null)
  const [items, setItems] = useState(menuItems)

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  })

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleToggleAvailability = (id: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, isAvailable: !item.isAvailable } : item)))
    toast.success("Item availability updated")
  }

  const handleAddItem = () => {
    const item = {
      id: Date.now().toString(),
      name: newItem.name,
      description: newItem.description,
      price: Number.parseInt(newItem.price),
      category: newItem.category,
      image: "/placeholder.svg?height=200&width=300",
      isAvailable: true,
      isPopular: false,
      stock: Number.parseInt(newItem.stock),
      sales: 0,
    }
    setItems((prev) => [...prev, item])
    setNewItem({ name: "", description: "", price: "", category: "", stock: "" })
    setIsAddDialogOpen(false)
    toast.success("Item added successfully")
  }

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    toast.success("Item deleted")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden lg:block">
        <DashboardSidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
      </div>

      <main className={cn("transition-all duration-300", sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-64")}>
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Menu Management</h1>
              <p className="text-muted-foreground mt-1">Add, edit, and manage your menu items</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Menu Item</DialogTitle>
                  <DialogDescription>Add a new item to your menu</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Item Image</Label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                      <ImagePlus className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload image</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Item Name</Label>
                    <Input
                      id="name"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      placeholder="e.g., Kacchi Biryani"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      placeholder="Short description..."
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
                        placeholder="120"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={newItem.stock}
                        onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
                        placeholder="25"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={newItem.category} onValueChange={(v) => setNewItem({ ...newItem, category: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="bg-transparent">
                    Cancel
                  </Button>
                  <Button onClick={handleAddItem}>Add Item</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList>
                    {categories.map((cat) => (
                      <TabsTrigger key={cat} value={cat} className="text-xs">
                        {cat}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          {/* Menu Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <Card key={item.id} className={cn("premium-card overflow-hidden", !item.isAvailable && "opacity-60")}>
                <div className="relative h-40 bg-muted">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  {item.isPopular && (
                    <Badge className="absolute top-2 left-2 bg-primary">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Popular
                    </Badge>
                  )}
                  {!item.isAvailable && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <Badge variant="secondary">Out of Stock</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                    </div>
                    <p className="text-lg font-bold text-primary">৳{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                    <Badge variant="outline">{item.category}</Badge>
                    <span>•</span>
                    <span>{item.stock} in stock</span>
                    <span>•</span>
                    <span>{item.sales} sold</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Available</span>
                      <Switch checked={item.isAvailable} onCheckedChange={() => handleToggleAvailability(item.id)} />
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No items found. Try a different search or category.</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
