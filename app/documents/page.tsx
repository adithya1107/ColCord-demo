"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useAchievements } from '@/components/achievement-provider'
import { FileText, Plus } from 'lucide-react'

interface Document {
  id: string
  title: string
  lastEdited: string
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [newDocumentTitle, setNewDocumentTitle] = useState('')
  const { toast } = useToast()
  const { awardXP } = useAchievements()

  useEffect(() => {
    // In a real application, you would fetch the documents from a backend here
    const mockDocuments: Document[] = [
      { id: '1', title: 'Project Proposal', lastEdited: '2024-01-15T10:30:00Z' },
      { id: '2', title: 'Meeting Notes', lastEdited: '2024-01-14T15:45:00Z' },
      { id: '3', title: 'Research Summary', lastEdited: '2024-01-13T09:20:00Z' },
    ]
    setDocuments(mockDocuments)
  }, [])

  const handleCreateDocument = () => {
    if (newDocumentTitle.trim() === '') {
      toast({
        title: "Error",
        description: "Please enter a title for the new document.",
        variant: "destructive",
      })
      return
    }

    const newDocument: Document = {
      id: Date.now().toString(),
      title: newDocumentTitle,
      lastEdited: new Date().toISOString(),
    }

    setDocuments([newDocument, ...documents])
    setNewDocumentTitle('')
    awardXP(15, "Created a new collaborative document")

    toast({
      title: "Document Created",
      description: `"${newDocument.title}" has been created successfully.`,
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Collaborative Documents</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create New Document</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Input
            placeholder="Enter document title"
            value={newDocumentTitle}
            onChange={(e) => setNewDocumentTitle(e.target.value)}
          />
          <Button onClick={handleCreateDocument}>
            <Plus className="mr-2 h-4 w-4" /> Create
          </Button>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <Link href={`/documents/${doc.id}`} key={doc.id}>
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  {doc.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Last edited: {new Date(doc.lastEdited).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

