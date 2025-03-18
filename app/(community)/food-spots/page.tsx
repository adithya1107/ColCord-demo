"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Utensils } from 'lucide-react'
import { SearchBar } from "@/components/search-bar"

interface FoodSpot {
  id: number
  name: string
  description: string
  type: string
  priceRange: string
}

export default function FoodSpotsPage() {
  const [spots, setSpots] = useState<FoodSpot[]>([
    {
      id: 1,
      name: "Campus Cafe",
      description: "Coffee and quick bites",
      type: "Cafe",
      priceRange: "₹₹"
    },
    {
      id: 2,
      name: "Spice Garden",
      description: "Authentic Indian cuisine",
      type: "Restaurant",
      priceRange: "₹₹₹"
    },
    {
      id: 3,
      name: "Street Bites",
      description: "Popular street food spot",
      type: "Street Food",
      priceRange: "₹"
    }
  ])

  const [filteredSpots, setFilteredSpots] = useState(spots)
  const [activeType, setActiveType] = useState("all")

  const handleSearch = (query: string) => {
    const filtered = spots.filter(spot =>
      spot.name.toLowerCase().includes(query.toLowerCase()) ||
      spot.description.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredSpots(filtered)
  }

  const handleTypeChange = (type: string) => {
    setActiveType(type)
    if (type === "all") {
      setFilteredSpots(spots)
    } else {
      const filtered = spots.filter(spot => spot.type.toLowerCase() === type.toLowerCase())
      setFilteredSpots(filtered)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Food Spots</h1>
      
      <SearchBar onSearch={handleSearch} />
      
      <Tabs value={activeType} onValueChange={handleTypeChange} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="cafe">Cafes</TabsTrigger>
          <TabsTrigger value="restaurant">Restaurants</TabsTrigger>
          <TabsTrigger value="street-food">Street Food</TabsTrigger>
        </TabsList>

        <TabsContent value={activeType} className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSpots.map((spot) => (
              <Card key={spot.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{spot.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Utensils className="h-4 w-4 mr-1" />
                        {spot.type}
                      </CardDescription>
                    </div>
                    <Badge>{spot.priceRange}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{spot.description}</p>
                  <Button className="w-full mt-4">View Menu</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

