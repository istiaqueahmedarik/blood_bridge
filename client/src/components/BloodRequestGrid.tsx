'use client'

import { useState, useEffect } from 'react'
import BloodRequestCard from './BloodRequestCard'

interface BloodRequest {
    id: string
    hospitalName: string
    bloodType: string
    quantity: number
    urgency: 'low' | 'medium' | 'high'
    status: 'pending' | 'accepted' | 'rejected'
}

interface BloodRequestGridProps {
    searchTerm: string
    filterType: string
}

export default function BloodRequestGrid({ searchTerm, filterType }: BloodRequestGridProps) {
    const [requests, setRequests] = useState<BloodRequest[]>([])

    useEffect(() => {
        const fetchRequests = async () => {
            const mockRequests: BloodRequest[] = [
                { id: '1', hospitalName: 'Central Hospital', bloodType: 'A+', quantity: 2, urgency: 'high', status: 'pending' },
                { id: '2', hospitalName: 'City Medical Center', bloodType: 'O-', quantity: 1, urgency: 'medium', status: 'pending' },
                { id: '3', hospitalName: 'St. Mary\'s Hospital', bloodType: 'B+', quantity: 3, urgency: 'low', status: 'pending' },
            ]
            setRequests(mockRequests)
        }

        fetchRequests()
    }, [])

    const filteredRequests = requests.filter(request =>
        request.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterType === 'all' || request.bloodType === filterType)
    )

    const handleStatusChange = (id: string, newStatus: 'accepted' | 'rejected') => {
        setRequests(requests.map(request =>
            request.id === id ? { ...request, status: newStatus } : request
        ))
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRequests.map(request => (
                <BloodRequestCard
                    key={request.id}
                    request={request}
                    onStatusChange={handleStatusChange}
                />
            ))}
        </div>
    )
}

