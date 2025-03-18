"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { useAchievements } from './achievement-provider'

export function PlagiarismChecker() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { awardXP } = useAchievements()

  const checkPlagiarism = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/plagiarism-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setResult(data.similarityScore);
      awardXP(10, "Used the plagiarism checker");

      if (data.similarityScore > 20) {
        toast({
          title: "High Similarity Detected",
          description: "Your text may contain significant amounts of plagiarized content. Please review and revise.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Low Similarity",
          description: "Your text appears to be mostly original.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error('Error checking plagiarism:', error);
      toast({
        title: "Error",
        description: "Failed to check for plagiarism. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plagiarism Checker</CardTitle>
        <CardDescription>Check your text for potential plagiarism</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          className="mb-4"
        />
        <Button onClick={checkPlagiarism} disabled={loading || text.length === 0}>
          {loading ? "Checking..." : "Check for Plagiarism"}
        </Button>
        {result !== null && (
          <div className="mt-4">
            <p className="mb-2">Similarity Score: {result}%</p>
            <Progress value={result} className="w-full" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

