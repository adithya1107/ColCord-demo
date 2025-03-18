"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCollege } from '@/components/college-provider'

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const { collegeName } = useCollege()

  const courses = [
    { id: 1, name: "Introduction to Computer Science", code: "CS101", professor: "Dr. Smith", department: "Computer Science" },
    { id: 2, name: "Advanced Mathematics", code: "MATH301", professor: "Dr. Johnson", department: "Mathematics" },
    { id: 3, name: "Modern Literature", code: "LIT201", professor: "Prof. Williams", department: "Literature" },
    { id: 4, name: "Organic Chemistry", code: "CHEM202", professor: "Dr. Brown", department: "Chemistry" },
    { id: 5, name: "Introduction to Psychology", code: "PSY101", professor: "Dr. Davis", department: "Psychology" },
    { id: 6, name: "World History", code: "HIST301", professor: "Prof. Anderson", department: "History" },
  ]

  const filteredCourses = activeTab === "all" ? courses : courses.filter(course => course.department.toLowerCase() === activeTab)

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-foreground">{collegeName} Courses</h1>
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="computer science">Computer Science</TabsTrigger>
          <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
          <TabsTrigger value="literature">Literature</TabsTrigger>
          <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription>{course.code}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-2">{course.professor}</div>
                  <div className="text-sm text-muted-foreground mb-4">{course.department}</div>
                  <Button className="w-full">View Course</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

