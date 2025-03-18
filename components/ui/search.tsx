"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { SearchIcon } from 'lucide-react'

export interface SearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          className={cn("pl-8", className)}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)

Search.displayName = "Search"

export { Search }

