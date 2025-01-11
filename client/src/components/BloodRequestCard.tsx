'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { CalendarModal } from "./CalendarModal"

interface BloodRequest {
    id: string
    hospitalName: string
    bloodType: string
    quantity: number
    urgency: 'low' | 'medium' | 'high'
    status: 'pending' | 'accepted' | 'rejected'
    scheduledTime?: Date
}

interface BloodRequestCardProps {
    request: BloodRequest
    onStatusChange: (id: string, newStatus: 'accepted' | 'rejected', scheduledTime?: Date) => void
}

export default function BloodRequestCard({ request, onStatusChange }: BloodRequestCardProps) {
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)

    const urgencyColor = {
        low: 'bg-green-100 text-green-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-red-100 text-red-800'
    }

    const handleAccept = () => {
        setIsCalendarModalOpen(true)
    }

    const handleConfirmAccept = (selectedTime: Date) => {
        onStatusChange(request.id, 'accepted', selectedTime)
        setIsCalendarModalOpen(false)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{request.hospitalName}</CardTitle>
                <Badge className={urgencyColor[request.urgency]}>{request.urgency} urgency</Badge>
            </CardHeader>
            <CardContent>
                <p>Blood Type: {request.bloodType}</p>
                <p>Quantity: {request.quantity} units</p>
                <p>Status: {request.status}</p>
                {request.scheduledTime && (
                    <p>Scheduled Time: {request.scheduledTime.toLocaleString()}</p>
                )}
            </CardContent>
            <CardFooter className="grid auto-rows-min gap-2">
                {request.status === 'pending' && (
                    <>
                        <Button onClick={handleAccept} variant="outline">Accept</Button>
                        <Button onClick={() => onStatusChange(request.id, 'rejected')} variant="outline">Reject</Button>
                    </>
                )}
                <Link href={`/bloodbank/blood/inbox/${request.id}`}>
                    <Button variant="link">Contact Hospital</Button>
                </Link>
            </CardFooter>
            <CalendarModal
                isOpen={isCalendarModalOpen}
                onClose={() => setIsCalendarModalOpen(false)}
                onConfirm={handleConfirmAccept}
            />
        </Card>
    )
}

