'use client'

import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { Icon } from 'leaflet'
import { format } from 'date-fns'
import { MapPin, Clock, MessageSquare } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

import 'leaflet/dist/leaflet.css'

interface Message {
  id: number
  sender: string
  content: string
  timestamp: Date
}

export default function BloodDonationEmergency() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'Dispatch', content: 'Urgent: Type O- blood needed at SF General', timestamp: new Date() },
    { id: 2, sender: 'You', content: 'On my way, ETA 15 minutes', timestamp: new Date() },
    { id: 3, sender: 'Dispatch', content: 'Received, please hurry', timestamp: new Date() },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [origin, setOrigin] = useState<[number, number] | null>(null)
  const destination = {
    name: 'Dhaka Medical College Hospital',
    coordinates: [23.7277, 90.3950] as [number, number]
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setOrigin([position.coords.latitude, position.coords.longitude])
    })
  }, [])

  const customIcon = new Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  })

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return
    const message = {
      id: messages.length + 1,
      sender: 'You',
      content: newMessage,
      timestamp: new Date()
    }
    setMessages([...messages, message])
    setNewMessage('')
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        sender: 'Dispatch',
        content: 'Acknowledged. Stay safe!',
        timestamp: new Date()
      }
      setMessages(prevMessages => [...prevMessages, response])
    }, 2000)
  }

  if (!origin) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-grow p-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Emergency Blood Donation Response</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-4rem)]">
            <MapContainer center={origin} zoom={130} style={{ height: '100%', width: '100%' }} className='z-20 rounded-xl'>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={origin} icon={customIcon}>
                <Popup>Current Location</Popup>
              </Marker>
              <Marker position={destination.coordinates} icon={customIcon}>
                <Popup>{destination.name}</Popup>
              </Marker>
              <Polyline positions={[origin as [number, number], destination.coordinates as [number, number]]} color="blue" />
            </MapContainer>
          </CardContent>
        </Card>
      </div>
      <div className="w-1/3 p-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Mission Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="text-red-500" />
              <span>{destination.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="text-blue-500" />
              <span>ETA: 15 minutes</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Inbox</h3>
              <ScrollArea className="h-64 rounded border p-4">
                {messages.map(message => (
                  <div key={message.id} className="mb-4">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{message.sender}</span>
                      <span>{format(message.timestamp, 'HH:mm')}</span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                ))}
              </ScrollArea>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow rounded-md border p-2 text-sm"
              />
              <Button size="sm" onClick={handleSendMessage}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Send
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">●</span>
              <span>Live</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

