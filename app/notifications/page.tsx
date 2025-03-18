"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCollege } from '@/components/college-provider'

export default function NotificationsPage() {
  const { collegeName } = useCollege()
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New assignment posted in CS101", read: false, date: new Date() },
    { id: 2, message: "Reminder: HIST301 presentation due tomorrow", read: false, date: new Date() },
    { id: 3, message: "Grade posted for MATH201 midterm", read: true, date: new Date() },
    { id: 4, message: "Campus event: Annual Tech Fair next week", read: false, date: new Date() },
  ])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-foreground">{collegeName} Notifications</h1>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Your Notifications</CardTitle>
          <Button onClick={markAllAsRead}>Mark All as Read</Button>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <ul className="space-y-4">
              {notifications.map(notif => (
                <li key={notif.id} className={`p-3 rounded-lg ${notif.read ? 'bg-muted' : 'bg-primary/10'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={notif.read ? 'text-muted-foreground' : ''}>{notif.message}</p>
                      <p className="text-sm text-muted-foreground mt-1">{new Date(notif.date).toLocaleString()}</p>
                    </div>
                    <div>
                      {!notif.read && (
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(notif.id)} className="mr-2">
                          Mark as Read
                        </Button>
                      )}
                      <Button variant="destructive" size="sm" onClick={() => deleteNotification(notif.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

