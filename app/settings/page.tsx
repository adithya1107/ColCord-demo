"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const [email, setEmail] = useState("user@example.com")
  const [notifications, setNotifications] = useState(true)
  const { toast } = useToast()

  const handleSave = () => {
    // Here you would typically save the settings to a backend
    toast({
      title: "Settings Saved",
      description: "Your settings have been successfully updated.",
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            <Label htmlFor="notifications">Enable notifications</Label>
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}

