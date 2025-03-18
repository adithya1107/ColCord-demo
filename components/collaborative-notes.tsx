"use client"

import { useState, useEffect } from 'react'
import { useCollaborativeTextEditor } from '@/hooks/use-collaborative-text-editor'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function CollaborativeNotes() {
  const [roomId, setRoomId] = useState('')
  const [joined, setJoined] = useState(false)
  const { text, setText, connectToRoom, disconnectFromRoom } = useCollaborativeTextEditor()
  const { toast } = useToast()

  const joinRoom = () => {
    if (!roomId) {
      toast({
        title: "Error",
        description: "Please enter a room ID",
        variant: "destructive",
      })
      return
    }
    connectToRoom(roomId)
    setJoined(true)
  }

  const leaveRoom = () => {
    disconnectFromRoom()
    setJoined(false)
    setRoomId('')
    setText('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Collaborative Notes</CardTitle>
      </CardHeader>
      <CardContent>
        {!joined ? (
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Enter room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <Button onClick={joinRoom}>Join Room</Button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <textarea
                className="w-full h-64 p-2 border rounded"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing your collaborative notes here..."
              />
            </div>
            <Button variant="destructive" onClick={leaveRoom}>Leave Room</Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

