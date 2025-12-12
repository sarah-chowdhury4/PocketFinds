"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth, type UserRole } from "@/lib/auth-context"
import {
  Eye,
  EyeOff,
  Store,
  ArrowRight,
  ArrowLeft,
  Users,
  ChefHat,
  Check,
  Sparkles,
  Star,
  TrendingUp,
  Shield,
  Camera,
  MapPin,
  X,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

type Step = "role" | "details" | "stall"

interface RoleOption {
  id: UserRole
  title: string
  description: string
  icon: React.ElementType
  benefits: string[]
  color: string
}

const roleOptions: RoleOption[] = [
  {
    id: "customer",
    title: "Student / Food Lover",
    description: "Discover and review amazing food stalls",
    icon: Users,
    benefits: [
      "Discover local food gems",
      "Write reviews & earn trust points",
      "Save favorites & bookmarks",
      "Get personalized recommendations",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "stall owner",
    title: "Stall Owner",
    description: "Manage your stall and grow your business",
    icon: ChefHat,
    benefits: [
      "Create your stall profile",
      "Manage menu & pricing",
      "Track reviews & analytics",
      "Reach more customers",
    ],
    color: "from-primary to-accent",
  },
]

export default function SignupPage() {
  const { signup } = useAuth()
  const [step, setStep] = useState<Step>("role")
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    avatar: "",
    stallName: "",
    stallLocation: "",
    stallDescription: "",
    stallLatitude: "",
    stallLongitude: "",
  })
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [showMapPicker, setShowMapPicker] = useState(false)
  const [mapPosition, setMapPosition] = useState({ x: 50, y: 50 })

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    setStep("details")
  }

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }
    if (selectedRole === "stall owner") {
      setStep("stall")
    } else {
      handleFinalSubmit()
    }
  }

  const handleFinalSubmit = async () => {
    if (!selectedRole) return

    setIsLoading(true)
    const result = await signup({
      email: formData.email,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      role: selectedRole,
      stallName: formData.stallName,
      avatar: formData.avatar,
    })
    setIsLoading(false)

    if (result.success) {
      toast.success("Account created successfully!")
    } else {
      toast.error(result.error || "Failed to create account")
    }
  }

  const goBack = () => {
    if (step === "details") setStep("role")
    else if (step === "stall") setStep("details")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-accent via-accent/90 to-primary">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-32 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "3s" }}
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Store className="h-8 w-8" />
            </div>
            <span className="text-3xl font-bold tracking-tight">PocketFinds</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-6 text-balance">
            Join the Food
            <br />
            <span className="text-white/90">Discovery Revolution</span>
          </h1>

          <p className="text-lg text-white/80 mb-10 max-w-md leading-relaxed">
            Whether you're a food enthusiast or a stall owner, PocketFinds is your platform to connect, discover, and
            grow.
          </p>

          {/* Features */}
          <div className="space-y-4">
            {[
              { icon: Star, text: "Rate and review your favorite stalls" },
              { icon: TrendingUp, text: "Grow your business with insights" },
              { icon: Shield, text: "Trusted community with verified reviews" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                  <feature.icon className="h-5 w-5" />
                </div>
                <span className="text-white/90">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-lg">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Store className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">PocketFinds</span>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {["role", "details", ...(selectedRole === "stall_owner" ? ["stall"] : [])].map((s, i) => (
              <div key={s} className="flex items-center">
                <div
                  className={cn(
                    "h-2 w-8 rounded-full transition-colors",
                    step === s
                      ? "bg-primary"
                      : i < ["role", "details", "stall"].indexOf(step)
                        ? "bg-primary/60"
                        : "bg-muted",
                  )}
                />
                {i < (selectedRole === "stall_owner" ? 2 : 1) && <div className="w-2" />}
              </div>
            ))}
          </div>

          {/* Step: Role Selection */}
          {step === "role" && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight">Get Started</h2>
                <p className="mt-2 text-muted-foreground">Choose how you want to use PocketFinds</p>
              </div>

              <div className="grid gap-4">
                {roleOptions.map((role) => (
                  <Card
                    key={role.id}
                    className={cn(
                      "cursor-pointer transition-all duration-300 hover:shadow-lg premium-card border-2",
                      selectedRole === role.id
                        ? "border-primary bg-primary/5"
                        : "border-transparent hover:border-primary/30",
                    )}
                    onClick={() => handleRoleSelect(role.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white",
                            role.color,
                          )}
                        >
                          <role.icon className="h-7 w-7" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{role.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                          <div className="grid grid-cols-2 gap-2">
                            {role.benefits.map((benefit, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Check className="h-3 w-3 text-success" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          )}

          {/* Step: Personal Details */}
          {step === "details" && (
            <form onSubmit={handleDetailsSubmit} className="space-y-6 animate-fade-in">
              <div>
                <Button type="button" variant="ghost" size="sm" onClick={goBack} className="mb-4 -ml-2">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <h2 className="text-3xl font-bold tracking-tight">Personal Details</h2>
                <p className="mt-2 text-muted-foreground">Tell us a bit about yourself</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+880 1712-345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-12 pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar">Profile Picture (Optional)</Label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" />
                      ) : (
                        <Camera className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onloadend = () => {
                            setAvatarPreview(reader.result as string)
                            setFormData({ ...formData, avatar: reader.result as string })
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("avatar")?.click()}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Choose Photo
                    </Button>
                    {avatarPreview && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setAvatarPreview(null)
                          setFormData({ ...formData, avatar: "" })
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-base font-semibold">
                {selectedRole === "stall_owner" ? "Continue" : "Create Account"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          )}

          {/* Step: Stall Setup (for stall owners) */}
          {step === "stall" && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleFinalSubmit()
              }}
              className="space-y-6 animate-fade-in"
            >
              <div>
                <Button type="button" variant="ghost" size="sm" onClick={goBack} className="mb-4 -ml-2">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Almost there!</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Setup Your Stall</h2>
                <p className="mt-2 text-muted-foreground">Tell us about your food stall</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stallName">Stall Name</Label>
                <Input
                  id="stallName"
                  placeholder="e.g., Tasty Bites"
                  value={formData.stallName}
                  onChange={(e) => setFormData({ ...formData, stallName: e.target.value })}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stallLocation">Location Address</Label>
                <Input
                  id="stallLocation"
                  placeholder="e.g., TSC Area, Dhaka University"
                  value={formData.stallLocation}
                  onChange={(e) => setFormData({ ...formData, stallLocation: e.target.value })}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Location on Map</Label>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 justify-start"
                  onClick={() => setShowMapPicker(true)}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {formData.stallLatitude && formData.stallLongitude
                    ? `Selected: ${formData.stallLatitude}, ${formData.stallLongitude}`
                    : "Select location on map"}
                </Button>
                {showMapPicker && (
                  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-2xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-lg">Select Stall Location</h3>
                          <Button variant="ghost" size="icon" onClick={() => setShowMapPicker(false)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div
                          className="relative h-96 bg-muted rounded-lg overflow-hidden border cursor-crosshair"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect()
                            const x = ((e.clientX - rect.left) / rect.width) * 100
                            const y = ((e.clientY - rect.top) / rect.height) * 100
                            setMapPosition({ x, y })
                            setFormData({
                              ...formData,
                              stallLatitude: y.toFixed(2),
                              stallLongitude: x.toFixed(2),
                            })
                          }}
                        >
                          <div
                            className="absolute inset-0"
                            style={{
                              backgroundImage: `url('/map-background.png')`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          />
                          <div className="absolute inset-0 bg-background/10" />
                          <div
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                            style={{ left: `${mapPosition.x}%`, top: `${mapPosition.y}%` }}
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                              <MapPin className="h-5 w-5" />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline" onClick={() => setShowMapPicker(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => setShowMapPicker(false)}>Confirm Location</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="stallDescription">Description (Optional)</Label>
                <textarea
                  id="stallDescription"
                  placeholder="Tell customers what makes your stall special..."
                  value={formData.stallDescription}
                  onChange={(e) => setFormData({ ...formData, stallDescription: e.target.value })}
                  className="w-full h-24 px-4 py-3 rounded-lg border bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <Card className="bg-muted/30 border-dashed">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">
                    You can add more details like menu items, photos, and opening hours after creating your account.
                  </p>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Creating your stall...
                  </div>
                ) : (
                  <>
                    Create Account & Stall
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
