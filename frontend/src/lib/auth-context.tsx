"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

export type UserRole = "student" | "stall_owner" | "admin"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  phone?: string
  avatar?: string
  trustPoints: number
  badges: string[]
  isVerified: boolean
  isSuspended: boolean
  createdAt: string
  stallId?: string // For stall owners
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

interface SignupData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  role: UserRole
  stallName?: string // For stall owners
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database
const MOCK_USERS: Record<string, User & { password: string }> = {
  "admin@pocketfinds.com": {
    id: "admin-1",
    email: "admin@pocketfinds.com",
    password: "admin123",
    firstName: "Super",
    lastName: "Admin",
    role: "admin",
    trustPoints: 9999,
    badges: ["Admin", "Verified", "Founder"],
    isVerified: true,
    isSuspended: false,
    createdAt: "2024-01-01",
  },
  "owner@pocketfinds.com": {
    id: "owner-1",
    email: "owner@pocketfinds.com",
    password: "owner123",
    firstName: "Fatima",
    lastName: "Khan",
    role: "stall_owner",
    trustPoints: 850,
    badges: ["Top Seller", "Verified Stall"],
    isVerified: true,
    isSuspended: false,
    createdAt: "2024-01-15",
    stallId: "stall-1",
  },
  "student@pocketfinds.com": {
    id: "student-1",
    email: "student@pocketfinds.com",
    password: "student123",
    firstName: "Rahim",
    lastName: "Ahmed",
    role: "student",
    trustPoints: 320,
    badges: ["Foodie", "Explorer", "Top Reviewer"],
    isVerified: true,
    isSuspended: false,
    createdAt: "2024-02-01",
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("pocketfinds_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("pocketfinds_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

    const mockUser = MOCK_USERS[email.toLowerCase()]
    if (!mockUser || mockUser.password !== password) {
      return { success: false, error: "Invalid email or password" }
    }

    if (mockUser.isSuspended) {
      return { success: false, error: "Your account has been suspended. Please contact support." }
    }

    const { password: _, ...userWithoutPassword } = mockUser
    setUser(userWithoutPassword)
    localStorage.setItem("pocketfinds_user", JSON.stringify(userWithoutPassword))

    // Redirect based on role
    if (mockUser.role === "admin") {
      router.push("/admin")
    } else if (mockUser.role === "stall_owner") {
      router.push("/dashboard")
    } else {
      router.push("/")
    }

    return { success: true }
  }

  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call

    if (MOCK_USERS[data.email.toLowerCase()]) {
      return { success: false, error: "An account with this email already exists" }
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      phone: data.phone,
      trustPoints: 0,
      badges: ["New Member"],
      isVerified: false,
      isSuspended: false,
      createdAt: new Date().toISOString(),
      stallId: data.role === "stall_owner" ? `stall-${Date.now()}` : undefined,
    }

    setUser(newUser)
    localStorage.setItem("pocketfinds_user", JSON.stringify(newUser))

    if (data.role === "stall_owner") {
      router.push("/dashboard/setup")
    } else {
      router.push("/")
    }

    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("pocketfinds_user")
    router.push("/login")
  }

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("pocketfinds_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
