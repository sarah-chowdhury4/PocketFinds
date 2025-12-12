"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ThumbsUp, ThumbsDown, Flag } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

interface ReviewCardProps {
  review: {
    id: string
    userId: string
    userName: string
    userAvatar?: string
    userBadge?: string
    rating: number
    content: string
    createdAt: string
    upvotes: number
    downvotes: number
    userVote?: "up" | "down" | null
  }
  onUpvote?: () => void
  onDownvote?: () => void
  onReport?: () => void
}

export function ReviewCard({ review, onUpvote, onDownvote, onReport }: ReviewCardProps) {
  const { t } = useLanguage()

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={review.userAvatar || `/placeholder.svg?height=40&width=40&query=avatar`} />
            <AvatarFallback>{review.userName[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium">{review.userName}</span>
              {review.userBadge && (
                <Badge variant="secondary" className="text-xs">
                  {review.userBadge}
                </Badge>
              )}
              <span className="text-sm text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn("h-4 w-4", i < review.rating ? "fill-primary text-primary" : "text-muted-foreground")}
                />
              ))}
            </div>

            <p className="mt-2 text-sm leading-relaxed">{review.content}</p>

            <div className="flex items-center gap-4 mt-3">
              <Button
                variant="ghost"
                size="sm"
                className={cn("h-8 px-2", review.userVote === "up" && "text-success")}
                onClick={onUpvote}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                {review.upvotes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn("h-8 px-2", review.userVote === "down" && "text-destructive")}
                onClick={onDownvote}
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                {review.downvotes}
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground" onClick={onReport}>
                <Flag className="h-4 w-4 mr-1" />
                {t("report")}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
