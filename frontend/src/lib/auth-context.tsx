"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { authAPI } from "./api"

export type UserRole = "customer" | "stall owner" | "admin"

export interface User {
  _id: string
  id: number
  email: string
  first_name: string
  last_name: string
  type: UserRole
  role?: UserRole
  firstName?: string
  lastName?: string
  phone?: string
  avatar?: string
  trustPoints: number
  badges: string[]
  isVerified: boolean
  isSuspended: boolean
  createdAt: string
  stallId?: string
  favorites?: string[]
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
  first_name?: string
  last_name?: string
  firstName?: string
  lastName?: string
  phone?: string
  type?: UserRole
  role?: UserRole
  stallName?: string
  avatar?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for stored user session on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("pocketfinds_token")
      
      if (storedToken) {
        try {
          // Fetch fresh user data from server
          const response: any = await authAPI.getCurrentUser()
          if (response.user) {
            const userData: User = {
              _id: response.user._id,
              id: response.user.id || 0,
              email: response.user.email,
              first_name: response.user.first_name || "",
              last_name: response.user.last_name || "",
              type: response.user.type as UserRole,
              role: response.user.type as UserRole,
              firstName: response.user.first_name || "",
              lastName: response.user.last_name || "",
              phone: response.user.phone,
              avatar: response.user.avatar,
              trustPoints: response.user.trustPoints || 0,
              badges: response.user.badges || [],
              isVerified: response.user.isVerified || false,
              isSuspended: response.user.isSuspended || false,
              createdAt: response.user.createdAt || new Date().toISOString(),
              stallId: response.user.stallId,
              favorites: response.user.favorites,
            }
            setUser(userData)
            localStorage.setItem("pocketfinds_user", JSON.stringify(userData))
          }
        } catch (error) {
          // Token invalid or expired, clear storage
          localStorage.removeItem("pocketfinds_user")
          localStorage.removeItem("pocketfinds_token")
        }
      }
      setIsLoading(false)
    }
    
    initAuth()
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true)
      const response: any = await authAPI.login(email, password)

      if (response.error) {
        return { success: false, error: response.error }
      }

      // Store token and user
      const token = response.token
      const userData: User = {
        _id: response.userId || response.user?._id,
        id: response.user?.id || 0,
        email: response.email,
        first_name: response.user?.first_name || "",
        last_name: response.user?.last_name || "",
        type: response.role as UserRole,
        role: response.role as UserRole,
        firstName: response.user?.first_name || "",
        lastName: response.user?.last_name || "",
        phone: response.user?.phone,
        avatar: response.user?.avatar,
        trustPoints: response.user?.trustPoints || 0,
        badges: response.user?.badges || [],
        isVerified: response.user?.isVerified || false,
        isSuspended: response.user?.isSuspended || false,
        createdAt: response.user?.createdAt || new Date().toISOString(),
      }

      setUser(userData)
      localStorage.setItem("pocketfinds_token", token)
      localStorage.setItem("pocketfinds_user", JSON.stringify(userData))

      // Redirect based on role
      if (userData.type === "admin") {
        router.push("/admin")
      } else if (userData.type === "stall owner") {
        router.push("/dashboard")
      } else {
        router.push("/")
      }

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || "Login failed" }
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true)
      const providedFirst = data.first_name || data.firstName || ""
      const providedLast = data.last_name || data.lastName || ""
      const roleValue = data.role || data.type || "customer"
      const signupData = {
        email: data.email,
        password: data.password,
        first_name: providedFirst,
        last_name: providedLast,
        phone: data.phone,
        role: roleValue,
        avatar: data.avatar || null,
      }

      const response: any = await authAPI.signup(signupData)

      if (response.error) {
        return { success: false, error: response.error }
      }

      // Store token and user
      const token = response.token
      const userData: User = {
        _id: response.userId || "",
        id: response.user?.id || 0,
        email: response.email,
        first_name: signupData.first_name,
        last_name: signupData.last_name,
        type: response.role as UserRole,
        role: response.role as UserRole,
        firstName: signupData.first_name,
        lastName: signupData.last_name,
        phone: data.phone,
        avatar: signupData.avatar,
        trustPoints: 0,
        badges: ["New Member"],
        isVerified: false,
        isSuspended: false,
        createdAt: new Date().toISOString(),
      }

      setUser(userData)
      localStorage.setItem("pocketfinds_token", token)
      localStorage.setItem("pocketfinds_user", JSON.stringify(userData))

      if (roleValue === "stall owner") {
        router.push("/dashboard")
      } else {
        router.push("/")
      }

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || "Signup failed" }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("pocketfinds_user")
    localStorage.removeItem("pocketfinds_token")
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

