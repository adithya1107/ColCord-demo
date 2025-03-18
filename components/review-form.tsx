"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StarIcon } from 'lucide-react'

interface ReviewFormProps {
  onSubmit: (review: { rating: number; comment: string }) => void
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ rating, comment })
    setRating(0)
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`h-6 w-6 cursor-pointer ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
      <Textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <Button type="submit">Submit Review</Button>
    </form>
  )
}

