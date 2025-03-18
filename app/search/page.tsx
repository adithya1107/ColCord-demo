"use client"

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, FileText, Calendar } from 'lucide-react'

// Mock data for search results
const mockResults = {
  courses: [
    { id: 1, title: "Introduction to Computer Science", professor: "Dr. Smith", code: "CS101" },
    { id: 2, title: "Advanced Algorithms", professor: "Dr. Johnson", code: "CS301" },
  ],
  studyGroups: [
    { id: 1, title: "Machine Learning Study Group", members: 15, nextMeeting: "2024-01-20" },
    { id: 2, title: "Web Development Workshop", members: 10, nextMeeting: "2024-01-22" },
  ],
  resources: [
    { id: 1, title: "Advanced Algorithms Textbook", type: "PDF", size: "5.2 MB" },
    { id: 2, title: "Introduction to Python Programming", type: "Video", duration: "1h 30m" },
  ],
  events: [
    { id: 1, title: "Tech Symposium 2024", date: "2024-02-15", location: "Main Auditorium" },
    { id: 2, title: "Career Fair", date: "2024-03-01", location: "Student Center" },
  ],
}

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="studyGroups">Study Groups</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2" /> Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mockResults.courses.map((course) => (
                  <div key={course.id} className="mb-2">
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{course.professor} - {course.code}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2" /> Study Groups
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mockResults.studyGroups.map((group) => (
                  <div key={group.id} className="mb-2">
                    <h3 className="font-semibold">{group.title}</h3>
                    <p className="text-sm text-muted-foreground">{group.members} members - Next meeting: {group.nextMeeting}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2" /> Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mockResults.resources.map((resource) => (
                  <div key={resource.id} className="mb-2">
                    <h3 className="font-semibold">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">{resource.type} - {resource.size || resource.duration}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2" /> Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mockResults.events.map((event) => (
                  <div key={event.id} className="mb-2">
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.date} - {event.location}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2" /> Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockResults.courses.map((course) => (
                <div key={course.id} className="mb-4 p-4 border-b last:border-b-0">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-muted-foreground">{course.professor} - {course.code}</p>
                  <Button className="mt-2" variant="outline">View Course</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="studyGroups">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2" /> Study Groups
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockResults.studyGroups.map((group) => (
                <div key={group.id} className="mb-4 p-4 border-b last:border-b-0">
                  <h3 className="font-semibold text-lg">{group.title}</h3>
                  <p className="text-muted-foreground">{group.members} members - Next meeting: {group.nextMeeting}</p>
                  <Button className="mt-2" variant="outline">View Group</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2" /> Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockResults.resources.map((resource) => (
                <div key={resource.id} className="mb-4 p-4 border-b last:border-b-0">
                  <h3 className="font-semibold text-lg">{resource.title}</h3>
                  <p className="text-muted-foreground">{resource.type} - {resource.size || resource.duration}</p>
                  <Button className="mt-2" variant="outline">View Resource</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2" /> Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockResults.events.map((event) => (
                <div key={event.id} className="mb-4 p-4 border-b last:border-b-0">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <p className="text-muted-foreground">{event.date} - {event.location}</p>
                  <Button className="mt-2" variant="outline">View Event</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

