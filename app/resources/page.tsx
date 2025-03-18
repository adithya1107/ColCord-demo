"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCollege } from '@/components/college-provider'
import { useAchievements } from '@/components/achievement-provider'
import { Search, FileText, Video, Link, Upload } from 'lucide-react'

interface Resource {
  id: string
  title: string
  type: 'document' | 'video' | 'link'
  url: string
  author: string
  course: string
  uploadDate: string
  downloads: number
}

export default function ResourcesPage() {
  const { collegeName } = useCollege()
  const { awardXP } = useAchievements()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTabsetActiveTab] = useState('all')
  const [resources, setResources] = useState<Resource[]>([
    { id: '1', title: 'Introduction to Python Programming', type: 'document', url: '/resources/intro-python.pdf', author: 'Prof. Smith', course: 'CS101', uploadDate: '2024-01-15', downloads: 120 },
    { id: '2', title: 'Calculus Fundamentals', type: 'video', url: 'https://example.com/calculus-video', author: 'Dr. Johnson', course: 'MATH201', uploadDate: '2024-01-10', downloads: 85 },
    { id: '3', title: 'Biology Lab Techniques', type: 'link', url: 'https://biology-lab-techniques.com', author: 'Prof. Williams', course: 'BIO150', uploadDate: '2024-01-05', downloads: 62 },
  ])

  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.author.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddResource = (newResource: Omit<Resource, 'id' | 'downloads'>) => {
    const resource = {
      ...newResource,
      id: Date.now().toString(),
      downloads: 0
    }
    setResources([...resources, resource])
    awardXP(15, "Shared a new educational resource")
  }

  const handleDownload = (resourceId: string) => {
    setResources(resources => 
      resources.map(resource => 
        resource.id === resourceId ? { ...resource, downloads: resource.downloads + 1 } : resource
      )
    )
    awardXP(5, "Downloaded an educational resource")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{collegeName} Educational Resources</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Share Resource
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share a New Resource</DialogTitle>
            </DialogHeader>
            <AddResourceForm onSubmit={handleAddResource} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="document">Documents</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="link">Links</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ResourceGrid resources={filteredResources} onDownload={handleDownload} />
        </TabsContent>
        <TabsContent value="document">
          <ResourceGrid resources={filteredResources.filter(r => r.type === 'document')} onDownload={handleDownload} />
        </TabsContent>
        <TabsContent value="video">
          <ResourceGrid resources={filteredResources.filter(r => r.type === 'video')} onDownload={handleDownload} />
        </TabsContent>
        <TabsContent value="link">
          <ResourceGrid resources={filteredResources.filter(r => r.type === 'link')} onDownload={handleDownload} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ResourceGridProps {
  resources: Resource[]
  onDownload: (id: string) => void
}

function ResourceGrid({ resources, onDownload }: ResourceGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {resources.map(resource => (
        <Card key={resource.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {resource.type === 'document' && <FileText className="h-5 w-5" />}
              {resource.type === 'video' && <Video className="h-5 w-5" />}
              {resource.type === 'link' && <Link className="h-5 w-5" />}
              {resource.title}
            </CardTitle>
            <CardDescription>{resource.course}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Uploaded by {resource.author}</p>
              <p className="text-sm text-muted-foreground">on {new Date(resource.uploadDate).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{resource.downloads} downloads</Badge>
              <Button onClick={() => onDownload(resource.id)}>Download</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

interface AddResourceFormProps {
  onSubmit: (resource: Omit<Resource, 'id' | 'downloads'>) => void
}

function AddResourceForm({ onSubmit }: AddResourceFormProps) {
  const [title, setTitle] = useState('')
  const [type, setType] = useState<'document' | 'video' | 'link'>('document')
  const [url, setUrl] = useState('')
  const [course, setCourse] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      type,
      url,
      course,
      author: 'Current User', // In a real app, this would be the logged-in user
      uploadDate: new Date().toISOString()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as 'document' | 'video' | 'link')}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="document">Document</option>
          <option value="video">Video</option>
          <option value="link">Link</option>
        </select>
      </div>
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
        <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
        <Input id="course" value={course} onChange={(e) => setCourse(e.target.value)} required />
      </div>
      <Button type="submit">Share Resource</Button>
    </form>
  )
}

