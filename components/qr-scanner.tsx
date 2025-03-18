import { useEffect, useRef, useState } from "react"
import { BrowserQRCodeReader } from "@zxing/browser"
import { BrowserMultiFormatReader } from "@zxing/library"

interface QrScannerProps {
  onScan: (data: string | null) => void
  onError: (error: Error) => void
}

export function QrScanner({ onScan, onError }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState<string | null>(null)
  const codeReader = useRef(new BrowserMultiFormatReader()).current

  useEffect(() => {
    const startScanning = async () => {
      try {
        const videoInputDevices = await BrowserQRCodeReader.listVideoInputDevices()
        if (videoInputDevices.length === 0) {
          throw new Error("No camera devices found.")
        }
        const selectedDeviceId = videoInputDevices[0].deviceId

        if (videoRef.current) {
          await codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, error) => {
            if (result) {
              onScan(result.getText())
            }
            if (error) {
              onError(error)
            }
          })
        }
      } catch (err) {
        setError("Failed to start QR scanner. Please check camera permissions.")
        onError(err as Error)
      }
    }

    startScanning()

    return () => {
      codeReader.stopContinuousDecode() 
    }
  }, [onScan, onError, codeReader])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="relative w-full max-w-[300px] aspect-square">
      <video ref={videoRef} className="w-full h-full object-cover" />
      <div className="absolute inset-0 border-2 border-primary opacity-50 pointer-events-none" />
    </div>
  )
}