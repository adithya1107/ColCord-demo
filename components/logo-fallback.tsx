import { cn } from "@/lib/utils"

interface LogoFallbackProps {
  className?: string
}

export function LogoFallback({ className }: LogoFallbackProps) {
  return (
    <div className={cn(
      "flex items-center justify-center border-2 border-primary text-primary font-bold",
      className
    )}>
      ColCord
    </div>
  )
}

