'use client'

import React, { useState } from "react"
import { MapWithMarkers } from "./MapWithMarkers"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarModal } from "./CalendarModal"

interface Request {
    id: number
    name: string
    bloodType: string
    urgency: string
    location: { lat: number; lng: number }
    scheduledTime?: Date
}

export default function RequestsPage() {
    const [pendingRequests, setPendingRequests] = useState<Request[]>([
        { id: 1, name: "Rahim Uddin", bloodType: "A+", urgency: "High", location: { lat: 23.8103, lng: 90.4125 } },
        { id: 2, name: "Karim Ahmed", bloodType: "B-", urgency: "Medium", location: { lat: 22.3569, lng: 91.7832 } },
        { id: 3, name: "Fatema Begum", bloodType: "O-", urgency: "Low", location: { lat: 24.3636, lng: 88.6241 } },
    ])

    const [acceptedRequests, setAcceptedRequests] = useState<Request[]>([])
    const [calendarModalOpen, setCalendarModalOpen] = useState(false)
    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)

    const handleAccept = (request: Request) => {
        setSelectedRequest(request)
        setCalendarModalOpen(true)
    }

    const handleConfirmAccept = (selectedTime: Date) => {
        if (selectedRequest) {
            setPendingRequests((prev) => prev.filter((r) => r.id !== selectedRequest.id))
            setAcceptedRequests((prev) => [...prev, { ...selectedRequest, scheduledTime: selectedTime }])
            setCalendarModalOpen(false)
            setSelectedRequest(null)
        }
    }

    const handleReject = (request: Request) => {
        setPendingRequests((prev) => prev.filter((r) => r.id !== request.id))
    }

    const locations = pendingRequests.map((request) => ({
        name: String(request.id),
        latitude: request.location.lat,
        longitude: request.location.lng,
    }))

    return (
        <div className="container mx-auto p-4 space-y-8">
            <header>
                <h1 className="text-3xl font-bold mb-4">Blood Donation Requests</h1>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold mb-4">Pending Requests</h2>
                    <ScrollArea className="h-[400px]">
                        <AnimatePresence>
                            {pendingRequests.map((request) => (
                                <motion.div
                                    key={request.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className="my-2">
                                        <CardHeader>
                                            <CardTitle>{request.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>Blood Type: {request.bloodType}</p>
                                            <p>Urgency: {request.urgency}</p>
                                        </CardContent>
                                        <CardFooter className="justify-end space-x-2">
                                            <Button variant="outline" onClick={() => handleReject(request)}>
                                                Reject
                                            </Button>
                                            <Button onClick={() => handleAccept(request)}>Accept</Button>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </ScrollArea>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold mb-4">Map</h2>
                    <div className="h-[400px] rounded-lg overflow-hidden">
                        <MapWithMarkers locations={locations} />
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Accepted Requests</h2>
                <ScrollArea className="h-[400px]">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <AnimatePresence>
                            {acceptedRequests.map((request) => (
                                <motion.div
                                    key={request.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>{request.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>Blood Type: {request.bloodType}</p>
                                            <p>Urgency: {request.urgency}</p>
                                            {request.scheduledTime && (
                                                <p>Scheduled: {request.scheduledTime.toLocaleString()}</p>
                                            )}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </ScrollArea>
            </div>

            <CalendarModal
                isOpen={calendarModalOpen}
                onClose={() => setCalendarModalOpen(false)}
                onConfirm={handleConfirmAccept}
            />
        </div>
    )
}

