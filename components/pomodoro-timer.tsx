"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Play, Pause, RotateCcw } from 'lucide-react'
import { useAchievements } from './achievement-provider'

const WORK_TIME = 25 * 60 // 25 minutes in seconds
const BREAK_TIME = 5 * 60 // 5 minutes in seconds

export function PomodoroTimer() {
  const [time, setTime] = useState(WORK_TIME)
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const { awardXP } = useAchievements()

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    } else if (time === 0) {
      if (isBreak) {
        setTime(WORK_TIME)
        setIsBreak(false)
        awardXP(10, "Completed a Pomodoro break")
      } else {
        setTime(BREAK_TIME)
        setIsBreak(true)
        awardXP(25, "Completed a Pomodoro work session")
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time, isBreak, awardXP])

  const toggleTimer = () => setIsActive(!isActive)

  const resetTimer = () => {
    setIsActive(false)
    setTime(WORK_TIME)
    setIsBreak(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Pomodoro Timer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <p className="text-4xl font-bold">{formatTime(time)}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {isBreak ? "Break Time" : "Work Time"}
          </p>
        </div>
        <Progress value={(isBreak ? BREAK_TIME - time : WORK_TIME - time) / (isBreak ? BREAK_TIME : WORK_TIME) * 100} className="mb-4" />
        <div className="flex justify-center gap-2">
          <Button onClick={toggleTimer}>
            {isActive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button variant="outline" onClick={resetTimer}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

