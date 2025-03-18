"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
})

interface MapViewProps {
  spots: Array<{
    id: number
    name: string
    lat: number
    lng: number
  }>
}

function MapComponent({ spots }: MapViewProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => window.dispatchEvent(new Event("resize")), 300)
    }
  }, [spots])

  return (
    <MapContainer
      center={[spots[0]?.lat || 0, spots[0]?.lng || 0]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {spots.map((spot) => (
        <Marker key={spot.id} position={[spot.lat, spot.lng]}>
          <Popup>{spot.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

// Disable SSR for Next.js compatibility
export const MapView = dynamic(() => Promise.resolve(MapComponent), { ssr: false })