"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSocket } from '@/components/socket-provider'

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
}

interface StudyRoomChatProps {
  roomId: string
}

export default function StudyRoomChat({ roomId }: StudyRoomChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const { socket } = useSocket()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (socket) {
      socket.emit('join_room', roomId)

      socket.on('new_message', (message: Message) => {
        setMessages(prev => [...prev, message])
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      })

      return () => {
        socket.emit('leave_room', roomId)
        socket.off('new_message')
      }
    }
  }, [socket, roomId])

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && socket) {
      const message = {
        id: Date.now().toString(),
        sender: "You", // In a real app, this would be the user's name
        content: newMessage,
        timestamp: new Date().toISOString()
      }
      socket.emit('send_message', { roomId, message })
      setNewMessage("")
    }
  }

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <ScrollArea className="flex-grow mb-4">
          {messages.map((message) => (
            <div key={message.id} className="mb-2">
              <span className="font-bold">{message.sender}: </span>
              <span>{message.content}</span>
            </div>
          ))}
          <div ref={bottomRef} />
        </ScrollArea>
        <div className="flex">
          <Input 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} className="ml-2">Send</Button>
        </div>
      </CardContent>
    </Card>
  )
}

