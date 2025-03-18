"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAchievements } from '@/components/achievement-provider'
import StudyRoomChat from '@/components/study-room-chat'
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from 'lucide-react'

interface StudyRoom {
  id: string
  name: string
  participants: number
  subject: string
}

export default function StudyRoomsPage() {
  const [rooms, setRooms] = useState<StudyRoom[]>([
    { id: '1', name: 'CS101 Study Group', participants: 5, subject: 'Computer Science' },
    { id: '2', name: 'MATH201 Problem Solving', participants: 3, subject: 'Mathematics' },
    { id: '3', name: 'BIO150 Review Session', participants: 7, subject: 'Biology' },
  ])
  const [newRoomName, setNewRoomName] = useState('')
  const [newRoomSubject, setNewRoomSubject] = useState('')
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const { awardXP } = useAchievements()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setIsLoading(true)
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        // In a real app, you would fetch rooms from an API here
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading study rooms:', error)
        toast({
          title: "Error",
          description: "Failed to load study rooms. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    loadRooms()
  }, [toast])

  const createRoom = () => {
    if (newRoomName && newRoomSubject) {
      try {
        const newRoom: StudyRoom = {
          id: Date.now().toString(),
          name: newRoomName,
          participants: 1,
          subject: newRoomSubject,
        }
        setRooms([...rooms, newRoom])
        setNewRoomName('')
        setNewRoomSubject('')
        awardXP(15, "Created a new study room")
        toast({
          title: "Success",
          description: "New study room created successfully.",
        })
      } catch (error) {
        console.error('Error creating study room:', error)
        toast({
          title: "Error",
          description: "Failed to create study room. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const joinRoom = (roomId: string) => {
    setRooms(rooms.map(room =>
      room.id === roomId ? { ...room, participants: room.participants + 1 } : room
    ))
    awardXP(10, "Joined a study room")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Virtual Study Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map(room => (
          <Card key={room.id}>
            <CardHeader>
              <CardTitle>{room.name}</CardTitle>
              <CardDescription>{room.subject}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Participants: {room.participants}</p>
              <Button onClick={() => joinRoom(room.id)}>Join Room</Button>
              <Button onClick={() => setSelectedRoom(room.id)} className="mt-2 w-full">Join Chat</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-6">Create New Room</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Study Room</DialogTitle>
            <DialogDescription>Enter the details for your new study room.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">Name</label>
              <Input
                id="name"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="subject" className="text-right">Subject</label>
              <Input
                id="subject"
                value={newRoomSubject}
                onChange={(e) => setNewRoomSubject(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={createRoom}>Create Room</Button>
        </DialogContent>
      </Dialog>
      {selectedRoom && (
        <Dialog open={!!selectedRoom} onOpenChange={() => setSelectedRoom(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{rooms.find(r => r.id === selectedRoom)?.name} Chat</DialogTitle>
            </DialogHeader>
            <StudyRoomChat roomId={selectedRoom} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

