/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useActionState, useEffect, useState } from "react"
import { MapWithMarkers } from "./MapWithMarkers"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarModal } from "./CalendarModal"
import { post_with_token } from "@/app/actions/req"
import { Input } from "@/components/ui/input"
import { AcceptRequest, RejectRequest } from "@/app/actions/bloodbank"
import { X } from "lucide-react"
import { RejectModal } from "./RejectModal"

interface Request {
    id: number
    name: string
    bloodType: string
    prefStartDate: Date
    prefEndDate: Date
    prefStartTime: string
    prefEndTime: string
    location: { lat: number; lng: number }
    scheduledTime?: Date
    user_id?: string
}

export default function RequestsPage({ data, data1 }: any) {
    const [pendingRequests, setPendingRequests] = useState<Request[]>([])
    const [acceptedRequests, setAcceptedRequests] = useState<Request[]>([])
    const [bookedTimes, setBookedTimes] = useState<
        {
            id: number
            start_time: Date
            end_time: Date
        }[]
    >([])
    const [locations, setLocations] = useState<any[]>([])
    const [calendarModalOpen, setCalendarModalOpen] = useState(false)
    const [rejectModalOpen, setRejectModalOpen] = useState(false)
    const [selectedRequestId, setSelectedRequestId] = useState<Request>()

    const [state, formAction, pending] = useActionState(AcceptRequest, null)

    useEffect(() => {
        data.data.map((d: any) => {
            setBookedTimes((prev) => [
                ...prev,
                {
                    id: d.id,
                    start_time: new Date(d.start_time),
                    end_time: new Date(d.end_time),
                },
            ])
        })
        data.data1.map((d: any) => {
            setPendingRequests((prev) => [
                ...prev,
                {
                    id: d.app_id,
                    name: d.Full_name,
                    bloodType: d.Blood_type,
                    location: { lat: d.latitude, lng: d.longitude },
                    prefStartDate: new Date(d.Pref_date_start),
                    prefEndDate: new Date(d.Pref_date_end),
                    prefStartTime: d.Pref_time_start,
                    prefEndTime: d.Pref_time_end,
                },
            ])
            setLocations((prev) => [
                ...prev,
                {
                    name: String(d.ID),
                    latitude: d.latitude,
                    longitude: d.longitude,
                },
            ])
        })
        console.log(data1)
        data1.data.map((d: any) => {
            console.log(d)
            setAcceptedRequests((prev) => [
                ...prev,
                {
                    id: d.app_id,
                    name: d.Full_name,
                    bloodType: d.Blood_type,
                    location: { lat: d.latitude, lng: d.longitude },
                    prefStartDate: new Date(d.Pref_date_start),
                    prefEndDate: new Date(d.Pref_date_end),
                    prefStartTime: d.Pref_time_start,
                    prefEndTime: d.Pref_time_end,
                    user_id: d.ID
                },
            ])
        })
    }, [data, data1])

    const handleBooking = async (dateTime: {
        start_time: Date
        end_time: Date
    }) => {
        console.log(dateTime)
        try {
            const res = await post_with_token("institute/auth/booked", dateTime)
            setBookedTimes((prev) => [
                ...prev,
                {
                    id: res?.data.data[0].id,
                    start_time: dateTime.start_time,
                    end_time: dateTime.end_time,
                },
            ])
        } catch (error) {
            console.error("Error sending booking:", error)
        }
    }

    const handleRemoveBooking = async (index: number) => {
        await post_with_token("institute/auth/booked/delete", {
            start_time: bookedTimes[index].start_time,
            end_time: bookedTimes[index].end_time,
        })
        setBookedTimes((prev) => prev.filter((_, i) => i !== index))
    }

    const handleReject = (request: any) => {
        setSelectedRequestId(request)
        setRejectModalOpen(true)
        console.log(request);
    }

    const handleRejectSubmit = async (explanation: string) => {
        if (!selectedRequestId) return
        await RejectRequest(selectedRequestId, explanation)

        setAcceptedRequests((prev) => prev.filter((r) => r.id !== selectedRequestId.id))

        setRejectModalOpen(false)
    }

    return (
        <div className="container mx-auto p-4 space-y-8">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-4">Blood Donation Requests</h1>
                <Button onClick={() => setCalendarModalOpen(true)}>Book time slot</Button>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold mb-4">Pending Requests</h2>
                    <ScrollArea className="h-[400px]">
                        <AnimatePresence>
                            {pendingRequests.map((request, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className={`my-2 ${state !== null ? "opacity-50" : ""}`}>
                                        <CardHeader>
                                            <CardTitle>{request.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>Blood Type: {request.bloodType}</p>
                                            <p>
                                                Preferred Date: {request.prefStartDate.toLocaleDateString()} -{" "}
                                                {request.prefEndDate.toLocaleDateString()}
                                            </p>
                                            <p>
                                                Preferred Time: {request.prefStartTime} - {request.prefEndTime}
                                            </p>
                                        </CardContent>
                                        <CardFooter className="justify-end space-x-2">
                                            <form action={formAction}>
                                                <Button type="submit" disabled={pending || state !== null} variant="default">
                                                    {pending ? "Accepting..." : "Accept"}
                                                </Button>
                                                <Input type="hidden" name="appointment_id" value={request.id} />
                                            </form>

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
                        {locations.length > 0 && <MapWithMarkers locations={locations} />}
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Accepted Requests</h2>
                <ScrollArea className="h-[400px]">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <AnimatePresence>
                            {acceptedRequests.map((request, id) => (
                                <motion.div
                                    key={id}
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
                                            <p>
                                                Preferred Date: {request.prefStartDate.toLocaleDateString()} -{" "}
                                                {request.prefEndDate.toLocaleDateString()}
                                            </p>

                                        </CardContent>
                                        <CardContent>
                                            <Button variant="outline" onClick={() => handleReject(request)}>
                                                <X className="w-4 h-4 mr-2" />
                                                Reject
                                            </Button>
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
                onBooking={handleBooking}
                onRemoveBooking={handleRemoveBooking}
                bookedTimes={bookedTimes}
            />

            <RejectModal isOpen={rejectModalOpen} onClose={() => setRejectModalOpen(false)} onSubmit={handleRejectSubmit} />
        </div>
    )
}

