import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Define TypeScript interface for activity data
interface Activity {
  name: string
  action: string
  time: string
}

// Define type mapping for user types
const activityData: Record<"student" | "professor" | "admin", Activity[]> = {
  student: [
    { name: "Prof. Johnson", action: "Graded your assignment in CS101", time: "2h ago" },
    { name: "Study Group", action: "New message in Physics project", time: "4h ago" },
    { name: "Library", action: "Your reserved book is available", time: "Yesterday" },
  ],
  professor: [
    { name: "John Doe", action: "Submitted assignment for grading", time: "1h ago" },
    { name: "Research Team", action: "Updated project timeline", time: "3h ago" },
    { name: "Department Head", action: "Scheduled faculty meeting", time: "Yesterday" },
  ],
  admin: [
    { name: "IT Department", action: "System maintenance scheduled", time: "30m ago" },
    { name: "Admissions", action: "New student registrations: 25", time: "2h ago" },
    { name: "Finance", action: "Budget report for Q2 available", time: "Yesterday" },
  ],
}

// Define props interface
interface RecentActivityProps {
  userType?: "student" | "professor" | "admin"
}

export function RecentActivity({ userType = "student" }: RecentActivityProps) {
  const activities = activityData[userType] || []

  return (
    <div className="space-y-6">
      {activities.length > 0 ? (
        activities.map((activity: Activity, index: number) => (
          <div key={index} className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="" alt={activity.name} />
              <AvatarFallback>{activity.name[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{activity.name}</p>
              <p className="text-sm text-gray-500">{activity.action}</p>
            </div>
            <div className="ml-auto text-sm text-gray-400">{activity.time}</div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">No recent activity</p>
      )}
    </div>
  )
}