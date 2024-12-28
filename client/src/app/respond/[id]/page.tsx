'use client'
import React from 'react'
import TrackingCard from '@/components/tracking-card'
import MapView from '@/components/map-view'
function page() {
  return (
      <div className="min-h-screen flex flex-col">
          <div className="flex-1 p-4 space-y-4">
              <TrackingCard
                  donorId="#BD2025-001"
                  destination="City Hospital"
                  eta={15}
                  distance={3.2}
                  onAccept={() => console.log("Accepted")}
                  onChat={() => console.log("Chat opened")}
              />
              <MapView />
          </div>
      </div>
  )
}

export default page