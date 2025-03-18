import { Progress } from "@/components/ui/progress"
import { useAchievements } from './achievement-provider'

export function UserProgress() {
  const { userProgress } = useAchievements()
  const { xp, level } = userProgress

  const xpForCurrentLevel = 100 * (level - 1) ** 2
  const xpForNextLevel = 100 * level ** 2
  const xpProgress = ((xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100

  return (
    <div className="flex items-center space-x-4">
      <div className="text-sm font-medium text-primary">Level {level}</div>
      <Progress value={xpProgress} className="w-[100px]" />
      <div className="text-sm font-medium text-secondary">{xp} XP</div>
    </div>
  )
}

