import { cn } from "@/lib/utils"

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only",
        "absolute left-4 top-4 z-50",
        "bg-background px-4 py-2 text-foreground",
        "rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      )}
    >
      Skip to main content
    </a>
  )
}

