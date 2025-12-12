"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Sidebar } from "@/components/layout/sidebar"
import { StallCard } from "@/components/stall/stall-card"
import { useLanguage } from "@/lib/language-context"
import { Bookmark } from "lucide-react"

export default function BookmarksPage() {
  const { t } = useLanguage()
  

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 pb-20 md:pb-8">
          <div className="container px-4 py-6">
            <div className="flex items-center gap-2 mb-6">
              <Bookmark className="h-6 w-6 text-accent fill-accent" />
              <h1 className="text-2xl font-bold">{t("myBookmarks")}</h1>
            </div>

            <div className="text-center py-12">
              <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No bookmarked stalls yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Bookmark stalls to visit them later and see them highlighted on the map
              </p>
            </div>
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
