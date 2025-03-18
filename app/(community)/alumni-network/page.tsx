"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useAchievements } from '@/components/achievement-provider'
import { useToast } from "@/components/ui/use-toast"
import { Search, Briefcase, MapPin, GraduationCap, Linkedin, Mail } from 'lucide-react'

interface AlumniProfile {
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
  }
  mentoring: boolean
}

export default function AlumniNetworkPage() {
  const [alumni, setAlumni] = useState<AlumniProfile[]>([
    {
      id: '1',
      name: 'John Doe',
      graduationYear: 2018,
      degree: 'B.Tech in Computer Science',
      company: 'Tech Giants Inc',
      position: 'Software Engineer',
      location: 'San Francisco, CA',
      industry: 'Technology',
      bio: 'Passionate about AI and machine learning. Always eager to connect with fellow alumni and share experiences.',
      contact: {
        email: 'john.doe@example.com',
        linkedin: 'https://www.linkedin.com/in/johndoe'
      },
      mentoring: true
    },
    {
      id: '2',
      name: 'Jane Smith',
      graduationYear: 2015,
      degree: 'MBA in Finance',
      company: 'Global Finance',
      position: 'Investment Analyst',
      location: 'New York, NY',
      industry: 'Finance',
      bio: 'Experienced in market analysis and portfolio management. Happy to offer career advice to recent graduates.',
      contact: {
        email: 'jane.smith@example.com',
        linkedin: 'https://www.linkedin.com/in/janesmith'
      },
      mentoring: false
    },
    {
      id: '3',
      name: 'Alex Johnson',
      graduationYear: 2020,
      degree: 'M.Sc. in Environmental Science',
      company: 'Green Energy Solutions',
      position: 'Environmental Scientist',
      location: 'Seattle, WA',
      industry: 'Renewable Energy',
      bio: 'Working on sustainable energy projects. Keen on networking with alumni interested in environmental causes.',
      contact: {
        email: 'alex.johnson@example.com',
        linkedin: 'https://www.linkedin.com/in/alexjohnson'
      },
      mentoring: true
    },
  ])
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniProfile | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const { awardXP } = useAchievements()
  const { toast } = useToast()

  const filteredAlumni = alumni.filter(profile => 
    profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.industry.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleConnect = (profile: AlumniProfile) => {
    // In a real application, this would open a messaging interface or send a connection request
    toast({
      title: "Connection Request Sent",
      description: `Your request to connect with ${profile.name} has been sent.`,
    })
    awardXP(15, "Connected with an alumnus")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Alumni</CardTitle>
          <CardDescription>Search for alumni by name, company, or industry</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alumni..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button onClick={() => {
              setSearchQuery('')
              awardXP(5, "Searched for alumni")
            }}>
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAlumni.map(profile => (
          <Card key={profile.id} className="cursor-pointer hover:border-primary transition-all" onClick={() => setSelectedAlumni(profile)}>
            <CardHeader>
              <Avatar className="w-16 h-16 mb-2">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${profile.id}`} />
                <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardTitle>{profile.name}</CardTitle>
              <CardDescription>{profile.position} at {profile.company}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span>Class of {profile.graduationYear}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.industry}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.location}</span>
                </div>
                {profile.mentoring && (
                  <Badge variant="secondary">Available for Mentoring</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedAlumni} onOpenChange={() => setSelectedAlumni(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedAlumni && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedAlumni.name}</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${selectedAlumni.id}`} />
                    <AvatarFallback>{selectedAlumni.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedAlumni.position}</h3>
                    <p className="text-muted-foreground">{selectedAlumni.company}</p>
                    <p className="text-muted-foreground">{selectedAlumni.location}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">About</h3>
                  <p>{selectedAlumni.bio}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Education</h3>
                  <p>{selectedAlumni.degree}</p>
                  <p>Graduated: {selectedAlumni.graduationYear}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Industry</h3>
                  <p>{selectedAlumni.industry}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Contact</h3>
                  <div className="space-y-2">
                    {selectedAlumni.contact.email && (
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <a href={`mailto:${selectedAlumni.contact.email}`}>
                          <Mail className="mr-2 h-4 w-4" />
                          {selectedAlumni.contact.email}
                        </a>
                      </Button>
                    )}
                    {selectedAlumni.contact.linkedin && (
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <a href={selectedAlumni.contact.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="mr-2 h-4 w-4" />
                          LinkedIn Profile
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <Button className="w-full" onClick={() => handleConnect(selectedAlumni)}>
                  Connect
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

