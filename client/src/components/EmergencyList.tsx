'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { ChevronDown, ChevronUp, Clock, Droplet, MapPin } from 'lucide-react'

const dummy = [
    { id: '1', bloodType: 'A+', location: 'Central Hospital', urgency: 'High', postedAt: '2023-05-10T09:00:00Z' },
    { id: '2', bloodType: 'O-', location: 'St. Mary\'s Clinic', urgency: 'Medium', postedAt: '2023-05-10T10:30:00Z' },
    { id: '3', bloodType: 'B+', location: 'Emergency Care Center', urgency: 'Low', postedAt: '2023-05-10T11:45:00Z' },
]
export default function EmergencyBloodDonationList() {
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const handleToggleDetails = (id: string) => {
        setExpandedId(expandedId === id ? null : id)
    }

    const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
            case 'High': return 'bg-red-500'
            case 'Medium': return 'bg-yellow-500'
            case 'Low': return 'bg-green-500'
            default: return 'bg-gray-500'
        }
    }

    return (
        <div className="max-w-2xl mx-auto my-8 p-6 bg-background rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Emergency Blood Donation Needs</h2>
            <ul className="space-y-4">
                {dummy.map((request) => (
                    <li key={request.id} className="border border-muted rounded-lg overflow-hidden">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className={`w-12 h-12 ${getUrgencyColor(request.urgency)} rounded-full flex items-center justify-center`}>
                                    <Droplet className="w-6 h-6 text-background" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">{request.bloodType} Blood Needed</h3>
                                    <p className="text-sm text-muted-foreground flex items-center">
                                        <MapPin className="w-4 h-4 mr-1" /> {request.location}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleToggleDetails(request.id)}
                                aria-expanded={expandedId === request.id}
                                className="flex items-center space-x-1"
                            >
                                <span>{expandedId === request.id ? 'Hide' : 'Details'}</span>
                                {expandedId === request.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </Button>
                        </div>
                        {expandedId === request.id && (
                            <div className="px-4 pb-4 space-y-2">
                                <p className="text-sm text-muted-foreground flex items-center">
                                    <Clock className="w-4 h-4 mr-1" /> Posted: {new Date(request.postedAt).toLocaleString()}
                                </p>
                                <p className="text-sm">Urgency: <span className="font-semibold">{request.urgency}</span></p>
                                <Button className="w-full mt-2">Respond to Request</Button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

