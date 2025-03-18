import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from 'lucide-react'

interface TrendingTopic {
  id: string
  title: string
  category: string
  engagement: number
}

const trendingTopics: TrendingTopic[] = [
  { id: '1', title: "Upcoming AI Workshop", category: "Events", engagement: 156 },
  { id: '2', title: "New Research Opportunities", category: "Academic", engagement: 132 },
  { id: '3', title: "Campus Sustainability Initiative", category: "Community", engagement: 98 },
  { id: '4', title: "Exam Preparation Strategies", category: "Study", engagement: 87 },
  { id: '5', title: "Internship Fair Next Week", category: "Career", engagement: 76 },
]

export function TrendingTopics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {trendingTopics.map((topic) => (
            <li key={topic.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{topic.title}</p>
                <Badge variant="secondary" className="mt-1">
                  {topic.category}
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground">
                {topic.engagement} engagements
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

