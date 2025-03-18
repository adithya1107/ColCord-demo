"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useToast } from "@/components/ui/use-toast"

const recentSearches = [
  "Introduction to Computer Science",
  "Machine Learning Study Group",
  "Advanced Algorithms",
  "Physics Lab Report",
]

const suggestions = ["Courses", "Study Groups", "Resources", "Events", "Professors"]

export function EnhancedSearchBar() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const router = useRouter()
  const { toast } = useToast()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runSearch = React.useCallback(
    (searchQuery: string) => {
      setOpen(false)
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
        toast({
          title: "Search Initiated",
          description: `Searching for "${searchQuery}"`,
        })
      } else {
        toast({
          title: "Search Error",
          description: "Please enter a search query.",
          variant: "destructive",
        })
      }
    },
    [router, toast],
  )

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-10 w-full items-center gap-2 rounded-md bg-[#0A0C10] px-3.5 text-sm text-muted-foreground shadow-sm hover:bg-[#1A1D24] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-border/40"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search courses, resources, or study groups...</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search..." value={query} onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {suggestions.map((suggestion) => (
              <CommandItem key={suggestion} onSelect={() => runSearch(suggestion)}>
                <Search className="mr-2 h-4 w-4" />
                {suggestion}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Recent Searches">
            {recentSearches.map((search) => (
              <CommandItem key={search} onSelect={() => runSearch(search)}>
                {search}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

