"use client"

import { useState } from 'react'
import { useParams } from 'next/navigation'
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { QuillBinding } from 'y-quill'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useAchievements } from '@/components/achievement-provider'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function CollaborativeDocumentPage() {
  const { id } = useParams()
  const [quill, setQuill] = useState<Quill | null>(null)
  const [documentTitle, setDocumentTitle] = useState('Untitled Document')
  const [versionHistory, setVersionHistory] = useState<{ id: string, timestamp: string }[]>([])
  const { toast } = useToast()
  const { awardXP } = useAchievements()

  const handleTitleChange = (newTitle: string) => {
    setDocumentTitle(newTitle)
    if (quill) {
      const ydoc = quill.root.parentElement?.parentElement?.__yjs_doc
      if (ydoc) {
        const ytitle = ydoc.getText('title')
        ytitle.delete(0, ytitle.length)
        ytitle.insert(0, newTitle)
      }
    }
  }

  const handleSave = () => {
    // In a real application, you would save the document content to a backend here
    toast({
      title: "Document Saved",
      description: "Your changes have been saved successfully.",
    })
    awardXP(5, "Saved a collaborative document")
  }

  const saveVersion = () => {
    const newVersion = { id: Date.now().toString(), timestamp: new Date().toISOString() }
    setVersionHistory([newVersion, ...versionHistory])
    toast({
      title: "Version Saved",
      description: `Document version saved at ${new Date().toLocaleString()}`,
    })
  }

  const revertToVersion = (versionId: string) => {
    // In a real application, you would fetch the content of the selected version
    // and update the document state here
    toast({
      title: "Version Restored",
      description: `Document reverted to version from ${new Date(parseInt(versionId)).toLocaleString()}`,
    })
  }

  return (
    <Card className="m-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          <Input 
            value={documentTitle} 
            onChange={(e) => handleTitleChange(e.target.value)}
            className="text-2xl font-bold"
          />
        </CardTitle>
        <Button onClick={() => { handleSave(); saveVersion(); }}>Save</Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-2">Version History</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Version History</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[300px]">
              {versionHistory.map(version => (
                <div key={version.id} className="flex justify-between items-center p-2 hover:bg-accent">
                  <span>{new Date(version.timestamp).toLocaleString()}</span>
                  <Button onClick={() => revertToVersion(version.id)}>Revert</Button>
                </div>
              ))}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div id="editor" className="h-[500px] border rounded-md" />
      </CardContent>
    </Card>
  )
}

