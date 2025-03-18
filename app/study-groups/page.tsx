"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useCollege } from '@/components/college-provider'
import { useAchievements } from '@/components/achievement-provider'
import { Search, Users, Plus } from 'lucide-react'

interface StudyGroup {
  id: string
  name: string
  course: string
  members: number
  tags: string[]
}

export default function StudyGroupsPage() {
  const { collegeName } = useCollege()
  const { awardXP } = useAchievements()
  const [searchQuery, setSearchQuery] = useState('')
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([
    { id: '1', name: 'CS101 Study Group', course: 'Introduction to Computer Science', members: 5, tags: ['Programming', 'Algorithms'] },
    { id: '2', name: 'MATH201 Problem Solving', course: 'Advanced Calculus', members: 3, tags: ['Calculus', 'Problem Solving'] },
    { id: '3', name: 'BIO150 Review Session', course: 'Introduction to Biology', members: 7, tags: ['Biology', 'Lab Work'] },
  ])

  const filteredGroups = studyGroups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleCreateGroup = (newGroup: Omit<StudyGroup, 'id' | 'members'>) => {
    const group = {
      ...newGroup,
      id: Date.now().toString(),
      members: 1
    }
    setStudyGroups([...studyGroups, group])
    awardXP(20, "Created a new study group")
  }

  const handleJoinGroup = (groupId: string) => {
    setStudyGroups(groups => 
      groups.map(group => 
        group.id === groupId ? { ...group, members: group.members + 1 } : group
      )
    )
    awardXP(10, "Joined a study group")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{collegeName} Study Groups</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search study groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Study Group</DialogTitle>
            </DialogHeader>
            <CreateGroupForm onSubmit={handleCreateGroup} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGroups.map(group => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
              <CardDescription>{group.course}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {group.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{group.members} members</span>
                </div>
                <Button onClick={() => handleJoinGroup(group.id)}>Join Group</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

interface CreateGroupFormProps {
  onSubmit: (group: Omit<StudyGroup, 'id' | 'members'>) => void
}

function CreateGroupForm({ onSubmit }: CreateGroupFormProps) {
  const [name, setName] = useState('')
  const [course, setCourse] = useState('')
  const [tags, setTags] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name,
      course,
      tags: tags.split(',').map(tag => tag.trim())
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Group Name</label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
        <Input id="course" value={course} onChange={(e) => setCourse(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
        <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>
      <Button type="submit">Create Group</Button>
    </form>
  )
}

