import { AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ErrorDisplayProps {
  title?: string
  message?: string
  retry?: () => void
}

export function ErrorDisplay({ 
  title = "Something went wrong", 
  message = "An error occurred while loading this content. Please try again.",
  retry
}: ErrorDisplayProps) {
  return (
    <Alert variant="destructive" className="my-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="flex items-center gap-4">
        {message}
        {retry && (
          <Button variant="outline" size="sm" onClick={retry}>
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}

