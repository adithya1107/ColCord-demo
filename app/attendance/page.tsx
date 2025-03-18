"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCollege } from '@/components/college-provider'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { QrScanner } from '@/components/qr-scanner'
import { useToast } from "@/components/ui/use-toast"

interface AttendanceRecord {
  id: string
  courseCode: string
  courseName: string
  date: string
  status: 'present' | 'absent' | 'late'
}

export default function AttendancePage() {
  const { collegeName } = useCollege()
  const [showScanner, setShowScanner] = useState(false)
  const [lastScanned, setLastScanned] = useState<string | null>(null)
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: "1",
      courseCode: "CS101",
      courseName: "Introduction to Computer Science",
      date: "2024-01-10",
      status: "present"
    },
    {
      id: "2",
      courseCode: "MATH201",
      courseName: "Calculus II",
      date: "2024-01-09",
      status: "late"
    },
    {
      id: "3",
      courseCode: "PHY101",
      courseName: "Physics I",
      date: "2024-01-08",
      status: "absent"
    }
  ])
  const { toast } = useToast()

  const getStatusBadge = (status: AttendanceRecord['status']) => {
    const variants = {
      present: 'default',
      absent: 'destructive',
      late: 'warning'
    }
    return <Badge variant={variants[status]}>{status}</Badge>
  }

  const handleScan = (data: string | null) => {
    if (data) {
      toast({
        title: "Attendance Marked",
        description: `Successfully marked attendance for ${data}`,
      })
      setShowScanner(false)
      setLastScanned(data)
      // Here you would typically update the attendance record
    }
  }

  const handleError = (error: Error) => {
    console.error(error)
    toast({
      title: "Error",
      description: "Failed to scan QR code. Please try again.",
      variant: "destructive",
    })
  }

  return (
    <div className="flex flex-col gap-4 p-8">
      <h1 className="text-3xl font-bold text-foreground">{collegeName} Attendance System</h1>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>QR Attendance</CardTitle>
            <CardDescription>Scan the QR code displayed in your class to mark your attendance</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Button 
              size="lg" 
              onClick={() => setShowScanner(true)}
              className="w-full md:w-auto"
            >
              Start Scanning
            </Button>
            {lastScanned && (
              <p className="text-sm text-muted-foreground">
                Last marked attendance: {lastScanned}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Statistics</CardTitle>
            <CardDescription>Your attendance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-500">85%</p>
                <p className="text-sm text-muted-foreground">Present</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-500">10%</p>
                <p className="text-sm text-muted-foreground">Late</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-500">5%</p>
                <p className="text-sm text-muted-foreground">Absent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
            <CardDescription>Your recent attendance records</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {attendanceRecords.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div>
                      <h3 className="font-semibold">{record.courseName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {record.courseCode} - {record.date}
                      </p>
                    </div>
                    {getStatusBadge(record.status)}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showScanner} onOpenChange={setShowScanner}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            {showScanner && (
              <QrScanner onScan={handleScan} onError={handleError} />
            )}
            <Button variant="outline" onClick={() => setShowScanner(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

