"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users } from 'lucide-react'
import { SearchBar } from "@/components/search-bar"

interface Activity {
  id: number
  name: string
  type: string
  date: string
  location: string
  participants: number
  capacity: number
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      name: "Campus Clean-up Drive",
      type: "Environmental",
      date: "2024-01-20",
      location: "Main Campus",
      participants: 15,
      capacity: 30
    },
    {
      id: 2,
      name: "Basketball Tournament",
      type: "Sports",
      date: "2024-01-22",
      location: "Sports Complex",
      participants: 40,
      capacity: 50
    },
    {
      id: 3,
      name: "Poetry Reading",
      type: "Cultural",
      date: "2024-01-25",
      location: "Library Hall",
      participants: 20,
      capacity: 40
    }
  ])

  const [filteredActivities, setFilteredActivities] = useState(activities)

  const handleSearch = (query: string) => {
    const filtered = activities.filter(activity =>
      activity.name.toLowerCase().includes(query.toLowerCase()) ||
      activity.type.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredActivities(filtered)
  }

  const handleJoin = (activityId: number) => {
    setActivities(activities.map(activity =>
      activity.id === activityId && activity.participants < activity.capacity
        ? { ...activity, participants: activity.participants + 1 }
        : activity
    ))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Campus Activities</h1>
      
      <SearchBar onSearch={handleSearch} />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredActivities.map((activity) => (
          <Card key={activity.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{activity.name}</CardTitle>
                  <CardDescription className="mt-2">
                    <Badge className="mr-2">{activity.type}</Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(activity.date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4" />
                  {activity.location}
                </div>
                <div className="flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4" />
                  {activity.participants}/{activity.capacity} participants
                </div>
              </div>
              <Button 
                className="w-full" 
                onClick={() => handleJoin(activity.id)}
                disabled={activity.participants >= activity.capacity}
              >
                {activity.participants >= activity.capacity ? 'Full' : 'Join Activity'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

