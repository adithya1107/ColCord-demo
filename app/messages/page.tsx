import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function MessagesPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-foreground">Messages</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Recent messages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Alice Johnson', 'Bob Smith', 'Carol Williams'].map((name, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`/avatars/0${i+1}.png`} />
                    <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{name}</p>
                    <p className="text-sm text-muted-foreground">Hey, how's it going?</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Chat</CardTitle>
            <CardDescription>Your conversation with Alice Johnson</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Hi there!', 'How are you doing?', 'I had a question about the assignment.'].map((msg, i) => (
                <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                  <div className={`rounded-lg p-2 ${i % 2 === 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                    {msg}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Input placeholder="Type your message..." />
              <Button>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

