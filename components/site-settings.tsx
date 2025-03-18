"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useCollege } from '@/components/college-provider'

export default function SiteSettings() {
  const [userType, setUserType] = useState("student")
  const { collegeName, setCollegeName } = useCollege()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Settings</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Site Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label htmlFor="userType" className="block text-sm font-medium mb-1">User Type</label>
            <Select onValueChange={setUserType} defaultValue={userType}>
              <SelectTrigger id="userType" className="w-full">
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="professor">Professor</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="collegeName" className="block text-sm font-medium mb-1">College Name</label>
            <input
              type="text"
              id="collegeName"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

