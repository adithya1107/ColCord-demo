"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useToast } from "@/components/ui/use-toast"

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  date: string
}

type NotificationsContextType = {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'date' | 'read'>) => void
  removeNotification: (id: string) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearAll: () => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

const MAX_NOTIFICATIONS = 100
const NOTIFICATION_TIMEOUT = 5000
const STORAGE_KEY = 'notifications'

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const loadNotifications = () => {
      try {
        const storedNotifications = localStorage.getItem(STORAGE_KEY)
        if (storedNotifications) {
          const parsedNotifications = JSON.parse(storedNotifications)
          if (Array.isArray(parsedNotifications)) {
            setNotifications(parsedNotifications)
          }
        }
      } catch (error) {
        console.error('Error loading notifications:', error)
      } finally {
        setIsInitialized(true)
      }
    }

    loadNotifications()
  }, [])

  const saveNotifications = useCallback((newNotifications: Notification[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newNotifications))
    } catch (error) {
      console.error('Error saving notifications:', error)
    }
  }, [])

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'date' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      read: false,
    }

    setNotifications(current => {
      const updated = [newNotification, ...current].slice(0, MAX_NOTIFICATIONS)
      saveNotifications(updated)
      return updated
    })

    toast({
      title: notification.title,
      description: notification.message,
      duration: NOTIFICATION_TIMEOUT,
    })
  }, [saveNotifications, toast])

  const removeNotification = useCallback((id: string) => {
    setNotifications(current => {
      const updated = current.filter(n => n.id !== id)
      saveNotifications(updated)
      return updated
    })
  }, [saveNotifications])

  const markAsRead = useCallback((id: string) => {
    setNotifications(current => {
      const updated = current.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
      saveNotifications(updated)
      return updated
    })
  }, [saveNotifications])

  const markAllAsRead = useCallback(() => {
    setNotifications(current => {
      const updated = current.map(n => ({ ...n, read: true }))
      saveNotifications(updated)
      return updated
    })
  }, [saveNotifications])

  const clearAll = useCallback(() => {
    setNotifications([])
    saveNotifications([])
  }, [saveNotifications])

  if (!isInitialized) {
    return null
  }

  const value = {
    notifications,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
  }

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider')
  }
  return context
}

