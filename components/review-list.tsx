import { StarIcon } from 'lucide-react'

interface Review {
  id: number
  rating: number
  comment: string
  author: string
  date: string
}

interface ReviewListProps {
  reviews: Review[]
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-4">
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-4 w-4 ${
                    star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{review.author}</span>
            <span className="text-sm text-muted-foreground">{review.date}</span>
          </div>
          <p className="mt-2 text-sm">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}

