"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useAchievements } from './achievement-provider'

export function CourseRecommendations() {
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<string | null>(null)
  const { toast } = useToast()
  const { awardXP } = useAchievements()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      studentPerformance: formData.get('performance'),
      interests: formData.get('interests'),
      careerGoals: formData.get('careerGoals'),
    }

    try {
      const response = await fetch('/api/course-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations')
      }

      const result = await response.json()
      setRecommendations(result.recommendations)
      awardXP(20, "Received personalized course recommendations")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch course recommendations. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Course Recommendations</CardTitle>
        <CardDescription>Get personalized course suggestions based on your profile</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="performance" className="block text-sm font-medium text-gray-700">
              Academic Performance
            </label>
            <Input id="performance" name="performance" placeholder="e.g., GPA 3.5, Strong in Math" required />
          </div>
          <div>
            <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
              Interests
            </label>
            <Input id="interests" name="interests" placeholder="e.g., Machine Learning, Web Development" required />
          </div>
          <div>
            <label htmlFor="careerGoals" className="block text-sm font-medium text-gray-700">
              Career Goals
            </label>
            <Textarea id="careerGoals" name="careerGoals" placeholder="Describe your career aspirations" required />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Getting Recommendations..." : "Get Recommendations"}
          </Button>
        </form>
        {recommendations && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Recommended Courses:</h3>
            <p className="whitespace-pre-line">{recommendations}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

