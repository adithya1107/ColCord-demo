"use client"

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star } from 'lucide-react'
import { ReviewForm } from '@/components/review-form'
import { ReviewList } from '@/components/review-list'

interface TouristSpot {
  id: number
  name: string
  description: string
  distance: string
  category: string
  averageRating: number
}

interface Review {
  id: number
  rating: number
  comment: string
  author: string
  date: string
}

export default function TouristSpotDetailsPage() {
  const { id } = useParams()
  const [spot, setSpot] = useState<TouristSpot>({
    id: Number(id),
    name: "City Heritage Museum",
    description: "A fascinating museum showcasing local history",
    distance: "1.2 km",
    category: "Cultural",
    averageRating: 4.5
  })

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      rating: 5,
      comment: "Amazing place! Learned so much about local history.",
      author: "John Doe",
      date: "2023-05-15"
    },
    {
      id: 2,
      rating: 4,
      comment: "Very interesting exhibits. Could use more interactive displays.",
      author: "Jane Smith",
      date: "2023-05-10"
    }
  ])

  const handleReviewSubmit = (newReview: { rating: number; comment: string }) => {
    const review: Review = {
      id: reviews.length + 1,
      ...newReview,
      author: "Current User", // In a real app, this would be the logged-in user's name
      date: new Date().toISOString().split('T')[0]
    }
    setReviews([review, ...reviews])

    // Update average rating
    const totalRatings = reviews.reduce((sum, r) => sum + r.rating, 0) + newReview.rating
    const newAverageRating = totalRatings / (reviews.length + 1)
    setSpot({ ...spot, averageRating: newAverageRating })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{spot.name}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {spot.distance} away
              </CardDescription>
            </div>
            <Badge>{spot.category}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{spot.description}</p>
          <div className="flex items-center space-x-2 mb-6">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="font-medium">{spot.averageRating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviews.length} reviews)</span>
          </div>
          <h3 className="text-lg font-semibold mb-4">Reviews</h3>
          <ReviewList reviews={reviews} />
          <div className="mt-6">
            <h4 className="text-md font-semibold mb-2">Add Your Review</h4>
            <ReviewForm onSubmit={handleReviewSubmit} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

