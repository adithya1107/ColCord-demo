"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Star, Clock, CalendarIcon, MessageSquare, GraduationCap, Award, Search, ChevronRight } from 'lucide-react'
import { useAchievements } from '@/components/achievement-provider'
import { useToast } from "@/components/ui/use-toast"

interface Mentor {
  id: string
  name: string
  image: string
  role: string
  department: string
  expertise: string[]
  rating: number
  reviews: number
  availability: string[]
  bio: string
  achievements: string[]
}

interface Session {
  id: string
  mentorId: string
  mentorName: string
  mentorImage: string
  date: string
  time: string
  topic: string
  status: 'scheduled' | 'completed' | 'cancelled'
}

export default function OneOnOnePage() {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const { awardXP } = useAchievements()
  const { toast } = useToast()

  const mentors: Mentor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      image: "/mentors/sarah.jpg",
      role: "Professor",
      department: "Computer Science",
      expertise: ["Algorithms", "Machine Learning", "Software Engineering"],
      rating: 4.8,
      reviews: 124,
      availability: ["Monday", "Wednesday", "Friday"],
      bio: "20+ years of experience in computer science education and research. Passionate about nurturing the next generation of tech innovators.",
      achievements: [
        "Best Teacher Award 2023",
        "Published 50+ research papers",
        "IEEE Senior Member"
      ]
    },
    // Add more mentors...
  ]

  const mySessions: Session[] = [
    {
      id: "1",
      mentorId: "1",
      mentorName: "Dr. Sarah Johnson",
      mentorImage: "/mentors/sarah.jpg",
      date: "2024-01-20",
      time: "10:00 AM",
      topic: "Career Guidance in AI",
      status: "scheduled"
    },
    // Add more sessions...
  ]

  const filteredMentors = mentors.filter(mentor =>
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleMentorSelect = (mentor: Mentor) => {
    setSelectedMentor(mentor)
    awardXP(5, "Viewed mentor profile")
  }

  const handleBookSession = (mentor: Mentor) => {
    // In a real application, this would open a booking interface
    toast({
      title: "Session Booked",
      description: `You've successfully booked a session with ${mentor.name}.`,
    })
    awardXP(20, "Booked a mentoring session")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Your Mentor</CardTitle>
          <CardDescription>Search by name, expertise, or department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search mentors..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMentors.map((mentor) => (
          <Card 
            key={mentor.id}
            className="cursor-pointer hover:border-primary transition-all"
            onClick={() => handleMentorSelect(mentor)}
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={mentor.image} />
                  <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{mentor.name}</CardTitle>
                  <CardDescription>{mentor.role} • {mentor.department}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((exp, i) => (
                    <Badge key={i} variant="secondary">{exp}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="ml-1 text-sm">{mentor.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {mentor.reviews} reviews
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">View Profile</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Sessions</CardTitle>
          <CardDescription>Track your mentorship sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="space-y-4">
              {mySessions
                .filter(session => session.status === 'scheduled')
                .map(session => (
                  <Card key={session.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={session.mentorImage} />
                          <AvatarFallback>{session.mentorName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold">{session.mentorName}</h4>
                          <p className="text-sm text-muted-foreground">{session.topic}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{session.time}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(session.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
            <TabsContent value="past">
              {/* Similar structure for past sessions */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={!!selectedMentor} onOpenChange={() => setSelectedMentor(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedMentor && (
            <>
              <DialogHeader>
                <DialogTitle>Mentor Profile</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={selectedMentor.image} />
                    <AvatarFallback>{selectedMentor.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{selectedMentor.name}</h2>
                    <p className="text-muted-foreground">{selectedMentor.role} • {selectedMentor.department}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-medium">{selectedMentor.rating}</span>
                      <span className="text-muted-foreground">({selectedMentor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Expertise</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedMentor.expertise.map((exp, i) => (
                          <Badge key={i} variant="secondary">{exp}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Availability</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedMentor.availability.map((day, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{day}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{selectedMentor.bio}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedMentor.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-primary" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Schedule a Session</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h4 className="font-semibold mb-4">Select Date</h4>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="rounded-md border"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-4">Available Time Slots</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"].map((time) => (
                            <Button key={time} variant="outline" className="w-full">
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => handleBookSession(selectedMentor)}>
                      Book Session
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

