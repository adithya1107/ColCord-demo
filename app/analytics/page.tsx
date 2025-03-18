"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCollege } from '@/components/college-provider'
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function AnalyticsPage() {
  const { collegeName } = useCollege()
  const [dateRange, setDateRange] = useState('week')

  const attendanceData = [
    { month: "Jan", attendance: 92 },
    { month: "Feb", attendance: 88 },
    { month: "Mar", attendance: 95 },
    { month: "Apr", attendance: 91 },
    { month: "May", attendance: 87 },
    { month: "Jun", attendance: 89 },
  ]

  const gradeDistributionData = [
    { grade: "A", count: 25 },
    { grade: "B", count: 35 },
    { grade: "C", count: 20 },
    { grade: "D", count: 15 },
    { grade: "F", count: 5 },
  ]

  const courseEngagementData = [
    { course: "CS101", engagement: 85 },
    { course: "MATH201", engagement: 78 },
    { course: "HIST301", engagement: 92 },
    { course: "PHYS102", engagement: 80 },
    { course: "ENG205", engagement: 88 },
  ]

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-foreground">{collegeName} Analytics</h1>
      <Select value={dateRange} onValueChange={setDateRange}>
        <SelectTrigger className="w-[180px] mb-4">
          <SelectValue placeholder="Select date range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="week">Last Week</SelectItem>
          <SelectItem value="month">Last Month</SelectItem>
          <SelectItem value="year">Last Year</SelectItem>
        </SelectContent>
      </Select>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="attendance" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gradeDistributionData}>
                <XAxis dataKey="grade" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Course Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseEngagementData}>
                <XAxis dataKey="course" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="engagement" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

