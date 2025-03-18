"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentActivity } from "@/components/recent-activity"
import { useCollege } from '@/components/college-provider'
import { Button } from "@/components/ui/button"
import { FurlongModal } from "@/components/furlong-modal"
import { MetricCard } from "@/components/metric-card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from 'lucide-react'
import type { Course, Task, Project, Message } from "@/types/dashboard"

export default function StudentDashboardPage() {
  const { collegeName } = useCollege()
  const [showFurlongModal, setShowFurlongModal] = useState(false)

  // Sample data - In a real app, this would come from an API
  const courses: Course[] = [
    {
      id: "1",
      name: "Introduction to Computer Science",
      code: "CS101",
      professor: "Dr. Johnson",
      schedule: "Mon/Wed 10:00 AM",
      description: "Fundamental concepts of programming and computer science",
      assignments: 3
    },
    {
      id: "2",
      name: "Calculus I",
      code: "MATH101",
      professor: "Dr. Smith",
      schedule: "Tue/Thu 11:00 AM",
      description: "Introduction to differential and integral calculus",
      assignments: 2
    },
    // Add more courses...
  ]

  const tasks: Task[] = [
    {
      id: "1",
      title: "CS101 Assignment 3",
      course: "CS101",
      dueDate: "2024-01-15",
      priority: "high",
      status: "pending"
    },
    {
      id: "2",
      title: "MATH101 Problem Set",
      course: "MATH101",
      dueDate: "2024-01-14",
      priority: "medium",
      status: "pending"
    },
    // Add more tasks...
  ]

  const projects: Project[] = [
    {
      id: "1",
      name: "Group Project: Database Design",
      course: "CS101",
      members: ["John", "Alice", "Bob"],
      deadline: "2024-02-01",
      status: "in-progress"
    },
    // Add more projects...
  ]

  const messages: Message[] = [
    {
      id: "1",
      sender: "Prof. Johnson",
      content: "Your last assignment was excellent. Keep up the good work!",
      timestamp: "2024-01-10T10:00:00",
      read: false,
      course: "CS101"
    },
    // Add more messages...
  ]

  const metrics = [
    {
      title: "Courses Enrolled",
      value: courses.length.toString(),
      subtext: "2 new this semester",
      details: courses,
      renderDetail: (course: Course) => (
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{course.name}</h3>
              <p className="text-sm text-muted-foreground">{course.code} - {course.professor}</p>
            </div>
            <Badge>{course.assignments} assignments</Badge>
          </div>
          <p className="text-sm">{course.description}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            {course.schedule}
          </div>
        </div>
      )
    },
    {
      title: "Upcoming Tasks",
      value: tasks.filter(t => t.status === "pending").length.toString(),
      subtext: "3 due this week",
      details: tasks.filter(t => t.status === "pending"),
      renderDetail: (task: Task) => (
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">{task.title}</h3>
            <Badge variant={task.priority === 'high' ? 'destructive' : 'default'}>
              {task.priority}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">Course: {task.course}</p>
          <p className="text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
        </div>
      )
    },
    {
      title: "Group Projects",
      value: projects.length.toString(),
      subtext: "1 new collaboration",
      details: projects,
      renderDetail: (project: Project) => (
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">{project.name}</h3>
            <Badge variant={project.status === 'in-progress' ? 'default' : 'secondary'}>
              {project.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">Course: {project.course}</p>
          <p className="text-sm">Team: {project.members.join(", ")}</p>
          <p className="text-sm">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
        </div>
      )
    },
    {
      title: "Unread Messages",
      value: messages.filter(m => !m.read).length.toString(),
      subtext: "5 from professors",
      details: messages.filter(m => !m.read),
      renderDetail: (message: Message) => (
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">{message.sender}</h3>
            <span className="text-sm text-muted-foreground">
              {new Date(message.timestamp).toLocaleString()}
            </span>
          </div>
          {message.course && (
            <p className="text-sm text-muted-foreground">Course: {message.course}</p>
          )}
          <p className="text-sm">{message.content}</p>
        </div>
      )
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">{collegeName} Student Dashboard</h1>
        <Button onClick={() => setShowFurlongModal(true)}>Furlong</Button>
      </div>
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
            <Overview userType="student" />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your college community</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity userType="student" />
          </CardContent>
        </Card>
      </div>
      {showFurlongModal && <FurlongModal onClose={() => setShowFurlongModal(false)} />}
    </div>
  )
}

