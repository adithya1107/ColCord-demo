"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAchievements } from '@/components/achievement-provider'

interface TutorProfile {
  id: string
  name: string
  subject: string
  rate: number
  rating: number
  bio: string
}

export default function PeerTutoringPage() {
  const [tutors, setTutors] = useState<TutorProfile[]>([
    { id: '1', name: 'Alice Johnson', subject: 'Mathematics', rate: 20, rating: 4.8, bio: 'Math major with a passion for teaching...' },
    { id: '2', name: 'Bob Smith', subject: 'Computer Science', rate: 25, rating: 4.7, bio: 'Experienced programmer offering coding tutorials...' },
    { id: '3', name: 'Carol Williams', subject: 'Physics', rate: 22, rating: 4.9, bio: 'Physics PhD student specializing in mechanics and electromagnetism...' },
  ])
  const [selectedTutor, setSelectedTutor] = useState<TutorProfile | null>(null)
  const { awardXP } = useAchievements()

  const viewTutorProfile = (tutor: TutorProfile) => {
    setSelectedTutor(tutor)
    awardXP(5, "Viewed tutor profile")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Peer Tutoring Marketplace</h1>
      <Tabs defaultValue="find" className="mb-6">
        <TabsList>
          <TabsTrigger value="find">Find a Tutor</TabsTrigger>
          <TabsTrigger value="offer">Offer Tutoring</TabsTrigger>
        </TabsList>
        <TabsContent value="find">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tutors.map(tutor => (
              <Card key={tutor.id} className="cursor-pointer" onClick={() => viewTutorProfile(tutor)}>
                <CardHeader>
                  <Avatar className="w-16 h-16 mb-2">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${tutor.id}`} />
                    <AvatarFallback>{tutor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{tutor.name}</CardTitle>
                  <CardDescription>{tutor.subject}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">${tutor.rate}/hour</p>
                  <Badge>Rating: {tutor.rating}/5</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="offer">
          <Card>
            <CardHeader>
              <CardTitle>Offer Your Tutoring Services</CardTitle>
              <CardDescription>Share your knowledge and earn</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault()
                // In a real application, this would submit the form to create a new tutor profile
                console.log('Submitting tutor application')
                awardXP(25, "Offered tutoring services")
              }} className="space-y-4">
                <Input placeholder="Your Name" required />
                <Input placeholder="Subject" required />
                <Input type="number" placeholder="Hourly Rate" required />
                <Input placeholder="Brief Bio" required />
                <Button type="submit">Submit Application</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Dialog open={!!selectedTutor} onOpenChange={() => setSelectedTutor(null)}>
        <DialogContent>
          {selectedTutor && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedTutor.name}</DialogTitle>
                <DialogDescription>{selectedTutor.subject} Tutor</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <p className="font-semibold mb-2">${selectedTutor.rate}/hour</p>
                <Badge className="mb-4">Rating: {selectedTutor.rating}/5</Badge>
                <p>{selectedTutor.bio}</p>
              </div>
              <Button className="mt-4" onClick={() => {
                // In a real application, this would open a booking interface
                console.log(`Booking session with ${selectedTutor.name}`)
                awardXP(20, "Booked a tutoring session")
              }}>
                Book Session
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

