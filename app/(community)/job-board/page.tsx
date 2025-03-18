"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useAchievements } from '@/components/achievement-provider'
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Briefcase, MapPin, Calendar } from 'lucide-react'

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: 'Internship' | 'Full-time' | 'Part-time'
  description: string
  requirements: string[]
  salary?: {
    min: number
    max: number
    currency: string
  }
  postedAt: string
  deadline: string
}

export default function JobBoardPage() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Software Engineering Intern',
      company: 'Tech Corp',
      location: 'Remote',
      type: 'Internship',
      description: 'Join our team for a summer internship and work on cutting-edge projects...',
      requirements: ['Proficiency in Java or Python', 'Basic understanding of web technologies', 'Strong problem-solving skills'],
      postedAt: '2024-01-10',
      deadline: '2024-02-15'
    },
    {
      id: '2',
      title: 'Data Analyst',
      company: 'Data Insights Inc',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'We are seeking a data analyst to join our growing team...',
      requirements: ["Bachelor's degree in Statistics or related field", 'Experience with SQL and Python', 'Strong analytical skills'],
      salary: {
        min: 70000,
        max: 90000,
        currency: 'USD'
      },
      postedAt: '2024-01-08',
      deadline: '2024-02-28'
    },
    {
      id: '3',
      title: 'UX Designer',
      company: 'Creative Solutions',
      location: 'San Francisco, CA',
      type: 'Part-time',
      description: 'Part-time opportunity for a talented UX designer...',
      requirements: ['Portfolio showcasing UX/UI projects', 'Proficiency in design tools like Figma or Sketch', 'Understanding of user-centered design principles'],
      postedAt: '2024-01-12',
      deadline: '2024-02-20'
    },
  ])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const { awardXP } = useAchievements()
  const { toast } = useToast()

  const filteredJobs = jobs.filter(job => 
    (activeTab === 'all' || job.type.toLowerCase() === activeTab) &&
    (job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
     job.location.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleApply = (job: Job) => {
    // In a real application, this would open an application form or link
    toast({
      title: "Application Submitted",
      description: `Your application for ${job.title} at ${job.company} has been submitted.`,
    })
    awardXP(20, "Applied for a job/internship")
  }

  const getAIJobRecommendations = async (userId: string) => {
    try {
      const response = await fetch(`/api/job-recommendations?userId=${userId}`);
      const data = await response.json();
      return data.recommendations;
    } catch (error) {
      console.error('Error fetching AI job recommendations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch job recommendations. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Opportunities</CardTitle>
          <CardDescription>Search for internships and jobs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button onClick={() => {
              setSearchQuery('')
              awardXP(5, "Searched for jobs")
            }}>
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Job Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => getAIJobRecommendations('current-user-id')}>
            Get Personalized Job Recommendations
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="internship">Internships</TabsTrigger>
          <TabsTrigger value="full-time">Full-time</TabsTrigger>
          <TabsTrigger value="part-time">Part-time</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map(job => (
          <Card key={job.id} className="cursor-pointer hover:border-primary transition-all" onClick={() => setSelectedJob(job)}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription>{job.company}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <Badge>{job.type}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedJob.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <Badge className="mb-2">{selectedJob.type}</Badge>
                <p className="text-muted-foreground">{selectedJob.description}</p>
                <div>
                  <h3 className="font-semibold mb-2">Requirements:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                {selectedJob.salary && (
                  <p>
                    Salary Range: {selectedJob.salary.currency} {selectedJob.salary.min.toLocaleString()} - {selectedJob.salary.max.toLocaleString()} per year
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span>Posted: {new Date(selectedJob.postedAt).toLocaleDateString()}</span>
                  <span>Deadline: {new Date(selectedJob.deadline).toLocaleDateString()}</span>
                </div>
                <Button className="w-full" onClick={() => handleApply(selectedJob)}>
                  Apply Now
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

