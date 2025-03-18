"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Define the valid user types
type UserType = "student" | "professor" | "admin"

const data: Record<UserType, Array<Record<string, number | string>>> = {
  student: [
    { name: "Mon", assignments: 2, classes: 3, studyHours: 4 },
    { name: "Tue", assignments: 1, classes: 4, studyHours: 3 },
    { name: "Wed", assignments: 3, classes: 2, studyHours: 5 },
    { name: "Thu", assignments: 0, classes: 3, studyHours: 2 },
    { name: "Fri", assignments: 2, classes: 2, studyHours: 3 },
    { name: "Sat", assignments: 1, classes: 0, studyHours: 4 },
    { name: "Sun", assignments: 0, classes: 0, studyHours: 6 },
  ],
  professor: [
    { name: "Mon", classes: 3, officeHours: 2, research: 4 },
    { name: "Tue", classes: 2, officeHours: 3, research: 3 },
    { name: "Wed", classes: 4, officeHours: 1, research: 2 },
    { name: "Thu", classes: 1, officeHours: 2, research: 5 },
    { name: "Fri", classes: 3, officeHours: 2, research: 3 },
    { name: "Sat", classes: 0, officeHours: 0, research: 6 },
    { name: "Sun", classes: 0, officeHours: 0, research: 4 },
  ],
  admin: [
    { name: "Week 1", studentEngagement: 75, facultyActivity: 80, events: 3 },
    { name: "Week 2", studentEngagement: 80, facultyActivity: 85, events: 2 },
    { name: "Week 3", studentEngagement: 78, facultyActivity: 82, events: 4 },
    { name: "Week 4", studentEngagement: 85, facultyActivity: 88, events: 1 },
  ],
}

interface OverviewProps {
  userType?: UserType
}

export function Overview({ userType = "student" }: OverviewProps) {
  const chartData = data[userType] || []

  // Prevent rendering if chartData is empty
  if (chartData.length === 0) {
    return <div>No data available</div>
  }

  const keys = Object.keys(chartData[0]).filter((key) => key !== "name")

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        {keys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={`hsl(${index * 100}, 70%, 50%)`}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}