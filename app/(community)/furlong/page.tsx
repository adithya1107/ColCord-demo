"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Users, RefreshCw } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface NearbyStudent {
  id: string
  name: string
  distance: number
  avatar: string
}

export default function FurlongPage() {
  const [nearbyStudents, setNearbyStudents] = useState<NearbyStudent[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchRadius, setSearchRadius] = useState(200) // Default to 200 meters (1 furlong)
  const { toast } = useToast()

  const findNearbyStudents = () => {
    setIsSearching(true)
    // Simulating an API call to find nearby students
    setTimeout(() => {
      const mockStudents: NearbyStudent[] = [
        { id: '1', name: 'Alice Johnson', distance: 50, avatar: '/avatars/alice.jpg' },
        { id: '2', name: 'Bob Smith', distance: 100, avatar: '/avatars/bob.jpg' },
        { id: '3', name: 'Charlie Brown', distance: 150, avatar: '/avatars/charlie.jpg' },
        { id: '4', name: 'Diana Prince', distance: 180, avatar: '/avatars/diana.jpg' },
      ]
      setNearbyStudents(mockStudents)
      setIsSearching(false)
      toast({
        title: "Search Complete",
        description: `Found ${mockStudents.length} students within ${searchRadius} meters.`,
      })
    }, 2000)
  }


  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Furlong</h1>
      <Card>
        <CardHeader>
          <CardTitle>Find Nearby Students</CardTitle>
          <CardDescription>Discover students within your specified radius</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Label htmlFor="search-radius">Search Radius (meters)</Label>
              <Input
                id="search-radius"
                type="number"
                value={searchRadius}
                onChange={(e) => setSearchRadius(Number(e.target.value))}
                min={1}
                max={1000}
              />
            </div>
            <Button onClick={findNearbyStudents} disabled={isSearching}>
              {isSearching ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <MapPin className="mr-2 h-4 w-4" />
              )}
              {isSearching ? 'Searching...' : 'Find Students'}
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Nearby Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                {nearbyStudents.length > 0 ? (
                  nearbyStudents.map((student) => (
                    <div key={student.id} className="flex items-center space-x-4 mb-4 p-2 hover:bg-accent rounded-lg transition-colors">
                      <Avatar>
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.distance}m away</p>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">No students found nearby.</p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

