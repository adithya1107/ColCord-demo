"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAchievements } from '@/components/achievement-provider'

interface Resource {
  id: string
  title: string
  type: 'E-book' | 'Research Paper' | 'Video' | 'Course Material'
  subject: string
  author: string
  description: string
  url: string
}

export default function ResourceLibraryPage() {
  const [resources, setResources] = useState<Resource[]>([
    { id: '1', title: 'Introduction to Machine Learning', type: 'E-book', subject: 'Computer Science', author: 'Dr. Alan Turing', description: 'A comprehensive guide to machine learning algorithms...', url: '#' },
    { id: '2', title: 'Quantum Mechanics and Its Applications', type: 'Research Paper', subject: 'Physics', author: 'Dr. Marie Curie', description: 'An in-depth study of quantum mechanics in modern technology...', url: '#' },
    { id: '3', title: 'Organic Chemistry Fundamentals', type: 'Video', subject: 'Chemistry', author: 'Prof. Rosalind Franklin', description: 'A video series covering the basics of organic chemistry...', url: '#' },
    { id: '4', title: 'Calculus I Lecture Notes', type: 'Course Material', subject: 'Mathematics', author: 'Dr. Katherine Johnson', description: 'Comprehensive lecture notes for Calculus I...', url: '#' },
  ])
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const { awardXP } = useAchievements()

  const viewResourceDetails = (resource: Resource) => {
    setSelectedResource(resource)
    awardXP(5, "Viewed resource details")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Resource Library</h1>
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="E-book">E-books</TabsTrigger>
          <TabsTrigger value="Research Paper">Research Papers</TabsTrigger>
          <TabsTrigger value="Video">Videos</TabsTrigger>
          <TabsTrigger value="Course Material">Course Materials</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map(resource => (
              <Card key={resource.id} className="cursor-pointer" onClick={() => viewResourceDetails(resource)}>
                <CardHeader>
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>{resource.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="mb-2">{resource.type}</Badge>
                  <p className="text-sm text-muted-foreground">{resource.subject}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        {['E-book', 'Research Paper', 'Video', 'Course Material'].map(type => (
          <TabsContent key={type} value={type}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.filter(r => r.type === type).map(resource => (
                <Card key={resource.id} className="cursor-pointer" onClick={() => viewResourceDetails(resource)}>
                  <CardHeader>
                    <CardTitle>{resource.title}</CardTitle>
                    <CardDescription>{resource.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge className="mb-2">{resource.type}</Badge>
                    <p className="text-sm text-muted-foreground">{resource.subject}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <Dialog open={!!selectedResource} onOpenChange={() => setSelectedResource(null)}>
        <DialogContent>
          {selectedResource && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedResource.title}</DialogTitle>
                <DialogDescription>{selectedResource.author}</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <Badge className="mb-2">{selectedResource.type}</Badge>
                <p className="text-sm text-muted-foreground mb-4">{selectedResource.subject}</p>
                <p>{selectedResource.description}</p>
              </div>
              <Button className="mt-4" onClick={() => {
                // In a real application, this would download or open the resource
                console.log(`Accessing resource: ${selectedResource.title}`)
                awardXP(10, "Accessed a library resource")
              }}>
                Access Resource
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

