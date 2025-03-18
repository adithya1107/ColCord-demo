"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useNotifications } from "@/components/notifications-provider"
import { useToast } from "@/components/ui/use-toast"

export function NotificationsCenter() {
  const { notifications, markAsRead, clearAll } = useNotifications()
  const { toast } = useToast()

  const handleMarkAsRead = (id: string) => {
    markAsRead(id)
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    })
  }

  const handleClearAll = () => {
    clearAll()
    toast({
      title: "All notifications cleared",
      description: "All notifications have been cleared.",
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-orange-500 text-[10px] font-medium text-white flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {notifications.length === 0 ? (
          <DropdownMenuItem>No new notifications</DropdownMenuItem>
        ) : (
          <>
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} onClick={() => handleMarkAsRead(notification.id)}>
                <div className="flex flex-col">
                  <span className="font-semibold">{notification.title}</span>
                  <span className="text-sm text-muted-foreground">{notification.message}</span>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem onClick={handleClearAll}>Clear all</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

