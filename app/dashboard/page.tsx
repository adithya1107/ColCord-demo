"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { BookOpen, Users, Clock, Star, Calendar } from "lucide-react"
import { useCollege } from "@/components/college-provider"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import useMediaQuery from "@/hooks/use-media-query"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

const PerformanceChart = dynamic(() => import("@/components/PerformanceChart"), {
  loading: () => <p>Loading chart...</p>,
  ssr: false,
})

// Academic performance data
const performanceData = [
  { name: "Week 1", assignments: 85, attendance: 100, participation: 75 },
  { name: "Week 2", assignments: 92, attendance: 100, participation: 80 },
  { name: "Week 3", assignments: 88, attendance: 90, participation: 85 },
  { name: "Week 4", assignments: 95, attendance: 100, participation: 90 },
  { name: "Week 5", assignments: 90, attendance: 95, participation: 88 },
  { name: "Week 6", assignments: 94, attendance: 100, participation: 92 },
]

// Study hours distribution
const studyData = [
  { name: "Mon", individual: 3, group: 2, virtual: 1 },
  { name: "Tue", individual: 4, group: 1, virtual: 2 },
  { name: "Wed", individual: 2, group: 3, virtual: 2 },
  { name: "Thu", individual: 5, group: 2, virtual: 1 },
  { name: "Fri", individual: 3, group: 4, virtual: 2 },
]

// Resource usage comparison
const resourceData = [
  { year: "Last Month", library: 75, tutoring: 60 },
  { year: "This Month", library: 85, tutoring: 80 },
]

export default function DashboardPage() {
  const { collegeName } = useCollege()
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const [chartsLoaded, setChartsLoaded] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data here
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load dashboard data")
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setChartsLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    } else {
      toast({
        title: "Search Error",
        description: "Please enter a search query.",
        variant: "destructive",
      })
    }
  }

  const handleViewDetails = (item: string) => {
    toast({
      title: "View Details",
      description: `Viewing details for ${item}`,
    })
    // Here you would typically navigate to a details page or open a modal
    // For demonstration, we'll just show a toast
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="p-6 grid gap-6">
        {/* Top Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/courses", icon: BookOpen, count: 6, label: "ENROLLED COURSES", color: "blue-500" },
            { href: "/study-groups", icon: Users, count: 4, label: "STUDY GROUPS", color: "green-500" },
            {
              href: "/study-hours",
              icon: Clock,
              count: 24,
              label: "STUDY HOURS",
              color: "purple-500",
              dialogContent: (
                <div className="py-4">
                  <p>Individual Study: 12 hours</p>
                  <p>Group Study: 8 hours</p>
                  <p>Virtual Study Rooms: 4 hours</p>
                </div>
              ),
            },
            { href: "/achievements", icon: Star, count: 12, label: "ACHIEVEMENTS", color: "yellow-500" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {item.dialogContent ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="bg-card border-border hover:bg-gray-800 transition-colors cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className={`h-12 w-12 rounded bg-${item.color}/20 flex items-center justify-center`}>
                            <item.icon className={`h-6 w-6 text-${item.color}`} />
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">{item.label}</p>
                            <p className="text-2xl font-bold">{item.count}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{item.label} Breakdown</DialogTitle>
                    </DialogHeader>
                    {item.dialogContent}
                  </DialogContent>
                </Dialog>
              ) : (
                <Link href={item.href}>
                  <Card className="bg-card border-border hover:bg-gray-800 transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className={`h-12 w-12 rounded bg-${item.color}/20 flex items-center justify-center`}>
                          <item.icon className={`h-6 w-6 text-${item.color}`} />
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className="text-2xl font-bold">{item.count}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className={`grid gap-6 ${isDesktop ? "md:grid-cols-2" : "grid-cols-1"}`}>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm">ACADEMIC PERFORMANCE</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {!chartsLoaded ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <PerformanceChart data={performanceData} />
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm">STUDY PATTERNS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {!chartsLoaded ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={studyData}>
                      <Line type="monotone" dataKey="individual" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="group" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="virtual" stroke="#eab308" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card border-border col-span-2">
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm">RESOURCE UTILIZATION</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resourceData.map((item) => (
                  <div key={item.year} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.year}</span>
                      <span className="text-muted-foreground">{item.library}% Resources Used</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                        style={{ width: `${item.library}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm">UPCOMING DEADLINES</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "CS101 Assignment", date: "Tomorrow", link: "/courses/cs101/assignments" },
                  { title: "Group Project Meeting", date: "In 2 days", link: "/study-groups/project-x" },
                  { title: "Math Quiz", date: "Next Week", link: "/courses/math201/quizzes" },
                ].map((item, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => router.push(item.link)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-gray-800 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Progress */}
        <div className="flex justify-center gap-2">
          {[...Array(11)].map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${i < 7 ? "bg-green-500" : i < 9 ? "bg-yellow-500" : "bg-gray-700"}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

