"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trophy } from 'lucide-react'
import { useAchievements } from './achievement-provider'

export function Achievements() {
  const { userProgress } = useAchievements()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Achievements
        </CardTitle>
        <CardDescription>Your learning milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {userProgress.achievements.map((achievement, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                  {achievement.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-primary">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Earned on {new Date(achievement.dateEarned).toLocaleDateString()}
              </p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

