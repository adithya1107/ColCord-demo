import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Flame } from 'lucide-react'
import { useAchievements } from './achievement-provider'

export default function StudyStreak() {
  const { userProgress } = useAchievements()
  const streak = userProgress.streak || 0 // Assuming we add a 'streak' property to userProgress

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-primary" />
          Study Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <p className="text-3xl font-bold">{streak} days</p>
          <p className="text-sm text-muted-foreground mt-1">Keep it up!</p>
        </div>
        <Progress value={(streak / 30) * 100} className="mt-4" />
        <p className="text-xs text-center mt-2">
          {30 - streak} more days to reach a 30-day streak!
        </p>
      </CardContent>
    </Card>
  )
}

