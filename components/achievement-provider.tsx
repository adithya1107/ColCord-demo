"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useToast } from "@/components/ui/use-toast"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  dateEarned: string
  xpAwarded: number
}

interface UserProgress {
  xp: number
  level: number
  nextLevelXp: number;
  achievements: Achievement[]
  streak: number
}

interface AchievementContextType {
  userProgress: UserProgress
  awardAchievement: (achievement: Omit<Achievement, 'id' | 'dateEarned'>) => void
  awardXP: (amount: number, reason: string) => void
}

const defaultProgress: UserProgress = {
  xp: 0,
  level: 1,
  nextLevelXp: 100,
  achievements: [],
  streak: 0
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined)

export const useAchievements = () => {
  const context = useContext(AchievementContext)
  if (context === undefined) {
    throw new Error('useAchievements must be used within an AchievementProvider')
  }
  return context
}

const calculateLevel = (xp: number) => Math.floor(Math.sqrt(xp / 100)) + 1

export function AchievementProvider({ children }: { children: React.ReactNode }) {
  const [userProgress, setUserProgress] = useState<UserProgress>(defaultProgress)
  const { toast } = useToast()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const loadProgress = () => {
      try {
        const storedProgress = localStorage.getItem('userProgress')
        if (storedProgress) {
          const parsedProgress = JSON.parse(storedProgress)
          setUserProgress(parsedProgress)
        }
      } catch (error) {
        console.error('Error loading progress:', error)
      } finally {
        setIsInitialized(true)
      }
    }

    loadProgress()
  }, [])

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('userProgress', JSON.stringify(userProgress))
      } catch (error) {
        console.error('Error saving progress:', error)
      }
    }
  }, [userProgress, isInitialized])

  const awardAchievement = useCallback((newAchievement: Omit<Achievement, 'id' | 'dateEarned'>) => {
    const achievement = {
      ...newAchievement,
      id: Date.now().toString(),
      dateEarned: new Date().toISOString(),
    }

    setUserProgress(prev => {
      const updatedXP = prev.xp + achievement.xpAwarded
      const nextLevelXP = Math.pow(prev.level, 2) * 100;
      let newLevel = prev.level;
      let newNextLevelXP = nextLevelXP;

      if (updatedXP >= nextLevelXP) {
        newLevel++;
        newNextLevelXP = Math.pow(newLevel, 2) * 100;
      }
      return {
        ...prev,
        xp: updatedXP,
        level: newLevel,
        nextLevelXp: newNextLevelXP,
        achievements: [...prev.achievements, achievement]
      }
    })

    toast({
      title: "Achievement Unlocked!",
      description: `${newAchievement.title} - ${newAchievement.description}`,
    })
  }, [toast])

  const awardXP = useCallback((amount: number, reason: string) => {
    setUserProgress(prev => {
      const updatedXP = prev.xp + amount;
      const nextLevelXP = Math.pow(prev.level, 2) * 100;
      let newLevel = prev.level;
      let newNextLevelXP = nextLevelXP;

      if (updatedXP >= nextLevelXP) {
        newLevel++;
        newNextLevelXP = Math.pow(newLevel, 2) * 100;
      }

      return {
        ...prev,
        xp: updatedXP,
        level: newLevel,
        nextLevelXp: newNextLevelXP
      };
    });

    toast({
      title: `Gained ${amount} XP!`,
      description: reason,
    });
  }, [toast]);

  if (!isInitialized) {
    return null
  }

  const value = {
    userProgress,
    awardAchievement,
    awardXP
  }

  return (
    <AchievementContext.Provider value={value}>
      {children}
    </AchievementContext.Provider>
  )
}

