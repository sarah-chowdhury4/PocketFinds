"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { authAPI } from "./api"

export type UserRole = "customer" | "stall owner" | "admin"

export interface User {
  _id?: string
  id: number
  email: string
  first_name: string
  last_name: string
  type: UserRole
  phone?: string
  verified_status?: boolean
  createdAt?: string
  updatedAt?: string
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
  first_name: string
  last_name: string
  phone?: string
  role?: "customer" | "stall owner"
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("pocketfinds_user")
    const token = localStorage.getItem("token")
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("pocketfinds_user")
        localStorage.removeItem("token")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await authAPI.login(email, password)
      
      // Store token and user data
      localStorage.setItem("token", response.token)
      localStorage.setItem("pocketfinds_user", JSON.stringify(response.user))
      setUser(response.user)

      // Redirect based on role
      if (response.role === "admin") {
        router.push("/admin")
      } else if (response.role === "stall owner") {
        router.push("/dashboard")
      } else {
        router.push("/")
      }

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || "Login failed" }
    }
  }

  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await authAPI.signup(data)
      
      // Store token and user data
      localStorage.setItem("token", response.token)
      localStorage.setItem("pocketfinds_user", JSON.stringify({ 
        email: response.email,
        type: response.role,
        id: response.userId,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
      }))
      
      setUser({ 
        email: response.email,
        type: response.role,
        id: response.userId,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
      } as User)

      if (response.role === "stall owner") {
        router.push("/dashboard")
      } else {
        router.push("/")
      }

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || "Signup failed" }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("pocketfinds_user")
    localStorage.removeItem("token")
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
