'use client'

import React, { useState, useEffect, useRef } from 'react'
import Map, { Marker, Source, Layer, MapRef } from 'react-map-gl'
import { format } from 'date-fns'
import { MapPin, Clock, Navigation, ChevronRight, ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import "mapbox-gl/dist/mapbox-gl.css";
import { design } from './map_design'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from './ui/input'
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

interface Message {
  id: number
  sender: string
  content: string
  timestamp: Date
}

interface Step {
  maneuver: {
    instruction: string
  }
  distance: number
}

// Random addresses in Dhaka
const dhakaAddresses = [
  { name: 'Dhaka Medical College Hospital', coordinates: [90.3973, 23.7268] },
  { name: 'Bangabandhu Sheikh Mujib Medical University', coordinates: [90.3953, 23.7398] },
  { name: 'Square Hospitals Ltd', coordinates: [90.3756, 23.7508] },
  { name: 'United Hospital Limited', coordinates: [90.4137, 23.8008] },
  { name: 'Apollo Hospitals Dhaka', coordinates: [90.4211, 23.8103] },
]

export default function BloodDonationEmergency() {
  const mapRef = useRef<MapRef>(null)
  const [viewState, setViewState] = useState({
    longitude: 90.4125,
    latitude: 23.8103,
    zoom: 12,
    pitch: 75,
    bearing: 0,
    width: '100%',
    height: '200%'
  })

  const [origin, setOrigin] = useState<[number, number]>([90.4125, 23.8103])
  const [destination, setDestination] = useState(dhakaAddresses[0])
  const [route, setRoute] = useState<GeoJSON.Feature | null>(null)
  const [eta, setEta] = useState<string>('')
  const [steps, setSteps] = useState<Step[]>([])
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length)
  }

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length)
  }
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'Dispatch', content: 'Urgent: Type O- blood needed at Dhaka Medical', timestamp: new Date() },
    { id: 2, sender: 'You', content: 'On my way, getting current location', timestamp: new Date() },
    { id: 3, sender: 'Dispatch', content: 'Received, please hurry', timestamp: new Date() },
  ])

  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: prevMessages.length + 1, sender: 'You', content: inputValue, timestamp: new Date() }
      ])
      setInputValue('')
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords
          setOrigin([longitude, latitude])
          setViewState(prev => ({ ...prev, longitude, latitude }))
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
    }

    const randomDestination = dhakaAddresses[Math.floor(Math.random() * dhakaAddresses.length)]
    setDestination(randomDestination)

  }, [])

  useEffect(() => {
    if (origin && destination) {
      fetchRoute()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin, destination])

  const fetchRoute = async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination.coordinates[0]},${destination.coordinates[1]}?steps=true&geometries=geojson&access_token=${MAPBOX_TOKEN}`
      )
      const data = await response.json()
      if (data.routes && data.routes.length > 0) {
        setRoute(data.routes[0].geometry)
        setSteps(data.routes[0].legs[0].steps)
        // Calculate ETA
        const durationInSeconds = data.routes[0].duration
        const etaMinutes = Math.round(durationInSeconds / 60)
        setEta(`${etaMinutes} minutes`)
      }
    } catch (error) {
      console.error("Error fetching route:", error)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: prevMessages.length + 1, sender: 'Ariful', content: 'Please update your status.', timestamp: new Date() }
      ])
    }, 10000)

    return () => clearInterval(interval)
  }, [])


  return (
    <div className="relative h-screen w-full   overflow-hidden">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={evt => setViewState(prev => ({ ...prev, ...evt.viewState }))}
        mapStyle={design}
        mapboxAccessToken={MAPBOX_TOKEN}
        terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
      >
        <Source id="mapbox-dem" type="raster-dem" url="mapbox://mapbox.mapbox-terrain-dem-v1" tileSize={512} maxzoom={14} />
        <Layer
          id="building"
          type="fill-extrusion"
          source="composite"
          source-layer="building"
          paint={{
            'fill-extrusion-color': '#4B5563',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.8
          }}
        />
        <Marker
          longitude={origin[0]}
          latitude={origin[1]}
          anchor="center"
          rotationAlignment="map"
          pitchAlignment="map"
        >
          <Navigation
            className="text-destructive"
            size={24}

          />
        </Marker>
        <Marker longitude={destination.coordinates[0]} latitude={destination.coordinates[1]} anchor="bottom">
          <MapPin className="text-green-500" size={24} />
        </Marker>
        {route && (
          <Source id="route" type="geojson" data={route}>
            <Layer
              id="route"
              type="line"
              paint={{
                'line-color': '#007cbf',
                'line-width': 3
              }}
            />
          </Source>
        )}
      </Map>
      <div className="absolute top-0 left-0 m-6 w-1/3 bg-foreground border border-primary bg-opacity-80 p-4 rounded-lg">
        <Card className="h-full bg-foreground text-background border-none">
          <CardHeader>
            <CardTitle>
              Emergency Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="text-destructive" />
              <span>{destination.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="text-blue-500" />
              <span>ETA: {eta}</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Inbox</h3>
              <ScrollArea className="h-64 rounded border border-muted/20 p-4">
                {messages.map(message => (
                  <div key={message.id} className="mb-4">
                    <div className="flex justify-between text-sm text-input">
                      <span>{message.sender}</span>
                      <span>{format(message.timestamp, 'HH:mm')}</span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                ))}
              </ScrollArea>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button size="sm" onClick={handleSendMessage}>
                <ChevronRight className=" h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="absolute right-0 top-0 flex justify-end p-4">
        <Card className="w-80 bg-foreground shadow-lg border-primary">
          <CardHeader className="bg-destructive rounded-xl text-background">
            <CardTitle className="text-2xl font-bold">Steps</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4 text-4xl font-bold text-background">
              {currentStep + 1}/{steps.length}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-24"
              >
                <p className="text-lg text-muted-foreground">{steps[currentStep]?.maneuver.instruction}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-6 flex justify-between">
              <Button onClick={prevStep} variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button onClick={nextStep} variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

