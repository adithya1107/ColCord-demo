import { io, Socket } from 'socket.io-client'

let socket: Socket
let reconnectAttempts = 0
const MAX_RECONNECT_ATTEMPTS = 5
const RECONNECT_INTERVAL = 5000 // 5 seconds

export const initializeSocket = (token: string) => {
  if (socket) {
    return socket
  }

  socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL as string, {
    auth: { token },
    reconnection: true,
    reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
    reconnectionDelay: RECONNECT_INTERVAL,
  })

  socket.on('connect', () => {
    console.log('Connected to WebSocket server')
    reconnectAttempts = 0
  })

  socket.on('disconnect', (reason) => {
    console.log('Disconnected from WebSocket server:', reason)
  })

  socket.on('connect_error', (error) => {
    console.error('Connection error:', error)
    reconnectAttempts++
    
    if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      console.error('Max reconnection attempts reached')
      socket.disconnect()
    }
  })

  socket.on('error', (error) => {
    console.error('Socket error:', error)
  })

  return socket
}

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not initialized. Call initializeSocket first.')
  }
  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = undefined as any
  }
}

