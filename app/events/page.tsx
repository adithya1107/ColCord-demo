import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

export default function EventsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-foreground">Events</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your schedule for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Project Meeting', 'Guest Lecture', 'Study Group'].map((event, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{event}</p>
                    <p className="text-sm text-muted-foreground">May {15 + i}, 2023</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Manage your schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

