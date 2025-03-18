import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function GroupsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-foreground">Groups</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {['Study Group A', 'Research Team B', 'Project Team C'].map((group, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{group}</CardTitle>
              <CardDescription>5 members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                {[1, 2, 3].map((_, j) => (
                  <Avatar key={j}>
                    <AvatarImage src={`/avatars/0${j+1}.png`} />
                    <AvatarFallback>M{j+j+1}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-sm">Recent activity: New document shared</p>
                <p className="text-sm text-muted-foreground">Last active: 2 hours ago</p>
              </div>
              <Button className="w-full mt-4">View Group</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

