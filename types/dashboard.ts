export interface Course {
  id: string
  name: string
  code: string
  professor: string
  schedule: string
  description: string
  assignments: number
}

export interface Task {
  id: string
  title: string
  course: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'completed'
}

export interface Project {
  id: string
  name: string
  course: string
  members: string[]
  deadline: string
  status: 'in-progress' | 'completed'
}

export interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  read: boolean
  course?: string
}

export interface DashboardData {
  student: {
    courses: Course[]
    tasks: Task[]
    projects: Project[]
    messages: Message[]
  }
  professor: {
    courses: Course[]
    submissions: any[]
    officeHours: any[]
    research: any[]
  }
  admin: {
    departments: any[]
    faculty: any[]
    events: any[]
    reports: any[]
  }
}

