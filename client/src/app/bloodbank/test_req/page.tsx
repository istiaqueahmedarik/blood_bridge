'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarModal } from '@/components/CalendarModal'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BloodTestRequestCard } from '@/components/BloodTestRequestCard'

interface BloodTestRequest {
    id: string
    patientName: string
    testType: string
    urgency: 'low' | 'medium' | 'high'
    status: 'pending' | 'accepted' | 'rejected'
    scheduledTime?: Date
}

export default function BloodTestRequestsPage() {
    const [requests, setRequests] = useState<BloodTestRequest[]>([

        { id: '4', patientName: 'Rahim Uddin', testType: 'A-', urgency: 'high', status: 'pending' },
        { id: '5', patientName: 'Karim Ahmed', testType: 'AB+', urgency: 'medium', status: 'pending' },
        { id: '6', patientName: 'Fatema Begum', testType: 'B+', urgency: 'low', status: 'pending' },
    ])

    const [selectedRequest, setSelectedRequest] = useState<BloodTestRequest | null>(null)
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)

    const handleStatusChange = (id: string, newStatus: 'accepted' | 'rejected', scheduledTime?: Date) => {
        setRequests(prevRequests =>
            prevRequests.map(request =>
                request.id === id
                    ? { ...request, status: newStatus, scheduledTime }
                    : request
            )
        )
    }

    const handleAccept = (request: BloodTestRequest) => {
        setSelectedRequest(request)
        setIsCalendarModalOpen(true)
    }

    const handleConfirmAccept = (selectedTime: Date) => {
        if (selectedRequest) {
            handleStatusChange(selectedRequest.id, 'accepted', selectedTime)
            setIsCalendarModalOpen(false)
            setSelectedRequest(null)
        }
    }

    return (
        <div className="min-h-screen  p-8">
            <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="text-4xl font-bold text-foreground text-center mb-8"
            >
                Blood Test Requests
            </motion.h1>
            <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2"
                >
                    <AnimatePresence>
                        {requests.map((request, index) => (
                            <motion.div
                                key={request.id}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 260,
                                    damping: 20,
                                    delay: index * 0.1,
                                }}
                            >
                                <BloodTestRequestCard
                                    request={request}
                                    onStatusChange={handleStatusChange}
                                    onAccept={handleAccept}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </ScrollArea>
            <CalendarModal
                isOpen={isCalendarModalOpen}
                onClose={() => setIsCalendarModalOpen(false)}
                onConfirm={handleConfirmAccept}
            />
        </div>
    )
}
