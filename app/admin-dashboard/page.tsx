"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentActivity } from "@/components/recent-activity"
import { useCollege } from '@/components/college-provider'
import { MetricCard } from "@/components/metric-card"
import { Badge } from "@/components/ui/badge"
import { Users, GraduationCap, Calendar } from 'lucide-react'

export default function AdminDashboardPage() {
  const { collegeName } = useCollege()

  const students = [
    {
      department: "Computer Science",
      total: 450,
      newEnrollments: 50,
      graduating: 100,
      yearwise: {
        "1st Year": 120,
        "2nd Year": 110,
        "3rd Year": 120,
        "4th Year": 100
      }
    },
    // Add more department data...
  ]

  const courses = [
    {
      department: "Computer Science",
      undergraduate: 45,
      graduate: 20,
      professors: 15,
      activeStudents: 450
    },
    // Add more course data...
  ]

  const faculty = [
    {
      department: "Computer Science",
      professors: 15,
      assistantProfessors: 10,
      researchers: 5,
      newHires: 3
    },
    // Add more faculty data...
  ]

  const events = [
    {
      title: "Tech Symposium 2024",
      date: "2024-02-15",
      type: "academic",
      department: "Computer Science",
      attendees: 200,
      status: "upcoming"
    },
    // Add more events...
  ]

  const metrics = [
    {
      title: "Total Students",
      value: "1,234",
      subtext: "+5% from last semester",
      details: students,
      renderDetail: (data: any) => (
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">{data.department}</h3>
            <Badge>+{data.newEnrollments} new</Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Total: {data.total}
            </div>
            <div className="flex items-center">
              <GraduationCap className="mr-2 h-4 w-4" />
              Graduating: {data.graduating}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Year-wise Distribution</p>
            {Object.entries(data.yearwise).map(([year, count]) => (
              <div key={year} className="flex justify-between text-sm">
                <span>{year}</span>
                <span>{count} students</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Active Courses",
      value: "87",
      subtext: "12 new this semester",
      details: courses,
      renderDetail: (data: any) => (
        <div className="space-y-2">
          <h3 className="font-semibold">{data.department}</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p>Undergraduate Courses: {data.undergraduate}</p>
              <p>Graduate Courses: {data.graduate}</p>
            </div>
            <div>
              <p>Professors: {data.professors}</p>
              <p>Active Students: {data.activeStudents}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Faculty Members",
      value: "56",
      subtext: "3 new hires",
      details: faculty,
      renderDetail: (data: any) => (
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">{data.department}</h3>
            <Badge variant="outline">+{data.newHires} new</Badge>
          </div>
          <div className="space-y-1 text-sm">
            <p>Professors: {data.professors}</p>
            <p>Assistant Professors: {data.assistantProfessors}</p>
            <p>Researchers: {data.researchers}</p>
          </div>
        </div>
      )
    },
    {
      title: "Upcoming Events",
      value: "8",
      subtext: "2 major conferences",
      details: events,
      renderDetail: (event: any) => (
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">{event.title}</h3>
            <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
              {event.status}
            </Badge>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4" />
            {new Date(event.date).toLocaleDateString()}
          </div>
          <p className="text-sm">Department: {event.department}</p>
          <p className="text-sm">Type: {event.type}</p>
          <p className="text-sm">Expected Attendees: {event.attendees}</p>
        </div>
      )
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-foreground">{collegeName} Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Institution Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview userType="admin" />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from across the institution</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity userType="admin" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

