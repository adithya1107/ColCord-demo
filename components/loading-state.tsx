import { Skeleton } from "@/components/ui/skeleton"

interface LoadingStateProps {
  type?: "card" | "list" | "table"
  count?: number
}

export function LoadingState({ type = "card", count = 3 }: LoadingStateProps) {
  if (type === "card") {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-20 w-full mb-4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (type === "list") {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[160px]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (type === "table") {
    return (
      <div className="border rounded-lg">
        <div className="border-b p-4">
          <Skeleton className="h-4 w-full" />
        </div>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="p-4 border-b last:border-0">
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    )
  }

  return null
}

