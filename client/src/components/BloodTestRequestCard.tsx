'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface BloodTestRequest {
    id: string
    patientName: string
    testType: string
    urgency: 'low' | 'medium' | 'high'
    status: 'pending' | 'accepted' | 'rejected'
    scheduledTime?: Date
}

interface BloodTestRequestCardProps {
    request: BloodTestRequest
    onStatusChange: (id: string, newStatus: 'accepted' | 'rejected') => void
    onAccept: (request: BloodTestRequest) => void
}

export function BloodTestRequestCard({ request, onStatusChange, onAccept }: BloodTestRequestCardProps) {
    const urgencyColor = {
        low: 'bg-green-100 text-green-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-red-100 text-red-800'
    }

    return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card className="h-auto bg-bakground bg-opacity-80 backdrop-blur-lg">
                <CardHeader className="relative">
                    <motion.div
                        className="absolute inset-0 bg-muted/80"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                    <CardTitle className="relative z-10 text-bakground">{request.patientName}</CardTitle>
                    <Badge className={`${urgencyColor[request.urgency]} relative z-10`}>
                        {request.urgency} urgency
                    </Badge>
                </CardHeader>
                <CardContent>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Test Type: {request.testType}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Status: {request.status}
                    </motion.p>
                    {request.scheduledTime && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Scheduled Time: {request.scheduledTime.toLocaleString()}
                        </motion.p>
                    )}
                </CardContent>
                <CardFooter className="grid auto-rows-min gap-2">
                    {request.status === 'pending' && (
                        <>
                            <Button onClick={() => onAccept(request)} variant="outline">Accept</Button>
                            <Button onClick={() => onStatusChange(request.id, 'rejected')} variant="outline">Reject</Button>
                        </>
                    )}
                </CardFooter>
            </Card>
        </motion.div>
    )
}

