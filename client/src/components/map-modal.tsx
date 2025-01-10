'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'

interface MapModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLocationSelect: (location: string) => void
}
const customIcon = new Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})
export default function MapModal({ open, onOpenChange, onLocationSelect }: MapModalProps) {
  const [selectedLocation, setSelectedLocation] = useState({ lat: 0, lng: 0 })

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setSelectedLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    }
  }, [])

  const handleLocationSelect = () => {
    onLocationSelect(`${selectedLocation.lat},${selectedLocation.lng}`)
    onOpenChange(false)
  }

  function LocationMarker() {
    useMapEvents({
      click(event) {
        setSelectedLocation({
          lat: event.latlng.lat,
          lng: event.latlng.lng,
        })
      },
    })

    return selectedLocation.lat !== 0 && selectedLocation.lng !== 0 ? (
      <Marker icon={customIcon} position={[selectedLocation.lat, selectedLocation.lng]} >
        <Popup>
          Your choosen location
        </Popup>
      </Marker>
    ) : null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Location</DialogTitle>
          <DialogDescription>
            Choose a location on the map for your blood donation.
          </DialogDescription>
        </DialogHeader>
        <div className="h-[300px]">
          <MapContainer
            center={[selectedLocation.lat, selectedLocation.lng]}
            zoom={120}
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
            {selectedLocation.lat !== 0 && selectedLocation.lng !== 0 && (
              <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
            )}
          </MapContainer>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleLocationSelect}>Confirm Location</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

