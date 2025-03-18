"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin } from 'lucide-react'
import { SearchBar } from "@/components/search-bar"

interface TouristSpot {
  id: number
  name: string
  description: string
  distance: string
  category: string
}

export default function TouristSpotsPage() {
  const [spots, setSpots] = useState<TouristSpot[]>([
    {
      id: 1,
      name: "City Heritage Museum",
      description: "A fascinating museum showcasing local history",
      distance: "1.2 km",
      category: "Cultural"
    },
    {
      id: 2,
      name: "Central Park",
      description: "Beautiful park with walking trails",
      distance: "0.8 km",
      category: "Nature"
    },
    {
      id: 3,
      name: "Adventure Zone",
      description: "Fun activities and games",
      distance: "2.1 km",
      category: "Entertainment"
    }
  ])

  const [filteredSpots, setFilteredSpots] = useState(spots)
  const [activeCategory, setActiveCategory] = useState("all")

  const handleSearch = (query: string) => {
    const filtered = spots.filter(spot =>
      spot.name.toLowerCase().includes(query.toLowerCase()) ||
      spot.description.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredSpots(filtered)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    if (category === "all") {
      setFilteredSpots(spots)
    } else {
      const filtered = spots.filter(spot => spot.category.toLowerCase() === category.toLowerCase())
      setFilteredSpots(filtered)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tourist Spots</h1>
      
      <SearchBar onSearch={handleSearch} />
      
      <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Places</TabsTrigger>
          <TabsTrigger value="cultural">Cultural</TabsTrigger>
          <TabsTrigger value="nature">Nature</TabsTrigger>
          <TabsTrigger value="entertainment">Entertainment</TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory} className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSpots.map((spot) => (
              <Card key={spot.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{spot.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {spot.distance} away
                      </CardDescription>
                    </div>
                    <Badge>{spot.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{spot.description}</p>
                  <Button className="w-full mt-4">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

