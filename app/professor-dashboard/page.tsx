"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentActivity } from "@/components/recent-activity"
import { useCollege } from '@/components/college-provider'
import { MetricCard } from "@/components/metric-card"
import { Badge } from "@/components/ui/badge"
import { Calendar, GraduationCap, Clock } from 'lucide-react'

export default function ProfessorDashboardPage() {
  const { collegeName } = useCollege()

  const courses = [
    {
      id: "1",
      name: "Advanced Algorithms",
      code: "CS401",
      type: "graduate",
      students: 25,
      schedule: "Mon/Wed 2:00 PM",
      nextClass: "2024-01-15T14:00:00"
    },
    // Add more courses...
  ]

  const submissions = [
    {
      id: "1",
      title: "Assignment 2: Sorting Algorithms",
      course: "CS401",
      student: "John Doe",
      submitted: "2024-01-10T15:30:00",
      status: "pending"
    },
    // Add more submissions...
  ]

  const officeHours = [
    {
      id: "1",
      day: "Monday",
      time: "10:00 AM - 12:00 PM",
      appointments: 2,
      location: "Room 301"
    },
    // Add more office hours...
  ]

  const research = [
    {
      id: "1",
      title: "Machine Learning Applications in Education",
      status: "in-progress",
      collaborators: 3,
      nextMilestone: "2024-02-01"
    },
    // Add more research projects...
  ]

  const metrics = [
    {
      title: "Active Courses",
      value: courses.length.toString(),
      subtext: "1 graduate, 2 undergraduate",
      details: courses,
      renderDetail: (course: any) => (
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{course.name}</h3>
              <p className="text-sm text-muted-foreground">{course.code}</p>
            </div>
            <Badge variant={course.type === 'graduate' ? 'default' : 'secondary'}>
              {course.type}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <GraduationCap className="mr-2 h-4 w-4" />
              {course.students} students
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {course.schedule}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Next class: {new Date(course.nextClass).toLocaleString()}
          </p>
        </div>
      )
    },
    {
      title: "Student Submissions",
      value: submissions.filter(s => s.status === "pending").length.toString(),
      subtext: "12 need grading",
      details: submissions.filter(s => s.status === "pending"),
      renderDetail: (submission: any) => (
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">{submission.title}</h3>
            <Badge>needs grading</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Course: {submission.course}</p>
          <p className="text-sm">Student: {submission.student}</p>
          <p className="text-sm text-muted-foreground">
            Submitted: {new Date(submission.submitted).toLocaleString()}
          </p>
        </div>
      )
    },
    {
      title: "Office Hours",
      value: officeHours.length.toString(),
      subtext: "2 slots available today",
      details: officeHours,
      renderDetail: (hours: any) => (
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">{hours.day}</h3>
            <Badge variant="outline">{hours.appointments} appointments</Badge>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4" />
            {hours.time}
          </div>
          <p className="text-sm text-muted-foreground">Location: {hours.location}</p>
        </div>
      )
    },
    {
      title: "Research Updates",
      value: research.length.toString(),
      subtext: "1 new publication",
      details: research,
      renderDetail: (project: any) => (
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">{project.title}</h3>
            <Badge variant={project.status === 'in-progress' ? 'default' : 'secondary'}>
              {project.status}
            </Badge>
          </div>
          <p className="text-sm">Collaborators: {project.collaborators}</p>
          <p className="text-sm text-muted-foreground">
            Next milestone: {new Date(project.nextMilestone).toLocaleDateString()}
          </p>
        </div>
      )
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-foreground">{collegeName} Professor Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview userType="professor" />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your courses and research</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity userType="professor" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

