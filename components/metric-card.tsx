import { Card, CardContent } from "@/components/ui/card"

interface MetricCardProps {
  title: string
  value: string
  subtext: string
}

export function MetricCard({ title, value, subtext }: MetricCardProps) {
  return (
    <Card className="bg-secondary hover:bg-secondary/80 transition-colors">
      <CardContent className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
        <div className="text-3xl font-bold text-glow">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
      </CardContent>
    </Card>
  )
}

