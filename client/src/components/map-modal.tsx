'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Map, { Marker, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

interface MapModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLocationSelect: (location: string) => void
}

export default function MapModal({ open, onOpenChange, onLocationSelect }: MapModalProps) {

  const [selectedLocation, setSelectedLocation] = useState({ lat: 23.8103, lng: 90.4125 })


  const handleLocationSelect = () => {
    onLocationSelect(`${selectedLocation.lat},${selectedLocation.lng}`)
    onOpenChange(false)
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
          <Map
            initialViewState={{
              longitude: selectedLocation.lng,
              latitude: selectedLocation.lat,
              zoom: 12
            }}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            onClick={(e) => setSelectedLocation({ lat: e.lngLat.lat, lng: e.lngLat.lng })}
          >
            <NavigationControl position="top-left" />
            {selectedLocation.lat !== 0 && selectedLocation.lng !== 0 && (
              <Marker latitude={selectedLocation.lat} longitude={selectedLocation.lng} />
            )}
          </Map>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleLocationSelect}>Confirm Location</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

