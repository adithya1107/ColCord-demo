"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useCollege } from '@/components/college-provider'
import { Badge } from "@/components/ui/badge"

// Update the Task interface:
interface Task {
  id: number
  title: string
  completed: boolean
  dueDate: string
  priority: 'low' | 'medium' | 'high'
}

export default function TasksPage() {
  const { collegeName } = useCollege()
  // Update the initial tasks state:
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Complete CS101 Assignment", completed: false, dueDate: "2024-01-20", priority: "high" },
    { id: 2, title: "Prepare presentation for HIST301", completed: false, dueDate: "2024-01-25", priority: "medium" },
    { id: 3, title: "Study for MATH201 midterm", completed: true, dueDate: "2024-01-15", priority: "high" },
  ])
  const [newTask, setNewTask] = useState("")

  // Update the addTask function:
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { 
        id: tasks.length + 1, 
        title: newTask, 
        completed: false,
        dueDate: new Date().toISOString().split('T')[0], // Set to today's date
        priority: "medium" // Default priority
      }])
      setNewTask("")
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-foreground">{collegeName} Tasks</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <Input 
              placeholder="Add a new task" 
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="mr-2"
            />
            <Button onClick={addTask}>Add Task</Button>
          </div>
          <ul className="space-y-2">
            {/* Update the task list rendering: */}
            {tasks.map(task => (
              <li key={task.id} className="flex items-center justify-between">
                <div>
                  <Checkbox 
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                  />
                  <label 
                    htmlFor={`task-${task.id}`}
                    className={`ml-2 ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                  >
                    {task.title}
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                    {task.priority}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{task.dueDate}</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

