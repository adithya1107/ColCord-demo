"use client"

import { useState, useEffect } from 'react'

interface CollaborativeEditor {
  text: string
  setText: (newText: string) => void
  connectToRoom: (roomId: string) => void
  disconnectFromRoom: () => void
}

export function useCollaborativeTextEditor(): CollaborativeEditor {
  const [text, setText] = useState('')
  const [socket, setSocket] = useState<WebSocket | null>(null)

  const connectToRoom = (roomId: string) => {
    const newSocket = new WebSocket(`wss://your-collab-server.com/room/${roomId}`)

    newSocket.onopen = () => {
      console.log(`Connected to room ${roomId}`)
    }

    newSocket.onmessage = (event) => {
      setText(event.data)
    }

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error)
    }

    newSocket.onclose = () => {
      console.log("Disconnected from room")
    }

    setSocket(newSocket)
  }

  const disconnectFromRoom = () => {
    if (socket) {
      socket.close()
      setSocket(null)
      setText('')
    }
  }

  useEffect(() => {
    if (!socket) return

    const handleTextChange = (event: Event) => {
      const inputText = (event.target as HTMLTextAreaElement).value
      setText(inputText)
      socket.send(inputText)
    }

    return () => {
      socket.close()
    }
  }, [socket])

  return { text, setText, connectToRoom, disconnectFromRoom }
}