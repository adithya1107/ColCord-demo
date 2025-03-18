export interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'professor' | 'admin'
  avatar?: string
  department?: string
  year?: number
  semester?: number
}

export interface Course {
  id: string
  code: string
  name: string
  description: string
  professor: string
  schedule: string
  department: string
  credits: number
  semester: string
  assignments: number
  students: number
  materials: CourseMaterial[]
  announcements: Announcement[]
}

export interface CourseMaterial {
  id: string
  title: string
  type: 'pdf' | 'video' | 'document' | 'link'
  url: string
  uploadedAt: string
  size?: string
  description?: string
}

export interface Assignment {
  id: string
  courseId: string
  title: string
  description: string
  dueDate: string
  points: number
  status: 'pending' | 'submitted' | 'graded'
  grade?: number
  feedback?: string
  attachments: {
    name: string
    url: string
    type: string
    size: number
  }[]
}

export interface Announcement {
  id: string
  courseId: string
  title: string
  content: string
  author: string
  date: string
  important: boolean
}

export interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  read: boolean
  course?: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  organizer: string
  type: 'academic' | 'cultural' | 'sports' | 'other'
  attendees: number
}

export interface Group {
  id: string
  name: string
  description: string
  members: string[]
  type: 'study' | 'project' | 'club'
  course?: string
  createdAt: string
}

export interface Task {
  id: string
  title: string
  description?: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'completed'
  course?: string
  assignedBy?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  date: string
  action?: {
    label: string
    href: string
  }
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string
  xp: number
}

export interface StudyRoom {
  id: string
  name: string
  subject: string
  participants: {
    id: string
    name: string
    role: string
  }[]
  capacity: number
  status: 'active' | 'full' | 'closed'
}

export interface TutorProfile {
  id: string
  userId: string
  subjects: string[]
  availability: {
    day: string
    slots: {
      start: string
      end: string
    }[]
  }[]
  rate: number
  rating: number
  reviews: {
    id: string
    author: string
    rating: number
    comment: string
    date: string
  }[]
}

export interface JobListing {
  id: string
  title: string
  company: string
  location: string
  type: 'internship' | 'full-time' | 'part-time'
  description: string
  requirements: string[]
  salary?: {
    min: number
    max: number
    currency: string
  }
  postedAt: string
  deadline: string
}

export interface Resource {
  id: string
  title: string
  type: 'book' | 'article' | 'video' | 'document'
  subject: string
  author: string
  description: string
  url: string
  uploadedAt: string
  downloads: number
  rating: number
}

export interface AlumniProfile {
  id: string
  name: string
  graduationYear: number
  degree: string
  company: string
  position: string
  location: string
  industry: string
  bio: string
  contact: {
    email?: string
    linkedin?: string
    twitter?: string
  }
  mentoring: boolean
}

export interface Document {
  id: string
  title: string
  content: string
  lastEdited: string
  collaborators: string[]
}

