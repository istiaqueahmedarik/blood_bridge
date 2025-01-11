'use client'

import React, { useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import { Card } from "@/components/ui/card"
import 'mapbox-gl/dist/mapbox-gl.css'

interface Location {
    name: string
    latitude: number
    longitude: number
}

interface MapComponentProps {
    locations: Location[]
}

export function MapWithMarkers({ locations }: MapComponentProps) {
    const [viewState, setViewState] = useState({
        latitude: locations[0]?.latitude || 0,
        longitude: locations[0]?.longitude || 0,
        zoom: 18
    })
    console.log(locations)
    const [popupInfo, setPopupInfo] = useState<Location | null>(null)

    return (
        <Card className="w-[800px] h-[400px] overflow-hidden">
            <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                style={{ width: '100%', height: '100%' }}
            >
                {locations.map((location, index) => (
                    <Marker
                        key={index}
                        latitude={location.latitude}
                        longitude={location.longitude}
                        onClick={e => {
                            e.originalEvent.stopPropagation()
                            setPopupInfo(location)
                        }}
                    >
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer">
                            {index + 1}
                        </div>
                    </Marker>
                ))}

                {popupInfo && (
                    <Popup
                        anchor="top"
                        latitude={popupInfo.latitude}
                        longitude={popupInfo.longitude}
                        onClose={() => setPopupInfo(null)}
                    >
                        <div className="p-2">
                            <h3 className="font-bold">{popupInfo.name}</h3>
                            <p>Lat: {popupInfo.latitude.toFixed(4)}, Lng: {popupInfo.longitude.toFixed(4)}</p>
                        </div>
                    </Popup>
                )}
            </Map>
        </Card>
    )
}

