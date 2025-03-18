"use client"

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface FurlongModalProps {
  onClose: () => void
}

export function FurlongModal({ onClose }: FurlongModalProps) {
  const [nearbyStudents, setNearbyStudents] = useState<string[]>([])

  useEffect(() => {
    // Simulate finding nearby students
    const simulateNearbyStudents = () => {
      const students = ['Alice', 'Bob', 'Charlie', 'David', 'Eve']
      const nearby = students.filter(() => Math.random() > 0.5)
      setNearbyStudents(nearby)
    }

    simulateNearbyStudents()
  }, [])

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Furlong</DialogTitle>
          <DialogDescription>
            Nearby students within a furlong (about 200 meters)
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {nearbyStudents.length > 0 ? (
            <ul className="list-disc pl-4">
              {nearbyStudents.map((student, index) => (
                <li key={index}>{student}</li>
              ))}
            </ul>
          ) : (
            <p>No students found nearby.</p>
          )}
        </div>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  )
}

