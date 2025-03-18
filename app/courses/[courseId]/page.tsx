"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Clock, Users, BookOpen, GraduationCap, FileText, MessageSquare, Bell, Download } from 'lucide-react'

interface Assignment {
  id: string
  title: string
  dueDate: string
  status: 'pending' | 'submitted' | 'graded'
  grade?: number
  feedback?: string
  description: string
  attachments: { name: string; url: string }[]
}

interface Material {
  id: string
  title: string
  type: 'pdf' | 'video' | 'document'
  uploadedAt: string
  size: string
  url: string
  description: string
}

interface Announcement {
  id: string
  title: string
  content: string
  date: string
  author: string
  important: boolean
}

interface Discussion {
  id: string
  title: string
  author: string
  date: string
  replies: number
  lastReply: string
  content: string
}

interface Student {
  id: string
  name: string
  image: string
  email: string
  attendance: number
  performance: number
}

export default function CourseDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null)

  // This would come from your API in a real application
  const courseData = {
    id: params.courseId,
    name: "Introduction to Computer Science",
    code: "CS101",
    credits: 4,
    semester: "Fall 2024",
    professor: {
      name: "Dr. Smith",
      image: "/avatars/smith.jpg",
      department: "Computer Science",
      office: "Room 301",
      email: "smith@college.edu",
      officeHours: "Mon, Wed 2-4 PM",
      bio: "Ph.D. in Computer Science with 15 years of teaching experience..."
    },
    schedule: {
      days: "Monday, Wednesday",
      time: "10:00 AM - 11:30 AM",
      room: "CS Building 105",
      startDate: "2024-01-15",
      endDate: "2024-05-15"
    },
    description: "An introduction to the fundamental concepts of computer science including programming basics, algorithms, data structures, and problem-solving strategies.",
    objectives: [
      "Understand basic programming concepts",
      "Learn problem-solving techniques",
      "Develop algorithmic thinking",
      "Master fundamental data structures"
    ],
    attendance: {
      present: 85,
      total: 100,
      lastAttended: "2024-01-10",
      sessions: [
        { date: "2024-01-08", status: "present" },
        { date: "2024-01-10", status: "present" },
        { date: "2024-01-15", status: "absent" },
      ]
    },
    assignments: [
      {
        id: "1",
        title: "Programming Assignment 1: Basic Algorithms",
        dueDate: "2024-01-20",
        status: "submitted",
        grade: 90,
        feedback: "Excellent work! Clear implementation of algorithms.",
        description: "Implement basic sorting and searching algorithms...",
        attachments: [
          { name: "assignment1.pdf", url: "/assignments/cs101/assignment1.pdf" },
          { name: "starter_code.zip", url: "/assignments/cs101/starter_code.zip" }
        ]
      },
      // Add more assignments...
    ],
    materials: [
      {
        id: "1",
        title: "Week 1: Introduction to Programming",
        type: "pdf",
        uploadedAt: "2024-01-05",
        size: "2.5 MB",
        url: "/materials/cs101/week1.pdf",
        description: "Introduction to programming concepts and basic syntax."
      },
      // Add more materials...
    ],
    announcements: [
      {
        id: "1",
        title: "Midterm Exam Date Changed",
        content: "The midterm examination has been rescheduled to...",
        date: "2024-01-12",
        author: "Dr. Smith",
        important: true
      },
      // Add more announcements...
    ],
    discussions: [
      {
        id: "1",
        title: "Question about Assignment 1",
        author: "John Doe",
        date: "2024-01-11",
        replies: 5,
        lastReply: "2024-01-12",
        content: "I'm having trouble understanding the second problem..."
      },
      // Add more discussions...
    ],
    students: [
      {
        id: "1",
        name: "Alice Johnson",
        image: "/avatars/alice.jpg",
        email: "alice@college.edu",
        attendance: 90,
        performance: 85
      },
      // Add more students...
    ],
    grades: {
      assignments: 85,
      midterm: 88,
      participation: 90,
      overall: 87
    }
  }

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{courseData.name}</h1>
          <div className="flex items-center gap-4 mt-2">
            <Badge variant="outline" className="text-primary">
              {courseData.code}
            </Badge>
            <Badge variant="outline">
              {courseData.credits} Credits
            </Badge>
            <Badge variant="outline">
              {courseData.semester}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Attendance</p>
            <p className="text-2xl font-bold">{courseData.attendance.present}%</p>
          </div>
          <Progress value={courseData.attendance.present} className="w-[100px]" />
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-8 gap-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Professor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={courseData.professor.image} />
                    <AvatarFallback>{courseData.professor.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{courseData.professor.name}</p>
                    <p className="text-sm text-muted-foreground">{courseData.professor.department}</p>
                    <p className="text-sm text-muted-foreground">{courseData.professor.email}</p>
                    <p className="text-sm text-muted-foreground">Office Hours: {courseData.professor.officeHours}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{courseData.schedule.days}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{courseData.schedule.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>{courseData.schedule.room}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>Students</span>
                  </div>
                  <span className="font-semibold">{courseData.students.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>Assignments</span>
                  </div>
                  <span className="font-semibold">{courseData.assignments.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span>Discussions</span>
                  </div>
                  <span className="font-semibold">{courseData.discussions.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{courseData.description}</p>
              <h4 className="font-semibold mb-2">Course Objectives:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {courseData.objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  {courseData.announcements.map((announcement) => (
                    <div key={announcement.id} className="mb-4 last:mb-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{announcement.title}</h4>
                        {announcement.important && (
                          <Badge variant="destructive">Important</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {announcement.content}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Posted by {announcement.author} on {new Date(announcement.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Discussions</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  {courseData.discussions.map((discussion) => (
                    <div key={discussion.id} className="mb-4 last:mb-0">
                      <h4 className="font-semibold">{discussion.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {discussion.content}
                      </p>
                      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                        <span>By {discussion.author}</span>
                        <span>{discussion.replies} replies</span>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courseData.materials.map((material) => (
              <Card key={material.id} className="cursor-pointer hover:border-primary/50 transition-all"
                onClick={() => setSelectedMaterial(material)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {material.title}
                    <Badge variant="outline">{material.type.toUpperCase()}</Badge>
                  </CardTitle>
                  <CardDescription>
                    Uploaded on {new Date(material.uploadedAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {material.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Size: {material.size}</span>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {courseData.assignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <CardTitle>{assignment.title}</CardTitle>
                  <CardDescription>
                    Due on {new Date(assignment.dueDate).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {assignment.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={
                        assignment.status === 'submitted' ? 'default' :
                        assignment.status === 'graded' ? 'secondary' : 'destructive'
                      }
                    >
                      {assignment.status}
                    </Badge>
                    {assignment.grade && (
                      <Badge variant="outline">Grade: {assignment.grade}%</Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedAssignment(assignment)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>
                Your attendance record for this course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Overall Attendance</p>
                  <div className="flex items-center gap-4">
                    <Progress value={courseData.attendance.present} className="flex-1" />
                    <span className="font-semibold">{courseData.attendance.present}%</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-4">Attendance History</h4>
                  <div className="space-y-2">
                    {courseData.attendance.sessions.map((session, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span>{new Date(session.date).toLocaleDateString()}</span>
                        <Badge
                          variant={session.status === 'present' ? 'default' : 'destructive'}
                        >
                          {session.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussions" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Course Discussions</CardTitle>
              <Button>New Discussion</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseData.discussions.map((discussion) => (
                  <Card key={discussion.id}>
                    <CardHeader>
                      <CardTitle>{discussion.title}</CardTitle>
                      <CardDescription>
                        Started by {discussion.author} on {new Date(discussion.date).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {discussion.content}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        {discussion.replies} replies • Last reply {discussion.lastReply}
                      </span>
                      <Button 
                        variant="outline"
                        onClick={() => setSelectedDiscussion(discussion)}
                      >
                        View Discussion
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseData.announcements.map((announcement) => (
                  <Card key={announcement.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{announcement.title}</CardTitle>
                        {announcement.important && (
                          <Badge variant="destructive">Important</Badge>
                        )}
                      </div>
                      <CardDescription>
                        Posted by {announcement.author} on {new Date(announcement.date).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {announcement.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grades" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Overall Grade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {courseData.grades.overall}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {courseData.grades.assignments}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Midterm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {courseData.grades.midterm}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Participation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {courseData.grades.participation}%
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Grade Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseData.assignments.map((assignment) => (
                  assignment.grade && (
                    <div key={assignment.id} className="flex items-center justify-between">
                      <span>{assignment.title}</span>
                      <div className="flex items-center gap-4">
                        <Progress value={assignment.grade} className="w-[100px]" />
                        <span className="font-semibold">{assignment.grade}%</span>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Students</CardTitle>
              <CardDescription>
                Total students: {courseData.students.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseData.students.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={student.image} />
                        <AvatarFallback>{student.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Attendance</p>
                        <p className="font-semibold">{student.attendance}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Performance</p>
                        <p className="font-semibold">{student.performance}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Assignment Detail Dialog */}
      <Dialog open={!!selectedAssignment} onOpenChange={() => setSelectedAssignment(null)}>
        <DialogContent className="max-w-3xl">
          {selectedAssignment && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedAssignment.title}</DialogTitle>
                <DialogDescription>
                  Due on {new Date(selectedAssignment.dueDate).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="prose dark:prose-invert">
                  <p>{selectedAssignment.description}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Attachments</h4>
                  {selectedAssignment.attachments.map((attachment, index) => (
                    <Button key={index} variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      {attachment.name}
                    </Button>
                  ))}
                </div>
                {selectedAssignment.status === 'graded' && (
                  <div className="space-y-2">
                    <h4 className="font-semibold">Feedback</h4>
                    <p className="text-muted-foreground">{selectedAssignment.feedback}</p>
                    <div className="flex items-center gap-4">
                      <span>Grade:</span>
                      <Badge variant="outline">{selectedAssignment.grade}%</Badge>
                    </div>
                  </div>
                )}
                {selectedAssignment.status === 'pending' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Submit Assignment</h4>
                      <Textarea placeholder="Add your submission notes here..." />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Upload Files</Button>
                      <Button>Submit Assignment</Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Material Detail Dialog */}
      <Dialog open={!!selectedMaterial} onOpenChange={() => setSelectedMaterial(null)}>
        <DialogContent>
          {selectedMaterial && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMaterial.title}</DialogTitle>
                <DialogDescription>
                  Uploaded on {new Date(selectedMaterial.uploadedAt).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-muted-foreground">{selectedMaterial.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Size: {selectedMaterial.size}
                  </span>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Discussion Detail Dialog */}
      <Dialog open={!!selectedDiscussion} onOpenChange={() => setSelectedDiscussion(null)}>
        <DialogContent className="max-w-3xl">
          {selectedDiscussion && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedDiscussion.title}</DialogTitle>
                <DialogDescription>
                  Started by {selectedDiscussion.author} on {new Date(selectedDiscussion.date).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground">{selectedDiscussion.content}</p>
                  </CardContent>
                </Card>
                <div className="space-y-4">
                  <h4 className="font-semibold">Replies</h4>
                  <Card>
                    <CardContent className="pt-6">
                      <Textarea placeholder="Write your reply..." className="mb-4" />
                      <div className="flex justify-end">
                        <Button>Post Reply</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

