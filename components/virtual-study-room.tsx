"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export function VirtualStudyRoom() {
  const [roomId, setRoomId] = useState('')
  const [jitsiApi, setJitsiApi] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://meet.jit.si/external_api.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const startMeeting = () => {
    if (!roomId) {
      toast({
        title: "Error",
        description: "Please enter a room ID",
        variant: "destructive",
      })
      return
    }

    const domain = 'meet.jit.si'
    const options = {
      roomName: `ColCord-${roomId}`,
      width: '100%',
      height: 500,
      parentNode: document.querySelector('#meet'),
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
          'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
          'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
          'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
          'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
          'e2ee'
        ],
      },
    }

    // @ts-ignore
    const api = new JitsiMeetExternalAPI(domain, options)
    setJitsiApi(api)
  }

  const endMeeting = () => {
    if (jitsiApi) {
      jitsiApi.executeCommand('hangup')
      jitsiApi.dispose()
      setJitsiApi(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Virtual Study Room</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Enter room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <Button onClick={startMeeting}>Join Room</Button>
          <Button variant="destructive" onClick={endMeeting}>Leave Room</Button>
        </div>
        <div id="meet" />
      </CardContent>
    </Card>
  )
}

