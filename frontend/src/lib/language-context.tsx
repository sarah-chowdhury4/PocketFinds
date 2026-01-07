"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type Language = "en" | "bn"

interface Translations {
  [key: string]: {
    en: string
    bn: string
  }
}

const translations: Translations = {
  // Navigation
  home: { en: "Home", bn: "হোম" },
  explore: { en: "Explore", bn: "অন্বেষণ" },
  map: { en: "Map", bn: "মানচিত্র" },
  favorites: { en: "Favorites", bn: "পছন্দের" },
  profile: { en: "Profile", bn: "প্রোফাইল" },

  // Common
  search: { en: "Search", bn: "অনুসন্ধান" },
  searchPlaceholder: { en: "Search stalls, food items...", bn: "স্টল, খাবার অনুসন্ধান করুন..." },
  viewAll: { en: "View All", bn: "সব দেখুন" },
  loading: { en: "Loading...", bn: "লোড হচ্ছে..." },

  // Home
  welcomeBack: { en: "Welcome back", bn: "স্বাগতম" },
  discoverStalls: { en: "Discover Amazing Food Stalls", bn: "দারুণ খাবারের স্টল আবিষ্কার করুন" },
  trendingStalls: { en: "Trending Stalls", bn: "ট্রেন্ডিং স্টল" },
  nearbyStalls: { en: "Nearby Stalls", bn: "কাছাকাছি স্টল" },
  categories: { en: "Categories", bn: "বিভাগ" },
  recommendedForYou: { en: "Recommended for You", bn: "আপনার জন্য সুপারিশ" },

  // Categories
  allCategories: { en: "All Categories", bn: "সব বিভাগ" },
  snacks: { en: "Snacks", bn: "স্ন্যাকস" },
  beverages: { en: "Beverages", bn: "পানীয়" },
  meals: { en: "Meals", bn: "খাবার" },
  desserts: { en: "Desserts", bn: "মিষ্টি" },
  streetFood: { en: "Street Food", bn: "স্ট্রিট ফুড" },

  // Stall
  menu: { en: "Menu", bn: "মেনু" },
  reviews: { en: "Reviews", bn: "রিভিউ" },
  about: { en: "About", bn: "সম্পর্কে" },
  location: { en: "Location", bn: "অবস্থান" },
  openNow: { en: "Open Now", bn: "এখন খোলা" },
  closed: { en: "Closed", bn: "বন্ধ" },
  discount: { en: "Discount", bn: "ছাড়" },
  offer: { en: "Offer", bn: "অফার" },

  // Reviews
  writeReview: { en: "Write a Review", bn: "রিভিউ লিখুন" },
  rating: { en: "Rating", bn: "রেটিং" },
  helpful: { en: "Helpful", bn: "সহায়ক" },
  report: { en: "Report", bn: "রিপোর্ট" },

  // User
  signIn: { en: "Sign In", bn: "সাইন ইন" },
  signUp: { en: "Sign Up", bn: "সাইন আপ" },
  signOut: { en: "Sign Out", bn: "সাইন আউট" },
  myFavorites: { en: "My Favorites", bn: "আমার পছন্দের" },
  myBookmarks: { en: "My Bookmarks", bn: "আমার বুকমার্ক" },
  trustPoints: { en: "Trust Points", bn: "ট্রাস্ট পয়েন্ট" },
  settings: { en: "Settings", bn: "সেটিংস" },
  notifications: { en: "Notifications", bn: "নোটিফিকেশন" },

  // Actions
  addToFavorites: { en: "Add to Favorites", bn: "পছন্দে যোগ করুন" },
  removeFromFavorites: { en: "Remove from Favorites", bn: "পছন্দ থেকে সরান" },
  bookmark: { en: "Bookmark", bn: "বুকমার্ক" },
  removeBookmark: { en: "Remove Bookmark", bn: "বুকমার্ক সরান" },
  share: { en: "Share", bn: "শেয়ার" },
  directions: { en: "Directions", bn: "দিকনির্দেশ" },

  // Admin
  dashboard: { en: "Dashboard", bn: "ড্যাশবোর্ড" },
  manageStalls: { en: "Manage Stalls", bn: "স্টল পরিচালনা" },
  manageUsers: { en: "Manage Users", bn: "ব্যবহারকারী পরিচালনা" },
  analytics: { en: "Analytics", bn: "বিশ্লেষণ" },

  // Stall Owner
  myStall: { en: "My Stall", bn: "আমার স্টল" },
  editMenu: { en: "Edit Menu", bn: "মেনু সম্পাদনা" },
  addItem: { en: "Add Item", bn: "আইটেম যোগ করুন" },
  updateItem: { en: "Update Item", bn: "আইটেম আপডেট" },
  deleteItem: { en: "Delete Item", bn: "আইটেম মুছুন" },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = useCallback(
    (key: string) => {
      return translations[key]?.[language] || key
    },
    [language],
  )

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
